import { world } from "@minecraft/server";

// Naik ke v6 agar template baru langsung masuk
const DB_KEY = "admud_config_v22";

// Struktur Default Ala Java Server Premium
export const DEFAULT_CONFIG = {
    sbLines: [
        { text: "   AdmudEssentials", anim: "typing" },
        { text: "§r§7     @TANGGAL/@BULAN/@TAHUN§r", anim: "none" },
        { text: " ", anim: "none" },
        { text: "§f §lPlayer", anim: "fadein" },
        { text: "§7 Name: §a@NAMA       ", anim: "none" },
        { text: "§7 Rank: @RANKS", anim: "none" },
        { text: "§7 Clan: @CLAN", anim: "none" },
        { text: "  ", anim: "none" },
        { text: "§f §lEconomy & Stats", anim: "fadein" },
        { text: "§7  Money: §e$@MONEY", anim: "none" },
        { text: "§7  K/D: §c@KILL§7/§c@DEATH", anim: "none" },
        { text: "  ", anim: "none" },
        { text: "§f §lServer Info", anim: "fadein" },
        { text: "§7 Ping: §a@PINGms" , anim: "none" },
        { text: "§7TPS: §a@TPS", anim: "none" },
        { text: "§7 Online: §b@ONLINE§8/§b@MAXON", anim: "none" },
        { text: " play.minekings.com", anim: "rgb" },
        { text: "§r", anim: "none" }
    ],
    chatFormat: { text: "§8[@RANKS§8] §r@NAMA §8>> §r@MESSAGE", anim: "none" },
    nametagFormat: { text: "@RANKS @NL §r@NAMA @NL §c@HEALTH HP", anim: "none" },
    
    // PENGATURAN BARU UNTUK MEMBER MENU
    menuToggles: {
        clan: true,
        tpa: true,
        rtp: true,
        claimland: true,
        serverwarp: true,
        playerwarp: true
    },
    memberConfig: {
        maxClanMembers: 15, // Maksimal member dalam 1 clan
        clanRenameCost: 50000, // Harga ganti nama clan
        clanRenameCooldown: 7 // Harus nunggu berapa hari untuk ganti nama lagi
    }
};

// Ganti fungsi ini di bagian bawah scripts/config.js
export function getConfig() {
    const data = world.getDynamicProperty(DB_KEY);
    let currentConfig = data ? JSON.parse(data) : DEFAULT_CONFIG;
    
    // AUTO-PATCH: Kalau config lama belum punya fitur member, otomatis ditambahkan!
    if (!currentConfig.menuToggles) {
        currentConfig.menuToggles = DEFAULT_CONFIG.menuToggles;
    }
    if (!currentConfig.memberConfig) {
        currentConfig.memberConfig = DEFAULT_CONFIG.memberConfig;
    }
    
    return currentConfig;
}

export function saveConfig(newConfig) {
    world.setDynamicProperty(DB_KEY, JSON.stringify(newConfig));
}