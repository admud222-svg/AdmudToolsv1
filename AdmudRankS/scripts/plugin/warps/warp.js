import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";

const WARP_DB = "admud_server_warps";

// ==========================================
// DATABASE UTILS
// ==========================================
export function getWarps() {
    try {
        const data = world.getDynamicProperty(WARP_DB);
        return data ? JSON.parse(data) : {};
    } catch (e) {
        return {};
    }
}

export function saveWarps(warpsObj) {
    world.setDynamicProperty(WARP_DB, JSON.stringify(warpsObj));
}

// ==========================================
// PLAYER UI: MEMBER WARP MENU
// ==========================================
export function openWarpMenu(player) {
    const warps = getWarps();
    const warpIds = Object.keys(warps);

    const form = new ActionFormData()
        .title("§l§eSERVER WARPS");

    if (warpIds.length === 0) {
        form.body("§cBelum ada warp yang tersedia di server ini.");
        form.button("Kembali", "textures/ui/cancel");
    } else {
        form.body("Pilih tujuan warp kamu:");
        for (const id of warpIds) {
            const w = warps[id];
            form.button(`§l${w.name}\n§r§8${w.dim.replace("minecraft:", "")}`, w.icon || "textures/ui/world_glyph");
        }
        form.button("Kembali", "textures/ui/cancel");
    }

    form.show(player).then(res => {
        if (res.canceled) return;
        if (warpIds.length === 0) return; 
        if (res.selection === warpIds.length) return; 

        const selectedWarp = warps[warpIds[res.selection]];
        teleportToWarp(player, selectedWarp);
    });
}

// ALIAS: Export dengan 2 nama sekaligus agar ui_system.js & main.js tidak error
export const openServerWarpsUI = openWarpMenu;

function teleportToWarp(player, warpData) {
    player.addTag("loadchunck`" + JSON.stringify({ x: warpData.x, z: warpData.z }));

    if (warpData.useAnim) {
        // ==========================================
        // MODE ANIMASI KAMERA SINEMATIK
        // ==========================================
        player.sendMessage(`§a[Warp] §fMempersiapkan perjalanan ke §e${warpData.name}§f...`);
        
        // 1. KUNCI PLAYER (Hanya Slowness agar kaki tidak bisa jalan, AMAN DARI FALL DAMAGE)
        try { 
            player.addEffect("slowness", 100, { amplifier: 255, showParticles: false }); 
        } catch(e){}

        // 2. KAMERA TERBANG MUNDUR & SUARA ANGIN
        try {
            player.runCommand(`camera @s set minecraft:free ease 1.0 in_out_quad pos ^ ^6 ^-10 facing ^ ^1 ^`);
            player.playSound("beacon.deactivate", { volume: 1.0, pitch: 1.5 });
            player.playSound("entity.phantom.swoop", { volume: 1.0, pitch: 0.6 });
        } catch(e) {}

        // 3. JEDA 0.5 DETIK -> FADE TO BLACK (Layar jadi hitam)
        system.runTimeout(() => {
            try { player.runCommand(`camera @s fade time 0.5 0.5 0.5 color 0 0 0`); } catch(e){}
        }, 10); 

        // 4. JEDA 1.0 DETIK (Saat layar sedang hitam pekat) -> TELEPORTASI
        system.runTimeout(() => {
            try {
                // Pindahkan Player tanpa kelihatan layarnya
                player.teleport(
                    { x: warpData.x, y: warpData.y, z: warpData.z },
                    { dimension: world.getDimension(warpData.dim) }
                );
                
                // Pindah kamera instan jauh ke atas langit di lokasi baru
                try { player.runCommand(`camera @s set minecraft:free pos ^ ^8 ^-12 facing ^ ^1 ^`); } catch(e){}

                // 5. JEDA 0.5 DETIK (Saat layar mulai pelan-pelan terang lagi) -> ZOOM MASUK KE KEPALA
                system.runTimeout(() => {
                    try {
                        try { 
                            player.playSound("item.trident.riptide_3", { volume: 1.0, pitch: 1.0 }); 
                            player.playSound("mob.endermen.portal", { volume: 0.8, pitch: 1.2 }); 
                        } catch(e){} 
                        
                        // Eksekusi Kamera melesat MASUK ke titik mata (First Person)
                        player.runCommand(`camera @s set minecraft:free ease 1.5 in_out_quad pos ^ ^1.5 ^ facing ^ ^1.5 ^10`);
                        
                        // Partikel End Rod muncul di sekitar tubuh
                        let tickCount = 0;
                        const particleInterval = system.runInterval(() => {
                            try { 
                                const px = player.location.x + (Math.random() - 0.5) * 2;
                                const py = player.location.y + Math.random() * 2;
                                const pz = player.location.z + (Math.random() - 0.5) * 2;
                                player.dimension.spawnParticle("minecraft:endrod", { x: px, y: py, z: pz }); 
                            } catch(e){}
                            tickCount++;
                            if (tickCount > 15) system.clearRun(particleInterval); 
                        }, 2);

                        // 6. JEDA 1.5 DETIK (Setelah zoom masuk selesai) -> BUKA KUNCI & CLEAR KAMERA
                        system.runTimeout(() => {
                            try {
                                player.runCommand(`camera @s clear`); 
                                player.removeEffect("slowness");
                                player.sendMessage(`§a[Warp] §fBerhasil mendarat di §e${warpData.name}§f!`);
                            } catch(e){}
                        }, 30); 

                    } catch(e){}
                }, 10); 

            } catch(e) {
                // Jika Teleport Error (Dimensi salah), kembalikan semua normal
                try { player.runCommand(`camera @s clear`); } catch(err){}
                try { player.removeEffect("slowness"); } catch(err){}
                player.sendMessage("§c[Warp] Gagal teleport! Dimensi atau koordinat tidak valid.");
            }
        }, 20); // Teleport di eksekusi tepat detik ke 1.0 sejak klik

        // ==========================================
        // FAILSAFE AMAN (ANTI-NYANGKUT SYSTEM)
        // Apapun yang terjadi, dalam 5 detik paksa kembalikan semua
        // ==========================================
        system.runTimeout(() => {
            try {
                player.runCommand(`camera @s clear`);
                player.removeEffect("slowness");
            } catch(e){}
        }, 100);

    } else {
        // ==========================================
        // MODE NORMAL (TANPA ANIMASI)
        // ==========================================
        player.sendMessage(`§a[Warp] §fTeleportasi ke §e${warpData.name}§f...`);
        system.runTimeout(() => {
            try {
                player.teleport(
                    { x: warpData.x, y: warpData.y, z: warpData.z },
                    { dimension: world.getDimension(warpData.dim) }
                );
                player.playSound("item.elytra.flying");
            } catch(e) {
                player.sendMessage("§c[Warp] Gagal teleport! Dimensi atau koordinat tidak valid.");
            }
        }, 5);
    }
}

// ==========================================
// ADMIN UI: MANAGE WARP SETTINGS
// ==========================================
export function menuAdminWarpSet(player) {
    const warps = getWarps();
    const warpIds = Object.keys(warps);

    const form = new ActionFormData()
        .title("§l§dWARP MANAGER")
        .body("Kelola Server Warps di sini:");

    form.button("§2[+] Tambah Warp Baru", "textures/ui/color_plus");
    
    for (const id of warpIds) {
        form.button(`§l${warps[id].name}\n§r§8Klik untuk Edit/Hapus`, warps[id].icon || "textures/ui/world_glyph");
    }
    form.button("Kembali", "textures/ui/cancel");

    form.show(player).then(res => {
        if (res.canceled) return;
        if (res.selection === 0) {
            menuEditWarp(player, null); 
        } else if (res.selection === warpIds.length + 1) {
            import("../../ui_system.js").then(m => m.openAdminMenu(player));
        } else {
            menuEditWarp(player, warpIds[res.selection - 1]); 
        }
    });
}

function menuEditWarp(player, warpId) {
    const warps = getWarps();
    const isNew = !warpId;
    
    const loc = player.location;
    const defaultName = isNew ? "New Warp" : warps[warpId].name;
    const defaultX = isNew ? (Math.floor(loc.x) + 0.5) : warps[warpId].x;
    const defaultY = isNew ? Math.floor(loc.y) : warps[warpId].y;
    const defaultZ = isNew ? (Math.floor(loc.z) + 0.5) : warps[warpId].z;
    const defaultDim = isNew ? player.dimension.id : warps[warpId].dim;
    const defaultIcon = isNew ? "textures/ui/world_glyph" : (warps[warpId].icon || "textures/ui/world_glyph");
    const defaultAnim = isNew ? true : !!warps[warpId].useAnim; 

    const form = new ModalFormData()
        .title(isNew ? "Tambah Warp Baru" : `Edit Warp: ${warps[warpId].name}`)
        .textField("Nama Warp (Tampil di UI):", "Contoh: Spawn, PVP Arena", { defaultValue: String(defaultName) })
        .textField("Kordinat X:", "X...", { defaultValue: String(defaultX) })
        .textField("Kordinat Y:", "Y...", { defaultValue: String(defaultY) })
        .textField("Kordinat Z:", "Z...", { defaultValue: String(defaultZ) })
        .textField("Dimensi:", "minecraft:overworld", { defaultValue: String(defaultDim) })
        .textField("Path Icon/Texture (Optional):", "textures/items/diamond", { defaultValue: String(defaultIcon) })
        .toggle("§d✨ Gunakan Animasi Kamera?§r", { defaultValue: defaultAnim });
        
    if (!isNew) {
        form.toggle("§l§cHapus Warp Ini? (Hati-hati)§r", { defaultValue: false });
    }

    form.show(player).then(res => {
        if (res.canceled) return menuAdminWarpSet(player);

        if (!isNew && res.formValues[7]) {
            delete warps[warpId];
            saveWarps(warps);
            player.sendMessage(`§a[Admin] Warp berhasil dihapus.`);
            return menuAdminWarpSet(player);
        }

        const newName = res.formValues[0].trim();
        const newX = parseFloat(res.formValues[1]);
        const newY = parseFloat(res.formValues[2]);
        const newZ = parseFloat(res.formValues[3]);
        const newDim = res.formValues[4].trim();
        const newIcon = res.formValues[5].trim();
        const newAnim = res.formValues[6];

        if (!newName || isNaN(newX) || isNaN(newY) || isNaN(newZ) || !newDim) {
            player.sendMessage("§c[Admin] Gagal! Koordinat harus berupa angka.");
            return menuAdminWarpSet(player);
        }

        const idToSave = isNew ? "warp_" + Date.now() : warpId;
        warps[idToSave] = {
            id: idToSave,
            name: newName,
            x: newX,
            y: newY,
            z: newZ,
            dim: newDim,
            icon: newIcon,
            useAnim: newAnim
        };

        saveWarps(warps);
        player.sendMessage(`§a[Admin] Warp §e${newName} §aberhasil disimpan!`);
        menuAdminWarpSet(player);
    });
}

world.beforeEvents.chatSend.subscribe((e) => {
    if (e.message.toLowerCase() === "!warp" || e.message.toLowerCase() === "!warps") {
        e.cancel = true;
        system.run(() => openWarpMenu(e.sender));
    }
});