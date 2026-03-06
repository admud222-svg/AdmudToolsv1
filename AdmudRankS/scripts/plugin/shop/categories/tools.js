export const toolsCategory = {
    name: "§l§3TOOLS (Alat)",
    icon: "textures/items/iron_pickaxe",
    items: [
        // ==========================================
        // 1. IRON TOOLS (Standar & Terjangkau)
        // ==========================================
        { id: "minecraft:iron_pickaxe", name: "Iron Pickaxe", buy: 150, sell: 30, icon: "textures/items/iron_pickaxe", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 10 },
        { id: "minecraft:iron_axe", name: "Iron Axe", buy: 150, sell: 30, icon: "textures/items/iron_axe", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 10 },
        { id: "minecraft:iron_shovel", name: "Iron Shovel", buy: 50, sell: 10, icon: "textures/items/iron_shovel", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 10 },
        { id: "minecraft:iron_hoe", name: "Iron Hoe", buy: 100, sell: 20, icon: "textures/items/iron_hoe", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 10 },

        // ==========================================
        // 2. DIAMOND TOOLS (Kualitas Tinggi)
        // ==========================================
        { id: "minecraft:diamond_pickaxe", name: "Diamond Pickaxe", buy: 1000, sell: 200, icon: "textures/items/diamond_pickaxe", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },
        { id: "minecraft:diamond_axe", name: "Diamond Axe", buy: 1000, sell: 200, icon: "textures/items/diamond_axe", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },
        { id: "minecraft:diamond_shovel", name: "Diamond Shovel", buy: 400, sell: 80, icon: "textures/items/diamond_shovel", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },
        { id: "minecraft:diamond_hoe", name: "Diamond Hoe", buy: 800, sell: 160, icon: "textures/items/diamond_hoe", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },

        // ==========================================
        // 3. NETHERITE TOOLS (Alat Sultan)
        // ==========================================
        { id: "minecraft:netherite_pickaxe", name: "Netherite Pickaxe", buy: 15000, sell: 3000, icon: "textures/items/netherite_pickaxe", stockMax: 10, restockAmount: 1, restockIntervalMinutes: 120 },
        { id: "minecraft:netherite_axe", name: "Netherite Axe", buy: 15000, sell: 3000, icon: "textures/items/netherite_axe", stockMax: 10, restockAmount: 1, restockIntervalMinutes: 120 },

        // ==========================================
        // 4. UTILITY TOOLS (Alat Pendukung)
        // ==========================================
        { id: "minecraft:shears", name: "Shears", buy: 100, sell: 20, icon: "textures/items/shears", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 15 },
        { id: "minecraft:fishing_rod", name: "Fishing Rod", buy: 150, sell: 30, icon: "textures/items/fishing_rod_uncast", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 15 },
        { id: "minecraft:flint_and_steel", name: "Flint and Steel", buy: 50, sell: 10, icon: "textures/items/flint_and_steel", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 10 },
        { id: "minecraft:spyglass", name: "Spyglass", buy: 500, sell: 100, icon: "textures/items/spyglass", stockMax: 64, restockAmount: 8, restockIntervalMinutes: 30 },
        { id: "minecraft:compass", name: "Compass", buy: 200, sell: 40, icon: "textures/items/compass_item", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 20 },
        { id: "minecraft:clock", name: "Clock", buy: 500, sell: 100, icon: "textures/items/clock_item", stockMax: 64, restockAmount: 8, restockIntervalMinutes: 30 }
    ]
};