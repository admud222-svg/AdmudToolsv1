export const makananCategory = {
    name: "§l§6MAKANAN (Food)",
    icon: "textures/items/apple",
    items: [
        // ==========================================
        // 1. BAHAN DASAR & HASIL TANI (Murah & Stok Banyak)
        // ==========================================
        { id: "minecraft:apple", name: "Apple", buy: 15, sell: 3, icon: "textures/items/apple", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },
        { id: "minecraft:carrot", name: "Carrot", buy: 5, sell: 1, icon: "textures/items/carrot", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 5 },
        { id: "minecraft:potato", name: "Potato", buy: 5, sell: 1, icon: "textures/items/potato", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 5 },
        { id: "minecraft:sweet_berries", name: "Sweet Berries", buy: 5, sell: 1, icon: "textures/items/sweet_berries", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 5 },
        { id: "minecraft:melon_slice", name: "Melon Slice", buy: 5, sell: 1, icon: "textures/items/melon", stockMax: 2048, restockAmount: 256, restockIntervalMinutes: 5 },
        { id: "minecraft:dried_kelp", name: "Dried Kelp", buy: 10, sell: 2, icon: "textures/items/dried_kelp", stockMax: 1024, restockAmount: 128, restockIntervalMinutes: 10 },

        // ==========================================
        // 2. MAKANAN OLAHAN (Nutrisi Tinggi)
        // ==========================================
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

        // ==========================================
        // 3. MAKANAN SULTAN (Efek & Buff)
        // ==========================================
        { id: "minecraft:golden_apple", name: "Golden Apple", buy: 500, sell: 100, icon: "textures/items/apple_golden", stockMax: 128, restockAmount: 16, restockIntervalMinutes: 30 },
        { id: "minecraft:enchanted_golden_apple", name: "Enchanted Gapple", buy: 15000, sell: 2000, icon: "textures/items/apple_golden", stockMax: 16, restockAmount: 2, restockIntervalMinutes: 60 },
        { id: "minecraft:golden_carrot", name: "Golden Carrot", buy: 150, sell: 30, icon: "textures/items/carrot_golden", stockMax: 512, restockAmount: 64, restockIntervalMinutes: 20 },
        { id: "minecraft:chorus_fruit", name: "Chorus Fruit", buy: 80, sell: 15, icon: "textures/items/chorus_fruit", stockMax: 256, restockAmount: 32, restockIntervalMinutes: 25 }
    ]
};