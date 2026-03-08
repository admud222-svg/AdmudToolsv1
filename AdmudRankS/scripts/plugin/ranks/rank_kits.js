import { world, system, ItemStack, EnchantmentTypes } from "@minecraft/server";
import { getPlayerRank } from "./rank.js";

const KITS_DB = "admud_kits_v4";

const DEFAULT_KITS = {
    "member": { name: "Member Kit", reqRank: "member", cooldownHours: 24, items: [], structure: "", commands: [] },
    "vip": { name: "VIP Kit", reqRank: "vip", cooldownHours: 24, items: [], structure: "", commands: ["give @s xp_bottle 64"] }
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

    const equippedRank = getPlayerRank(player).id;
    const reqRank = kit.reqRank || "member";

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
        
        // 1. Eksekusi Pembagian Items (Mendukung Teks biasa & Item JSON Ber-Enchant)
        if (kit.items && kit.items.length > 0) {
            for (let itemData of kit.items) {
                try {
                    let itemObj = null;

                    if (typeof itemData === "string") {
                        // JIKA ITEM TEKS KLASIK (contoh: "apple:10")
                        let parts = itemData.split(":");
                        let amount = 1;
                        let itemId = itemData;

                        if (parts.length > 1 && !isNaN(parseInt(parts[parts.length - 1]))) {
                            amount = parseInt(parts.pop());
                            itemId = parts.join(":"); 
                        }

                        itemId = itemId.trim();
                        if (!itemId.includes(":")) itemId = "minecraft:" + itemId;
                        itemObj = new ItemStack(itemId, amount);
                    } 
                    else if (typeof itemData === "object") {
                        // JIKA ITEM JSON DARI SISTEM IMPORT INVENTORY ADMIN (Ada Enchant)
                        itemObj = new ItemStack(itemData.typeId, itemData.amount);
                        if (itemData.name) itemObj.nameTag = itemData.name;
                        if (itemData.lore) itemObj.setLore(itemData.lore);
                        
                        if (itemData.enchantments) {
                            const encComp = itemObj.getComponent("enchantable");
                            if (encComp) {
                                for (const e of itemData.enchantments) {
                                    try {
                                        const type = EnchantmentTypes.get(e.id);
                                        if (type) encComp.addEnchantment({ type: type, level: e.level });
                                    } catch(err) {}
                                }
                            }
                        }
                    }

                    // Berikan item ke player
                    if (itemObj) {
                        const leftover = inv.addItem(itemObj);
                        if (leftover) player.dimension.spawnItem(leftover, player.location);
                    }
                } catch(e) {}
            }
        }

        // 2. Eksekusi Drop Structure Mentah (Jika masih pakai block structure)
        if (kit.structure && kit.structure.trim() !== "") {
            try { player.runCommand(`structure load "${kit.structure.trim()}" ~ ~ ~`); } catch(e) {}
        }

        // 3. Eksekusi Perintah / Command Khusus Rank
        if (kit.commands && kit.commands.length > 0) {
            for (const cmd of kit.commands) {
                if (cmd.trim() !== "") {
                    let finalCmd = cmd.replace(/@s/g, `"${player.name}"`);
                    if (!finalCmd.startsWith("execute")) finalCmd = `execute as "${player.name}" at @s run ${finalCmd}`;
                    try { player.dimension.runCommand(finalCmd); } catch(e) {}
                }
            }
        }
    });

    setKitCooldown(player, kitID, kit.cooldownHours);
    player.sendMessage(`§a[Kits] Berhasil mengklaim §l${kit.name}§r§a! Item telah ditambahkan.`);
    player.playSound("random.levelup", { volume: 1.0, pitch: 1.0 });
}