export const blockCategory = {
    name: "§l§8BLOCK (Bangunan)",
    icon: "textures/blocks/stone",
    items: [
        // ==========================================
        // 1. NATURAL & TANAH (Stok Melimpah, Restock Cepat)
        // ==========================================
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

        // ==========================================
        // 2. BEBATUAN DASAR & BATA (Stok Sedang)
        // ==========================================
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

        // ==========================================
        // 3. KAYU & PLANKS (Kebutuhan Utama)
        // ==========================================
        // Logs (Batang Kayu Asli)
        { id: "minecraft:oak_log", name: "Oak Log", buy: 40, sell: 8, icon: "textures/blocks/log_oak", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        { id: "minecraft:birch_log", name: "Birch Log", buy: 40, sell: 8, icon: "textures/blocks/log_birch", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        { id: "minecraft:spruce_log", name: "Spruce Log", buy: 40, sell: 8, icon: "textures/blocks/log_spruce", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        { id: "minecraft:jungle_log", name: "Jungle Log", buy: 40, sell: 8, icon: "textures/blocks/log_jungle", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        { id: "minecraft:acacia_log", name: "Acacia Log", buy: 40, sell: 8, icon: "textures/blocks/log_acacia", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        { id: "minecraft:dark_oak_log", name: "Dark Oak Log", buy: 40, sell: 8, icon: "textures/blocks/log_big_oak", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        { id: "minecraft:mangrove_log", name: "Mangrove Log", buy: 45, sell: 9, icon: "textures/blocks/mangrove_log_side", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        { id: "minecraft:cherry_log", name: "Cherry Log", buy: 50, sell: 10, icon: "textures/blocks/cherry_log", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        // Planks (Papan Kayu)
        { id: "minecraft:planks", name: "Oak Planks", buy: 15, sell: 2, icon: "textures/blocks/planks_oak", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 5 },
        // (Bisa duplikat ID planks dengan data tambahan kalau sistemmu mendukung variant, tapi aman pakai Oak Planks saja sebagai representasi umum)

        // ==========================================
        // 4. BALOK MODERN (Concrete & Terracotta)
        // ==========================================
        { id: "minecraft:white_concrete", name: "White Concrete", buy: 30, sell: 5, icon: "textures/blocks/concrete_white", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
        { id: "minecraft:black_concrete", name: "Black Concrete", buy: 30, sell: 5, icon: "textures/blocks/concrete_black", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
        { id: "minecraft:gray_concrete", name: "Gray Concrete", buy: 30, sell: 5, icon: "textures/blocks/concrete_gray", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
        { id: "minecraft:red_concrete", name: "Red Concrete", buy: 30, sell: 5, icon: "textures/blocks/concrete_red", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
        { id: "minecraft:yellow_concrete", name: "Yellow Concrete", buy: 30, sell: 5, icon: "textures/blocks/concrete_yellow", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
        { id: "minecraft:blue_concrete", name: "Blue Concrete", buy: 30, sell: 5, icon: "textures/blocks/concrete_blue", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
        { id: "minecraft:terracotta", name: "Terracotta", buy: 35, sell: 6, icon: "textures/blocks/hardened_clay", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },

        // ==========================================
        // 5. BALOK NETHER & END (Eksotis & Langka)
        // ==========================================
        { id: "minecraft:netherrack", name: "Netherrack", buy: 10, sell: 1, icon: "textures/blocks/netherrack", stockMax: 4096, restockAmount: 512, restockIntervalMinutes: 5 },
        { id: "minecraft:nether_brick", name: "Nether Bricks", buy: 30, sell: 5, icon: "textures/blocks/nether_brick", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
        { id: "minecraft:basalt", name: "Basalt", buy: 20, sell: 4, icon: "textures/blocks/basalt_top", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        { id: "minecraft:blackstone", name: "Blackstone", buy: 25, sell: 5, icon: "textures/blocks/blackstone", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        { id: "minecraft:glowstone", name: "Glowstone", buy: 100, sell: 20, icon: "textures/blocks/glowstone", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
        { id: "minecraft:quartz_block", name: "Block of Quartz", buy: 120, sell: 25, icon: "textures/blocks/quartz_block_top", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
        { id: "minecraft:end_stone", name: "End Stone", buy: 50, sell: 10, icon: "textures/blocks/end_stone", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
        { id: "minecraft:purpur_block", name: "Purpur Block", buy: 100, sell: 20, icon: "textures/blocks/purpur_block", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
        
        // ==========================================
        // 6. BALOK MINERAL / BERHARGA (Mahal & Sangat Dibatasi)
        // ==========================================
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
};