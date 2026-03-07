import { world, system, EquipmentSlot } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";

// ==========================================
// DEFAULT SHOP DATA (FULL LENGKAP 11 KATEGORI)
// ==========================================
const DEFAULT_SHOP_DATA = {
    "block": {
        name: "§l§8BLOCK (Bangunan)",
        icon: "textures/blocks/stone",
        items: [
            { id: "minecraft:dirt", name: "Dirt", buy: 10, sell: 2, icon: "textures/blocks/dirt", stockMax: 4096, restockAmount: 512, restockIntervalMinutes: 5 },
            { id: "minecraft:grass_block", name: "Grass Block", buy: 40, sell: 5, icon: "textures/blocks/grass_side_carried", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:sand", name: "Sand", buy: 15, sell: 3, icon: "textures/blocks/sand", stockMax: 4096, restockAmount: 512, restockIntervalMinutes: 5 },
            { id: "minecraft:sandstone", name: "Sandstone", buy: 20, sell: 4, icon: "textures/blocks/sandstone_normal", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:red_sand", name: "Red Sand", buy: 20, sell: 4, icon: "textures/blocks/red_sand", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:gravel", name: "Gravel", buy: 15, sell: 3, icon: "textures/blocks/gravel", stockMax: 4096, restockAmount: 512, restockIntervalMinutes: 5 },
            { id: "minecraft:clay", name: "Clay Block", buy: 40, sell: 8, icon: "textures/blocks/clay", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:snow", name: "Snow Block", buy: 20, sell: 4, icon: "textures/blocks/snow", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:ice", name: "Ice", buy: 30, sell: 5, icon: "textures/blocks/ice", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:packed_ice", name: "Packed Ice", buy: 80, sell: 15, icon: "textures/blocks/ice_packed", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
            { id: "minecraft:blue_ice", name: "Blue Ice", buy: 200, sell: 40, icon: "textures/blocks/blue_ice", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 30 },
            { id: "minecraft:cobblestone", name: "Cobblestone", buy: 10, sell: 2, icon: "textures/blocks/cobblestone", stockMax: 4096, restockAmount: 512, restockIntervalMinutes: 5 },
            { id: "minecraft:stone", name: "Stone", buy: 20, sell: 4, icon: "textures/blocks/stone", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:stonebrick", name: "Stone Bricks", buy: 25, sell: 5, icon: "textures/blocks/stonebrick", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:andesite", name: "Andesite", buy: 15, sell: 3, icon: "textures/blocks/stone_andesite", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:diorite", name: "Diorite", buy: 15, sell: 3, icon: "textures/blocks/stone_diorite", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:granite", name: "Granite", buy: 15, sell: 3, icon: "textures/blocks/stone_granite", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:deepslate", name: "Deepslate", buy: 20, sell: 4, icon: "textures/blocks/deepslate", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:cobbled_deepslate", name: "Cobbled Deepslate", buy: 15, sell: 3, icon: "textures/blocks/cobbled_deepslate", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:deepslate_bricks", name: "Deepslate Bricks", buy: 30, sell: 6, icon: "textures/blocks/deepslate_bricks", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:calcite", name: "Calcite", buy: 40, sell: 8, icon: "textures/blocks/calcite", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:tuff", name: "Tuff", buy: 25, sell: 5, icon: "textures/blocks/tuff", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:brick_block", name: "Bricks", buy: 50, sell: 10, icon: "textures/blocks/brick", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:oak_log", name: "Oak Log", buy: 40, sell: 8, icon: "textures/blocks/log_oak", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:birch_log", name: "Birch Log", buy: 40, sell: 8, icon: "textures/blocks/log_birch", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:spruce_log", name: "Spruce Log", buy: 40, sell: 8, icon: "textures/blocks/log_spruce", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:jungle_log", name: "Jungle Log", buy: 40, sell: 8, icon: "textures/blocks/log_jungle", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:acacia_log", name: "Acacia Log", buy: 40, sell: 8, icon: "textures/blocks/log_acacia", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:dark_oak_log", name: "Dark Oak Log", buy: 40, sell: 8, icon: "textures/blocks/log_big_oak", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:mangrove_log", name: "Mangrove Log", buy: 45, sell: 9, icon: "textures/blocks/mangrove_log_side", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:cherry_log", name: "Cherry Log", buy: 50, sell: 10, icon: "textures/blocks/cherry_log", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:planks", name: "Oak Planks", buy: 15, sell: 2, icon: "textures/blocks/planks_oak", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 5 },
            { id: "minecraft:white_concrete", name: "White Concrete", buy: 30, sell: 5, icon: "textures/blocks/concrete_white", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:black_concrete", name: "Black Concrete", buy: 30, sell: 5, icon: "textures/blocks/concrete_black", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:gray_concrete", name: "Gray Concrete", buy: 30, sell: 5, icon: "textures/blocks/concrete_gray", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:red_concrete", name: "Red Concrete", buy: 30, sell: 5, icon: "textures/blocks/concrete_red", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:yellow_concrete", name: "Yellow Concrete", buy: 30, sell: 5, icon: "textures/blocks/concrete_yellow", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:blue_concrete", name: "Blue Concrete", buy: 30, sell: 5, icon: "textures/blocks/concrete_blue", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:terracotta", name: "Terracotta", buy: 35, sell: 6, icon: "textures/blocks/hardened_clay", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:netherrack", name: "Netherrack", buy: 10, sell: 1, icon: "textures/blocks/netherrack", stockMax: 4096, restockAmount: 512, restockIntervalMinutes: 5 },
            { id: "minecraft:nether_brick", name: "Nether Bricks", buy: 30, sell: 5, icon: "textures/blocks/nether_brick", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:basalt", name: "Basalt", buy: 20, sell: 4, icon: "textures/blocks/basalt_top", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:blackstone", name: "Blackstone", buy: 25, sell: 5, icon: "textures/blocks/blackstone", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:glowstone", name: "Glowstone", buy: 100, sell: 20, icon: "textures/blocks/glowstone", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
            { id: "minecraft:quartz_block", name: "Block of Quartz", buy: 120, sell: 25, icon: "textures/blocks/quartz_block_top", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
            { id: "minecraft:end_stone", name: "End Stone", buy: 50, sell: 10, icon: "textures/blocks/end_stone", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:purpur_block", name: "Purpur Block", buy: 100, sell: 20, icon: "textures/blocks/purpur_block", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
            { id: "minecraft:coal_block", name: "Block of Coal", buy: 200, sell: 40, icon: "textures/blocks/coal_block", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 30 },
            { id: "minecraft:copper_block", name: "Block of Copper", buy: 250, sell: 50, icon: "textures/blocks/copper_block", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 30 },
            { id: "minecraft:iron_block", name: "Block of Iron", buy: 500, sell: 100, icon: "textures/blocks/iron_block", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 45 },
            { id: "minecraft:gold_block", name: "Block of Gold", buy: 1000, sell: 200, icon: "textures/blocks/gold_block", stockMax: 64, restockAmount: 8, restockIntervalMinutes: 60 },
            { id: "minecraft:diamond_block", name: "Block of Diamond", buy: 5000, sell: 1000, icon: "textures/blocks/diamond_block", stockMax: 32, restockAmount: 4, restockIntervalMinutes: 60 },
            { id: "minecraft:emerald_block", name: "Block of Emerald", buy: 4000, sell: 800, icon: "textures/blocks/emerald_block", stockMax: 32, restockAmount: 4, restockIntervalMinutes: 60 },
            { id: "minecraft:netherite_block", name: "Block of Netherite", buy: 100000, sell: 20000, icon: "textures/blocks/netherite_block", stockMax: 5, restockAmount: 1, restockIntervalMinutes: 120 },
            { id: "minecraft:obsidian", name: "Obsidian", buy: 500, sell: 100, icon: "textures/blocks/obsidian", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 60 },
            { id: "minecraft:bedrock", name: "Bedrock (Admin)", buy: 1000000, sell: 0, icon: "textures/blocks/bedrock", stockMax: 1, restockAmount: 1, restockIntervalMinutes: 1440 }
        ]
    },
    "kaca": {
        name: "§l§bKACA (Glass)",
        icon: "textures/blocks/glass",
        items: [
            { id: "minecraft:glass", name: "Glass", buy: 20, sell: 4, icon: "textures/blocks/glass", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:glass_pane", name: "Glass Pane", buy: 10, sell: 2, icon: "textures/blocks/glass_pane", stockMax: 4096, restockAmount: 512, restockIntervalMinutes: 10 },
            { id: "minecraft:tinted_glass", name: "Tinted Glass", buy: 100, sell: 20, icon: "textures/blocks/tinted_glass", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:white_stained_glass", name: "White Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_white", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:light_gray_stained_glass", name: "Light Gray Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_light_gray", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:gray_stained_glass", name: "Gray Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_gray", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:black_stained_glass", name: "Black Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_black", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:brown_stained_glass", name: "Brown Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_brown", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:red_stained_glass", name: "Red Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_red", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:orange_stained_glass", name: "Orange Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_orange", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:yellow_stained_glass", name: "Yellow Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_yellow", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:lime_stained_glass", name: "Lime Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_lime", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:green_stained_glass", name: "Green Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_green", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:cyan_stained_glass", name: "Cyan Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_cyan", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:light_blue_stained_glass", name: "Light Blue Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_light_blue", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:blue_stained_glass", name: "Blue Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_blue", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:purple_stained_glass", name: "Purple Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_purple", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:magenta_stained_glass", name: "Magenta Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_magenta", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:pink_stained_glass", name: "Pink Stained Glass", buy: 25, sell: 5, icon: "textures/blocks/glass_pink", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 }
        ]
    },
    "dekorasi": {
        name: "§l§eDEKORASI",
        icon: "textures/ui/icon_recipe_nature",
        items: [
            { id: "minecraft:painting", name: "Painting", buy: 50, sell: 10, icon: "textures/items/painting", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 15 },
            { id: "minecraft:item_frame", name: "Item Frame", buy: 40, sell: 8, icon: "textures/items/item_frame", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 10 },
            { id: "minecraft:glow_item_frame", name: "Glow Item Frame", buy: 80, sell: 16, icon: "textures/items/glow_item_frame", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 15 },
            { id: "minecraft:armor_stand", name: "Armor Stand", buy: 150, sell: 30, icon: "textures/items/armor_stand", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 20 },
            { id: "minecraft:lantern", name: "Lantern", buy: 80, sell: 15, icon: "textures/items/lantern", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 15 },
            { id: "minecraft:soul_lantern", name: "Soul Lantern", buy: 100, sell: 20, icon: "textures/items/soul_lantern", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 15 },
            { id: "minecraft:sea_lantern", name: "Sea Lantern", buy: 300, sell: 60, icon: "textures/blocks/sea_lantern", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 20 },
            { id: "minecraft:torch", name: "Torch", buy: 5, sell: 1, icon: "textures/items/torch", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 5 },
            { id: "minecraft:candle", name: "Candle", buy: 20, sell: 4, icon: "textures/items/candle", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 10 },
            { id: "minecraft:bookshelf", name: "Bookshelf", buy: 150, sell: 30, icon: "textures/blocks/bookshelf", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 20 },
            { id: "minecraft:flower_pot", name: "Flower Pot", buy: 30, sell: 6, icon: "textures/items/flower_pot", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 10 },
            { id: "minecraft:bell", name: "Bell", buy: 500, sell: 100, icon: "textures/blocks/bell_side", stockMax: 64, restockAmount: 8, restockIntervalMinutes: 30 },
            { id: "minecraft:end_rod", name: "End Rod", buy: 200, sell: 40, icon: "textures/blocks/end_rod", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 20 },
            { id: "minecraft:allium", name: "Allium", buy: 15, sell: 3, icon: "textures/blocks/flower_allium", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 10 },
            { id: "minecraft:blue_orchid", name: "Blue Orchid", buy: 15, sell: 3, icon: "textures/blocks/flower_blue_orchid", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 10 },
            { id: "minecraft:poppy", name: "Poppy", buy: 15, sell: 3, icon: "textures/blocks/flower_rose", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 10 },
            { id: "minecraft:sunflower", name: "Sunflower", buy: 30, sell: 6, icon: "textures/blocks/flower_sunflower", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 15 }
        ]
    },
    "makanan": {
        name: "§l§6MAKANAN (Food)",
        icon: "textures/items/apple",
        items: [
            { id: "minecraft:apple", name: "Apple", buy: 15, sell: 3, icon: "textures/items/apple", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:carrot", name: "Carrot", buy: 5, sell: 1, icon: "textures/items/carrot", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 5 },
            { id: "minecraft:potato", name: "Potato", buy: 5, sell: 1, icon: "textures/items/potato", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 5 },
            { id: "minecraft:sweet_berries", name: "Sweet Berries", buy: 5, sell: 1, icon: "textures/items/sweet_berries", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 5 },
            { id: "minecraft:melon_slice", name: "Melon Slice", buy: 5, sell: 1, icon: "textures/items/melon", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 5 },
            { id: "minecraft:dried_kelp", name: "Dried Kelp", buy: 10, sell: 2, icon: "textures/items/dried_kelp", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:bread", name: "Bread", buy: 20, sell: 4, icon: "textures/items/bread", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:cooked_beef", name: "Cooked Beef", buy: 40, sell: 8, icon: "textures/items/beef_cooked", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:cooked_porkchop", name: "Cooked Porkchop", buy: 40, sell: 8, icon: "textures/items/porkchop_cooked", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:cooked_chicken", name: "Cooked Chicken", buy: 35, sell: 7, icon: "textures/items/chicken_cooked", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:cooked_mutton", name: "Cooked Mutton", buy: 35, sell: 7, icon: "textures/items/mutton_cooked", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:cooked_salmon", name: "Cooked Salmon", buy: 35, sell: 7, icon: "textures/items/salmon_cooked", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:cooked_cod", name: "Cooked Cod", buy: 30, sell: 6, icon: "textures/items/fish_cooked", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:baked_potato", name: "Baked Potato", buy: 20, sell: 4, icon: "textures/items/potato_baked", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:pumpkin_pie", name: "Pumpkin Pie", buy: 60, sell: 12, icon: "textures/items/pumpkin_pie", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 20 },
            { id: "minecraft:cookie", name: "Cookie", buy: 10, sell: 2, icon: "textures/items/cookie", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:golden_apple", name: "Golden Apple", buy: 500, sell: 100, icon: "textures/items/apple_golden", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },
            { id: "minecraft:enchanted_golden_apple", name: "Enchanted Gapple", buy: 15000, sell: 2000, icon: "textures/items/apple_golden", stockMax: 16, restockAmount: 2, restockIntervalMinutes: 60 },
            { id: "minecraft:golden_carrot", name: "Golden Carrot", buy: 150, sell: 30, icon: "textures/items/carrot_golden", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
            { id: "minecraft:chorus_fruit", name: "Chorus Fruit", buy: 80, sell: 15, icon: "textures/items/chorus_fruit", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 25 }
        ]
    },
    "tools": {
        name: "§l§3TOOLS (Alat)",
        icon: "textures/items/iron_pickaxe",
        items: [
            { id: "minecraft:iron_pickaxe", name: "Iron Pickaxe", buy: 150, sell: 30, icon: "textures/items/iron_pickaxe", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 10 },
            { id: "minecraft:iron_axe", name: "Iron Axe", buy: 150, sell: 30, icon: "textures/items/iron_axe", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 10 },
            { id: "minecraft:iron_shovel", name: "Iron Shovel", buy: 50, sell: 10, icon: "textures/items/iron_shovel", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 10 },
            { id: "minecraft:iron_hoe", name: "Iron Hoe", buy: 100, sell: 20, icon: "textures/items/iron_hoe", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 10 },
            { id: "minecraft:diamond_pickaxe", name: "Diamond Pickaxe", buy: 1000, sell: 200, icon: "textures/items/diamond_pickaxe", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },
            { id: "minecraft:diamond_axe", name: "Diamond Axe", buy: 1000, sell: 200, icon: "textures/items/diamond_axe", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },
            { id: "minecraft:diamond_shovel", name: "Diamond Shovel", buy: 400, sell: 80, icon: "textures/items/diamond_shovel", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },
            { id: "minecraft:diamond_hoe", name: "Diamond Hoe", buy: 800, sell: 160, icon: "textures/items/diamond_hoe", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },
            { id: "minecraft:netherite_pickaxe", name: "Netherite Pickaxe", buy: 15000, sell: 3000, icon: "textures/items/netherite_pickaxe", stockMax: 10, restockAmount: 1, restockIntervalMinutes: 120 },
            { id: "minecraft:netherite_axe", name: "Netherite Axe", buy: 15000, sell: 3000, icon: "textures/items/netherite_axe", stockMax: 10, restockAmount: 1, restockIntervalMinutes: 120 },
            { id: "minecraft:shears", name: "Shears", buy: 100, sell: 20, icon: "textures/items/shears", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 15 },
            { id: "minecraft:fishing_rod", name: "Fishing Rod", buy: 150, sell: 30, icon: "textures/items/fishing_rod_uncast", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 15 },
            { id: "minecraft:flint_and_steel", name: "Flint and Steel", buy: 50, sell: 10, icon: "textures/items/flint_and_steel", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 10 },
            { id: "minecraft:spyglass", name: "Spyglass", buy: 500, sell: 100, icon: "textures/items/spyglass", stockMax: 64, restockAmount: 8, restockIntervalMinutes: 30 },
            { id: "minecraft:compass", name: "Compass", buy: 200, sell: 40, icon: "textures/items/compass_item", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 20 },
            { id: "minecraft:clock", name: "Clock", buy: 500, sell: 0, icon: "textures/items/clock_item", stockMax: 64, restockAmount: 8, restockIntervalMinutes: 30 }
        ]
    },
    "armor": {
        name: "§l§9ARMOR",
        icon: "textures/items/diamond_chestplate",
        items: [
            { id: "minecraft:iron_helmet", name: "Iron Helmet", buy: 200, sell: 40, icon: "textures/items/iron_helmet", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 15 },
            { id: "minecraft:iron_chestplate", name: "Iron Chestplate", buy: 350, sell: 70, icon: "textures/items/iron_chestplate", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 20 },
            { id: "minecraft:iron_leggings", name: "Iron Leggings", buy: 300, sell: 60, icon: "textures/items/iron_leggings", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 20 },
            { id: "minecraft:iron_boots", name: "Iron Boots", buy: 150, sell: 30, icon: "textures/items/iron_boots", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 15 },
            { id: "minecraft:diamond_helmet", name: "Diamond Helmet", buy: 1500, sell: 300, icon: "textures/items/diamond_helmet", stockMax: 64, restockAmount: 8, restockIntervalMinutes: 30 },
            { id: "minecraft:diamond_chestplate", name: "Diamond Chestplate", buy: 2500, sell: 500, icon: "textures/items/diamond_chestplate", stockMax: 32, restockAmount: 4, restockIntervalMinutes: 45 },
            { id: "minecraft:diamond_leggings", name: "Diamond Leggings", buy: 2000, sell: 400, icon: "textures/items/diamond_leggings", stockMax: 32, restockAmount: 4, restockIntervalMinutes: 45 },
            { id: "minecraft:diamond_boots", name: "Diamond Boots", buy: 1200, sell: 240, icon: "textures/items/diamond_boots", stockMax: 64, restockAmount: 8, restockIntervalMinutes: 30 },
            { id: "minecraft:elytra", name: "Elytra", buy: 50000, sell: 10000, icon: "textures/items/elytra", stockMax: 10, restockAmount: 1, restockIntervalMinutes: 120 },
            { id: "minecraft:turtle_helmet", name: "Turtle Shell", buy: 2000, sell: 400, icon: "textures/items/turtle_helmet", stockMax: 32, restockAmount: 4, restockIntervalMinutes: 60 },
            { id: "minecraft:netherite_upgrade_smithing_template", name: "Netherite Template", buy: 25000, sell: 5000, icon: "textures/items/netherite_upgrade_smithing_template", stockMax: 20, restockAmount: 2, restockIntervalMinutes: 90 }
        ]
    },
    "tanaman": {
        name: "§l§aTANAMAN",
        icon: "textures/blocks/sapling_oak",
        items: [
            { id: "minecraft:oak_sapling", name: "Oak Sapling", buy: 50, sell: 5, icon: "textures/blocks/sapling_oak", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:spruce_sapling", name: "Spruce Sapling", buy: 50, sell: 5, icon: "textures/blocks/sapling_spruce", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:birch_sapling", name: "Birch Sapling", buy: 50, sell: 5, icon: "textures/blocks/sapling_birch", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:jungle_sapling", name: "Jungle Sapling", buy: 50, sell: 5, icon: "textures/blocks/sapling_jungle", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:acacia_sapling", name: "Acacia Sapling", buy: 50, sell: 5, icon: "textures/blocks/sapling_acacia", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:dark_oak_sapling", name: "Dark Oak Sapling", buy: 50, sell: 5, icon: "textures/blocks/sapling_roofed_oak", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:mangrove_propagule", name: "Mangrove Propagule", buy: 60, sell: 6, icon: "textures/blocks/mangrove_propagule", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 20 },
            { id: "minecraft:cherry_sapling", name: "Cherry Sapling", buy: 70, sell: 7, icon: "textures/blocks/cherry_sapling", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 20 },
            { id: "minecraft:sugar_cane", name: "Sugar Cane", buy: 20, sell: 4, icon: "textures/items/reeds", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:bamboo", name: "Bamboo", buy: 20, sell: 4, icon: "textures/items/bamboo", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:cactus", name: "Cactus", buy: 20, sell: 4, icon: "textures/blocks/cactus_side", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:nether_wart", name: "Nether Wart", buy: 150, sell: 30, icon: "textures/items/nether_wart", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
            { id: "minecraft:sweet_berries", name: "Sweet Berries", buy: 10, sell: 2, icon: "textures/items/sweet_berries", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:glow_berries", name: "Glow Berries", buy: 30, sell: 6, icon: "textures/items/glow_berries", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:sea_pickle", name: "Sea Pickle", buy: 100, sell: 20, icon: "textures/blocks/sea_pickle", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 20 },
            { id: "minecraft:kelp", name: "Kelp", buy: 10, sell: 2, icon: "textures/items/kelp", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:moss_block", name: "Moss Block", buy: 40, sell: 8, icon: "textures/blocks/moss_block", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:big_dripleaf", name: "Big Dripleaf", buy: 80, sell: 15, icon: "textures/blocks/big_dripleaf_top", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 20 }
        ]
    },
    "benih": {
        name: "§l§2BENIH (Seeds)",
        icon: "textures/items/seeds_wheat",
        items: [
            { id: "minecraft:wheat_seeds", name: "Wheat Seeds", buy: 5, sell: 1, icon: "textures/items/seeds_wheat", stockMax: 4096, restockAmount: 512, restockIntervalMinutes: 5 },
            { id: "minecraft:pumpkin_seeds", name: "Pumpkin Seeds", buy: 15, sell: 3, icon: "textures/items/seeds_pumpkin", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:melon_seeds", name: "Melon Seeds", buy: 15, sell: 3, icon: "textures/items/seeds_melon", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:beetroot_seeds", name: "Beetroot Seeds", buy: 10, sell: 2, icon: "textures/items/seeds_beetroot", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:torchflower_seeds", name: "Torchflower Seeds", buy: 500, sell: 100, icon: "textures/items/torchflower_seeds", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },
            { id: "minecraft:pitcher_pod", name: "Pitcher Pod", buy: 500, sell: 100, icon: "textures/items/pitcher_pod", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },
            { id: "minecraft:cocoa_beans", name: "Cocoa Beans", buy: 30, sell: 6, icon: "textures/items/dye_powder_brown", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 }
        ]
    },
    "misc": {
        name: "§l§dMISCELLANEOUS",
        icon: "textures/items/ender_pearl",
        items: [
            { id: "minecraft:stick", name: "Stick", buy: 2, sell: 1, icon: "textures/items/stick", stockMax: 4096, restockAmount: 512, restockIntervalMinutes: 5 },
            { id: "minecraft:string", name: "String", buy: 15, sell: 3, icon: "textures/items/string", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:feather", name: "Feather", buy: 10, sell: 2, icon: "textures/items/feather", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:leather", name: "Leather", buy: 30, sell: 6, icon: "textures/items/leather", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:book", name: "Book", buy: 50, sell: 10, icon: "textures/items/book_normal", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
            { id: "minecraft:paper", name: "Paper", buy: 10, sell: 2, icon: "textures/items/paper", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:redstone", name: "Redstone Dust", buy: 20, sell: 4, icon: "textures/items/redstone_dust", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:gunpowder", name: "Gunpowder", buy: 60, sell: 12, icon: "textures/items/gunpowder", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:slime_ball", name: "Slime Ball", buy: 100, sell: 20, icon: "textures/items/slimeball", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
            { id: "minecraft:blaze_rod", name: "Blaze Rod", buy: 250, sell: 50, icon: "textures/items/blaze_rod", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 25 },
            { id: "minecraft:ghast_tear", name: "Ghast Tear", buy: 800, sell: 160, icon: "textures/items/ghast_tear", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },
            { id: "minecraft:ender_pearl", name: "Ender Pearl", buy: 200, sell: 40, icon: "textures/items/ender_pearl", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 20 },
            { id: "minecraft:firework_rocket", name: "Firework Rocket", buy: 100, sell: 10, icon: "textures/items/fireworks", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:name_tag", name: "Name Tag", buy: 500, sell: 100, icon: "textures/items/name_tag", stockMax: 64, restockAmount: 8, restockIntervalMinutes: 45 },
            { id: "minecraft:saddle", name: "Saddle", buy: 1500, sell: 300, icon: "textures/items/saddle", stockMax: 32, restockAmount: 4, restockIntervalMinutes: 60 },
            { id: "minecraft:totem_of_undying", name: "Totem of Undying", buy: 25000, sell: 5000, icon: "textures/items/totem", stockMax: 5, restockAmount: 1, restockIntervalMinutes: 180 },
            { id: "minecraft:nether_star", name: "Nether Star", buy: 100000, sell: 20000, icon: "textures/items/nether_star", stockMax: 3, restockAmount: 1, restockIntervalMinutes: 240 },
            { id: "minecraft:experience_bottle", name: "Bottle o' Enchanting", buy: 300, sell: 30, icon: "textures/items/experience_bottle", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 }
        ]
    },
    "ores": {
        name: "§l§3ORES (Tambang)",
        icon: "textures/items/diamond",
        items: [
            { id: "minecraft:coal", name: "Coal", buy: 20, sell: 4, icon: "textures/items/coal", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:charcoal", name: "Charcoal", buy: 15, sell: 2, icon: "textures/items/charcoal", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:lapis_lazuli", name: "Lapis Lazuli", buy: 30, sell: 6, icon: "textures/items/dye_powder_blue", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:raw_iron", name: "Raw Iron", buy: 40, sell: 8, icon: "textures/items/raw_iron", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:iron_ingot", name: "Iron Ingot", buy: 60, sell: 12, icon: "textures/items/iron_ingot", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:raw_gold", name: "Raw Gold", buy: 80, sell: 16, icon: "textures/items/raw_gold", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
            { id: "minecraft:gold_ingot", name: "Gold Ingot", buy: 120, sell: 24, icon: "textures/items/gold_ingot", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
            { id: "minecraft:raw_copper", name: "Raw Copper", buy: 20, sell: 4, icon: "textures/items/raw_copper", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:copper_ingot", name: "Copper Ingot", buy: 30, sell: 6, icon: "textures/items/copper_ingot", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:diamond", name: "Diamond", buy: 600, sell: 120, icon: "textures/items/diamond", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 30 },
            { id: "minecraft:emerald", name: "Emerald", buy: 500, sell: 100, icon: "textures/items/emerald", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 30 },
            { id: "minecraft:quartz", name: "Nether Quartz", buy: 40, sell: 8, icon: "textures/items/quartz", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
            { id: "minecraft:netherite_scrap", name: "Netherite Scrap", buy: 4000, sell: 800, icon: "textures/items/netherite_scrap", stockMax: 64, restockAmount: 4, restockIntervalMinutes: 60 },
            { id: "minecraft:netherite_ingot", name: "Netherite Ingot", buy: 18000, sell: 3500, icon: "textures/items/netherite_ingot", stockMax: 16, restockAmount: 2, restockIntervalMinutes: 120 }
        ]
    },
    "panen": {
        name: "§l§aHASIL PANEN",
        icon: "textures/items/wheat",
        items: [
            { id: "minecraft:wheat", name: "Wheat", buy: 10, sell: 2, icon: "textures/items/wheat", stockMax: 4096, restockAmount: 512, restockIntervalMinutes: 5 },
            { id: "minecraft:carrot", name: "Carrot", buy: 5, sell: 1, icon: "textures/items/carrot", stockMax: 4096, restockAmount: 512, restockIntervalMinutes: 5 },
            { id: "minecraft:potato", name: "Potato", buy: 5, sell: 1, icon: "textures/items/potato", stockMax: 4096, restockAmount: 512, restockIntervalMinutes: 5 },
            { id: "minecraft:beetroot", name: "Beetroot", buy: 8, sell: 1, icon: "textures/items/beetroot", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:melon_slice", name: "Melon Slice", buy: 5, sell: 1, icon: "textures/items/melon", stockMax: 4096, restockAmount: 512, restockIntervalMinutes: 5 },
            { id: "minecraft:pumpkin", name: "Pumpkin", buy: 20, sell: 4, icon: "textures/blocks/pumpkin_face_off", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:cocoa_beans", name: "Cocoa Beans", buy: 20, sell: 4, icon: "textures/items/dye_powder_brown", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
            { id: "minecraft:nether_wart", name: "Nether Wart", buy: 100, sell: 20, icon: "textures/items/nether_wart", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
            { id: "minecraft:sugar_cane", name: "Sugar Cane", buy: 15, sell: 3, icon: "textures/items/reeds", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
            { id: "minecraft:honeycomb", name: "Honeycomb", buy: 150, sell: 30, icon: "textures/items/honeycomb", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 20 }
        ]
    }
};

// ==========================================
// DATABASE & SETTINGS MANAGER
// ==========================================
function getShopData() {
    const raw = world.getDynamicProperty("shop_data_custom");
    return raw ? JSON.parse(raw) : DEFAULT_SHOP_DATA;
}

function saveShopData(data) {
    world.setDynamicProperty("shop_data_custom", JSON.stringify(data));
    startAutoRestock(); 
}

function getCurrency() {
    return world.getDynamicProperty("shop_currency") || "money";
}

function isStockMode() {
    const mode = world.getDynamicProperty("shop_stock_mode");
    return mode === undefined ? true : mode;
}

function getGlobalRestockInterval() {
    return world.getDynamicProperty("shop_global_interval") || 10;
}

function getGlobalRestockAmount() {
    return world.getDynamicProperty("shop_global_amount") || 100;
}

// ==========================================
// UTILS: ECONOMY, INVENTORY & FORMATTER
// ==========================================
function formatMoney(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + "B";
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + "K";
    return num.toString();
}

function formatTime(ms) {
    if (ms <= 0) return "Sekarang";
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    let res = [];
    if (h > 0) res.push(`${h}j`);
    if (m > 0) res.push(`${m}m`);
    if (s > 0 || res.length === 0) res.push(`${s}d`);
    return res.join(" ");
}

function getMoney(player) {
    try {
        const obj = world.scoreboard.getObjective(getCurrency());
        return obj ? (obj.getScore(player.scoreboardIdentity) || 0) : 0;
    } catch(e) { return 0; }
}

function addMoney(player, amount) {
    try { 
        const obj = world.scoreboard.getObjective(getCurrency());
        if(obj) obj.setScore(player.scoreboardIdentity, getMoney(player) + amount);
    } catch(e){}
}

function removeMoney(player, amount) {
    try { 
        const obj = world.scoreboard.getObjective(getCurrency());
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

function getStock(itemId, stockMax) {
    const raw = world.getDynamicProperty("stock_" + itemId);
    return typeof raw === "number" ? raw : stockMax; 
}

function setStock(itemId, value) {
    world.setDynamicProperty("stock_" + itemId, Math.max(0, Math.floor(value)));
}

function reduceStock(itemId, amount, stockMax) {
    if (!isStockMode()) return true; 
    const current = getStock(itemId, stockMax);
    if (current < amount) return false; 
    setStock(itemId, current - amount);
    return true; 
}

function increaseStock(itemId, amount, stockMax) {
    if (!isStockMode()) return; 
    const current = getStock(itemId, stockMax);
    setStock(itemId, Math.min(stockMax, current + amount)); 
}

// ==========================================
// SELL ALL INVENTORY LOGIC
// ==========================================
function sellAllInventory(player) {
    const inv = player.getComponent("inventory").container;
    const shopData = getShopData();
    const currency = getCurrency();
    
    const sellableItems = {};
    for (const catKey in shopData) {
        if (!shopData[catKey] || !shopData[catKey].items) continue;
        for (const item of shopData[catKey].items) {
            if (item.sell > 0) {
                sellableItems[item.id] = item;
            }
        }
    }

    let totalEarned = 0;
    let soldSummary = {}; 
    let itemsSold = false;

    for (let i = 0; i < inv.size; i++) {
        const item = inv.getItem(i);
        if (!item) continue;

        const shopItem = sellableItems[item.typeId];
        if (shopItem) {
            const amount = item.amount;
            const value = amount * shopItem.sell;
            
            totalEarned += value;
            
            if (!soldSummary[shopItem.name]) {
                soldSummary[shopItem.name] = { id: shopItem.id, amount: 0, value: 0, maxStock: shopItem.stockMax };
            }
            soldSummary[shopItem.name].amount += amount;
            soldSummary[shopItem.name].value += value;
            
            inv.setItem(i, undefined);
            itemsSold = true;
        }
    }

    if (!itemsSold) {
        player.sendMessage("§c[Shop] Tidak ada item di tasmu yang laku dijual ke Shop!");
        try { player.playSound("note.bass"); } catch(e){}
        return;
    }

    addMoney(player, totalEarned);
    
    player.sendMessage(`\n§a§l=== NOTA SELL ALL ===`);
    for (const name in soldSummary) {
        const data = soldSummary[name];
        player.sendMessage(`§f- ${name} x${data.amount} : §e+${formatMoney(data.value)} ${currency}`);
        increaseStock(data.id, data.amount, data.maxStock);
    }
    player.sendMessage(`§a§lTotal Pendapatan: §e+${formatMoney(totalEarned)} ${currency}`);
    player.sendMessage(`§a§l=====================\n`);
    
    try { player.playSound("random.levelup"); } catch(e){}
}

// ==========================================
// AUTO-RESTOCK MANAGER (GLOBAL LOOP & ANNOUNCEMENT)
// ==========================================
let restockLoopId;

function startAutoRestock() {
    if (restockLoopId) system.clearRun(restockLoopId);
    
    restockLoopId = system.runInterval(() => {
        if (!isStockMode()) return;
        
        const now = Date.now();
        const shopData = getShopData();
        const globalInterval = getGlobalRestockInterval();
        const globalAmount = getGlobalRestockAmount();
        let restockedNames = [];

        for (const catKey in shopData) {
            if (!shopData[catKey] || !shopData[catKey].items) continue;
            
            for (const item of shopData[catKey].items) {
                const rInterval = item.restockIntervalMinutes || globalInterval;
                const rAmount = item.restockAmount || globalAmount;
                
                const lastRestock = world.getDynamicProperty(`lastRestock_${item.id}`) || 0;
                const intervalMs = rInterval * 60 * 1000;
                
                if (now - lastRestock >= intervalMs) {
                    const current = getStock(item.id, item.stockMax);
                    
                    if (current < item.stockMax) {
                        const add = Math.min(rAmount, item.stockMax - current);
                        increaseStock(item.id, add, item.stockMax);
                        
                        if (lastRestock !== 0) {
                            restockedNames.push(item.name);
                        }
                    }
                    world.setDynamicProperty(`lastRestock_${item.id}`, now);
                }
            }
        }

        if (restockedNames.length > 0) {
            let msgList = restockedNames.join(", ");
            if (restockedNames.length > 10) {
                msgList = `${restockedNames.slice(0, 10).join(", ")} §7dan ${restockedNames.length - 10} item lainnya§f`;
            }
            world.sendMessage(`§a[Shop] §eRestock Selesai: §f${msgList}`);
        }
    }, 20);
}
system.runTimeout(() => { startAutoRestock(); }, 40);

// ==========================================
// PLAYER UI: SHOP MENU (SERVER UI CUSTOM)
// ==========================================
export function openShopMenu(player) {
    const shopData = getShopData();
    const currency = getCurrency();
    const keys = Object.keys(shopData);
    
    const form = new ActionFormData()
        // TITLE INI "§lRANK SHOP§f§0§1" HARUS PERSIS SAMA DENGAN BINDING DI server_form.json KAMU
        .title("§lRANK SHOP§f§0§1")
        .body(`Uangmu: §a${formatMoney(getMoney(player))} ${currency}§r\n\n§ePilih Kategori untuk berbelanja:`);

    for (const key of keys) {
        form.button(`${shopData[key].name}`, shopData[key].icon);
    }
    
    form.button("§l§aSELL ALL INVENTORY", "textures/items/emerald");
    form.button("§cTutup Menu", "textures/ui/cancel");

    form.show(player).then(res => {
        if (res.canceled) return;
        if (res.selection === keys.length) return system.run(() => sellAllInventory(player));
        if (res.selection === keys.length + 1) return; // Tutup
        openCategoryMenu(player, keys[res.selection]);
    });
}

function openCategoryMenu(player, categoryId) {
    const shopData = getShopData();
    const cat = shopData[categoryId];
    const currency = getCurrency();
    const useStock = isStockMode();
    const globalInterval = getGlobalRestockInterval();

    // MEMBUAT BODY TEKS RAPI DI ATAS TOMBOL
    let bodyText = `Uangmu: §a${formatMoney(getMoney(player))} ${currency}§r\n\n§e--- DAFTAR BARANG ---\n`;
    
    for (const itm of cat.items) {
        let stockText = "§dStok: ∞";
        if (useStock) {
            const currentStock = getStock(itm.id, itm.stockMax);
            if (currentStock >= itm.stockMax) {
                stockText = `§2Stok: ${currentStock} §8(Penuh)`;
            } else {
                const lastRestock = world.getDynamicProperty(`lastRestock_${itm.id}`) || Date.now();
                const rInterval = itm.restockIntervalMinutes || globalInterval;
                const intervalMs = rInterval * 60 * 1000;
                const timeLeft = Math.max(0, (lastRestock + intervalMs) - Date.now());
                const timeStr = formatTime(timeLeft);

                if (currentStock > 0) {
                    stockText = `§2Stok: ${currentStock} §8(+ dlm ${timeStr})`;
                } else {
                    stockText = `§cHABIS §8(Restock dlm ${timeStr})`;
                }
            }
        }
        // Menambahkan rincian barang ke dalam body text agar tidak terpotong di tombol
        bodyText += `§f${itm.name} §8- §aB: ${formatMoney(itm.buy)} §c| J: ${formatMoney(itm.sell)} §8| ${stockText}\n`;
    }

    const form = new ActionFormData()
        .title("§lRANK SHOP§f§0§1")
        .body(bodyText);

    // Tombol sekarang hanya berisi Nama Barang saja agar muat di kotak kecil
    for (const itm of cat.items) {
        form.button(`§l${itm.name}`, itm.icon);
    }
    form.button("§8[ Kembali ]", "textures/ui/undo");

    form.show(player).then(res => {
        if (res.canceled) return;
        if (res.selection === cat.items.length) return openShopMenu(player);
        openTransaction(player, categoryId, res.selection);
    });
}

function openTransaction(player, catId, idx) {
    const shopData = getShopData();
    const item = shopData[catId].items[idx];
    const playerMoney = getMoney(player);
    const inInv = getPlayerItemCount(player, item.id);
    const useStock = isStockMode();
    const currency = getCurrency();
    const globalInterval = getGlobalRestockInterval();
    
    let stockDisplay = "§d∞ (Unlimited)";
    if (useStock) {
        const currentStock = getStock(item.id, item.stockMax);
        
        if (currentStock >= item.stockMax) {
            stockDisplay = `§e${currentStock} pcs §8(Penuh)`;
        } else {
            const lastRestock = world.getDynamicProperty(`lastRestock_${item.id}`) || Date.now();
            const rInterval = item.restockIntervalMinutes || globalInterval;
            const intervalMs = rInterval * 60 * 1000;
            const timeLeft = Math.max(0, (lastRestock + intervalMs) - Date.now());
            const timeStr = formatTime(timeLeft);
            stockDisplay = `§e${currentStock} pcs §7(Restock dlm ${timeStr})`;
        }
    }

    const form = new ModalFormData()
        .title(`TRANSAKSI: ${item.name}`)
        .dropdown(`§7--- INFO BARANG ---\n§fItem: §b${item.name}\n§fHarga Beli: §a${formatMoney(item.buy)} ${currency}\n§fHarga Jual: §c${formatMoney(item.sell)} ${currency}\n§fStok Server: ${stockDisplay}\n\n§7--- STATUS KAMU ---\n§fUang: §a${formatMoney(playerMoney)} ${currency}\n§fPunya: §b${inInv} pcs\n\nPilih Aksi:`, ["§l§aBELI (Buy)", "§l§cJUAL (Sell)"])
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
                if (playerMoney < total) return player.sendMessage(`§c[Shop] Uang (${currency}) tidak cukup!`);
                if (!reduceStock(item.id, amount, item.stockMax)) {
                    return player.sendMessage(`§c[Shop] Maaf, stok server tidak cukup!`);
                }
                removeMoney(player, total);
                player.runCommand(`give @s ${item.id} ${amount}`);
                player.sendMessage(`§a[Shop] Sukses beli ${amount}x ${item.name} seharga ${formatMoney(total)} ${currency}!`);
            } else { // JUAL
                if (item.sell <= 0) return player.sendMessage("§c[Shop] Barang ini tidak bisa dijual!");
                if (inInv < amount) return player.sendMessage("§c[Shop] Barang di tas tidak cukup!");
                
                const total = item.sell * amount;
                increaseStock(item.id, amount, item.stockMax);
                player.runCommand(`clear @s ${item.id} 0 ${amount}`);
                addMoney(player, total);
                player.sendMessage(`§a[Shop] Sukses jual ${amount}x ${item.name} seharga ${formatMoney(total)} ${currency}!`);
            }
            try { player.playSound("random.orb"); } catch (e) {}
        });
    });
}

// ==========================================
// ADMIN UI: SHOP CONFIGURATION
// ==========================================
export function openShopConfig(player) {
    if (!player.hasTag("admin")) return player.sendMessage("§cNo permission.");

    const form = new ActionFormData()
        .title("§l§cSHOP ADMIN PANEL")
        .body("Atur Shop Server secara Real-Time.")
        .button("§lSetting Global\n§r§8Mode & Currency", "textures/ui/icon_setting")
        .button("§lKelola Kategori\n§r§8Tambah / Hapus Kategori", "textures/ui/icon_recipe_item")
        .button("§lKelola Item Shop\n§r§8Import Inventory / Hapus", "textures/ui/inventory_icon")
        .button("§lRESET SHOP\n§r§8Kembali ke Default", "textures/ui/warning_alex");

    form.show(player).then(res => {
        if (res.canceled) return;
        if (res.selection === 0) return manageGlobalSettings(player);
        if (res.selection === 1) return manageCategories(player);
        if (res.selection === 2) return selectCategoryToManageItems(player);
        if (res.selection === 3) return confirmResetShop(player);
    });
}

function manageGlobalSettings(player) {
    const currentMode = isStockMode();
    const currentCurrency = getCurrency();
    const currentInterval = getGlobalRestockInterval();
    const currentAmount = getGlobalRestockAmount();

    const form = new ModalFormData()
        .title("SETTING GLOBAL")
        .toggle("Gunakan Sistem Stok Terbatas (Auto-Restock)?\n(Jika OFF, stok = Unlimited)", { defaultValue: currentMode })
        .textField("Scoreboard Currency (Mata Uang):", "contoh: money", { defaultValue: String(currentCurrency) })
        .textField("Default Waktu Restock (Menit)\nBerlaku untuk item yg tidak disetting spesifik:", "10", { defaultValue: String(currentInterval) })
        .textField("Default Jumlah Restock per siklus:", "100", { defaultValue: String(currentAmount) });

    form.show(player).then(res => {
        if (res.canceled) return openShopConfig(player);
        world.setDynamicProperty("shop_stock_mode", res.formValues[0]);
        world.setDynamicProperty("shop_currency", res.formValues[1]);
        
        const newInterval = parseInt(res.formValues[2]);
        if (!isNaN(newInterval)) world.setDynamicProperty("shop_global_interval", newInterval);
        
        const newAmount = parseInt(res.formValues[3]);
        if (!isNaN(newAmount)) world.setDynamicProperty("shop_global_amount", newAmount);

        startAutoRestock();
        player.sendMessage("§a[Shop Config] Pengaturan Global berhasil disimpan!");
    });
}

function manageCategories(player) {
    const shopData = getShopData();
    const keys = Object.keys(shopData);

    const form = new ActionFormData()
        .title("KELOLA KATEGORI")
        .button("§l§aTambah Kategori Baru\n§r§8Buat Kategori", "textures/ui/color_plus");

    for (const key of keys) {
        form.button(`§l§c[HAPUS] §r${shopData[key].name}`, shopData[key].icon);
    }

    form.show(player).then(res => {
        if (res.canceled) return openShopConfig(player);
        if (res.selection === 0) return addCategory(player);
        
        const targetKey = keys[res.selection - 1];
        delete shopData[targetKey];
        saveShopData(shopData);
        player.sendMessage(`§a[Shop Config] Kategori berhasil dihapus!`);
        manageCategories(player);
    });
}

function addCategory(player) {
    const form = new ModalFormData()
        .title("TAMBAH KATEGORI")
        .textField("ID Kategori (huruf kecil, tanpa spasi):", "contoh: block_mewah", { defaultValue: "" })
        .textField("Nama Display (Boleh pakai warna §):", "contoh: §l§6BLOCK MEWAH", { defaultValue: "" })
        .textField("Icon (Path Texture):", "contoh: textures/blocks/diamond_block", { defaultValue: "" });

    form.show(player).then(res => {
        if (res.canceled) return manageCategories(player);
        const id = res.formValues[0].replace(/\s/g, '').toLowerCase();
        const name = res.formValues[1];
        const icon = res.formValues[2];

        if (!id || !name) return player.sendMessage("§cID dan Nama tidak boleh kosong!");

        const shopData = getShopData();
        shopData[id] = { name: name, icon: icon, items: [] };
        saveShopData(shopData);
        player.sendMessage(`§a[Shop Config] Kategori ${name} berhasil ditambahkan!`);
    });
}

function selectCategoryToManageItems(player) {
    const shopData = getShopData();
    const keys = Object.keys(shopData);

    const form = new ActionFormData()
        .title("PILIH KATEGORI")
        .body("Pilih kategori tempat item akan ditambah/dihapus:");

    for (const key of keys) {
        form.button(`${shopData[key].name}`, shopData[key].icon);
    }

    form.show(player).then(res => {
        if (res.canceled) return openShopConfig(player);
        manageItemsInCategory(player, keys[res.selection]);
    });
}

function manageItemsInCategory(player, catKey) {
    const shopData = getShopData();
    const items = shopData[catKey].items;

    const form = new ActionFormData()
        .title(`KELOLA: ${shopData[catKey].name}`)
        .button("§l§a+ Import dari Inventory\n§r§8Pilih item dari tasmu", "textures/ui/color_plus");

    for (let i = 0; i < items.length; i++) {
        form.button(`§l§e[EDIT] §r${items[i].name}\n§8Beli: ${formatMoney(items[i].buy)} | Jual: ${formatMoney(items[i].sell)}`, items[i].icon);
    }
    form.button("§cKembali", "textures/ui/cancel");

    form.show(player).then(res => {
        if (res.canceled || res.selection === items.length + 1) return selectCategoryToManageItems(player);
        if (res.selection === 0) return selectItemFromInventory(player, catKey);

        const itemIdx = res.selection - 1;
        editItemConfig(player, catKey, itemIdx);
    });
}

function selectItemFromInventory(player, catKey) {
    const inv = player.getComponent("inventory").container;
    const form = new ActionFormData()
        .title("Pilih Item dari Tas")
        .body("Pilih item yang ingin kamu masukkan ke dalam Shop:");

    let slotMap = [];
    for (let i = 0; i < inv.size; i++) {
        const item = inv.getItem(i);
        if (item && item.typeId !== "minecraft:air") {
            let name = item.nameTag || item.typeId.replace("minecraft:", "").replace(/_/g, " ").toUpperCase();
            form.button(`Slot ${i + 1}: ${name} x${item.amount}`, "textures/ui/inventory_icon");
            slotMap.push(i);
        }
    }

    if (slotMap.length === 0) form.body("Tasmu kosong!");
    form.button("§cBatal", "textures/ui/cancel");

    form.show(player).then(res => {
        if (res.canceled || res.selection === slotMap.length) return manageItemsInCategory(player, catKey);
        
        const slot = slotMap[res.selection];
        const item = inv.getItem(slot);
        if (!item) return manageItemsInCategory(player, catKey);

        setupNewItemConfig(player, catKey, item.typeId);
    });
}

function setupNewItemConfig(player, catKey, typeId) {
    const defaultName = typeId.replace("minecraft:", "").replace(/_/g, " ").toUpperCase();
    const globalInterval = getGlobalRestockInterval();
    const globalAmount = getGlobalRestockAmount();

    const form = new ModalFormData()
        .title(`IMPORT: ${defaultName}`)
        .textField("Nama Display (Custom):", "Kosongkan untuk nama asli", { defaultValue: String(defaultName) })
        .textField("Harga Beli (Buy):", "0 untuk gratis", { defaultValue: "100" })
        .textField("Harga Jual (Sell):", "0 untuk tidak bisa dijual", { defaultValue: "20" })
        .textField("Path Icon (Bisa kosong):", "textures/items/...", { defaultValue: "" })
        .textField("Max Stok Server:", "1000", { defaultValue: "1000" })
        .textField("Restock Amount (Jumlah per siklus):", String(globalAmount), { defaultValue: String(globalAmount) })
        .textField("Interval Restock (Menit):", String(globalInterval), { defaultValue: String(globalInterval) });

    form.show(player).then(res => {
        if (res.canceled) return selectItemFromInventory(player, catKey);

        const shopData = getShopData();
        const newItem = {
            id: typeId,
            name: res.formValues[0],
            buy: parseInt(res.formValues[1]) || 0,
            sell: parseInt(res.formValues[2]) || 0,
            icon: res.formValues[3] || "textures/ui/icon_recipe_item",
            stockMax: parseInt(res.formValues[4]) || 1000,
            restockAmount: parseInt(res.formValues[5]) || globalAmount,
            restockIntervalMinutes: parseInt(res.formValues[6]) || globalInterval
        };

        shopData[catKey].items.push(newItem);
        saveShopData(shopData);
        
        setStock(newItem.id, newItem.stockMax);
        world.setDynamicProperty(`lastRestock_${newItem.id}`, Date.now());
        
        player.sendMessage(`§a[Shop Config] Item ${newItem.name} berhasil di-import ke shop!`);
        manageItemsInCategory(player, catKey);
    });
}

function editItemConfig(player, catKey, itemIdx) {
    const shopData = getShopData();
    const item = shopData[catKey].items[itemIdx];

    const form = new ModalFormData()
        .title(`EDIT ITEM`)
        .textField("Nama Display:", "Nama", { defaultValue: String(item.name) })
        .textField("Harga Beli (Buy):", "100", { defaultValue: String(item.buy) })
        .textField("Harga Jual (Sell):", "20", { defaultValue: String(item.sell) })
        .textField("Path Icon:", "textures/...", { defaultValue: String(item.icon) })
        .textField("Max Stok Server:", "1000", { defaultValue: String(item.stockMax) })
        .textField("Restock Amount:", "100", { defaultValue: String(item.restockAmount || getGlobalRestockAmount()) })
        .textField("Interval Restock (Menit):", "10", { defaultValue: String(item.restockIntervalMinutes || getGlobalRestockInterval()) })
        .toggle("§c[HAPUS ITEM INI DARI SHOP]", { defaultValue: false });

    form.show(player).then(res => {
        if (res.canceled) return manageItemsInCategory(player, catKey);

        if (res.formValues[7] === true) {
            shopData[catKey].items.splice(itemIdx, 1);
            saveShopData(shopData);
            player.sendMessage(`§a[Shop Config] Item berhasil dihapus!`);
            return manageItemsInCategory(player, catKey);
        }

        item.name = res.formValues[0];
        item.buy = parseInt(res.formValues[1]) || 0;
        item.sell = parseInt(res.formValues[2]) || 0;
        item.icon = res.formValues[3];
        item.stockMax = parseInt(res.formValues[4]) || 1000;
        item.restockAmount = parseInt(res.formValues[5]) || getGlobalRestockAmount();
        item.restockIntervalMinutes = parseInt(res.formValues[6]) || getGlobalRestockInterval();

        saveShopData(shopData);
        player.sendMessage(`§a[Shop Config] Item ${item.name} berhasil diupdate!`);
        manageItemsInCategory(player, catKey);
    });
}

function confirmResetShop(player) {
    const form = new MessageFormData()
        .title("RESET SHOP DATABASE")
        .body("Apakah kamu yakin ingin mereset seluruh database Shop? Semua custom item/kategori akan terhapus dan kembali ke Shop Default bawaan Script.")
        .button1("BATAL")
        .button2("§cYA, RESET!");

    form.show(player).then(res => {
        if (res.canceled || res.selection === 0) return openShopConfig(player);
        world.setDynamicProperty("shop_data_custom", undefined);
        startAutoRestock();
        player.sendMessage("§a[Shop Config] Shop berhasil di-reset ke Default!");
    });
}