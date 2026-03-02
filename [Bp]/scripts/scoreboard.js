import { getConfig } from "./config.js";
import { resolvePlaceholders } from "./placeholder.js";

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
        stayDuration: 9999, // <--- Ini yang bikin dia solid dan nggak kedip
        fadeInDuration: 0,
        fadeOutDuration: 0,
        subtitle: ""
    });
}
