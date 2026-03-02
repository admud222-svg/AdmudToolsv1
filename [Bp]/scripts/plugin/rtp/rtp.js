import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

// --- KONFIGURASI RTP ---
const RTP_RADIUS = 10000; 
const WARMUP_TICKS = 60;  
const MAX_LIMIT = 5;       // Maksimal RTP sebelum Cooldown
const COOLDOWN_MIN = 120;  // Waktu Cooldown dalam menit

// --- HELPER KESTABILAN ---
function isPlayerValid(player) {
    try { return !!player.name; } catch (e) { return false; }
}

// --- SISTEM MEMORI LIMIT & COOLDOWN ---
function getRtpData(player) {
    const dataStr = player.getDynamicProperty("rtp_data");
    return dataStr ? JSON.parse(dataStr) : { uses: 0, cooldownEnd: 0 };
}

function saveRtpData(player, data) {
    player.setDynamicProperty("rtp_data", JSON.stringify(data));
}

// --- SISTEM ANIMASI UI ---
let animTick = 0;
system.runInterval(() => {
    const dots = ["", ".", "..", "..."];
    const currentDot = dots[animTick % 4];
    for (const player of world.getAllPlayers()) {
        if (player.hasTag("in_rtp_scanning")) {
            try { player.onScreenDisplay.setActionBar(`§aMencari area aman${currentDot}`); } 
            catch(e) { player.runCommandAsync(`title @s actionbar §aMencari area aman${currentDot}`).catch(()=>{}); }
        }
    }
    animTick++;
}, 10);

// --- FUNGSI UTAMA: MENU RTP ---
export function openRtpMenu(player) {
    let rtpData = getRtpData(player);
    const now = Date.now();
    
    // Cek apakah Cooldown sudah selesai
    if (rtpData.cooldownEnd > 0 && now >= rtpData.cooldownEnd) {
        rtpData.uses = 0;
        rtpData.cooldownEnd = 0;
        saveRtpData(player, rtpData);
    }
    
    // Kalkulasi Limit
    let sisaLimit = MAX_LIMIT - rtpData.uses;
    let cooldownText = "§aTersedia";
    
    if (sisaLimit <= 0) {
        sisaLimit = 0;
        const remainingMs = rtpData.cooldownEnd - now;
        const remainingMins = Math.ceil(remainingMs / 60000);
        cooldownText = `§cTunggu ${remainingMins} Menit`;
    }
    
    // Cek Lokasi Dimensi Player
    let currentDim = "§2Bumi (Overworld)";
    if (player.dimension.id === "minecraft:nether") currentDim = "§4Neraka (Nether)";
    if (player.dimension.id === "minecraft:the_end") currentDim = "§5Akhir (The End)";

    const form = new ActionFormData()
        .title("§l§eRANDOM TELEPORT")
        // Jarak \n ditambahkan agar Status turun ke bawah mendekati tombol Kembali
        .body(`§eLimit RTP: §b${sisaLimit}/${MAX_LIMIT}§r\n§eCooldown: ${cooldownText}\n\n\n§7Status: ${currentDim}`)
        
        // URUTAN TOMBOL DIUBAH (Nether, Overworld, End)
        .button("Nether\n§8RTP", "textures/items/flint_and_steel")    // Index 0
        .button("Overworld\n§8RTP", "textures/ui/icon_recipe_nature") // Index 1
        .button("The End\n§8RTP", "textures/items/ender_pearl")       // Index 2
        .button("Kembali\n§8Tutup Menu", "textures/ui/cancel");       // Index 3

    player.playSound("random.pop", { volume: 0.8, pitch: 1.0 });

    form.show(player).then(res => {
        if (res.canceled || res.selection === 3) return; 
        
        if (player.hasTag("in_rtp_warmup") || player.hasTag("in_rtp_scanning")) {
            return player.sendMessage("§c[RTP] Kamu sedang dalam proses RTP!");
        }

        if (sisaLimit <= 0) {
            player.playSound("note.bass");
            return player.sendMessage(`§c[RTP] Limit habis! ${cooldownText}`);
        }

        // FUNGSI SWITCH DIUBAH MENYESUAIKAN INDEX BARU
        switch (res.selection) {
            case 0: return startWarmup(player, "minecraft:nether", "Nether");
            case 1: return startWarmup(player, "minecraft:overworld", "Overworld");
            case 2: return startWarmup(player, "minecraft:the_end", "The End");
        }
    });
}

// --- FUNGSI 1: WARMUP & CANCEL JIKA GERAK ---
function startWarmup(player, targetDimId, dimName) {
    if (!isPlayerValid(player)) return;

    if (player.dimension.id !== targetDimId) {
        player.playSound("note.bass");
        player.sendMessage(`§c[RTP] Gagal! Kamu saat ini tidak berada di dimensi ${dimName}.`);
        return;
    }

    const startLoc = player.location;
    player.addTag("in_rtp_warmup");
    
    warmupLoop(player, targetDimId, dimName, WARMUP_TICKS, startLoc);
}

function warmupLoop(player, targetDimId, dimName, ticksLeft, startLoc) {
    if (!isPlayerValid(player)) return;

    const currLoc = player.location;
    const distanceMoved = Math.abs(currLoc.x - startLoc.x) + Math.abs(currLoc.y - startLoc.y) + Math.abs(currLoc.z - startLoc.z);
    
    if (distanceMoved > 0.5) {
        player.sendMessage("§c[RTP] Dibatalkan! Kamu bergerak.");
        player.playSound("note.bass");
        clearRTPState(player);
        return;
    }

    if (ticksLeft <= 0) {
        player.removeTag("in_rtp_warmup");
        startScanning(player, targetDimId, dimName, startLoc);
        return;
    }

    const detik = Math.ceil(ticksLeft / 20);
    try {
        player.onScreenDisplay.setActionBar(`§eJangan bergerak! RTP dimulai dalam §c${detik}s`);
    } catch(e) {
        player.runCommandAsync(`title @s actionbar §eJangan bergerak! RTP dimulai dalam §c${detik}s`).catch(()=>{});
    }
    
    if (ticksLeft % 20 === 0) player.playSound("random.click", { volume: 0.5, pitch: 1.0 });

    system.runTimeout(() => {
        warmupLoop(player, targetDimId, dimName, ticksLeft - 5, startLoc);
    }, 5);
}

// --- FUNGSI 2: MULAI SCANNING (LAYER HITAM) ---
function startScanning(player, targetDimId, dimName, originalLoc) {
    if (!isPlayerValid(player)) return;

    player.addTag("in_rtp_scanning");
    player.sendMessage(`§a[RTP] Memulai pencarian kordinat di ${dimName}...`);
    player.playSound("mob.endermen.portal");

    let topY = 310;  
    let botY = -50;  

    if (targetDimId === "minecraft:nether") {
        topY = 115; 
        botY = 32;  
    } else if (targetDimId === "minecraft:the_end") {
        topY = 150; 
        botY = 10;  
    }

    const dimension = world.getDimension(targetDimId);
    rerollLocation(player, dimension, topY, botY, 0, originalLoc);
}

// --- FUNGSI 3: ACAK LOKASI & CEK CHUNK ---
function rerollLocation(player, dim, topY, botY, attempt, originalLoc) {
    if (!isPlayerValid(player)) return;

    if (attempt >= 10) {
        player.sendMessage("§c[RTP] Gagal menemukan area aman setelah 10 percobaan. Silakan coba lagi.");
        player.teleport(originalLoc, { dimension: dim });
        clearRTPState(player);
        return;
    }

    const nx = Math.floor(Math.random() * (RTP_RADIUS * 2)) - RTP_RADIUS;
    const nz = Math.floor(Math.random() * (RTP_RADIUS * 2)) - RTP_RADIUS;

    player.teleport({ x: nx, y: topY, z: nz }, { dimension: dim });
    player.addEffect("blindness", 200, { showParticles: false });
    player.addEffect("resistance", 200, { amplifier: 255, showParticles: false });
    player.addEffect("slowness", 200, { amplifier: 255, showParticles: false }); 

    scanChunk(player, dim, nx, nz, topY, botY, attempt, 0, originalLoc);
}

// --- FUNGSI 4: PEMINDAIAN SMART X-RAY ---
function scanChunk(player, dim, x, z, topY, botY, attempt, scanRetries, originalLoc) {
    if (!isPlayerValid(player)) return;

    if (scanRetries > 6) { 
        return rerollLocation(player, dim, topY, botY, attempt + 1, originalLoc);
    }

    system.runTimeout(() => {
        try {
            let foundSurface = false;
            let isSafe = false;
            let safeY = botY;

            for (let y = topY; y >= botY; y--) {
                const block = dim.getBlock({ x, y, z });
                if (block.isAir || block.typeId.includes("leaves")) continue;

                const b1 = dim.getBlock({ x, y: y + 1, z });
                const b2 = dim.getBlock({ x, y: y + 2, z });
                
                if (b1 && b1.isAir && b2 && b2.isAir) {
                    foundSurface = true;
                    const type = block.typeId;
                    
                    const dangerBlocks = [
                        "minecraft:lava", "minecraft:flowing_lava", 
                        "minecraft:water", "minecraft:flowing_water", 
                        "minecraft:magma_block", "minecraft:fire", 
                        "minecraft:soul_fire", "minecraft:powder_snow", 
                        "minecraft:cactus", "minecraft:sweet_berry_bush",
                        "minecraft:bedrock"
                    ];

                    if (!dangerBlocks.includes(type)) {
                        isSafe = true;
                        safeY = y;
                    }
                    break; 
                }
            }

            if (isSafe && foundSurface) {
                // TELEPORT BERHASIL
                player.teleport({ x: x, y: safeY + 1, z: z }, { dimension: dim });
                clearRTPState(player);
                
                // === PROSES PEMOTONGAN LIMIT ===
                let data = getRtpData(player);
                data.uses += 1; 
                if (data.uses >= MAX_LIMIT) {
                    data.cooldownEnd = Date.now() + (COOLDOWN_MIN * 60000);
                }
                saveRtpData(player, data);

                player.playSound("random.levelup");
                player.sendMessage(`§a[RTP] Selesai! Mendarat aman di [§b${x}, ${safeY + 1}, ${z}§a]`);
                player.sendMessage(`§e[RTP] Limit RTP tersisa: §b${MAX_LIMIT - data.uses}/${MAX_LIMIT}`);
            } else {
                rerollLocation(player, dim, topY, botY, attempt + 1, originalLoc);
            }

        } catch (e) {
            scanChunk(player, dim, x, z, topY, botY, attempt, scanRetries + 1, originalLoc);
        }
    }, 5);
}

// --- FUNGSI 5: PEMBERSIH STATUS ---
function clearRTPState(player) {
    if (!isPlayerValid(player)) return;
    player.removeTag("in_rtp_warmup");
    player.removeTag("in_rtp_scanning");
    
    try {
        player.removeEffect("blindness");
        player.removeEffect("slowness");
        player.removeEffect("resistance");
        player.removeEffect("slow_falling");
    } catch(e) {}

    system.runTimeout(() => {
        if (isPlayerValid(player)) {
            try {
                player.removeEffect("blindness");
                player.runCommandAsync("effect @s clear").catch(()=>{});
            } catch(e) {}
        }
    }, 10);
}