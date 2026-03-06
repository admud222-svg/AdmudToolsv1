import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";

// IMPORT KATEGORI
import { blockCategory } from "./categories/block.js";
import { kacaCategory } from "./categories/kaca.js";
import { makananCategory } from "./categories/makanan.js";
import { dekorasiCategory } from "./categories/dekorasi.js";
import { toolsCategory } from "./categories/tools.js";
import { armorCategory } from "./categories/armor.js"; // ERROR DISINI SUDAH FIX

// GABUNGKAN DATA SHOP
const SHOP_DATA = {
    "block": blockCategory,
    "kaca": kacaCategory,
    "makanan": makananCategory,
    "dekorasi": dekorasiCategory,
    "tools": toolsCategory,
    "armor": armorCategory
};

// ==========================================
// UTILS: ECONOMY & INVENTORY
// ==========================================
function getMoney(player) {
    try {
        const obj = world.scoreboard.getObjective("money");
        return obj ? (obj.getScore(player.scoreboardIdentity) || 0) : 0;
    } catch(e) { return 0; }
}

function addMoney(player, amount) {
    try { 
        const obj = world.scoreboard.getObjective("money");
        if(obj) obj.setScore(player.scoreboardIdentity, getMoney(player) + amount);
    } catch(e){}
}

function removeMoney(player, amount) {
    try { 
        const obj = world.scoreboard.getObjective("money");
        if(obj) obj.setScore(player.scoreboardIdentity, getMoney(player) - amount);
    } catch(e){}
}

function getPlayerItemCount(player, itemId) {
    let count = 0;
    try {
        const inv = player.getComponent("inventory").container;
        for(let i = 0; i < inv.size; i++) {
            const item = inv.getItem(i);
            if(item && item.typeId === itemId) count += item.amount;
        }
    } catch(e) {}
    return count;
}

// ==========================================
// UTILS: SYSTEM STOK & AUTO-RESTOCK
// ==========================================
function getStock(itemId, stockMax) {
    const raw = world.getDynamicProperty("stock_" + itemId);
    return typeof raw === "number" ? raw : stockMax; 
}

function setStock(itemId, value) {
    world.setDynamicProperty("stock_" + itemId, Math.max(0, Math.floor(value)));
}

function reduceStock(itemId, amount, stockMax) {
    const current = getStock(itemId, stockMax);
    if (current < amount) return false; 
    setStock(itemId, current - amount);
    return true; 
}

function increaseStock(itemId, amount, stockMax) {
    const current = getStock(itemId, stockMax);
    setStock(itemId, Math.min(stockMax, current + amount)); 
}

let isRestockStarted = false;
function startAutoRestock() {
    if (isRestockStarted) return;
    isRestockStarted = true;

    for (const catKey in SHOP_DATA) {
        for (const item of SHOP_DATA[catKey].items) {
            if (!item.restockAmount || !item.restockIntervalMinutes) continue;
            const intervalTicks = item.restockIntervalMinutes * 60 * 20;
            system.runInterval(() => {
                const current = getStock(item.id, item.stockMax);
                if (current < item.stockMax) {
                    const add = Math.min(item.restockAmount, item.stockMax - current);
                    increaseStock(item.id, add, item.stockMax);
                }
            }, intervalTicks);
        }
    }
}
system.runTimeout(() => { startAutoRestock(); }, 40);

// ==========================================
// SISTEM UI SHOP
// ==========================================
export function openShopMenu(player) {
    const form = new ActionFormData()
        .title("§l§eSERVER SHOP§t§t§1")
        .body(`Halo §b${player.name}§r!\nUangmu: §a$${getMoney(player)}§r\nPilih kategori:`);

    const keys = Object.keys(SHOP_DATA);
    for (const key of keys) {
        form.button(`${SHOP_DATA[key].name}\n§8Klik untuk buka`, SHOP_DATA[key].icon);
    }
    form.button("§cTutup Menu", "textures/ui/cancel");

    form.show(player).then(res => {
        if (res.canceled || res.selection === keys.length) return;
        openCategoryMenu(player, keys[res.selection]);
    });
}

function openCategoryMenu(player, categoryId) {
    const cat = SHOP_DATA[categoryId];
    const form = new ActionFormData()
        .title(`${cat.name}§t§t§1`)
        .body(`Uangmu: §a$${getMoney(player)}§r`);

    for (const itm of cat.items) {
        const currentStock = getStock(itm.id, itm.stockMax);
        let stockText = currentStock > 0 ? `§2Stok: ${currentStock}` : `§cHABIS`;
        form.button(`§l${itm.name}\n§r§aBeli: $${itm.buy} §8| §cJual: $${itm.sell}\n${stockText}`, itm.icon);
    }
    form.button("§8[ Kembali ]", "textures/ui/undo");

    form.show(player).then(res => {
        if (res.canceled) return;
        if (res.selection === cat.items.length) return openShopMenu(player);
        openTransaction(player, categoryId, res.selection);
    });
}

function openTransaction(player, catId, idx) {
    const item = SHOP_DATA[catId].items[idx];
    const playerMoney = getMoney(player);
    const inInv = getPlayerItemCount(player, item.id);
    const currentStock = getStock(item.id, item.stockMax);

    const form = new ModalFormData()
        .title(`TRANSAKSI: ${item.name}`)
        .dropdown(`§7--- INFO BARANG ---\n§fItem: §b${item.name}\n§fHarga Beli: §a$${item.buy}\n§fHarga Jual: §c$${item.sell}\n§fStok Server: §e${currentStock} pcs\n\n§7--- STATUS KAMU ---\n§fUang: §a$${playerMoney}\n§fPunya: §b${inInv} pcs\n\nPilih Aksi:`, ["§l§aBELI (Buy)", "§l§cJUAL (Sell)"])
        .textField("Masukkan Jumlah:", "Contoh: 1, 16, 64");

    form.show(player).then(res => {
        if (res.canceled) return openCategoryMenu(player, catId);
        const action = res.formValues[0];
        const amount = parseInt(res.formValues[1]);

        if (isNaN(amount) || amount <= 0) {
            player.sendMessage("§c[Shop] Jumlah tidak valid!");
            return openCategoryMenu(player, catId);
        }

        system.run(() => {
            if (action === 0) { // BELI
                const total = item.buy * amount;
                if (playerMoney < total) return player.sendMessage("§c[Shop] Uang tidak cukup!");
                if (!reduceStock(item.id, amount, item.stockMax)) {
                    return player.sendMessage(`§c[Shop] Maaf, stok server tidak cukup!`);
                }
                removeMoney(player, total);
                player.runCommand(`give @s ${item.id} ${amount}`);
                player.sendMessage(`§a[Shop] Sukses beli ${amount}x ${item.name}!`);
            } else { // JUAL
                if (inInv < amount) return player.sendMessage("§c[Shop] Barang tidak cukup!");
                const total = item.sell * amount;
                increaseStock(item.id, amount, item.stockMax);
                player.runCommand(`clear @s ${item.id} 0 ${amount}`);
                addMoney(player, total);
                player.sendMessage(`§a[Shop] Sukses jual ${amount}x ${item.name} seharga $${total}!`);
            }
            try { player.playSound("random.orb"); } catch (e) {}
        });
    });
}