import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";

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
// DATABASE SHOP (LENGKAP 9 KATEGORI)
// ==========================================
const SHOP_DATA = {
    "block": {
        name: "§l§8BLOCK (Bangunan)",
        icon: "textures/blocks/stone",
        items: [
            { id: "minecraft:stone", name: "Stone", buy: 20, sell: 5, icon: "textures/blocks/stone" },
            { id: "minecraft:cobblestone", name: "Cobblestone", buy: 10, sell: 2, icon: "textures/blocks/cobblestone" },
            { id: "minecraft:dirt", name: "Dirt", buy: 10, sell: 1, icon: "textures/blocks/dirt" },
            { id: "minecraft:grass_block", name: "Grass Block", buy: 50, sell: 10, icon: "textures/blocks/grass_side_carried" },
            { id: "minecraft:sand", name: "Sand", buy: 15, sell: 3, icon: "textures/blocks/sand" },
            { id: "minecraft:sandstone", name: "Red Sand", buy: 15, sell: 3, icon: "textures/blocks/red_sand" },
            { id: "minecraft:gravel", name: "Gravel", buy: 15, sell: 3, icon: "textures/blocks/gravel" },
            { id: "minecraft:clay", name: "Clay Block", buy: 40, sell: 8, icon: "textures/blocks/clay" },
            { id: "minecraft:snow", name: "Snow Block", buy: 20, sell: 4, icon: "textures/blocks/snow" },
            { id: "minecraft:ice", name: "Ice", buy: 30, sell: 6, icon: "textures/blocks/ice" },
            { id: "minecraft:packed_ice", name: "Packed Ice", buy: 100, sell: 20, icon: "textures/blocks/ice_packed" },
            { id: "minecraft:blue_ice", name: "Blue Ice", buy: 400, sell: 80, icon: "textures/blocks/blue_ice" },
            { id: "minecraft:obsidian", name: "Obsidian", buy: 500, sell: 100, icon: "textures/blocks/obsidian" },
            { id: "minecraft:bedrock", name: "Bedrock", buy: 1000000, sell: 0, icon: "textures/blocks/bedrock" },
            { id: "minecraft:calcite", name: "Calcite", buy: 60, sell: 12, icon: "textures/blocks/calcite" },
            { id: "minecraft:tuff", name: "Tuff", buy: 40, sell: 8, icon: "textures/blocks/tuff" },
            // Mineral
            { id: "minecraft:coal_block", name: "Block of Coal", buy: 180, sell: 36, icon: "textures/blocks/coal_block" },
            { id: "minecraft:iron_block", name: "Block of Iron", buy: 450, sell: 90, icon: "textures/blocks/iron_block" },
            { id: "minecraft:gold_block", name: "Block of Gold", buy: 900, sell: 180, icon: "textures/blocks/gold_block" },
            { id: "minecraft:diamond_block", name: "Block of Diamond", buy: 4500, sell: 900, icon: "textures/blocks/diamond_block" },
            { id: "minecraft:emerald_block", name: "Block of Emerald", buy: 3600, sell: 720, icon: "textures/blocks/emerald_block" },
            { id: "minecraft:copper_block", name: "Block of Copper", buy: 200, sell: 40, icon: "textures/blocks/copper_block" },
            { id: "minecraft:netherite_block", name: "Block of Netherite", buy: 150000, sell: 30000, icon: "textures/blocks/netherite_block" },
            // Kayu & Planks
            { id: "minecraft:oak_log", name: "Oak Log", buy: 40, sell: 8, icon: "textures/blocks/log_oak" },
            { id: "minecraft:birch_log", name: "Birch Log", buy: 40, sell: 8, icon: "textures/blocks/log_birch" },
            { id: "minecraft:spruce_log", name: "Spruce Log", buy: 40, sell: 8, icon: "textures/blocks/log_spruce" },
            { id: "minecraft:jungle_log", name: "Jungle Log", buy: 40, sell: 8, icon: "textures/blocks/log_jungle" },
            { id: "minecraft:acacia_log", name: "Acacia Log", buy: 40, sell: 8, icon: "textures/blocks/log_acacia" },
            { id: "minecraft:dark_oak_log", name: "Dark Oak Log", buy: 40, sell: 8, icon: "textures/blocks/log_big_oak" },
            { id: "minecraft:mangrove_log", name: "Mangrove Log", buy: 40, sell: 8, icon: "textures/blocks/mangrove_log" },
            { id: "minecraft:cherry_log", name: "Cherry Log", buy: 40, sell: 8, icon: "textures/blocks/cherry_log" },
            { id: "minecraft:bamboo_block", name: "Bamboo Block", buy: 30, sell: 6, icon: "textures/blocks/bamboo_block" },
            { id: "minecraft:planks", name: "Oak Planks", buy: 15, sell: 3, icon: "textures/blocks/planks_oak" }
        ]
    },
    "kaca": {
        name: "§l§bKACA (Glass)",
        icon: "textures/blocks/glass",
        items: [
            { id: "minecraft:glass", name: "Glass", buy: 20, sell: 4, icon: "textures/blocks/glass" },
            { id: "minecraft:glass_pane", name: "Glass Pane", buy: 10, sell: 2, icon: "textures/blocks/glass_pane" },
            { id: "minecraft:tinted_glass", name: "Tinted Glass", buy: 100, sell: 20, icon: "textures/blocks/tinted_glass" },
            { id: "minecraft:white_stained_glass", name: "White Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_white" },
            { id: "minecraft:black_stained_glass", name: "Black Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_black" },
            { id: "minecraft:red_stained_glass", name: "Red Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_red" },
            { id: "minecraft:blue_stained_glass", name: "Blue Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_blue" }
        ]
    },
    "dekorasi": {
        name: "§l§eDEKORASI",
        icon: "textures/ui/icon_recipe_nature",
        items: [
            { id: "minecraft:painting", name: "Painting", buy: 50, sell: 10, icon: "textures/items/painting" },
            { id: "minecraft:frame", name: "Item Frame", buy: 40, sell: 8, icon: "textures/items/item_frame" },
            { id: "minecraft:glow_frame", name: "Glow Item Frame", buy: 80, sell: 16, icon: "textures/items/glow_item_frame" },
            { id: "minecraft:armor_stand", name: "Armor Stand", buy: 150, sell: 30, icon: "textures/items/armor_stand" },
            { id: "minecraft:flower_pot", name: "Flower Pot", buy: 30, sell: 6, icon: "textures/items/flower_pot" },
            { id: "minecraft:lantern", name: "Lantern", buy: 80, sell: 15, icon: "textures/items/lantern" },
            { id: "minecraft:soul_lantern", name: "Soul Lantern", buy: 100, sell: 20, icon: "textures/items/soul_lantern" },
            { id: "minecraft:candle", name: "Candle", buy: 20, sell: 4, icon: "textures/items/candle" },
            { id: "minecraft:bookshelf", name: "Bookshelf", buy: 150, sell: 30, icon: "textures/blocks/bookshelf" },
            { id: "minecraft:bell", name: "Bell", buy: 500, sell: 100, icon: "textures/blocks/bell_side" },
            // Bunga
            { id: "minecraft:allium", name: "Allium", buy: 15, sell: 3, icon: "textures/blocks/flower_allium" },
            { id: "minecraft:blue_orchid", name: "Blue Orchid", buy: 15, sell: 3, icon: "textures/blocks/flower_blue_orchid" },
            { id: "minecraft:poppy", name: "Poppy", buy: 15, sell: 3, icon: "textures/blocks/flower_rose" }
        ]
    },
    "makanan": {
        name: "§l§6MAKANAN (Food)",
        icon: "textures/items/apple",
        items: [
            { id: "minecraft:apple", name: "Apple", buy: 10, sell: 2, icon: "textures/items/apple" },
            { id: "minecraft:golden_apple", name: "Golden Apple", buy: 500, sell: 100, icon: "textures/items/apple_golden" },
            { id: "minecraft:enchanted_golden_apple", name: "Enchanted Gapple", buy: 10000, sell: 2000, icon: "textures/items/apple_golden" },
            { id: "minecraft:bread", name: "Bread", buy: 15, sell: 3, icon: "textures/items/bread" },
            { id: "minecraft:cooked_beef", name: "Cooked Beef", buy: 40, sell: 8, icon: "textures/items/beef_cooked" },
            { id: "minecraft:cooked_chicken", name: "Cooked Chicken", buy: 30, sell: 6, icon: "textures/items/chicken_cooked" },
            { id: "minecraft:cooked_porkchop", name: "Cooked Porkchop", buy: 40, sell: 8, icon: "textures/items/porkchop_cooked" },
            { id: "minecraft:cooked_salmon", name: "Cooked Salmon", buy: 30, sell: 6, icon: "textures/items/salmon_cooked" },
            { id: "minecraft:carrot", name: "Carrot", buy: 5, sell: 1, icon: "textures/items/carrot" },
            { id: "minecraft:potato", name: "Potato", buy: 5, sell: 1, icon: "textures/items/potato" }
        ]
    },
    "tools": {
        name: "§l§3TOOLS (Alat)",
        icon: "textures/items/iron_pickaxe",
        items: [
            { id: "minecraft:diamond_pickaxe", name: "Diamond Pickaxe", buy: 1000, sell: 200, icon: "textures/items/diamond_pickaxe" },
            { id: "minecraft:diamond_axe", name: "Diamond Axe", buy: 1000, sell: 200, icon: "textures/items/diamond_axe" },
            { id: "minecraft:diamond_shovel", name: "Diamond Shovel", buy: 400, sell: 80, icon: "textures/items/diamond_shovel" },
            { id: "minecraft:shears", name: "Shears", buy: 100, sell: 20, icon: "textures/items/shears" },
            { id: "minecraft:fishing_rod", name: "Fishing Rod", buy: 150, sell: 30, icon: "textures/items/fishing_rod_uncast" },
            { id: "minecraft:compass", name: "Compass", buy: 200, sell: 40, icon: "textures/items/compass_item" },
            { id: "minecraft:clock", name: "Clock", buy: 500, sell: 100, icon: "textures/items/clock_item" }
        ]
    },
    "armor": {
        name: "§l§9ARMOR",
        icon: "textures/items/diamond_chestplate",
        items: [
            { id: "minecraft:diamond_helmet", name: "Diamond Helmet", buy: 1500, sell: 300, icon: "textures/items/diamond_helmet" },
            { id: "minecraft:diamond_chestplate", name: "Diamond Chestplate", buy: 2500, sell: 500, icon: "textures/items/diamond_chestplate" },
            { id: "minecraft:diamond_leggings", name: "Diamond Leggings", buy: 2000, sell: 400, icon: "textures/items/diamond_leggings" },
            { id: "minecraft:diamond_boots", name: "Diamond Boots", buy: 1200, sell: 240, icon: "textures/items/diamond_boots" },
            { id: "minecraft:elytra", name: "Elytra", buy: 50000, sell: 10000, icon: "textures/items/elytra" }
        ]
    },
    "tanaman": {
        name: "§l§aTANAMAN",
        icon: "textures/blocks/sapling_oak",
        items: [
            { id: "minecraft:oak_sapling", name: "Oak Sapling", buy: 50, sell: 10, icon: "textures/blocks/sapling_oak" },
            { id: "minecraft:cactus", name: "Cactus", buy: 20, sell: 4, icon: "textures/blocks/cactus_side" },
            { id: "minecraft:sugar_cane", name: "Sugar Cane", buy: 20, sell: 4, icon: "textures/items/reeds" },
            { id: "minecraft:nether_wart", name: "Nether Wart", buy: 100, sell: 20, icon: "textures/items/nether_wart" }
        ]
    },
    "benih": {
        name: "§l§2BENIH (Seeds)",
        icon: "textures/items/seeds_wheat",
        items: [
            { id: "minecraft:wheat_seeds", name: "Wheat Seeds", buy: 5, sell: 1, icon: "textures/items/seeds_wheat" },
            { id: "minecraft:melon_seeds", name: "Melon Seeds", buy: 15, sell: 3, icon: "textures/items/seeds_melon" },
            { id: "minecraft:pumpkin_seeds", name: "Pumpkin Seeds", buy: 15, sell: 3, icon: "textures/items/seeds_pumpkin" }
        ]
    },
    "misc": {
        name: "§l§dMISCELLANEOUS",
        icon: "textures/items/diamond",
        items: [
            { id: "minecraft:stick", name: "Stick", buy: 2, sell: 1, icon: "textures/items/stick" },
            { id: "minecraft:slime_ball", name: "Slime Ball", buy: 100, sell: 20, icon: "textures/items/slimeball" },
            { id: "minecraft:ender_pearl", name: "Ender Pearl", buy: 250, sell: 50, icon: "textures/items/ender_pearl" },
            { id: "minecraft:nether_star", name: "Nether Star", buy: 100000, sell: 20000, icon: "textures/items/nether_star" },
            { id: "minecraft:redstone", name: "Redstone Dust", buy: 20, sell: 4, icon: "textures/items/redstone_dust" }
        ]
    }
};

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
        form.button(`§l${itm.name}\n§r§aBeli: $${itm.buy} §8| §cJual: $${itm.sell}`, itm.icon);
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

    const form = new ModalFormData()
        .title(`TRANSAKSI: ${item.name}`)
        .dropdown(`§7--- INFO BARANG ---\n§fItem: §b${item.name}\n§fHarga Beli: §a$${item.buy}\n§fHarga Jual: §c$${item.sell}\n\n§7--- STATUS KAMU ---\n§fUang: §a$${playerMoney}\n§fPunya: §b${inInv} pcs\n\nPilih Aksi:`, ["§l§aBELI (Buy)", "§l§cJUAL (Sell)"], 0)
        .textField("Masukkan Jumlah:", "Contoh: 1, 16, 64", "1");

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
                removeMoney(player, total);
                player.runCommandAsync(`give @s ${item.id} ${amount}`);
                player.sendMessage(`§a[Shop] Sukses beli ${amount}x ${item.name}!`);
            } else { // JUAL
                if (inInv < amount) return player.sendMessage("§c[Shop] Barang di tas tidak cukup!");
                const total = item.sell * amount;
                player.runCommandAsync(`clear @s ${item.id} 0 ${amount}`);
                addMoney(player, total);
                player.sendMessage(`§a[Shop] Sukses jual ${amount}x ${item.name} seharga $${total}!`);
            }
            player.playSound("random.orb");
        });
    });
}