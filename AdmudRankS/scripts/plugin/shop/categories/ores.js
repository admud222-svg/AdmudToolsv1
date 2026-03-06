export const oresCategory = {
    name: "§l§3ORES (Tambang)",
    icon: "textures/items/diamond",
    items: [
        // ==========================================
        // 1. FUEL & UTILITY
        // ==========================================
        { id: "minecraft:coal", name: "Coal", buy: 20, sell: 4, icon: "textures/items/coal", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
        { id: "minecraft:charcoal", name: "Charcoal", buy: 15, sell: 2, icon: "textures/items/charcoal", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
        { id: "minecraft:lapis_lazuli", name: "Lapis Lazuli", buy: 30, sell: 6, icon: "textures/items/dye_powder_blue", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
        { id: "minecraft:redstone", name: "Redstone Dust", buy: 20, sell: 4, icon: "textures/items/redstone_dust", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },

        // ==========================================
        // 2. METALS (Bahan Utama)
        // ==========================================
        { id: "minecraft:raw_iron", name: "Raw Iron", buy: 40, sell: 8, icon: "textures/items/raw_iron", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
        { id: "minecraft:iron_ingot", name: "Iron Ingot", buy: 60, sell: 12, icon: "textures/items/iron_ingot", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
        { id: "minecraft:raw_gold", name: "Raw Gold", buy: 80, sell: 16, icon: "textures/items/raw_gold", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
        { id: "minecraft:gold_ingot", name: "Gold Ingot", buy: 120, sell: 24, icon: "textures/items/gold_ingot", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
        { id: "minecraft:raw_copper", name: "Raw Copper", buy: 20, sell: 4, icon: "textures/items/raw_copper", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 10 },
        { id: "minecraft:copper_ingot", name: "Copper Ingot", buy: 30, sell: 6, icon: "textures/items/copper_ingot", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },

        // ==========================================
        // 3. PRECIOUS GEMS & NETHER (Sultan)
        // ==========================================
        { id: "minecraft:diamond", name: "Diamond", buy: 600, sell: 120, icon: "textures/items/diamond", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 30 },
        { id: "minecraft:emerald", name: "Emerald", buy: 500, sell: 100, icon: "textures/items/emerald", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 30 },
        { id: "minecraft:quartz", name: "Nether Quartz", buy: 40, sell: 8, icon: "textures/items/quartz", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 15 },
        { id: "minecraft:netherite_scrap", name: "Netherite Scrap", buy: 4000, sell: 800, icon: "textures/items/netherite_scrap", stockMax: 64, restockAmount: 4, restockIntervalMinutes: 60 },
        { id: "minecraft:netherite_ingot", name: "Netherite Ingot", buy: 18000, sell: 3500, icon: "textures/items/netherite_ingot", stockMax: 16, restockAmount: 2, restockIntervalMinutes: 120 }
    ]
};