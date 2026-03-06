import { ModalFormData, ActionFormData, MessageFormData } from "@minecraft/server-ui";
import { getRanks, saveRanks, setPlayerRank, getPlayerRank, manageRankCmds } from "./plugin/ranks/rank.js";
import { getKits, saveKits, resetKitCooldown } from "./plugin/ranks/rank_kits.js"; 
import { getConfig, saveConfig, DEFAULT_CONFIG } from "./config.js";
import { world, system } from "@minecraft/server";
import { getClans, saveClans } from "./plugin/clans/clan_db.js";
import { fetchAllLandData, saveAllLandData } from "./plugin/land/claimland.js";
import { menuAdminPWarpConfig } from "./plugin/playerwarp/playerwarp.js";
import { menuAdminWarpSet, openServerWarpsUI } from "./plugin/warps/warp.js";

const ANIM_TYPES = ["none", "rgb", "wave", "shiny", "typing", "fadein"];
const PLACEHOLDER_INFO = "§eContekan Placeholder:\n§f@NAMA, @RANKS, @CLAN\n@MONEY, @COIN, @SHARDS\n@KILL, @DEATH, @HEALTH\n@TPS, @PING, @ONLINE, @MAXON\n@TANGGAL, @BULAN, @TAHUN\n@NL (Enter), @BLANK (Spasi)";

function forceShow(player, form, callback, isRetry = false) {
    if (!isRetry) player.playSound("random.pop", { volume: 0.8, pitch: 1.0 });
    
    form.show(player).then(res => {
        if (res.canceled && res.cancelationReason === "UserBusy") {
            system.run(() => forceShow(player, form, callback, true)); 
        } else {
            callback(res);
        }
    }).catch(e => console.warn(e));
}

export function openAdminMenu(player) {
    const form = new ActionFormData()
        .title("ADMIN PANEL")
        .body("MineKings System")
        .button("Manage Ranks", "textures/ui/icon_setting")
        .button("Manage Kits\n§8(Isi Kit & Cooldown)", "textures/items/bundle_filled") 
        .button("Global Set\n§8(Scoreboard, Chat, Nametag)", "textures/ui/world_glyph")
        .button("Player Ranks\n§8(Beri / Reset Rank)", "textures/ui/permissions_op_crown") 
        .button("Manage NPCs", "textures/ui/dressing_room_skins")
        .button("Member Set\n§8(Clan, Land, Toggles)", "textures/ui/icon_multiplayer")
        .button("Manage Warps\n§8(Set Server Warps)", "textures/ui/icon_map"); 

    forceShow(player, form, res => {
        if (res.canceled) return;
        if (res.selection === 0) menuManageRanks(player);
        if (res.selection === 1) menuManageKits(player); 
        if (res.selection === 2) menuGlobalSetMaster(player);
        if (res.selection === 3) menuPlayerRankManager(player); 
        if (res.selection === 4) menuManageNPCs(player);
        if (res.selection === 5) menuMemberSet(player);
        if (res.selection === 6) menuAdminWarpSet(player); 
    });
}

// ==========================================
// ADMIN: PLAYER RANKS MANAGER
// ==========================================
function menuPlayerRankManager(player) {
    const form = new ActionFormData()
        .title("PLAYER RANKS MANAGER")
        .body("Pilih aksi untuk mengontrol Rank pemain:")
        .button("§lSet & Beri Rank\n§r§8(Otomatis masuk ke Lemari)", "textures/ui/permissions_op_crown")
        .button("§l§cReset Rank Player\n§r§8(Hapus semua rank yg dibeli)", "textures/ui/refresh_light")
        .button("Kembali", "textures/ui/cancel");

    forceShow(player, form, res => {
        if (res.canceled || res.selection === 2) return openAdminMenu(player);
        if (res.selection === 0) menuSetPlayerRank(player);
        if (res.selection === 1) menuResetPlayerRank(player);
    });
}

function menuSetPlayerRank(player) {
    const players = [...world.getPlayers()];
    if (players.length === 0) return openAdminMenu(player);
    const pNames = players.map(p => p.name);
    const ranks = Object.keys(getRanks());

    const form = new ModalFormData()
        .title("Set & Beri Rank")
        .dropdown("Pilih Player Online:", pNames, { defaultValueIndex: 0 })
        .dropdown("Pilih Rank untuk Diberikan:", ranks, { defaultValueIndex: 0 });

    forceShow(player, form, res => {
        if (res.canceled) return menuPlayerRankManager(player);
        const target = players[res.formValues[0]];
        const rank = ranks[res.formValues[1]];
        
        setPlayerRank(target, rank);
        
        const currentOwned = target.getDynamicProperty("ownedRanks");
        let ownedArr = currentOwned ? JSON.parse(currentOwned) : ["member"];
        if (!ownedArr.includes(rank)) {
            ownedArr.push(rank);
            target.setDynamicProperty("ownedRanks", JSON.stringify(ownedArr));
        }

        player.sendMessage(`§a[Admin] Sukses memberikan & memakai rank §e${rank.toUpperCase()} §ake §b${target.name}§a!`);
        target.sendMessage(`§a[Server] Selamat! Admin telah memberikanmu rank §e${rank.toUpperCase()}§a secara permanen!`);
        menuPlayerRankManager(player);
    });
}

function menuResetPlayerRank(player) {
    const players = [...world.getPlayers()];
    if (players.length === 0) return openAdminMenu(player);
    const pNames = players.map(p => p.name);

    const form = new ModalFormData()
        .title("Reset Rank Player")
        .dropdown("Pilih Player untuk Di-reset\n§c(Kembali murni jadi Member!):", pNames, { defaultValueIndex: 0 });

    forceShow(player, form, res => {
        if (res.canceled) return menuPlayerRankManager(player);
        const target = players[res.formValues[0]];
        
        target.setDynamicProperty("ownedRanks", JSON.stringify(["member"]));
        target.setDynamicProperty("rankID", "member");
        
        player.sendMessage(`§a[Admin] Berhasil mereset rank milik §b${target.name}§a.`);
        menuPlayerRankManager(player);
    });
}

// ==========================================
// ADMIN: KIT MANAGER (IMPORT INVENTORY)
// ==========================================
function menuManageKits(player) {
    const kits = getKits();
    const list = Object.keys(kits);
    const form = new ActionFormData()
        .title("Manage Kits")
        .body("Atur isi item Kit dan cooldown di sini.");

    list.forEach(k => form.button(`§l${kits[k].name}\n§r§8CD: ${kits[k].cooldownHours} Jam`, "textures/items/bundle_filled"));
    form.button("§a[+] Tambah Kit Baru", "textures/ui/color_plus");

    forceShow(player, form, res => {
        if (res.canceled) return openAdminMenu(player);
        if (res.selection === list.length) {
            menuEditKitInfo(player, "", true);
        } else {
            menuEditKitOptions(player, list[res.selection]);
        }
    });
}

function menuEditKitOptions(player, kitID) {
    const form = new ActionFormData()
        .title(`Edit Kit: ${kitID}`)
        .button("§lEdit Info & Command", "textures/ui/pencil_edit_icon")
        .button("§dManage Items\n§8(Tambah dari Inventory)", "textures/ui/inventory_icon")
        .button("§bReset CD Player\n§8(Bantu Player Gagal Klaim)", "textures/ui/refresh_light")
        .button("§cHapus Kit", "textures/ui/trash_default")
        .button("Kembali");
        
    forceShow(player, form, res => {
        if(res.canceled || res.selection === 4) return menuManageKits(player);
        if(res.selection === 0) menuEditKitInfo(player, kitID, false);
        if(res.selection === 1) menuManageKitItems(player, kitID); 
        if(res.selection === 2) menuResetKitCooldown(player, kitID); 
        if(res.selection === 3) {
            const kits = getKits();
            delete kits[kitID];
            saveKits(kits);
            player.sendMessage(`§aKit ${kitID} dihapus!`);
            menuManageKits(player);
        }
    });
}

function menuManageKitItems(player, kitID) {
    const kits = getKits();
    const kit = kits[kitID];
    const items = kit.items || [];

    const form = new ActionFormData()
        .title(`Isi Kit: ${kit.name}`)
        .body(`Total Items di dalam Kit: ${items.length}\nKlik item untuk MENGHAPUSNYA dari Kit.`);

    form.button("§2[+] Tambah Item dari Tas", "textures/ui/color_plus");

    items.forEach((itm) => {
        let name = typeof itm === "string" ? itm : (itm.name || itm.typeId.replace("minecraft:", ""));
        let amt = typeof itm === "string" ? "" : ` x${itm.amount}`;
        form.button(`§cHapus: §f${name}${amt}`);
    });
    form.button("Kembali", "textures/ui/cancel");

    forceShow(player, form, res => {
        if (res.canceled) return;
        if (res.selection === 0) return menuSelectInventoryItem(player, kitID);
        if (res.selection === items.length + 1) return menuEditKitOptions(player, kitID);

        const targetIdx = res.selection - 1;
        kit.items.splice(targetIdx, 1);
        saveKits(kits);
        player.sendMessage("§aItem berhasil dihapus dari Kit!");
        menuManageKitItems(player, kitID);
    });
}

function serializeInvItem(item) {
    const data = { typeId: item.typeId, amount: item.amount };
    if (item.nameTag) data.name = item.nameTag;
    const lore = item.getLore();
    if (lore && lore.length) data.lore = lore;
    const encComp = item.getComponent("enchantable");
    if (encComp) {
        const encs = encComp.getEnchantments();
        if (encs && encs.length) data.enchantments = encs.map(e => ({ id: e.type.id, level: e.level }));
    }
    return data;
}

function menuSelectInventoryItem(player, kitID) {
    const inv = player.getComponent("inventory").container;
    const form = new ActionFormData()
        .title("Pilih Item dari Tas")
        .body("§cPENTING: §fItem Shulker Box tidak bisa dimasukkan lewat sini karena batasan sistem Bedrock.\nPilih item biasa (Pedang, Armor, dll):");

    let slotMap = [];
    for (let i = 0; i < inv.size; i++) {
        const item = inv.getItem(i);
        if (item && item.typeId !== "minecraft:air") {
            if (item.typeId.includes("shulker")) continue; 
            let name = item.nameTag || item.typeId.replace("minecraft:", "");
            form.button(`Slot ${i + 1}: ${name} x${item.amount}`);
            slotMap.push(i);
        }
    }

    if (slotMap.length === 0) form.body("Tasmu kosong, atau semua isinya adalah Shulker Box yang dilarang.");
    form.button("§cBatal", "textures/ui/cancel");

    forceShow(player, form, res => {
        if (res.canceled || res.selection === slotMap.length) return menuManageKitItems(player, kitID);
        
        const slot = slotMap[res.selection];
        const item = inv.getItem(slot);
        if (!item) return menuManageKitItems(player, kitID);

        const data = serializeInvItem(item);
        const kits = getKits();
        if (!kits[kitID].items) kits[kitID].items = [];
        kits[kitID].items.push(data); 
        saveKits(kits);

        player.sendMessage(`§aBerhasil memasukkan §e${data.name || data.typeId} §ake dalam Kit!`);
        menuManageKitItems(player, kitID);
    });
}

function menuResetKitCooldown(player, kitID) {
    const players = [...world.getPlayers()];
    if (players.length === 0) return menuEditKitOptions(player, kitID);
    
    const pNames = players.map(p => p.name);
    const form = new ModalFormData()
        .title(`Reset CD: ${kitID}`)
        .dropdown("Pilih player:", pNames, { defaultValueIndex: 0 });

    forceShow(player, form, res => {
        if (res.canceled) return menuEditKitOptions(player, kitID);
        const target = players[res.formValues[0]];
        if (target) {
            resetKitCooldown(target, kitID);
            player.sendMessage(`§a[Admin] CD kit §e${kitID}§a milik §b${target.name}§a di-reset!`);
        }
        menuEditKitOptions(player, kitID);
    });
}

function menuEditKitInfo(player, kitID, isNew) {
    const kits = getKits();
    const ranks = getRanks();
    const rankList = Object.keys(ranks); 

    const data = isNew ? { name: "New Kit", reqRank: rankList[0], cooldownHours: 24, structure: "", commands: [] } : kits[kitID];
    const cmdStr = (data.commands || []).join(" | ");
    const currentRankIdx = Math.max(0, rankList.indexOf(data.reqRank || "member"));

    const form = new ModalFormData()
        .title(isNew ? "Buat Info Kit Baru" : `Edit Info Kit: ${kitID}`)
        .textField("Kit ID (Huruf kecil, tanpa spasi)", "contoh: vip_kit", { defaultValue: isNew ? "" : String(kitID) })
        .textField("Nama Kit (Tampil di UI)", "contoh: VIP Kit", { defaultValue: String(data.name) })
        .dropdown("Pilih Rank Khusus Kit Ini", rankList, { defaultValueIndex: currentRankIdx }) 
        .textField("Waktu Cooldown (Dalam Jam)", "24", { defaultValue: String(data.cooldownHours) })
        .textField("Nama Structure (Opsional)", "nama_struktur", { defaultValue: String(data.structure || "") })
        .textField("Command Tambahan\n§eGunakan garis | untuk misah command.", "say halo | xp 100L @s", { defaultValue: String(cmdStr) });

    forceShow(player, form, res => {
        if (res.canceled) return menuManageKits(player);
        let [newID, newName, rankIndex, cd, structureInput, commandsInput] = res.formValues;
        
        newID = newID.toLowerCase().replace(/ /g, "");
        if(!newID || !newName) return player.sendMessage("§cID dan Nama Kit tidak boleh kosong!");

        const selectedReqRank = rankList[rankIndex];
        const cmdArray = commandsInput.split("|").map(s => s.trim()).filter(s => s !== "");
        const oldItems = isNew ? [] : (kits[kitID].items || []);

        if(!isNew && newID !== kitID) delete kits[kitID];

        kits[newID] = {
            name: newName,
            reqRank: selectedReqRank, 
            cooldownHours: parseFloat(cd) || 0,
            items: oldItems,
            structure: structureInput.trim(), 
            commands: cmdArray
        };

        saveKits(kits);
        player.sendMessage(`§aInfo Kit ${newName} berhasil disimpan!`);
        menuManageKits(player);
    });
}

// ==========================================
// ADMIN: RANK MANAGER (SEKARANG ADA SETTING LAND!)
// ==========================================
function menuManageRanks(player) {
    const ranks = getRanks();
    const list = Object.keys(ranks);
    const form = new ActionFormData().title("Rank List§t§t§1");
    list.forEach(r => form.button(r));
    form.button("§a[+] Add New Rank");

    forceShow(player, form, res => {
        if (res.canceled) return openAdminMenu(player);
        if (res.selection === list.length) {
            menuEditRank(player, "", true); 
        } else {
            const selectedRank = list[res.selection];
            const subForm = new ActionFormData()
                .title(`Manage ${selectedRank}§t§t§1`)
                .button("Edit Info & Limit Rank\n§8(Prefix, Harga, Claim Land)")
                .button("Manage +cmd\n§8(Custom Commands)")
                .button("§cHapus Rank\n§8(Delete Permanen)"); 

            forceShow(player, subForm, actionRes => {
                if (actionRes.canceled) return menuManageRanks(player);
                if (actionRes.selection === 0) menuEditRank(player, selectedRank, false);
                if (actionRes.selection === 1) manageRankCmds(player, selectedRank);
                if (actionRes.selection === 2) menuDeleteRank(player, selectedRank); 
            });
        }
    });
}

function menuDeleteRank(player, rankID) {
    if (rankID.toLowerCase() === "member") return menuManageRanks(player);

    const form = new MessageFormData()
        .title("Hapus Rank?")
        .body(`Apakah kamu yakin ingin MENGHAPUS PERMANEN rank §e${rankID}§r?`)
        .button1("§l§cHAPUS RANK")
        .button2("BATAL");

    forceShow(player, form, res => {
        if (res.selection === 1 || res.canceled) return menuManageRanks(player);
        const ranks = getRanks();
        if (ranks[rankID]) {
            delete ranks[rankID];
            saveRanks(ranks);
        }
        player.sendMessage(`§a[Admin] Rank ${rankID} dihapus!`);
        menuManageRanks(player);
    });
}

function menuEditRank(player, rankID, isNew) {
    const ranks = getRanks();
    const data = isNew ? { prefix: "", priority: 0, price: 0, landMode: "count", landLimit: 3, commands: {} } : ranks[rankID];
    
    const form = new ModalFormData()
        .title(isNew ? "Create Rank" : `Edit ${rankID}`)
        .textField("Rank ID (Huruf kecil semua)", "ex: mvp", { defaultValue: isNew ? "" : rankID })
        .textField("Prefix", "§b[MVP]", { defaultValue: String(data.prefix || "") })
        .textField("Priority (0 terendah)", "ex: 2", { defaultValue: String(data.priority || 0) })
        .textField("Price ($)", "ex: 10000", { defaultValue: String(data.price || 0) })
        // PENAMBAHAN FITUR LAND LIMIT DI DALAM RANK
        .toggle("Mode Claim Land Rank Ini\n§8(Kiri = Batas Area | Kanan = Batas Block)", { defaultValue: data.landMode === "block" })
        .textField("Limit Claim Land\n§8(Jumlah Area/Block sesuai mode di atas)", "ex: 3", { defaultValue: String(data.landLimit || 3) });

    forceShow(player, form, res => {
        if (res.canceled) return menuManageRanks(player);
        let newID = isNew ? res.formValues[0].toLowerCase() : rankID;
        ranks[newID] = { 
            prefix: res.formValues[1], 
            priority: parseInt(res.formValues[2]) || 0, 
            price: parseInt(res.formValues[3]) || 0, 
            landMode: res.formValues[4] ? "block" : "count",
            landLimit: parseInt(res.formValues[5]) || 3,
            commands: data.commands || {}
        };
        saveRanks(ranks);
        player.sendMessage(`§aRank ${newID} berhasil disimpan! Rank ini menggunakan limit claim: ${ranks[newID].landLimit} ${ranks[newID].landMode}`);
    });
}

// ==========================================
// ADMIN: GLOBAL SETTING (Scoreboard dll)
// ==========================================
function menuGlobalSetMaster(player) {
    const form = new ActionFormData()
        .title("§l§eGLOBAL SETTINGS§t§t§1")
        .body("Pilih fitur yang ingin diatur:")
        .button("§lScoreboard Editor", "textures/items/sign")
        .button("§lChat Format", "textures/ui/message")
        .button("§lNametag Format", "textures/ui/nametag");

    forceShow(player, form, res => {
        if (res.canceled) return openAdminMenu(player);
        if (res.selection === 0) menuScoreboardList(player);
        if (res.selection === 1) menuEditSingleFormat(player, "chatFormat", "Edit Chat Format");
        if (res.selection === 2) menuEditSingleFormat(player, "nametagFormat", "Edit Nametag Format");
    });
}

function menuScoreboardList(player) {
    const config = getConfig();
    const form = new ActionFormData()
        .title("§l§aSCOREBOARD EDITOR§t§t§1")
        .body("Atur Scoreboard MineKings.\nSemua teks sekarang berupa Line yang bisa digeser.")
        .button("§l§c[!] Reset ke Default")
        .button("§l§2[+] Tambah Line Baru");

    config.sbLines.forEach((line, index) => {
        form.button(`§l§bLine ${index + 1} §r\n§8Anim: ${line.anim} | Text: ${line.text}`);
    });

    forceShow(player, form, res => {
        if (res.canceled) return menuGlobalSetMaster(player);
        
        if (res.selection === 0) {
            config.sbLines = JSON.parse(JSON.stringify(DEFAULT_CONFIG.sbLines));
            saveConfig(config);
            player.sendMessage("§aScoreboard berhasil di-reset ke pengaturan awal!");
            return menuScoreboardList(player);
        }

        if (res.selection === 1) return menuAddOrEditLine(player, -1); 
        
        const lineIndex = res.selection - 2; 
        const subForm = new ActionFormData()
            .title(`Aksi Line ${lineIndex + 1}§t§t§1`)
            .button("§l§eEdit Line & Posisi")
            .button("§l§aGeser ke Atas [/\\\\]")
            .button("§l§aGeser ke Bawah [\\\\/]")
            .button("§l§cHapus Line [-]");

        forceShow(player, subForm, act => {
            if (act.canceled) return menuScoreboardList(player);
            if (act.selection === 0) {
                menuAddOrEditLine(player, lineIndex);
            } else if (act.selection === 1) {
                if (lineIndex > 0) {
                    let temp = config.sbLines[lineIndex - 1];
                    config.sbLines[lineIndex - 1] = config.sbLines[lineIndex];
                    config.sbLines[lineIndex] = temp;
                    saveConfig(config);
                }
                menuScoreboardList(player);
            } else if (act.selection === 2) {
                if (lineIndex < config.sbLines.length - 1) {
                    let temp = config.sbLines[lineIndex + 1];
                    config.sbLines[lineIndex + 1] = config.sbLines[lineIndex];
                    config.sbLines[lineIndex] = temp;
                    saveConfig(config);
                }
                menuScoreboardList(player);
            } else if (act.selection === 3) {
                config.sbLines.splice(lineIndex, 1);
                saveConfig(config);
                player.sendMessage("§cLine berhasil dihapus!");
                menuScoreboardList(player);
            }
        });
    });
}

function menuAddOrEditLine(player, index) {
    const config = getConfig();
    const isNew = index === -1;
    const lineData = isNew ? { text: "", anim: "none" } : config.sbLines[index];
    const animIndex = Math.max(0, ANIM_TYPES.indexOf(lineData.anim));

    const lineOptions = [];
    const maxLines = isNew ? config.sbLines.length + 1 : config.sbLines.length;
    for (let i = 0; i < maxLines; i++) {
        if (isNew && i === maxLines - 1) lineOptions.push(`Baris ke-${i + 1} (Paling Bawah)`);
        else lineOptions.push(`Baris ke-${i + 1}`);
    }
    
    const defaultLinePos = isNew ? config.sbLines.length : index;

    const form = new ModalFormData()
        .title(isNew ? "Tambah Line" : `Edit Line ${index + 1}`)
        .dropdown("Pilih Posisi Baris (Line):", lineOptions, { defaultValueIndex: defaultLinePos })
        .dropdown(`${PLACEHOLDER_INFO}\n\n§lPilih Animasi Baris Ini:`, ANIM_TYPES, { defaultValueIndex: animIndex })
        .textField("Teks Scoreboard:", "@MONEY", { defaultValue: String(lineData.text) });

    forceShow(player, form, res => {
        if (res.canceled) return menuScoreboardList(player);
        const targetIndex = res.formValues[0];
        const newData = { anim: ANIM_TYPES[res.formValues[1]], text: res.formValues[2] };
        
        if (isNew) config.sbLines.splice(targetIndex, 0, newData);
        else {
            config.sbLines.splice(index, 1);
            config.sbLines.splice(targetIndex, 0, newData);
        }
        
        saveConfig(config);
        player.sendMessage(`§aScoreboard diupdate di Baris ke-${targetIndex + 1}!`);
        menuScoreboardList(player);
    });
}

function menuEditSingleFormat(player, configKey, title) {
    const config = getConfig();
    const data = config[configKey];
    const animIndex = Math.max(0, ANIM_TYPES.indexOf(data.anim));

    const form = new ModalFormData()
        .title(title)
        .dropdown(`${PLACEHOLDER_INFO}\n\n§lPilih Animasi:`, ANIM_TYPES, { defaultValueIndex: animIndex })
        .textField("Format Text:", "...", { defaultValue: String(data.text) });

    forceShow(player, form, res => {
        if (res.canceled) return menuGlobalSetMaster(player);
        config[configKey] = { anim: ANIM_TYPES[res.formValues[0]], text: res.formValues[1] };
        saveConfig(config);
        player.sendMessage(`§a${title} berhasil diupdate!`);
        menuGlobalSetMaster(player);
    });
}

function menuManageNPCs(player) {
    const pName = player.name; 
    const form = new ActionFormData()
        .title("§l§dNPC MANAGER§t§t§1")
        .body("Pilih Fitur NPC yang ingin kamu pasang:")
        .button("Spawn Rank Shop\n§8(Klik untuk memilih Skin)", "textures/ui/trade_icon")
        .button("Spawn Rank Kits\n§8(Klik untuk memilih Skin)", "textures/ui/gift_square")
        .button("§cHapus NPC Terdekat\n§8Radius 5 block", "textures/ui/trash_default");

    forceShow(player, form, res => {
        if (res.canceled) return openAdminMenu(player);
        if (res.selection === 0) menuSelectNPCSkin(player, "admud:rankshop", "§l§eRANK SHOP");
        if (res.selection === 1) menuSelectNPCSkin(player, "admud:rankkit", "§l§bRANK KITS");
        if (res.selection === 2) {
            system.run(() => {
                const p = world.getPlayers({ name: pName })[0];
                if (!p) return;
                try {
                    try { p.runCommand("kill @e[type=admud:rankshop,r=5]"); } catch(e){}
                    try { p.runCommand("kill @e[type=admud:rankkit,r=5]"); } catch(e){}
                    try { p.runCommand("kill @e[tag=npc_skin,r=5]"); } catch(e){}
                    p.sendMessage("§aFitur NPC dan Skin di sekitarmu berhasil dihapus.");
                } catch(e) {}
            });
        }
    });
}

function menuSelectNPCSkin(player, logicEntityID, npcName) {
    const pName = player.name; 
    const skinList = [
        { id: "enderoso:shrek", name: "Shrek (Custom)", icon: "textures/ui/icon_steve" },
        { id: "enchanted:npc_merchant_general", name: "Merchant General", icon: "textures/ui/trade_icon" },
        { id: "enchanted:npc_merchant_blacksmith", name: "Blacksmith", icon: "textures/ui/anvil_icon" },
        { id: "enchanted:npc_merchant_farming", name: "Farmer Merchant", icon: "textures/blocks/wheat_stage_7" },
        { id: "enchanted:npc_merchant_mining", name: "Miner Merchant", icon: "textures/blocks/iron_ore" },
        { id: "enchanted:npc_merchant_food", name: "Food Merchant", icon: "textures/items/apple" },
        { id: "enchanted:npc_farmer_male", name: "Farmer (Male)", icon: "textures/items/wheat" },
        { id: "enchanted:npc_farmer_female", name: "Farmer (Female)", icon: "textures/items/carrot" },
        { id: "enchanted:npc_miner_male", name: "Miner (Male)", icon: "textures/items/iron_pickaxe" },
        { id: "enchanted:npc_warrior_male", name: "Warrior (Male)", icon: "textures/items/iron_sword" },
        { id: "enchanted:npc_archer", name: "Archer", icon: "textures/items/bow_standby" },
        { id: "enchanted:npc_mage_general", name: "Mage General", icon: "textures/items/blaze_rod" },
        { id: "enchanted:npc_tamer_regular", name: "Tamer Regular", icon: "textures/items/lead" },
        { id: "enchanted:npc_fancy_man", name: "Fancy Man", icon: "textures/ui/icon_alex" },
        { id: "enchanted:npc_fancy_lady", name: "Fancy Lady", icon: "textures/ui/dressing_room_skins" },
        { id: "enchanted:npc_wacky_salesman", name: "Wacky Salesman", icon: "textures/ui/icon_deals" },
        { id: "enchanted:npc_baby_phoenix", name: "Baby Phoenix", icon: "textures/items/blaze_powder" }
    ]; 

    const form = new ActionFormData()
        .title("§l§bPILIH SKIN NPC§t§t§1")
        .body(`Memasang: ${npcName}\nPilih model 3D:`);

    skinList.forEach(skin => form.button(`${skin.name}\n§8${skin.id}`, skin.icon));
    form.button("§cTanpa Skin (Invisible Saja)");

    forceShow(player, form, res => {
        if (res.canceled) return menuManageNPCs(player);
        
        system.run(() => {
            const p = world.getPlayers({ name: pName })[0];
            if (!p) return;

            try {
                const loc = p.location;
                let logicEntity;
                try {
                    logicEntity = p.dimension.spawnEntity(logicEntityID, loc);
                    logicEntity.nameTag = npcName;
                } catch(e) {
                    try { p.runCommand(`summon ${logicEntityID} ~ ~ ~ "${npcName}"`); } catch(e){}
                }

                if (res.selection < skinList.length) {
                    const selectedSkin = skinList[res.selection].id;
                    try {
                        const skinEntity = p.dimension.spawnEntity(selectedSkin, loc);
                        skinEntity.addTag("npc_skin");
                    } catch(e) {
                        try {
                            p.runCommand(`summon ${selectedSkin} ~ ~ ~`);
                            p.runCommand(`tag @e[type=${selectedSkin},r=3,c=1] add npc_skin`);
                        } catch(e){}
                    }
                    p.sendMessage(`§aSukses memasang dengan skin ${skinList[res.selection].name}!`);
                } else {
                    p.sendMessage(`§aSukses memasang tanpa skin.`);
                }
                
                try { p.runCommand("playsound random.levelup @s"); } catch(e){}

            } catch (e) {
                p.sendMessage(`§c[MineKings] Gagal memanggil NPC: ${e}`);
            }
        });
    });
}

// ==========================================
// ADMIN: MEMBER, CLAN, RTP, LAND, PWARPS
// ==========================================
function menuMemberSet(player) {
    const form = new ActionFormData()
        .title("MEMBER MENU SETTING")
        .body("Pilih kategori pengaturan:")
        .button("§lClan Setting\n§r§8Atur Harga & Hapus Clan", "textures/ui/icon_multiplayer")
        .button("§lRTP Setting\n§r§8Atur Limit & Radius RTP", "textures/ui/icon_map")
        .button("§lLand Setting\n§r§8Manage Land & Harga Server", "textures/ui/village_hero_effect")
        .button("§lPlayer Warp Limit\n§r§8Atur Limit Pembuatan Pwarp", "textures/items/ender_pearl")
        .button("§lToggles Menu\n§r§8Aktif/Matikan Fitur Server", "textures/ui/settings_glyph_color_2x")
        .button("§cKembali", "textures/ui/cancel");

    forceShow(player, form, res => {
        if (res.canceled || res.selection === 5) return openAdminMenu(player);
        if (res.selection === 0) menuAdminClanCategory(player);
        if (res.selection === 1) menuAdminRtpCategory(player);
        if (res.selection === 2) menuAdminLandCategory(player);
        if (res.selection === 3) menuAdminPWarpConfig(player); 
        if (res.selection === 4) menuToggleMenu(player);
    });
}

function menuAdminClanCategory(player) {
    const form = new ActionFormData()
        .title("§lCLAN SETTING")
        .body("Pengaturan sistem Clan:")
        .button("Member Config\n§8Atur Harga & Maks Member", "textures/ui/icon_setting")
        .button("Manage Clans\n§8Hapus & Paksa Bubar Clan", "textures/ui/warning_alex")
        .button("§cKembali", "textures/ui/cancel");

    forceShow(player, form, res => {
        if (res.canceled || res.selection === 2) return menuMemberSet(player);
        if (res.selection === 0) menuMemberConfig(player);
        if (res.selection === 1) menuAdminManageClans(player);
    });
}

function menuAdminRtpCategory(player) {
    const config = getConfig();
    let rtpLimit = 5, rtpCooldown = 120, rtpRadius = 10000;

    if (config && config.rtpConfig) {
        rtpLimit = config.rtpConfig.limit || 5;
        rtpCooldown = config.rtpConfig.cooldownMinutes || 120;
        rtpRadius = config.rtpConfig.radius || 10000;
    }

    const form = new ModalFormData()
        .title("§lRTP SETTING")
        .textField(`Maksimal Limit RTP per Player\n(Saat ini: ${rtpLimit} kali):`, "Ketik angka...", { defaultValue: String(rtpLimit) })
        .textField(`Waktu Cooldown Limit (Dalam Menit)\n(Saat ini: ${rtpCooldown} menit):`, "Ketik angka...", { defaultValue: String(rtpCooldown) })
        .textField(`Radius Area RTP (Max Jarak Acak)\n(Saat ini: ${rtpRadius} block):`, "Ketik angka...", { defaultValue: String(rtpRadius) });

    forceShow(player, form, res => {
        if (res.canceled) return menuMemberSet(player); 
        let inputLimit = res.formValues[0] === "" ? rtpLimit : parseInt(res.formValues[0]);
        let inputCooldown = res.formValues[1] === "" ? rtpCooldown : parseInt(res.formValues[1]);
        let inputRadius = res.formValues[2] === "" ? rtpRadius : parseInt(res.formValues[2]);

        if (!config.rtpConfig) config.rtpConfig = {};
        config.rtpConfig.limit = inputLimit;
        config.rtpConfig.cooldownMinutes = inputCooldown;
        config.rtpConfig.radius = inputRadius;
        
        saveConfig(config);
        player.sendMessage("§a[Admin] Pengaturan RTP berhasil diperbarui!");
    });
}

function menuToggleMenu(player) {
    const config = getConfig();
    let clanStatus = true, tpaStatus = true, rtpStatus = true;
    let claimStatus = true, sWarpStatus = true, pWarpStatus = true;

    if (config && config.menuToggles) {
        clanStatus = config.menuToggles.clan !== false;
        tpaStatus = config.menuToggles.tpa !== false;
        rtpStatus = config.menuToggles.rtp !== false;
        claimStatus = config.menuToggles.claimland !== false;
        sWarpStatus = config.menuToggles.serverwarp !== false;
        pWarpStatus = config.menuToggles.playerwarp !== false;
    }

    const form = new ModalFormData()
        .title("Toggles Menu")
        .toggle("Fitur Clan System", { defaultValue: clanStatus })
        .toggle("Fitur TPA", { defaultValue: tpaStatus })
        .toggle("Fitur RTP", { defaultValue: rtpStatus })
        .toggle("Fitur Claim Land", { defaultValue: claimStatus })
        .toggle("Fitur Server Warps", { defaultValue: sWarpStatus })
        .toggle("Fitur Player Warps", { defaultValue: pWarpStatus });

    forceShow(player, form, res => {
        if (res.canceled) return menuMemberSet(player); 
        if (!config.menuToggles) config.menuToggles = {};
        config.menuToggles.clan = res.formValues[0];
        config.menuToggles.tpa = res.formValues[1];
        config.menuToggles.rtp = res.formValues[2];
        config.menuToggles.claimland = res.formValues[3];
        config.menuToggles.serverwarp = res.formValues[4];
        config.menuToggles.playerwarp = res.formValues[5];
        saveConfig(config);
        player.sendMessage("§a[Admin] Toggles Menu berhasil disimpan!");
    });
}

function menuMemberConfig(player) {
    const config = getConfig();
    let currentMaxMem = 15, currentCost = 50000, currentCool = 7;

    if (config && config.memberConfig) {
        currentMaxMem = config.memberConfig.maxClanMembers || 15;
        currentCost = config.memberConfig.clanRenameCost || 50000;
        currentCool = config.memberConfig.clanRenameCooldown || 7;
    }

    const form = new ModalFormData()
        .title("MEMBER CONFIG")
        .textField(`Maks Member Clan (Saat ini: ${currentMaxMem})\nKosongkan jika tidak ingin diubah:`, "Ketik angka...", { defaultValue: String(currentMaxMem) })
        .textField(`Harga Ganti Nama (Saat ini: $${currentCost})\nKosongkan jika tidak ingin diubah:`, "Ketik angka...", { defaultValue: String(currentCost) })
        .textField(`Cooldown Rename (Saat ini: ${currentCool} Hari)\nKosongkan jika tidak ingin diubah:`, "Ketik angka...", { defaultValue: String(currentCool) });

    forceShow(player, form, res => {
        if (res.canceled) return menuAdminClanCategory(player); 
        let inputMax = res.formValues[0] === "" ? currentMaxMem : parseInt(res.formValues[0]);
        let inputCost = res.formValues[1] === "" ? currentCost : parseInt(res.formValues[1]);
        let inputCool = res.formValues[2] === "" ? currentCool : parseInt(res.formValues[2]);

        if (!config.memberConfig) config.memberConfig = {};
        config.memberConfig.maxClanMembers = inputMax;
        config.memberConfig.clanRenameCost = inputCost;
        config.memberConfig.clanRenameCooldown = inputCool;
        saveConfig(config);
        player.sendMessage("§a[Admin] Config Member diperbarui!");
    });
}

function menuAdminManageClans(player) {
    const clans = getClans();
    const activeClans = Object.keys(clans).filter(k => !clans[k].renamedTo); 
    
    const form = new ActionFormData()
        .title("Manage Clans")
        .body(`Total Clan Aktif: ${activeClans.length}\nKlik clan untuk menghapusnya secara paksa:`);
        
    if (activeClans.length === 0) form.button("§lKembali");
    else activeClans.forEach(cName => form.button(`§l§c${cName}\n§r§8Leader: ${clans[cName].leader}`));

    forceShow(player, form, res => {
        if (res.canceled || activeClans.length === 0) return menuAdminClanCategory(player);
        menuAdminDeleteClan(player, activeClans[res.selection]);
    });
}

function menuAdminDeleteClan(player, clanName) {
    const form = new MessageFormData()
        .title("Hapus Clan?")
        .body(`Apakah kamu yakin ingin MENGHAPUS PAKSA clan §e${clanName}§r?`)
        .button1("§l§cHAPUS PAKSA")
        .button2("BATAL");

    forceShow(player, form, res => {
        if (res.selection === 1 || res.canceled) return menuAdminManageClans(player);
        const clans = getClans();
        if(clans[clanName]) {
            [clans[clanName].leader, ...(clans[clanName].members || [])].forEach(mName => {
                const p = world.getPlayers({ name: mName })[0];
                if (p) {
                    p.setDynamicProperty("clan", "");
                    p.sendMessage(`§c[Admin] Clan ${clanName} dihapus paksa.`);
                }
            });
            delete clans[clanName];
            saveClans(clans);
        }
        player.sendMessage(`§a[Admin] Clan ${clanName} dihapus dari database.`);
        menuAdminManageClans(player);
    });
}

// ==========================================
// ADMIN: LAND MANAGER 
// ==========================================
function menuAdminLandCategory(player) {
    const form = new ActionFormData()
        .title("§lLAND SETTING")
        .body("Pengaturan sistem Claim Land Server:\n(Limit & Mode Claim sekarang diatur di Menu Manage Rank!)")
        .button("Manage Member Lands\n§8Teleport & Hapus Land", "textures/ui/icon_map")
        .button("Land Global Config\n§8Atur Harga Jual/Beli Block", "textures/ui/icon_setting")
        .button("§cKembali", "textures/ui/cancel");

    forceShow(player, form, res => {
        if (res.canceled || res.selection === 2) return menuMemberSet(player);
        if (res.selection === 0) menuAdminManageLands(player);
        if (res.selection === 1) menuAdminLandConfig(player);
    });
}

function menuAdminManageLands(player) {
    const db = fetchAllLandData();
    const landIds = Object.keys(db);
    
    const form = new ActionFormData()
        .title("Manage Lands")
        .body(`Total Land Terdaftar: ${landIds.length}\nKlik untuk Mengelola:`);

    if (landIds.length === 0) {
        form.button("Kembali");
    } else {
        landIds.forEach(id => {
            const l = db[id];
            form.button(`§l§b${l.name}\n§r§8Owner: ${l.owner} | Dim: ${l.dim.replace("minecraft:", "")}`);
        });
    }

    forceShow(player, form, res => {
        if (res.canceled || landIds.length === 0) return menuAdminLandCategory(player);
        menuAdminLandAction(player, landIds[res.selection]);
    });
}

function menuAdminLandAction(player, landId) {
    const db = fetchAllLandData();
    const l = db[landId];
    if (!l) return player.sendMessage("§cLand sudah tidak ditemukan!");

    const sizeX = Math.abs(l.max.x - l.min.x) + 1;
    const sizeZ = Math.abs(l.max.z - l.min.z) + 1;
    const totalBlocks = sizeX * sizeZ;

    const form = new ActionFormData()
        .title(`Aksi: ${l.name}`)
        .body(`§eOwner: §f${l.owner}\n§eDimensi: §f${l.dim}\n§eLuas: §f${sizeX}x${sizeZ} (${totalBlocks} Block)\n§eKoordinat: §fX:${l.min.x} Z:${l.min.z}\n\nPilih aksi sebagai Admin:`)
        .button("§l§2Teleport ke Land", "textures/ui/send_icon")
        .button("§l§cHapus Paksa Land", "textures/ui/trash_default")
        .button("Kembali");

    forceShow(player, form, res => {
        if (res.canceled || res.selection === 2) return menuAdminManageLands(player);
        
        if (res.selection === 0) {
            const cX = Math.floor((l.min.x + l.max.x) / 2);
            const cZ = Math.floor((l.min.z + l.max.z) / 2);
            player.teleport({ x: cX, y: 319, z: cZ }, { dimension: world.getDimension(l.dim) });
            player.addTag("loadchunck`" + JSON.stringify({ x: cX, z: cZ }));
            player.sendMessage(`§a[Admin] Teleportasi ke Land ${l.name}...`);
        }
        
        if (res.selection === 1) {
            const confirmForm = new MessageFormData()
                .title("HAPUS LAND?")
                .body(`Yakin ingin MENGHAPUS Land §e${l.name}§r milik §b${l.owner}§r?`)
                .button1("§l§cHAPUS PAKSA")
                .button2("BATAL");
            
            forceShow(player, confirmForm, confirmRes => {
                if (confirmRes.selection === 1 || confirmRes.canceled) return menuAdminLandAction(player, landId);
                const currentDb = fetchAllLandData();
                delete currentDb[landId];
                saveAllLandData(currentDb);
                player.sendMessage(`§a[Admin] Land milik ${l.owner} berhasil dihapus!`);
                menuAdminManageLands(player);
            });
        }
    });
}

function menuAdminLandConfig(player) {
    const config = getConfig();
    if (!config.land) config.land = { price: 5000 };

    const form = new ModalFormData()
        .title("Land Global Config")
        .textField(`Harga Claim Server\n§8(Biaya per Area ATAU per Block, menyesuaikan Mode dari tiap Rank)`, "Ketik harga...", { defaultValue: String(config.land.price) });

    forceShow(player, form, res => {
        if (res.canceled) return menuAdminLandCategory(player);
        config.land.price = parseInt(res.formValues[0]) || 5000;
        saveConfig(config);
        player.sendMessage(`§a[Admin] Harga Claim Global tersimpan: $${config.land.price}`);
    });
}