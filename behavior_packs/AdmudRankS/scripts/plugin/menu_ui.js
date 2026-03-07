import { ActionFormData } from "@minecraft/server-ui";
import { getPlayerRank } from "./ranks/rank.js";
import { getConfig } from "../config.js";
import { openClanMenu } from "./clans/clan.js";
import { openTPADashboard } from "./tpa/tpa_system.js"; 
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
        toggles = { clan: true, tpa: true, rtp: true, claimland: true, serverwarp: true, playerwarp: true, shop: true };
    }

    const form = new ActionFormData()
        // JUDUL HARUS PERSIS "MEMBER MENU" AGAR TERBACA JSON UIMU
        .title("MEMBER MENU") 
        .body(`§l§b${player.name}§r\n§7Rank: ${rank.prefix}\n§7Money: §a$${money}`);

    const actions = [];
    
    // MENGGUNAKAN TEXTURE PATH ASLI MILIKMU AGAR GAMBARNYA MUNCUL DI CUSTOM UI
    if (toggles.serverwarp !== false) { 
        form.button("Server Warps", "textures/ui/mashup_world"); 
        actions.push("serverwarp"); 
    }
    if (toggles.rtp !== false) { 
        form.button("RTP (Random TP)", "textures/ui/sidebar_icons/realms"); 
        actions.push("rtp"); 
    }
    if (toggles.tpa !== false) { 
        form.button("TPA Teleport", "textures/ui/dressing_room_customization"); 
        actions.push("tpa"); 
    }
    if (toggles.shop !== false) { 
        form.button("Shop", "textures/ui/sidebar_icons/marketplace"); 
        actions.push("shop"); 
    }
    if (toggles.clan !== false) { 
        form.button("Clan System", "textures/ui/icon_recipe_equipment"); 
        actions.push("clan"); 
    }
    if (toggles.claimland !== false) { 
        form.button("Claim Land", "textures/ui/icon_new"); 
        actions.push("claimland"); 
    }
    if (toggles.playerwarp !== false) { 
        form.button("Player Warps", "textures/ui/realms_key_art"); 
        actions.push("playerwarp"); 
    }
    
    form.show(player).then(res => {
        if (res.canceled) return;
        const selectedAction = actions[res.selection];

        switch(selectedAction) {
            case "clan": openClanMenu(player); break;
            case "tpa": openTPADashboard(player); break; 
            case "rtp": openRtpMenu(player); break;
            case "claimland": openClaimMenu(player); break;
            case "serverwarp": openWarpMenu(player); break;
            case "playerwarp": openPlayerWarpMenu(player, "all"); break; 
            case "shop": openShopMenu(player); break;
        }
    });
}