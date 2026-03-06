import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";
import { getConfig } from "../../config.js";
import { resolvePlaceholders } from "../../placeholder.js";
import { getPlayerClan, getClans, saveClans } from "../clans/clan_db.js";

const RANK_DB = "admud_ranks_v3";

// DEFAULT LIMIT: -1 artinya Unlimited
const DEFAULT_RANKS = {
    "member": { prefix: "§7Member", priority: 0, price: 0, claimLimit: 1000, commands: {} },
    "vip": { prefix: "§e[VIP]", priority: 1, price: 10000, claimLimit: 5000, commands: {} },
    "admin": { prefix: "§c[ADMIN]", priority: 99, price: 0, claimLimit: -1, commands: {} }
};

function forceShow(player, form, callback, isRetry = false) {
    if (!isRetry) player.playSound("random.pop", { volume: 1.0, pitch: 1.0 });
    form.show(player).then(res => {
        if (res.canceled && res.cancelationReason === "UserBusy") {
            system.run(() => forceShow(player, form, callback, true)); 
        } else {
            if (res.canceled) player.playSound("random.click", { volume: 1.0, pitch: 1.0 });
            else player.playSound("random.pop", { volume: 1.0, pitch: 1.3 });
            callback(res);
        }
    }).catch(e => console.warn(e));
}

export function getRanks() {
    const data = world.getDynamicProperty(RANK_DB);
    return data ? JSON.parse(data) : DEFAULT_RANKS;
}

export function saveRanks(ranks) {
    world.setDynamicProperty(RANK_DB, JSON.stringify(ranks));
}

export function getPlayerRank(player) {
    const rankID = player.getDynamicProperty("rankID") || "member";
    const ranks = getRanks();
    return ranks[rankID] ? { ...ranks[rankID], id: rankID } : { ...ranks["member"], id: "member" };
}

export function setPlayerRank(player, rankID) {
    player.setDynamicProperty("rankID", rankID);
}

// FITUR BARU: Mengambil Limit Claim Block berdasarkan Rank
export function getRankClaimLimit(player) {
    const rank = getPlayerRank(player);
    return rank.claimLimit !== undefined ? rank.claimLimit : 1000;
}

// ==========================================
// INVENTORY RANK (OWNED & EQUIPPED)
// ==========================================
export function getPlayerOwnedRanks(player) {
    const data = player.getDynamicProperty("ownedRanks");
    if (data) return JSON.parse(data);
    
    const currentRank = player.getDynamicProperty("rankID") || "member";
    const arr = ["member"];
    if (currentRank !== "member") arr.push(currentRank);
    player.setDynamicProperty("ownedRanks", JSON.stringify(arr));
    return arr;
}

export function addOwnedRank(player, rankID) {
    const owned = getPlayerOwnedRanks(player);
    if (!owned.includes(rankID)) {
        owned.push(rankID);
        player.setDynamicProperty("ownedRanks", JSON.stringify(owned));
    }
}

export function isEquipFeatureEnabled() {
    const val = world.getDynamicProperty("rank_equip_enabled");
    return val === undefined ? true : val; 
}

export function toggleEquipFeature() {
    const val = isEquipFeatureEnabled();
    world.setDynamicProperty("rank_equip_enabled", !val);
    return !val;
}

// ==========================================
// HANDLE CHAT (TERMASUK CLAN REAL-TIME CHAT)
// ==========================================
export function handleChat(event) {
    const { sender, message } = event;
    
    if (message.startsWith(".c ")) {
        event.cancel = true; 
        const clanName = getPlayerClan(sender);
        if (clanName === "") {
            return sender.sendMessage("§c[Clan] Kamu belum bergabung dengan Clan manapun.");
        }

        const chatText = message.substring(3).trim(); 
        if (chatText === "") return;

        for (const p of world.getPlayers()) {
            if (getPlayerClan(p) === clanName) {
                p.sendMessage(`§b[Clan] §e${sender.name}§f: §a${chatText}`);
                p.playSound("random.pop"); 
            }
        }

        system.run(() => {
            const clans = getClans();
            if (clans[clanName]) {
                if (!clans[clanName].messages) clans[clanName].messages = [];
                clans[clanName].messages.push({
                    sender: sender.name,
                    text: chatText,
                    time: Date.now()
                });

                if (clans[clanName].messages.length > 50) {
                    clans[clanName].messages.shift();
                }
                saveClans(clans);
            }
        });
        return; 
    }

    if (message.startsWith("+")) {
        event.cancel = true;
        const args = message.substring(1).split(" ");
        const cmd = args[0].toLowerCase();
        const rank = getPlayerRank(sender);
        const playerName = sender.name;

        if (cmd === "skill") {
            const cmdKeys = Object.keys(rank.commands || {});
            if (cmdKeys.length === 0) {
                sender.sendMessage(`§c[Server] Rank ${rank.prefix} §cbelum memiliki skill/command khusus.`);
            } else {
                sender.sendMessage(`§e[Server] Skill untuk ${rank.prefix}§e:\n§a+` + cmdKeys.join("\n§a+"));
            }
            return;
        }

        if (rank.commands && rank.commands[cmd]) {
            const feat = rank.commands[cmd];
            let cmdToRun = feat.command;
            if (!cmdToRun) {
                if (feat.ability === "mayfly") cmdToRun = "ability @s mayfly true";
                else if (feat.ability === "heal") cmdToRun = "effect @s instant_health 1 255 true";
            }

            system.run(() => {
                try {
                    const players = world.getPlayers({ name: playerName });
                    if (players.length > 0) {
                        const p = players[0];
                        if (feat.msg && feat.msg.trim() !== "") p.sendMessage(feat.msg);
                        if (cmdToRun) p.runCommandAsync(cmdToRun); 
                    }
                } catch (e) {
                    world.sendMessage(`§cError eksekusi command: ${e}`);
                }
            });
        } else {
            sender.sendMessage("§cRank kamu tidak punya akses command ini!");
        }
        return;
    }

    event.cancel = true;
    const config = getConfig();
    let format = resolvePlaceholders(config.chatFormat, sender, message);
    world.sendMessage(format);
}

// ==========================================
// SISTEM UI MANAGE RANKS (ADMIN)
// ==========================================

export function manageRankCmds(player, rankID) {
    const ranks = getRanks();
    const rankData = ranks[rankID];
    if (!rankData.commands) rankData.commands = {};
    const cmdKeys = Object.keys(rankData.commands);

    const form = new ActionFormData()
        .title(`MANAGE COMMAND: ${rankID}`)
        .body(`Total Command: ${cmdKeys.length}\nKlik command untuk edit atau hapus.`)
        .button("§lTambah Command Baru", "textures/ui/color_plus"); 
        // TOMBOL MENU GANDA TELAH DIHAPUS DARI SINI

    cmdKeys.forEach(cmdName => {
        form.button(`§l+${cmdName}\n§r§8Run: ${rankData.commands[cmdName].command || rankData.commands[cmdName].ability}`, "textures/items/command_block");
    });

    forceShow(player, form, res => {
        if (res.canceled) return;
        if (res.selection === 0) addRankCmdMenu(player, rankID);
        else editDeleteRankCmdMenu(player, rankID, cmdKeys[res.selection - 1]); // Index mundur 1 karena tombol dihapus
    });
}

function addRankCmdMenu(player, rankID) {
    const form = new ModalFormData()
        .title(`Tambah Command ke ${rankID}`)
        .textField("Prefix (tanpa +)", "fly")
        .textField("Command", "ability @s mayfly true")
        .textField("Pesan Sukses", "§aFitur aktif!");
        
    forceShow(player, form, res => {
        if (res.canceled) return manageRankCmds(player, rankID);
        
        let [cmdName, command, msg] = res.formValues;
        if (!cmdName || !command) return player.sendMessage("§cPrefix & Command wajib diisi!");
        
        cmdName = cmdName.toLowerCase().replace("+", "");
        const ranks = getRanks();
        if (!ranks[rankID].commands) ranks[rankID].commands = {};
        
        ranks[rankID].commands[cmdName] = { command: command, msg: msg };
        saveRanks(ranks);
        player.sendMessage(`§aSukses menambah +${cmdName}`);
        manageRankCmds(player, rankID);
    });
}

function editDeleteRankCmdMenu(player, rankID, cmdName) {
    const ranks = getRanks();
    const cmdData = ranks[rankID].commands[cmdName];
    
    const form = new ActionFormData()
        .title(`Kelola: +${cmdName}`)
        .body(`Pilih aksi untuk command +${cmdName}`)
        .button("§lEdit Command", "textures/ui/pencil_edit_icon")
        .button("§lHapus Command", "textures/ui/trash_default")
        .button("§lKembali", "textures/ui/cancel");
        
    forceShow(player, form, res => {
        if (res.canceled || res.selection === 2) return manageRankCmds(player, rankID);
        
        if (res.selection === 0) {
            openEditCmdModal(player, rankID, cmdName, cmdData);
        } else if (res.selection === 1) {
            delete ranks[rankID].commands[cmdName];
            saveRanks(ranks);
            player.sendMessage(`§cCommand +${cmdName} dihapus!`);
            manageRankCmds(player, rankID);
        }
    });
}

function openEditCmdModal(player, rankID, oldCmdName, cmdData) {
    const form = new ModalFormData()
        .title(`Edit +${oldCmdName}`)
        .textField("Prefix (tanpa +)", "fly", { defaultValue: String(oldCmdName) })
        .textField("Command", "ability @s mayfly true", { defaultValue: String(cmdData.command || cmdData.ability || "") })
        .textField("Pesan Sukses", "§aFitur aktif!", { defaultValue: String(cmdData.msg || "") });
        
    forceShow(player, form, res => {
        if (res.canceled) return manageRankCmds(player, rankID);
        
        let [newCmdName, newCommand, newMsg] = res.formValues;
        if (!newCmdName || !newCommand) return player.sendMessage("§cPrefix & Command wajib diisi!");
        
        newCmdName = newCmdName.toLowerCase().replace("+", "");
        const ranks = getRanks();
        
        if (newCmdName !== oldCmdName) {
            delete ranks[rankID].commands[oldCmdName];
        }
        
        ranks[rankID].commands[newCmdName] = { command: newCommand, msg: newMsg };
        saveRanks(ranks);
        player.sendMessage(`§aSukses mengedit menjadi +${newCmdName}`);
        manageRankCmds(player, rankID);
    });
}