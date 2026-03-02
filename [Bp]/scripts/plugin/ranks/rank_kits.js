import { world, system, ItemStack } from "@minecraft/server";
import { getPlayerRank } from "./rank.js";

const KITS_DB = "admud_kits_v4";

const DEFAULT_KITS = {
    "member": { 
        name: "Member Kit", 
        reqRank: "member", 
        cooldownHours: 24, 
        items: ["minecraft:iron_sword:1", "minecraft:bread:16"], 
        structure: "", 
        commands: [] 
    },
    "vip": { 
        name: "VIP Kit", 
        reqRank: "vip", 
        cooldownHours: 24, 
        items: ["minecraft:diamond_sword:1", "minecraft:golden_apple:5"], 
        structure: "vip", 
        commands: ["give @s xp_bottle 64"] 
    }
};

export function getKits() {
    const data = world.getDynamicProperty(KITS_DB);
    return data ? JSON.parse(data) : DEFAULT_KITS;
}

export function saveKits(kits) {
    world.setDynamicProperty(KITS_DB, JSON.stringify(kits));
}

export function getKitCooldown(player, kitID) {
    return player.getDynamicProperty(`kit_cd_${kitID}`) || 0;
}

export function setKitCooldown(player, kitID, hours) {
    const ms = hours * 3600000;
    player.setDynamicProperty(`kit_cd_${kitID}`, Date.now() + ms);
}

export function resetKitCooldown(player, kitID) {
    player.setDynamicProperty(`kit_cd_${kitID}`, 0);
}

export function claimRankKit(player, kitID) {
    const kits = getKits();
    const kit = kits[kitID];
    if (!kit) return;

    // AMBIL ID RANK YANG SEDANG DI-EQUIP SAAT INI
    const equippedRank = getPlayerRank(player).id;
    const reqRank = kit.reqRank || "member";

    // LOGIKA KETAT: Rank yang dipakai HARUS SAMA PERSIS dengan rank kit-nya!
    if (equippedRank !== reqRank) {
        player.sendMessage(`§c[Kits] Gagal! Kit ini khusus untuk rank §e${reqRank.toUpperCase()}§c.\n§fSaat ini kamu sedang memakai rank: §b${equippedRank.toUpperCase()}`);
        player.playSound("note.bass", { volume: 1.0, pitch: 1.0 });
        return;
    }

    const cd = getKitCooldown(player, kitID);
    const now = Date.now();
    
    if (now < cd) {
        const timeLeft = Math.ceil((cd - now) / 60000); 
        const hours = Math.floor(timeLeft / 60);
        const mins = timeLeft % 60;
        player.sendMessage(`§e[Kits] Kit sedang cooldown! Tunggu §b${hours} jam ${mins} menit §elagi.`);
        player.playSound("note.bass", { volume: 1.0, pitch: 1.0 });
        return;
    }

    system.run(() => {
        const inv = player.getComponent("inventory").container;
        if (kit.items && kit.items.length > 0) {
            for (let itemStr of kit.items) {
                try {
                    itemStr = itemStr.trim();
                    if (itemStr === "") continue;

                    let parts = itemStr.split(":");
                    let amount = 1;
                    let itemId = itemStr;

                    if (parts.length > 1 && !isNaN(parseInt(parts[parts.length - 1]))) {
                        amount = parseInt(parts.pop());
                        itemId = parts.join(":"); 
                    }

                    itemId = itemId.trim();
                    if (!itemId.includes(":")) itemId = "minecraft:" + itemId;

                    const itemObj = new ItemStack(itemId, amount);
                    const leftover = inv.addItem(itemObj);
                    
                    if (leftover) player.dimension.spawnItem(leftover, player.location);
                } catch(e) {}
            }
        }

        if (kit.structure && kit.structure.trim() !== "") {
            try {
                player.dimension.runCommand(`execute at "${player.name}" run structure load "${kit.structure.trim()}" ~ ~ ~`);
            } catch(e) {}
        }

        if (kit.commands && kit.commands.length > 0) {
            for (const cmd of kit.commands) {
                if (cmd.trim() !== "") {
                    let finalCmd = cmd.replace(/@s/g, `"${player.name}"`);
                    if (!finalCmd.startsWith("execute")) finalCmd = `execute at "${player.name}" run ${finalCmd}`;
                    try { player.dimension.runCommand(finalCmd); } catch(e) {}
                }
            }
        }
    });

    setKitCooldown(player, kitID, kit.cooldownHours);
    player.sendMessage(`§a[Kits] Berhasil mengklaim §l${kit.name}§r§a! Item telah ditambahkan.`);
    player.playSound("random.levelup", { volume: 1.0, pitch: 1.0 });
}