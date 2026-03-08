import { ActionFormData, MessageFormData } from "@minecraft/server-ui";
import { getRanks, getPlayerRank, setPlayerRank, getPlayerOwnedRanks, addOwnedRank, isEquipFeatureEnabled, toggleEquipFeature } from "./plugin/ranks/rank.js";
import { getKits, getKitCooldown, claimRankKit } from "./plugin/ranks/rank_kits.js"; 
import { world, system } from "@minecraft/server";

// =====================================
// SINKRONISASI SCOREBOARD MONEY
// =====================================
function getScoreMoney(player) {
    try {
        return world.scoreboard.getObjective("money")?.getScore(player) ?? 0;
    } catch { return 0; }
}

function deductScoreMoney(player, amount) {
    try {
        const obj = world.scoreboard.getObjective("money");
        if (obj) {
            const current = obj.getScore(player) ?? 0;
            obj.setScore(player, Math.max(0, current - amount));
        }
    } catch(e) {}
}

// =========================================
// METRIC NUMBER FORMATTER (1K, 1M, 1B)
// =========================================
function formatMetric(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + "B";
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + "K";
    return num.toString();
}

// =====================================
// MESIN PENDOBRAK ANTI USER-BUSY BUG
// =====================================
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

// =====================================
// MENU RANK SHOP
// =====================================
export function openRankShop(player) {
    const ranks = getRanks();
    const playerRank = getPlayerRank(player);
    const ownedRanks = getPlayerOwnedRanks(player);
    const equippedRank = playerRank.id;
    const equipEnabled = isEquipFeatureEnabled();
    
    const money = getScoreMoney(player);
    const formattedMoney = formatMetric(money); // TOTAL UANG JADI METRIC
    
    const form = new ActionFormData()
        .title("§lRANK SHOP§f§0§1") 
        .body(`§l§b${player.name}§r\n§7Rank: ${playerRank.prefix}\n§7Money: §a$${formattedMoney}`); 

    const sortedRanks = Object.entries(ranks).sort((a, b) => a[1].priority - b[1].priority);
    const btnMap = [];

    sortedRanks.forEach(([id, data]) => {
        let icon = "";
        let text = "";
        
        if (equippedRank === id) {
            icon = "textures/ui/New_confirm_Hover";
            text = `${data.prefix} §r\n§a[TERPAKAI]`;
        } else if (ownedRanks.includes(id)) {
            icon = "textures/gui/newgui/mob_effects/village_hero_effect";
            text = equipEnabled ? `${data.prefix} §r\n§e[EQUIP]` : `${data.prefix} §r\n§7[OWNED]`;
        } else {
            icon = "textures/ui/lock";
            // HARGA RANK SEKARANG OTOMATIS JADI METRIC (Cth: $1.2M)
            text = `${data.prefix} §r\n§e$${formatMetric(data.price)}`; 
        }
        form.button(text, icon);
        btnMap.push({ id, data });
    });

    if (player.hasTag("admin")) form.button("§lAdmin Setting\n§r§8[ Atur Fitur Equip ]", "textures/ui/settings_glyph_color_2x");

    forceShow(player, form, res => {
        if (res.canceled) return;
        if (res.selection === btnMap.length && player.hasTag("admin")) return adminRankEquipSetting(player);

        const selected = btnMap[res.selection];
        handleBuyOrEquip(player, selected.id, selected.data, ownedRanks, equippedRank, equipEnabled);
    });
}

function handleBuyOrEquip(player, targetID, rankData, ownedRanks, equippedRank, equipEnabled) {
    if (equippedRank === targetID) {
        player.sendMessage("§e[Rank Shop] Kamu sedang menggunakan rank ini.");
        return openRankShop(player);
    }
    
    if (ownedRanks.includes(targetID)) {
        if (equipEnabled) {
            setPlayerRank(player, targetID);
            player.sendMessage(`§a[Rank Shop] Berhasil! Kamu sekarang menggunakan rank ${rankData.prefix}§a!`);
        } else {
            player.sendMessage("§c[Rank Shop] Maaf, Admin sedang menonaktifkan fitur ganti rank manual.");
        }
        return openRankShop(player);
    }
    
    const currentMoney = getScoreMoney(player);
    if (currentMoney < rankData.price) {
        // Notifikasi kekurangan uang juga dipasang format metric
        player.sendMessage(`§c[Rank Shop] Uang kamu tidak cukup! Butuh §e$${formatMetric(rankData.price)}`);
        return openRankShop(player);
    }

    const confirm = new MessageFormData()
        .title("Konfirmasi Pembelian")
        // Teks konfirmasi menggunakan format metric
        .body(`Apakah kamu yakin ingin membeli rank ${rankData.prefix} §rseharga §e$${formatMetric(rankData.price)}§r?`)
        .button1("§lBELI")
        .button2("BATAL");
        
    forceShow(player, confirm, res => {
        if (res.selection === 1 || res.canceled) return openRankShop(player);
        
        const freshMoney = getScoreMoney(player);
        if (freshMoney < rankData.price) return player.sendMessage("§c[Rank Shop] Uangmu tidak cukup!");
        
        deductScoreMoney(player, rankData.price);
        
        addOwnedRank(player, targetID);
        setPlayerRank(player, targetID);
        
        // Sisa uang dipasang format metric
        player.sendMessage(`§aSukses membeli dan memakai rank ${rankData.prefix}§a! Sisa uangmu: $${formatMetric(freshMoney - rankData.price)}`);
        player.runCommandAsync(`playsound random.levelup @s`);
        openRankShop(player);
    });
}

function adminRankEquipSetting(player) {
    const isEnabled = isEquipFeatureEnabled();
    const form = new ActionFormData()
        .title("RANK SETTING")
        .body("Izinkan pemain untuk mengganti (equip) rank yang sudah mereka beli ke rank yang lain?")
        .button(`Fitur Equip: ${isEnabled ? "§a[AKTIF]" : "§c[MATI]"}`, "textures/ui/refresh_light")
        .button("§lKembali", "textures/ui/cancel");

    forceShow(player, form, res => {
        if (res.canceled || res.selection === 1) return openRankShop(player);
        const newState = toggleEquipFeature();
        player.sendMessage(`§e[Admin] Fitur Equip Rank berhasil ${newState ? "§aDIAKTIFKAN" : "§cDIMATIKAN"}.`);
        adminRankEquipSetting(player);
    });
}

// =====================================
// MENU KITS (TEKS UI SERVER PREMIUM)
// =====================================
export function openRankKitMenu(player) {
    const kits = getKits();
    const ranks = getRanks();
    const playerRank = getPlayerRank(player);
    const ownedRanks = getPlayerOwnedRanks(player); 
    
    let money = 0;
    try { money = world.scoreboard.getObjective("money")?.getScore(player) ?? 0; } catch (e) {}
    
    const formattedMoney = formatMetric(money); // TOTAL UANG JADI METRIC
    const now = Date.now();

    const form = new ActionFormData()
        .title("RANK KITS")
        .body(`§l§b${player.name}§r\n§7Rank Saat Ini: ${playerRank.prefix}\n§7Money: §a$${formattedMoney}`);

    const sortedKits = Object.entries(kits).sort((a, b) => {
        const prioA = ranks[a[1].reqRank || "member"]?.priority || 0;
        const prioB = ranks[b[1].reqRank || "member"]?.priority || 0;
        return prioA - prioB;
    });

    const btnMap = [];

    sortedKits.forEach(([id, data]) => {
        const cd = getKitCooldown(player, id);
        const reqRank = data.reqRank || "member";
        let icon = "";
        let text = "";

        if (!ownedRanks.includes(reqRank)) {
            icon = "textures/ui/lock";
            text = `§l${data.name}\n§r§c[ BELI RANK ${reqRank.toUpperCase()} ]`;
        } else if (now < cd) {
            const timeLeft = Math.ceil((cd - now) / 60000);
            const hours = Math.floor(timeLeft / 60);
            const mins = timeLeft % 60;
            icon = "textures/items/bundle_lime_open"; 
            text = `§l${data.name}\n§r§7[ CD: ${hours}j ${mins}m ]`;
        } else {
            icon = "textures/items/bundle_lime"; 
            text = `§l${data.name}\n§r§a[ KLAIM SEKARANG ]`;
        }

        form.button(text, icon);
        btnMap.push(id);
    });

    forceShow(player, form, res => {
        if (res.canceled) return;
        const selectedKitID = btnMap[res.selection];
        claimRankKit(player, selectedKitID);
    });
}