import { world } from "@minecraft/server";
import { getConfig } from "./config.js";
import { resolvePlaceholders } from "./placeholder.js";

// ==========================================
// FUNGSI UPDATE TAMPILAN SCOREBOARD
// ==========================================
export function updateScoreboardTitle(player) {
    const config = getConfig();
    
    // 1. Proses Title Scoreboard
    let finalTitle = resolvePlaceholders(config.sbTitle, player);
    
    // 2. Proses tiap baris (line) Scoreboard
    let lines = config.sbLines.map(lineData => resolvePlaceholders(lineData, player));
    
    // 3. Gabungkan Title dan Baris dengan jeda baris baru
    let finalText = finalTitle + "\n\n" + lines.join("\n");

    // Tampilkan ke layar (Title Command)
    player.onScreenDisplay.setTitle(finalText, {
        stayDuration: 9999, 
        fadeInDuration: 0,
        fadeOutDuration: 0,
        subtitle: ""
    });
}

// ==========================================
// SISTEM TRACKER KILL & DEATH PVP
// ==========================================
world.afterEvents.entityDie.subscribe((event) => {
    const deadEntity = event.deadEntity;
    const killer = event.damageSource.damagingEntity;

    // Cek apakah entitas yang mati adalah seorang Player
    if (deadEntity?.typeId === "minecraft:player") {
        
        // 1. Update score DEATH menggunakan Native API
        try {
            const deathObj = world.scoreboard.getObjective("deaths");
            if (deathObj) {
                // Ambil score saat ini, lalu tambahkan 1
                const currentDeath = deathObj.getScore(deadEntity) || 0;
                deathObj.setScore(deadEntity, currentDeath + 1);
            }
        } catch (e) {
            // Fallback (jaga-jaga jika entitas nge-glitch saat mati)
            try { world.getDimension("overworld").runCommandAsync(`scoreboard players add @a[name="${deadEntity.name}"] deaths 1`); } catch (err) {}
        }
        
        // 2. Update score KILL jika pembunuhnya JUGA seorang Player (PVP)
        if (killer?.typeId === "minecraft:player") {
            try {
                const killObj = world.scoreboard.getObjective("kills");
                if (killObj) {
                    // Ambil score saat ini, lalu tambahkan 1
                    const currentKill = killObj.getScore(killer) || 0;
                    killObj.setScore(killer, currentKill + 1);
                }
            } catch (e) {}
        }
    }
});