// ini scripts/main.js
import { world, system } from "@minecraft/server";
import { updateScoreboardTitle } from "./scoreboard.js";
import { updateNametag } from "./name.js"; 
import { handleChat } from "./plugin/ranks/rank.js";
import { openAdminMenu } from "./ui_system.js"; 
import { openMemberMainMenu } from "./plugin/menu_ui.js"; 
import { getPlayerClan, getClans } from "./plugin/clans/clan_db.js";
import "./npc_system.js"; 

// ==========================================
// LOOPING SYSTEM (SCOREBOARD & NAMETAG)
// ==========================================
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        updateScoreboardTitle(player);
        updateNametag(player);
    }
}, 2); 

// ==========================================
// CHAT SYSTEM
// ==========================================
world.beforeEvents.chatSend.subscribe((event) => {
    handleChat(event);
});

// ==========================================
// ITEM INTERACTION (BUKA MENU)
// ==========================================
world.beforeEvents.itemUse.subscribe((event) => {
    const { source: player, itemStack } = event;
    
    // Buka Admin Menu pakai Compass
    if (itemStack.typeId === "minecraft:compass" && player.hasTag("admin")) {
        system.run(() => openAdminMenu(player));
    }
    
    // Buka Member Menu pakai Jam (Clock)
    if (itemStack.typeId === "minecraft:clock") {
        system.run(() => openMemberMainMenu(player));
    }
});

// Jika pakai command /scriptevent admud:menu
system.afterEvents.scriptEventReceive.subscribe((event) => {
    if (event.id === "admud:menu" && event.sourceEntity) {
        openMemberMainMenu(event.sourceEntity);
    }
});

// ==========================================
// CLAN ANTI-FRIENDLY FIRE (PVP SESAMA CLAN)
// ==========================================
world.beforeEvents.entityHurt.subscribe((event) => {
    // FIX API TERBARU: Menggunakan entityHurt dan hurtEntity
    const victim = event.hurtEntity; 
    const attacker = event.damageSource.damagingEntity;

    // Pastikan yang kena pukul adalah Player DAN yang mukul adalah Player
    if (victim?.typeId === "minecraft:player" && attacker?.typeId === "minecraft:player") {
        const clanVictim = getPlayerClan(victim);
        const clanAttacker = getPlayerClan(attacker);

        // Jika mereka berdua punya clan, dan nama clannya SAMA
        if (clanVictim !== "" && clanVictim === clanAttacker) {
            const clans = getClans();
            const clanData = clans[clanVictim];

            // Cek status PvP di Database Clan
            // Jika undefined (belum pernah di-setting), anggap false (PVP MATI/Gak bisa mukul)
            const isPvPOn = clanData?.friendlyFire ?? false;

            // Jika "PvP Sesama Clan" dalam posisi [OFF]
            if (!isPvPOn) {
                // event.cancel di entityHurt akan memblokir 100% damage & knockback!
                event.cancel = true; 
                
                // Kasih pesan peringatan ke Chat si pemukul
                system.run(() => {
                    attacker.sendMessage(`§c[Clan] Kamu tidak bisa melukai §e${victim.name}§c! Kalian berdua adalah anggota Clan §b[${clanAttacker}]§c.`);
                });
            }
        }
    }
});