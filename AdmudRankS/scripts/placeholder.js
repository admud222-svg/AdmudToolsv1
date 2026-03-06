import { world, system } from "@minecraft/server";
import { getPlayerRank } from "./plugin/ranks/rank.js";
import { getPlayerTotalClaimedBlocks, fetchAllLandData } from "./plugin/land/claimland.js"; // Import database land
import { getConfig } from "./config.js"; // Import config untuk cek mode

// =========================================
// AUTO-CREATE SCOREBOARD OBJECTIVES
// =========================================
const REQUIRED_SCOREBOARDS = ["money", "coin", "shards", "kills", "deaths"];

system.run(() => {
    for (const obj of REQUIRED_SCOREBOARDS) {
        try {
            if (!world.scoreboard.getObjective(obj)) {
                world.scoreboard.addObjective(obj, obj);
            }
        } catch (e) {
            console.warn(`[Admud System] Gagal memuat scoreboard otomatis: ${obj}`);
        }
    }
});

// =========================================
// FUNGSI BACA SCOREBOARD (ANTI-ERROR)
// =========================================
function getScore(player, objectiveId) {
    try {
        return world.scoreboard.getObjective(objectiveId)?.getScore(player) ?? 0;
    } catch {
        return 0;
    }
}

// =========================================
// METRIC NUMBER FORMATTER (1K, 1M, 1B)
// =========================================
function formatMetric(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + "B";
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + "K";
    return num.toString();
}

// =========================================
// METRIC KHUSUS CLAIM LIMIT (>= 10,000 BARU JADI 10K)
// =========================================
function formatClaimMetric(num) {
    if (num === "∞") return num; 
    
    let val = Number(num);
    if (isNaN(val)) return num; 
    
    if (val >= 1000000000) return (val / 1000000000).toFixed(1).replace(/\.0$/, '') + "B";
    if (val >= 1000000) return (val / 1000000).toFixed(1).replace(/\.0$/, '') + "M";
    if (val >= 10000) return (val / 1000).toFixed(1).replace(/\.0$/, '') + "K";
    
    return val.toString(); 
}

// =========================================
// FUNGSI DETEKSI PLAYER DI AREA LAND
// =========================================
function getCurrentLandOwner(player) {
    const db = fetchAllLandData();
    const loc = player.location;
    const dim = player.dimension.id;
    
    for (const id in db) {
        const l = db[id];
        // Cek apakah pemain berada di dimensi yang sama dan masuk ke dalam kotak area
        if (dim === l.dim && 
            loc.x >= l.min.x && loc.x <= l.max.x && 
            loc.z >= l.min.z && loc.z <= l.max.z) {
            return l.owner; // Kembalikan nama pemilik jika masuk radar
        }
    }
    return "§7Unclaimed"; // Kembalikan 'Unclaimed' jika sedang di alam liar
}

// =========================================
// REAL TPS & FAKE PING TRACKER ENGINE
// =========================================
let lastTickTime = Date.now();
let realTPS = "20.0";
let currentFakePing = 25;
let pingUpdateCounter = 0;

system.runInterval(() => {
    const now = Date.now();
    const diff = now - lastTickTime; 
    let calcTps = (20 / diff) * 1000;
    if (calcTps > 20) calcTps = 20.0; 
    
    realTPS = calcTps.toFixed(1);
    lastTickTime = now;

    pingUpdateCounter++;
    if (pingUpdateCounter >= 3) {
        currentFakePing = Math.floor(Math.random() * (45 - 20 + 1)) + 20;
        pingUpdateCounter = 0; 
    }
}, 20);

// =========================================
// MESIN ANIMASI
// =========================================
function applyAnimation(text, anim, tick) {
    if (!text || anim === "none") return text;
    
    let cleanText = text.replace(/§[0-9a-fk-or]/g, ""); 
    if (cleanText.length === 0) return text;

    let res = "";
    const speed = Math.floor(tick / 3);

    switch (anim) {
        case "rgb":
            const rgb = ["§c", "§6", "§e", "§a", "§b", "§9", "§d"];
            for (let i = 0; i < cleanText.length; i++) res += rgb[(i + speed) % rgb.length] + cleanText[i];
            return res;
        case "wave":
            const wave = ["§f", "§b", "§3", "§1", "§3", "§b"];
            for (let i = 0; i < cleanText.length; i++) res += wave[(i + speed) % wave.length] + cleanText[i];
            return res;
        case "shiny":
            let shinePos = (speed % (cleanText.length + 10)) - 5;
            for (let i = 0; i < cleanText.length; i++) {
                if (Math.abs(i - shinePos) === 0) res += "§f§l" + cleanText[i];
                else if (Math.abs(i - shinePos) === 1) res += "§e" + cleanText[i];
                else res += "§6" + cleanText[i];
            }
            return res;
        case "typing":
            let showLen = speed % (cleanText.length + 20);
            if (showLen > cleanText.length) showLen = cleanText.length;
            return "§a" + cleanText.substring(0, showLen) + "§r";
        case "fadein":
            const fade = ["§8", "§7", "§f", "§7", "§8"];
            let fadeStage = speed % fade.length;
            return fade[fadeStage] + cleanText;
        default:
            return text;
    }
}

// =========================================
// RESOLVER UTAMA
// =========================================
export function resolvePlaceholders(textObj, player, isChatMsg = "") {
    if (!textObj || !textObj.text) return "";
    
    const rank = getPlayerRank(player);
    const hp = player.getComponent("minecraft:health")?.currentValue || 20;
    const date = new Date();

    // === LOGIKA CLAIM LAND (Membaca Mode dari Config) ===
    const config = getConfig();
    const landSet = config.land || { mode: "count", defaultLimit: 3, rankLimits: {} };
    const pRank = rank.id; 
    
    let claimLimit = (landSet.rankLimits && landSet.rankLimits[pRank] !== undefined) ? landSet.rankLimits[pRank] : landSet.defaultLimit;
    let currentClaim = 0;

    if (landSet.mode === "block") {
        currentClaim = getPlayerTotalClaimedBlocks(player.name);
    } else {
        const db = fetchAllLandData();
        for (const id in db) {
            if (db[id].owner === player.name) {
                currentClaim++;
            }
        }
    }

    const limitDisplay = claimLimit === -1 ? "∞" : claimLimit; 
    const currentLandOwner = getCurrentLandOwner(player); // Ambil data Land saat ini

    let processed = textObj.text
        .replace(/@NAMA/g, player.name)
        .replace(/@RANKS/g, rank.prefix)
        .replace(/@CLAN/g, player.getDynamicProperty("clan") || "§cNone")
        .replace(/@HEALTH/g, Math.round(hp))
        .replace(/@MONEY/g, formatMetric(getScore(player, "money"))) 
        .replace(/@COIN/g, formatMetric(getScore(player, "coin")))
        .replace(/@SHARDS/g, formatMetric(getScore(player, "shards")))
        .replace(/@KILL/g, formatMetric(getScore(player, "kills")))
        .replace(/@DEATH/g, formatMetric(getScore(player, "deaths")))
        .replace(/@CLAIM/g, formatClaimMetric(currentClaim))
        .replace(/@LIMIT/g, formatClaimMetric(limitDisplay))
        .replace(/@LAND/g, currentLandOwner) // <=== REPLACE UNTUK @LAND
        .replace(/@TPS/g, realTPS) 
        .replace(/@PING/g, currentFakePing)
        .replace(/@ONLINE/g, world.getPlayers().length)
        .replace(/@MAXON/g, "30") 
        .replace(/@TANGGAL/g, date.getDate())
        .replace(/@BULAN/g, date.getMonth() + 1)
        .replace(/@TAHUN/g, date.getFullYear())
        .replace(/@MESSAGE/g, isChatMsg)
        .replace(/@NL/g, "\n")
        .replace(/@BLANK/g, "   "); 

    const currentTick = system.currentTick; 
    return applyAnimation(processed, textObj.anim, currentTick);
}