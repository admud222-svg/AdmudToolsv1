import { world } from "@minecraft/server";

const CLAN_DB = "admud_clans_v3";

export function getClans() {
    const data = world.getDynamicProperty(CLAN_DB);
    return data ? JSON.parse(data) : {};
}

export function saveClans(clans) {
    world.setDynamicProperty(CLAN_DB, JSON.stringify(clans));
}

export function getPlayerClan(player) {
    let clanName = player.getDynamicProperty("clan") || "";
    if (clanName === "") return "";

    let cleanName = clanName.replace(/§[0-9a-fk-or]/g, ""); 
    let clans = getClans();

    // Cek apakah clan lamanya sudah ganti nama (Renamed)
    while (clans[cleanName] && clans[cleanName].renamedTo) {
        cleanName = clans[cleanName].renamedTo;
        // Update tag pemain secara otomatis tanpa dia sadar!
        player.setDynamicProperty("clan", `§b${cleanName}`); 
    }

    if (!clans[cleanName]) {
        player.setDynamicProperty("clan", "");
        return "";
    }

    return cleanName;
}

export function getPlayerInvites(player) {
    const data = player.getDynamicProperty("clan_invites");
    return data ? JSON.parse(data) : [];
}

export function savePlayerInvites(player, invites) {
    player.setDynamicProperty("clan_invites", JSON.stringify(invites));
}