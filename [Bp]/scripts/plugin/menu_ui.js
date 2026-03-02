// ini scripts/member_menu/menu_ui.js
import { ActionFormData } from "@minecraft/server-ui";
import { getPlayerRank } from "./ranks/rank.js";
import { getConfig } from "../config.js";
import { openClanMenu } from "./clans/clan.js";
import { openTPADashboard } from "./tpa/tpa_system.js"; // <-- Tambahkan .js di sini
import { openRtpMenu } from "./rtp/rtp.js";
import { openClaimMenu } from "./land/claimland.js";
import { openWarpMenu } from "./warps/warp.js";
import { openPlayerWarpMenu } from "./playerwarp/playerwarp.js";
import { openShopMenu } from "./shop/shop.js";

export function openMemberMainMenu(player) {
    const rank = getPlayerRank(player);
    const money = player.getDynamicProperty("money") || 0;
    
    // FAILSAFE: Mencegah crash jika data belum pernah di-save
    let toggles = getConfig().menuToggles;
    if (!toggles) {
        toggles = { clan: true, tpa: true, rtp: true, claimland: true, serverwarp: true, playerwarp: true };
    }

    const form = new ActionFormData()
        .title("MEMBER MENU") 
        .body(`§l§b${player.name}§r\n§7Rank: ${rank.prefix}\n§7Money: §a$${money}`);

    const actions = [];
    if (toggles.clan) { form.button("Clan System", "textures/ui/icon_multiplayer"); actions.push("clan"); }
    if (toggles.tpa) { form.button("TPA Teleport", "textures/ui/send_icon"); actions.push("tpa"); }
    if (toggles.rtp) { form.button("RTP (Random TP)", "textures/ui/icon_map"); actions.push("rtp"); }
    if (toggles.claimland) { form.button("Claim Land", "textures/ui/lock"); actions.push("claimland"); }
    if (toggles.serverwarp) { form.button("Server Warps", "textures/ui/world_glyph"); actions.push("serverwarp"); }
    if (toggles.playerwarp) { form.button("Player Warps", "textures/ui/icon_sign"); actions.push("playerwarp"); }

    form.show(player).then(res => {
        if (res.canceled) return;
        const selectedAction = actions[res.selection];

        switch(selectedAction) {
            case "clan": openClanMenu(player); break;
            case "tpa": openTPADashboard(player); break; // <-- SUDAH DIPERBAIKI DI SINI!
            case "rtp": openRtpMenu(player); break;
            case "claimland": openClaimMenu(player); break;
            case "serverwarp": openWarpMenu(player); break;
            case "playerwarp": openPlayerWarpMenu(player); break;
        }
    });
}