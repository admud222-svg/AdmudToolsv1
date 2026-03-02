import { world, system } from "@minecraft/server";
import { getPlayerRank, getRankClaimLimit } from "./plugin/ranks/rank.js";
import { getPlayerTotalClaimedBlocks } from "./plugin/land/claimland.js"; // Import data claim

// =========================================
// AUTO-CREATE SCOREBOARD OBJECTIVES
// =========================================
const REQUIRED_SCOREBOARDS = ["money", "coin", "shards", "kills", "deaths"];

// Sistem akan mengecek dan membuat scoreboard secara otomatis saat server menyala
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
// REAL TPS & FAKE PING TRACKER ENGINE
// =========================================
let lastTickTime = Date.now();
let realTPS = "20.0";
let currentFakePing = 25;
let pingUpdateCounter = 0;

system.runInterval(() => {
    // 1. Kalkulasi Real TPS
    const now = Date.now();
    const diff = now - lastTickTime; 
    let calcTps = (20 / diff) * 1000;
    if (calcTps > 20) calcTps = 20.0; 
    
    realTPS = calcTps.toFixed(1);
    lastTickTime = now;

    // 2. Kalkulasi Fake Ping yang Kalem
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

    // Data Claim Land
    const claimedBlocks = getPlayerTotalClaimedBlocks(player.name);
    const claimLimit = getRankClaimLimit(player);
    const limitDisplay = claimLimit === -1 ? "∞" : claimLimit; // Ubah -1 jadi lambang infinity

    let processed = textObj.text
        .replace(/@NAMA/g, player.name)
        .replace(/@RANKS/g, rank.prefix)
        .replace(/@CLAN/g, player.getDynamicProperty("clan") || "§cNone")
        .replace(/@HEALTH/g, Math.round(hp))
        
        // MENGAMBIL DARI SCOREBOARD & OTOMATIS JADI METRIC (1.5K, 10M, 1B)
        .replace(/@MONEY/g, formatMetric(getScore(player, "money"))) 
        .replace(/@COIN/g, formatMetric(getScore(player, "coin")))
        .replace(/@SHARDS/g, formatMetric(getScore(player, "shards")))
        .replace(/@KILL/g, formatMetric(getScore(player, "kills")))
        .replace(/@DEATH/g, formatMetric(getScore(player, "deaths")))
        
        // CLAIM PLACEHOLDERS BARU
        .replace(/@CLAIM/g, claimedBlocks)
        .replace(/@LIMIT/g, limitDisplay)
        
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