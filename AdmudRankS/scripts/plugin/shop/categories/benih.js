export const benihCategory = {
    name: "§l§2BENIH (Seeds)",
    icon: "textures/items/seeds_wheat",
    items: [
        // ==========================================
        // 1. BENIH DASAR (Stok Melimpah)
        // ==========================================
        { id: "minecraft:wheat_seeds", name: "Wheat Seeds", buy: 5, sell: 1, icon: "textures/items/seeds_wheat", stockMax: 4096, restockAmount: 512, restockIntervalMinutes: 5 },
        { id: "minecraft:pumpkin_seeds", name: "Pumpkin Seeds", buy: 15, sell: 3, icon: "textures/items/seeds_pumpkin", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        { id: "minecraft:melon_seeds", name: "Melon Seeds", buy: 15, sell: 3, icon: "textures/items/seeds_melon", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        { id: "minecraft:beetroot_seeds", name: "Beetroot Seeds", buy: 10, sell: 2, icon: "textures/items/seeds_beetroot", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },

        // ==========================================
        // 2. BENIH BUNGA & TANAMAN KHUSUS
        // ==========================================
        { id: "minecraft:torchflower_seeds", name: "Torchflower Seeds", buy: 500, sell: 100, icon: "textures/items/torchflower_seeds", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },
        { id: "minecraft:pitcher_pod", name: "Pitcher Pod", buy: 500, sell: 100, icon: "textures/items/pitcher_pod", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },
        { id: "minecraft:mangrove_propagule", name: "Mangrove Propagule", buy: 60, sell: 10, icon: "textures/blocks/mangrove_propagule", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 20 },
        { id: "minecraft:bamboo", name: "Bamboo (Seed)", buy: 20, sell: 4, icon: "textures/items/bamboo", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        { id: "minecraft:cocoa_beans", name: "Cocoa Beans", buy: 30, sell: 6, icon: "textures/items/dye_powder_brown", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
        { id: "minecraft:sweet_berries", name: "Sweet Berries", buy: 15, sell: 3, icon: "textures/items/sweet_berries", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        { id: "minecraft:glow_berries", name: "Glow Berries", buy: 50, sell: 10, icon: "textures/items/glow_berries", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 15 },
        { id: "minecraft:nether_wart", name: "Nether Wart", buy: 150, sell: 30, icon: "textures/items/nether_wart", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 }
    ]
};