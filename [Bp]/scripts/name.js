import { getConfig } from "./config.js";
import { resolvePlaceholders } from "./placeholder.js";

export function updateNametag(player) {
    const config = getConfig();
    const newTag = resolvePlaceholders(config.nametagFormat, player);
    
    if (player.nameTag !== newTag) {
        player.nameTag = newTag;
    }
}