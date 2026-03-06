/* ============================================================
 * CLAN LAND PROTECTION SYSTEM (ADMUD RANK SYSTEM)
 * VERSION: 2.6.0-BETA (MCPE 2026 ENGINE) - [FIX V3 APPLIED]
 * ============================================================
 * DEVELOPED BY: Gemini AI for AdmudCraft
 * TOTAL FEATURES: Claim, Manage, Trust, Shop, Inbox, Protection
 * NOTIFICATION: Chat Box Achievement Style (No Title Clash)
 * UI: Paperdoll Chat Support Auto-Refresh & Unlimited Limit
 * ANTI-OVERLAP: Mencegah pemain mengklaim area yang bertabrakan
 * NEW FIX: Forcefield Radar, Admin Bypass, & Dynamic Config Limit
 * BUGFIX: Restored 'getPlayerTotalClaimedBlocks' for main.js
 * ============================================================
 */

import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";
import { getPlayerRank } from "../ranks/rank.js";
import { getConfig } from "../../config.js";

// ==========================================
// [1] PENGATURAN DATABASE & CACHE
// ==========================================

const tempPositionCache = {}; 
const playerBacktrackLocation = {}; 

export function fetchAllLandData() {
    const serializedData = world.getDynamicProperty("landDB");
    return serializedData ? JSON.parse(serializedData) : {};
}

export function saveAllLandData(dataObject) {
    world.setDynamicProperty("landDB", JSON.stringify(dataObject));
}

function fetchInboxMessages() {
    const serializedMessages = world.getDynamicProperty("landMessagesDB");
    return serializedMessages ? JSON.parse(serializedMessages) : {};
}

function commitInboxMessages(messageObject) {
    world.setDynamicProperty("landMessagesDB", JSON.stringify(messageObject));
}

function sendNotifAchievement(player, headText, subText) {
    if (!player) return;
    const message = 
        `\n§z§l§6»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»\n` +
        `  §6§lLand Shop: §f${headText}\n` +
        `  §7${subText}\n` +
        `§z§l§6««««««««««««««««««««««««««««««««\n`;
    player.sendMessage(message);
    player.playSound("random.toast", { volume: 1.0, pitch: 1.0 });
}

function getSafeClans() {
    try {
        const data = world.getDynamicProperty("clanDB"); 
        return data ? JSON.parse(data) : {};
    } catch(e) { return {}; }
}

// Menghitung total volume Block
function getLandVolume(min, max) {
    return Math.abs(max.x - min.x + 1) * Math.abs(max.y - min.y + 1) * Math.abs(max.z - min.z + 1);
}

// ==========================================
// FIX: FUNGSI YANG DIBUTUHKAN OLEH main.js
// ==========================================
export function getPlayerTotalClaimedBlocks(playerName) {
    const db = fetchAllLandData();
    let total = 0;
    for (const id in db) {
        if (db[id].owner === playerName) {
            total += getLandVolume(db[id].min, db[id].max);
        }
    }
    return total;
}

// Mengecek apakah 2 area (bounding box) saling bertabrakan
function checkOverlap(minA, maxA, minB, maxB) {
    return (minA.x <= maxB.x && maxA.x >= minB.x) &&
           (minA.y <= maxB.y && maxA.y >= minB.y) &&
           (minA.z <= maxB.z && maxA.z >= minB.z);
}

// FORMATTER ANGKA METRIC KHUSUS SHOP
function toMetric(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + "B";
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + "K";
    return num.toString();
}

// ==========================================
// [2] CEK KELAYAKAN & LIMIT (CONFIG ADMIN)
// ==========================================

export function checkClaimEligibility(player, blocksToClaim) {
    const config = getConfig();
    const db = fetchAllLandData();
    const landSet = config.land || { mode: "count", defaultLimit: 3, price: 5000, rankLimits: {} };
    
    const pRank = getPlayerRank(player).id;
    const maxLimit = (landSet.rankLimits && landSet.rankLimits[pRank] !== undefined) ? landSet.rankLimits[pRank] : landSet.defaultLimit;

    let currentOwnedLands = 0;
    let currentOwnedBlocks = 0;
    
    for (const id in db) {
        if (db[id].owner === player.name) {
            currentOwnedLands++;
            const sizeX = Math.abs(db[id].max.x - db[id].min.x) + 1;
            const sizeZ = Math.abs(db[id].max.z - db[id].min.z) + 1;
            currentOwnedBlocks += (sizeX * sizeZ);
        }
    }

    if (landSet.mode === "block") {
        if ((currentOwnedBlocks + blocksToClaim) > maxLimit) {
            return { allowed: false, price: 0, reason: `Melebihi Limit Block!\n§7Batasmu: §e${maxLimit} block §7| Terpakai: §c${currentOwnedBlocks}` };
        }
        return { allowed: true, price: landSet.price * blocksToClaim, reason: "" };
    } else {
        if (currentOwnedLands >= maxLimit) {
            return { allowed: false, price: 0, reason: `Melebihi Limit Land!\n§7Maksimal hanya boleh memiliki §e${maxLimit} §7Area Land.` };
        }
        return { allowed: true, price: landSet.price, reason: "" };
    }
}

// ==========================================
// [3] MENU UTAMA (MAIN HUB)
// ==========================================

export function openClaimMenu(player) {
    const playerName = player.name;
    const landDB = fetchAllLandData();
    const inboxDB = fetchInboxMessages();

    const cache = tempPositionCache[playerName];
    const statusPos1 = cache?.pos1 ? "§aSudah Ditandai" : "§cKosong";
    const statusPos2 = cache?.pos2 ? "§aSudah Ditandai" : "§cKosong";

    let unreadCount = 0;
    for (const id in inboxDB) {
        if (inboxDB[id].owner === playerName && inboxDB[id].unread > 0) {
            unreadCount += inboxDB[id].unread;
        }
    }

    const hubForm = new ActionFormData()
        .title("§l§aCLAIM LAND")
        .body(`§7Atur wilayah kekuasaanmu di sini.\n\n§fStatus Kordinat:\n§8- Pojok 1: ${statusPos1}\n§8- Pojok 2: ${statusPos2}`)
        .button("Set Posisi 1\n§8Gunakan lokasi saat ini", "textures/items/wooden_axe") 
        .button("§2Claim Land\n§8Daftarkan kordinat", "textures/items/emerald")       
        .button("Set Posisi 2\n§8Gunakan lokasi saat ini", "textures/items/wooden_axe") 
        .button("Manage Land\n§8Lahan Milikmu", "textures/ui/icon_setting")             
        .button("Land Shop\n§8Pasar Properti", "textures/ui/trade_icon")                
        .button(`Land Contact\n§8Pesan Masuk: ${unreadCount > 0 ? "§c" + unreadCount : "§70"}`, "textures/ui/message"); 

    player.playSound("random.pop");

    hubForm.show(player).then(res => {
        if (res.canceled) return;
        switch (res.selection) {
            case 0: return registerCoord(player, 1);    
            case 1: return menuConfirmClaim(player);    
            case 2: return registerCoord(player, 2);    
            case 3: return menuManageList(player);      
            case 4: return menuShopList(player);        
            case 5: return menuInboxCenter(player);     
        }
    });
}

// ==========================================
// [4] PROSES PENGATURAN KOORDINAT & CLAIM
// ==========================================

function registerCoord(player, type) {
    if (!tempPositionCache[player.name]) tempPositionCache[player.name] = {};
    const loc = player.location;
    const data = { x: Math.floor(loc.x), y: Math.floor(loc.y), z: Math.floor(loc.z), dim: player.dimension.id };

    if (type === 1) tempPositionCache[player.name].pos1 = data;
    else tempPositionCache[player.name].pos2 = data;

    player.sendMessage(`§a[Claim] Titik ${type} dikunci pada: §f${data.x}, ${data.y}, ${data.z}`);
    player.playSound("note.pling");
    openClaimMenu(player);
}

function menuConfirmClaim(player) {
    const data = tempPositionCache[player.name];
    if (!data?.pos1 || !data?.pos2) {
        player.sendMessage("§c[Gagal] Tentukan dua titik koordinat (Pos 1 & 2) dahulu!");
        return;
    }

    if (data.pos1.dim !== data.pos2.dim) {
        player.sendMessage("§c[Gagal] Posisi 1 dan Posisi 2 harus berada di dimensi yang sama!");
        return;
    }

    const min = { x: Math.min(data.pos1.x, data.pos2.x), y: Math.min(data.pos1.y, data.pos2.y), z: Math.min(data.pos1.z, data.pos2.z) };
    const max = { x: Math.max(data.pos1.x, data.pos2.x), y: Math.max(data.pos1.y, data.pos2.y), z: Math.max(data.pos1.z, data.pos2.z) };
    
    const lands = fetchAllLandData();
    for (const id in lands) {
        const existingLand = lands[id];
        if (existingLand.dim === data.pos1.dim && checkOverlap(min, max, existingLand.min, existingLand.max)) {
            player.sendMessage(`§c[Gagal] Area ini bertabrakan dengan lahan milik §e${existingLand.owner} §c(§f${existingLand.name}§c)!`);
            player.playSound("note.bass");
            return; 
        }
    }

    const newVolume = getLandVolume(min, max);
    const eligibility = checkClaimEligibility(player, newVolume);
    
    if (!eligibility.allowed) {
        player.sendMessage(`§c[Gagal] ${eligibility.reason}`);
        return;
    }

    const form = new ModalFormData()
        .title("Konfirmasi Claim Lahan")
        .label(`§aLuas Lahan: §e${newVolume} Blok\n§aBiaya Claim: §e$${toMetric(eligibility.price)}`)
        .textField("Berikan Nama Unik Lahanmu:", "Contoh: Markas Besar");

    form.show(player).then(res => {
        if (res.canceled) return openClaimMenu(player);
        
        const moneyObj = world.scoreboard.getObjective("money");
        let currentMoney = 0;
        try { currentMoney = moneyObj.getScore(player.scoreboardIdentity); } catch(e) {}

        if (eligibility.price > 0 && currentMoney < eligibility.price) {
            player.playSound("note.bass");
            return player.sendMessage(`§c[Gagal] Uangmu tidak cukup! Kamu butuh $${toMetric(eligibility.price)}.`);
        }

        if (eligibility.price > 0) {
            try { moneyObj.setScore(player.scoreboardIdentity, currentMoney - eligibility.price); } catch(e) {}
        }

        const name = res.formValues[1].trim() || "Lahan Tanpa Nama";
        const landId = "land_" + Date.now();

        lands[landId] = {
            id: landId, name: name, owner: player.name, dim: data.pos1.dim,
            min: min, max: max, isForSale: false, price: 0,
            generalPerms: { publicEnter: false, publicInteract: false, explosions: true, monsters: true, pvp: false, trustClan: false },
            trusted: {}
        };

        saveAllLandData(lands);
        delete tempPositionCache[player.name];
        player.sendMessage(`§a[Claim] Selamat! Wilayah §e${name}§a kini dalam perlindunganmu. (${newVolume} Blok)`);
        player.playSound("random.levelup");
    });
}

// ==========================================
// [5] MANAGE LAND & EDITING SYSTEM
// ==========================================

function menuManageList(player) {
    const db = fetchAllLandData();
    const myLands = Object.values(db).filter(l => l.owner === player.name);

    const form = new ActionFormData().title("§lKELOLA LAHAN SAYA");
    if (myLands.length === 0) {
        form.body("Kamu belum memiliki lahan terdaftar.");
        form.button("Kembali");
    } else {
        const config = getConfig();
        const modeStatus = config?.land?.mode === "block" ? "Mode Block Terbatas" : "Mode Area Terbatas";
        form.body(`§eStatus Claim: §f${modeStatus}\nPilih lahan yang ingin kamu kelola:`);
        myLands.forEach(l => {
            const saleText = l.isForSale ? "§e[DIPASARKAN]" : "§a[AKTIF]";
            form.button(`§l${l.name}\n§r${saleText} §7- ${l.dim.replace("minecraft:", "")}`);
        });
    }

    form.show(player).then(res => {
        if (res.canceled || myLands.length === 0) return openClaimMenu(player);
        menuLandActionCenter(player, myLands[res.selection]);
    });
}

function menuLandActionCenter(player, land) {
    const form = new ActionFormData()
        .title(`Lahan: ${land.name}`)
        .button(land.isForSale ? "§cBatal Jual" : "§eJual Lahan", "textures/ui/icon_deals")
        .button("§bEdit Pengaturan\n§8Nama & Izin Public", "textures/ui/pencil_edit_icon")
        .button("§dManage Trust\n§8Kelola akses teman", "textures/ui/permissions_op_crown")
        .button("§4Hapus Lahan\n§8Hapus permanen", "textures/ui/trash_default")
        .button("Kembali");

    form.show(player).then(res => {
        if (res.canceled || res.selection === 4) return menuManageList(player);
        if (res.selection === 0) handleMarketToggle(player, land);
        if (res.selection === 1) menuEditLandPerms(player, land);
        if (res.selection === 2) menuTrustHub(player, land);
        if (res.selection === 3) handleLandDeletion(player, land);
    });
}

function handleMarketToggle(player, land) {
    if (land.isForSale) {
        let db = fetchAllLandData();
        db[land.id].isForSale = false;
        saveAllLandData(db);
        player.sendMessage("§a[Market] Lahan ditarik dari penjualan.");
        menuManageList(player);
    } else {
        const form = new ModalFormData()
            .title("Jual Lahan")
            .textField("Tentukan Harga Jual Lahan:", "Masukkan angka...");
        form.show(player).then(res => {
            if (res.canceled) return;
            const price = parseInt(res.formValues[0]);
            if (isNaN(price) || price <= 0) return player.sendMessage("§cHarga tidak valid!");

            let db = fetchAllLandData();
            db[land.id].isForSale = true;
            db[land.id].price = price;
            saveAllLandData(db);
            player.sendMessage(`§a[Market] Lahan §e${land.name}§a dipajang di toko seharga $${toMetric(price)}`);
        });
    }
}

function menuEditLandPerms(player, land) {
    const g = land.generalPerms;
    const form = new ModalFormData()
        .title("Edit Lahan")
        .textField("Nama Lahan:", "Nama...", { defaultValue: land.name })
        .toggle("Public Boleh Masuk?\n§8(Matikan agar player luar terpental)", { defaultValue: !!g.publicEnter })
        .toggle("Public Boleh Interact?", { defaultValue: !!g.publicInteract })
        .toggle("Anti Ledakan (TNT/Creeper)", { defaultValue: !!g.explosions })
        .toggle("Anti Monster Spawn", { defaultValue: !!g.monsters })
        .toggle("Izin PvP di Area", { defaultValue: !!g.pvp })
        .toggle("Trust Semua Member Clanmu?", { defaultValue: !!g.trustClan });

    form.show(player).then(res => {
        if (res.canceled) return;
        let db = fetchAllLandData();
        let target = db[land.id];

        target.name = res.formValues[0];
        target.generalPerms.publicEnter = res.formValues[1];
        target.generalPerms.publicInteract = res.formValues[2];
        target.generalPerms.explosions = res.formValues[3];
        target.generalPerms.monsters = res.formValues[4];
        target.generalPerms.pvp = res.formValues[5];
        target.generalPerms.trustClan = res.formValues[6];

        saveAllLandData(db);
        player.sendMessage("§a[Claim] Berhasil memperbarui pengaturan lahan.");
    });
}

function handleLandDeletion(player, land) {
    const form = new MessageFormData()
        .title("Hapus Lahan")
        .body(`Yakin ingin menghapus §e${land.name}§f? Proteksi akan hilang selamanya.`)
        .button1("§l§cHAPUS")
        .button2("BATAL");

    form.show(player).then(res => {
        if (res.selection === 0) {
            let db = fetchAllLandData();
            delete db[land.id];
            saveAllLandData(db);
            player.sendMessage("§aLahan telah dihapus.");
            menuManageList(player);
        }
    });
}

// ==========================================
// [6] TRUST SYSTEM (PER-PLAYER ACCESS)
// ==========================================

function menuTrustHub(player, land) {
    const form = new ActionFormData()
        .title("Manage Trust")
        .button("Tambah Player", "textures/ui/color_plus")
        .button("Edit Trusted Players", "textures/ui/permissions_op_crown")
        .button("Kembali");

    form.show(player).then(res => {
        if (res.canceled || res.selection === 2) return menuLandActionCenter(player, land);
        if (res.selection === 0) {
            const players = world.getAllPlayers().filter(p => p.name !== player.name);
            const names = players.map(p => p.name);
            if (names.length === 0) return player.sendMessage("§cTidak ada player online.");

            const f = new ModalFormData()
                .title("Beri Izin Trust")
                .dropdown("Pilih Player Online:", names)
                .toggle("Izin: Letakkan Block", { defaultValue: false })
                .toggle("Izin: Hancurkan Block", { defaultValue: false })
                .toggle("Izin: Hit Entity/PVP", { defaultValue: false })
                .toggle("Izin: Buka Chest/Pintu", { defaultValue: true });

            f.show(player).then(r => {
                if (r.canceled) return;
                const target = names[r.formValues[0]];
                let db = fetchAllLandData();
                db[land.id].trusted[target] = {
                    place: r.formValues[1], break: r.formValues[2], hit: r.formValues[3], interact: r.formValues[4]
                };
                saveAllLandData(db);
                player.sendMessage(`§a[Trust] Izin diberikan kepada §e${target}§a.`);
            });
        }

        if (res.selection === 1) {
            const trustedNames = Object.keys(land.trusted);
            if (trustedNames.length === 0) return player.sendMessage("§cBelum ada player di daftar trust.");
            const f = new ActionFormData().title("Daftar Trusted");
            trustedNames.forEach(t => f.button(t));
            f.show(player).then(r => {
                if (r.canceled) return;
                const target = trustedNames[r.selection];
                const data = land.trusted[target];
                
                const m = new ModalFormData().title("Edit: " + target)
                    .toggle("Bisa Naro", { defaultValue: !!data.place })
                    .toggle("Bisa Ancurin", { defaultValue: !!data.break })
                    .toggle("§cHAPUS TRUST", { defaultValue: false });
                    
                m.show(player).then(resFinal => {
                    if (resFinal.canceled) return;
                    let db = fetchAllLandData();
                    if (resFinal.formValues[2]) delete db[land.id].trusted[target];
                    else {
                        db[land.id].trusted[target].place = resFinal.formValues[0];
                        db[land.id].trusted[target].break = resFinal.formValues[1];
                    }
                    saveAllLandData(db);
                });
            });
        }
    });
}

// ==========================================
// [7] LAND SHOP & PRIVATE MESSAGES
// ==========================================

function menuShopList(player) {
    const db = fetchAllLandData();
    const market = Object.values(db).filter(l => l.isForSale && l.owner !== player.name);

    const form = new ActionFormData().title("§lLAND MARKET");
    if (market.length === 0) {
        form.body("Pasar saat ini kosong.");
        form.button("Kembali");
    } else {
        market.forEach(l => {
            const luasBlok = getLandVolume(l.min, l.max);
            form.button(`§e$${toMetric(l.price)} §f${l.name}\n§b${toMetric(luasBlok)} Blok`, "textures/ui/icon_new");
        });
    }

    form.show(player).then(res => {
        if (res.canceled || market.length === 0) return openClaimMenu(player);
        const l = market[res.selection];

        const sub = new ActionFormData()
            .title("Beli Lahan")
            .body(`Nama: ${l.name}\nOwner: ${l.owner}\nHarga: $${toMetric(l.price)}\nLuas Lahan: ${toMetric(getLandVolume(l.min, l.max))} Blok`)
            .button("§2Beli Sekarang\n§rOtomatis Teleport", "textures/ui/realms_green_check")
            .button("§dHubungi Penjual\n§rKirim Pesan Chat", "textures/ui/message")
            .button("Kembali");

        sub.show(player).then(s => {
            if (s.selection === 0) handlePurchase(player, l);
            if (s.selection === 1) openChatInterface(player, l);
        });
    });
}

function handlePurchase(player, land) {
    const newVolume = getLandVolume(land.min, land.max);
    const eligibility = checkClaimEligibility(player, newVolume);

    if (!eligibility.allowed) {
        return player.sendMessage(`§c[Gagal] ${eligibility.reason}`);
    }

    const moneyScore = world.scoreboard.getObjective("money");
    if (!moneyScore) return player.sendMessage("§cScoreboard money tidak ditemukan.");
    const bal = moneyScore.getScore(player.scoreboardIdentity) || 0;
    
    if (bal < land.price) return player.sendMessage("§cUang tidak cukup!");

    try {
        moneyScore.setScore(player.scoreboardIdentity, bal - land.price);
        player.runCommandAsync(`scoreboard players add "${land.owner}" money ${land.price}`);
    } catch(e) {}

    let db = fetchAllLandData();
    db[land.id].owner = player.name;
    db[land.id].isForSale = false;
    db[land.id].trusted = {};
    saveAllLandData(db);

    player.teleport({ x: land.min.x, y: 319, z: land.min.z }, { dimension: world.getDimension(land.dim) });
    player.sendMessage("§a[Market] Lahan berhasil dibeli!");
}

function openChatInterface(player, land) {
    const id = `${land.id}_${player.name}`;
    let db = fetchInboxMessages();

    if (!db[id]) {
        db[id] = { landName: land.name, owner: land.owner, buyer: player.name, unread: 0, chats: [] };
        commitInboxMessages(db);
    }

    let chatHistory = db[id].chats;
    if (chatHistory.length > 8) chatHistory = chatHistory.slice(chatHistory.length - 8);
    const chatsText = chatHistory.map(c => `§b${c.sender}: §f${c.text}`).join("\n");

    const form = new ModalFormData()
        .title("§l§eKIRIM PESAN") 
        .label(`§e[Menghubungi: §a${land.owner}§e]\n§eRiwayat Chat:\n§7${chatsText || "Belum ada pesan"}`)
        .textField("", "Ketik pesan...");

    form.show(player).then(res => {
        if (res.canceled) return system.run(() => menuShopList(player));
        if (!res.formValues[1] || res.formValues[1].trim() === "") return system.run(() => openChatInterface(player, land));
        
        let currentDB = fetchInboxMessages();
        currentDB[id].chats.push({ sender: player.name, text: res.formValues[1], time: Date.now() });
        currentDB[id].unread += 1;
        commitInboxMessages(currentDB);

        const owner = world.getAllPlayers().find(p => p.name === land.owner);
        if (owner) sendNotifAchievement(owner, "Pesan Masuk", `Lahan: ${land.name}`);

        player.playSound("random.pop");
        system.run(() => openChatInterface(player, land)); 
    });
}

function menuInboxCenter(player) {
    const db = fetchInboxMessages();
    const myInboxes = Object.keys(db).filter(k => db[k].owner === player.name);
    
    const form = new ActionFormData().title("§lINBOX MESSAGES");

    if (myInboxes.length === 0) {
        form.body("Belum ada pesan yang masuk.");
        form.button("Kembali");
    } else {
        myInboxes.forEach(k => form.button(`§l${db[k].buyer}\n§rLand: ${db[k].landName} §c[${db[k].unread}]`));
    }

    form.show(player).then(res => {
        if (res.canceled || myInboxes.length === 0) return openClaimMenu(player);
        const key = myInboxes[res.selection];
        openReplyInterface(player, key);
    });
}

function openReplyInterface(player, key) {
    let cur = fetchInboxMessages();
    cur[key].unread = 0; 
    commitInboxMessages(cur);

    let chatHistory = cur[key].chats;
    if (chatHistory.length > 8) chatHistory = chatHistory.slice(chatHistory.length - 8);
    const logs = chatHistory.map(c => `§b${c.sender}: §f${c.text}`).join("\n");

    const f = new ModalFormData()
        .title("§l§eBALAS PESAN")
        .label(`§e[Membalas: §a${cur[key].buyer}§e]\n§eRiwayat:\n§7${logs || "Belum ada pesan"}`)
        .textField("", "Ketik balasan...");

    f.show(player).then(r => {
        if (r.canceled) return system.run(() => menuInboxCenter(player));
        if (!r.formValues[1] || r.formValues[1].trim() === "") return system.run(() => openReplyInterface(player, key));
        
        let final = fetchInboxMessages();
        final[key].chats.push({ sender: player.name, text: r.formValues[1], time: Date.now() });
        commitInboxMessages(final);

        const buyer = world.getAllPlayers().find(p => p.name === final[key].buyer);
        if (buyer) sendNotifAchievement(buyer, "Balasan Penjual", `Lahan: ${final[key].landName}`);
        
        player.playSound("random.pop");
        system.run(() => openReplyInterface(player, key)); 
    });
}

// ==========================================
// [8] SATPAM PROTEKSI (RADAR & EVENTS)
// ==========================================

function checkInside(loc, land) {
    if (!loc || !land) return false;
    return loc.x >= land.min.x && loc.x <= land.max.x && loc.z >= land.min.z && loc.z <= land.max.z;
}

function checkAccess(p, l, action) {
    if (p.hasTag("admin") || p.isOp()) return true; // ADMIN BYPASS
    if (p.name === l.owner) return true;
    if (l.trusted[p.name] && l.trusted[p.name][action]) return true;
    if (l.generalPerms.trustClan) {
        const myClan = p.getDynamicProperty("clan");
        if (myClan && getSafeClans()[myClan]?.members.includes(l.owner)) return true;
    }
    return false;
}

// 1. RADAR BOUNCE & PROTECT (Dengan Admin Bypass & Gaya Bouncer)
system.runInterval(() => {
    const db = fetchAllLandData();
    for (const p of world.getAllPlayers()) {
        let inside = false;
        const isAdmin = p.hasTag("admin") || p.isOp();

        for (const id in db) {
            const l = db[id];
            if (p.dimension.id === l.dim && checkInside(p.location, l)) {
                inside = true;
                if (!l.generalPerms.publicEnter && p.name !== l.owner && !l.trusted[p.name] && !isAdmin) {
                    
                    p.onScreenDisplay.setActionBar(`§cLand ${l.owner} tidak mengizinkan masuk`);
                    
                    const cX = (l.min.x + l.max.x) / 2;
                    const cZ = (l.min.z + l.max.z) / 2;
                    const dirX = p.location.x - cX;
                    const dirZ = p.location.z - cZ;
                    const dist = Math.sqrt(dirX * dirX + dirZ * dirZ) || 1;
                    
                    if (playerBacktrackLocation[p.name]) {
                        p.teleport(playerBacktrackLocation[p.name]);
                    }

                    try {
                        p.applyKnockback(dirX / dist, dirZ / dist, 2.5, 0.4);
                        p.playSound("hit.slime", { volume: 1.0, pitch: 1.0 });
                    } catch(e) {}
                }
                break;
            }
        }
        if (!inside) playerBacktrackLocation[p.name] = p.location;
    }
}, 5);

// 2. ANTI MONSTER (RADAR 2 DETIK)
system.runInterval(() => {
    const db = fetchAllLandData();
    const antiLands = Object.values(db).filter(l => l.generalPerms.monsters);
    if (antiLands.length === 0) return;

    for (const p of world.getAllPlayers()) {
        const ent = p.dimension.getEntities({ excludeTypes: ["minecraft:player", "minecraft:item"] });
        for (const m of ent) {
            const isM = m.hasComponent("minecraft:type_family") && 
                       (m.getComponent("minecraft:type_family").getTypeFamilies().includes("monster") || 
                        m.getComponent("minecraft:type_family").getTypeFamilies().includes("undead"));
            if (isM || m.typeId.includes("zombie") || m.typeId.includes("creeper")) {
                for (const l of antiLands) {
                    if (p.dimension.id === l.dim && checkInside(m.location, l)) {
                        system.run(() => { try { m.remove(); } catch(e){} });
                        break;
                    }
                }
            }
        }
    }
}, 40);

// 3. EVENT PROTECTIONS
world.beforeEvents.playerBreakBlock.subscribe(ev => {
    const db = fetchAllLandData();
    for (const id in db) {
        const l = db[id];
        if (ev.block.dimension.id === l.dim && checkInside(ev.block.location, l)) {
            if (!checkAccess(ev.player, l, "break")) { ev.cancel = true; break; }
        }
    }
});

world.beforeEvents.playerPlaceBlock.subscribe(ev => {
    const db = fetchAllLandData();
    for (const id in db) {
        const l = db[id];
        if (ev.block.dimension.id === l.dim && checkInside(ev.block.location, l)) {
            if (!checkAccess(ev.player, l, "place")) { ev.cancel = true; break; }
        }
    }
});

world.beforeEvents.playerInteractWithBlock.subscribe(ev => {
    const db = fetchAllLandData();
    for (const id in db) {
        const l = db[id];
        if (ev.block.dimension.id === l.dim && checkInside(ev.block.location, l)) {
            if (l.generalPerms.publicInteract) continue;
            if (!checkAccess(ev.player, l, "interact")) { ev.cancel = true; break; }
        }
    }
});

// 4. PVP PROTECTION
world.beforeEvents.entityHurt.subscribe(ev => {
    const vic = ev.hurtEntity;
    const att = ev.damageSource.damagingEntity;
    if (!vic || att?.typeId !== "minecraft:player") return;
    const db = fetchAllLandData();
    for (const id in db) {
        const l = db[id];
        if (vic.dimension.id === l.dim && checkInside(vic.location, l)) {
            if (vic.typeId === "minecraft:player") {
                if (!l.generalPerms.pvp && !checkAccess(att, l, "hit")) ev.cancel = true;
            } else {
                if (!checkAccess(att, l, "hit")) ev.cancel = true;
            }
            break;
        }
    }
});

// 5. EXPLOSION
world.beforeEvents.explosion.subscribe(ev => {
    const db = fetchAllLandData();
    const blocks = ev.getImpactedBlocks();
    const final = blocks.filter(b => {
        for (const id in db) {
            const l = db[id];
            if (l.generalPerms.explosions && ev.dimension.id === l.dim && checkInside(b, l)) return false;
        }
        return true;
    });
    ev.setImpactedBlocks(final);
});