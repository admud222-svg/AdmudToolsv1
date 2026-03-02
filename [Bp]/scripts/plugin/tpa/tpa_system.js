import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";

// --- DATABASE SEMENTARA (MEMORY) ---
const pendingRequests = {}; // Menyimpan request yang belum direspon
const tpaHistory = {}; // Menyimpan riwayat TPA per player
const tpaCooldowns = {}; // Menyimpan cooldown player (Anti-Spam)

const COOLDOWN_TIME = 60000; // Cooldown 60 detik jika ditolak

// --- FUNGSI BANTUAN UNTUK MENAMPILKAN UI DENGAN SUARA ---
function showUIWithSound(player, form, callback) {
    // Memutar suara 'pop' setiap kali UI terbuka
    player.playSound("random.pop", { volume: 0.8, pitch: 1.0 });
    
    form.show(player).then(res => {
        callback(res);
    }).catch(e => console.warn(e));
}

// --- FUNGSI UTAMA: DASHBOARD TPA ---
export function openTPADashboard(player) {
    const isSilent = player.hasTag("tpa_silent");
    const myPending = pendingRequests[player.name] ? pendingRequests[player.name].length : 0;
    
    // Mengambil kordinat lokasi player saat ini
    const loc = player.location;
    const x = Math.floor(loc.x);
    const y = Math.floor(loc.y);
    const z = Math.floor(loc.z);

    const form = new ActionFormData()
        .title("§l§aSISTEM TPA MINEKINGS")
        // Teks ini akan muncul di atas Paperdoll (karakter 3D) di sebelah kiri
        .body(`§l§b${player.name}§r\n§ePending: ${myPending}\n§7Lokasi: ${x}, ${y}, ${z}`)
        // Tombol-tombol di sebelah kanan
        .button("§1Kirim Request TPA\n§rKlik untuk teleport", "textures/ui/send_icon")
        .button(`§ePending TPA [§c${myPending}§e]\n§rCek request masuk`, "textures/ui/invite_base")
        .button("§dHistory TPA\n§rRiwayat teleportasimu", "textures/ui/recipe_book_icon")
        .button(`§8Silent Mode: ${isSilent ? "§a[ON]" : "§c[OFF]"}\n§rMatikan pop-up UI`, "textures/ui/mute_off")
        .button("§cKembali\n§rTutup Menu", "textures/ui/cancel");

    showUIWithSound(player, form, res => {
        if (res.canceled) return;
        
        switch (res.selection) {
            case 0: return openSendTPAMenu(player); 
            case 1: return openPendingMenu(player);
            case 2: return openHistoryMenu(player);
            case 3: 
                // Toggle Silent Mode
                if (isSilent) player.removeTag("tpa_silent");
                else player.addTag("tpa_silent");
                player.sendMessage(`§e[TPA] Silent Mode sekarang ${!isSilent ? "§aAKTIF" : "§cMATI"}.`);
                return openTPADashboard(player); // Reload UI
            case 4: return; // Fungsi menu utama kamu (Kembali)
        }
    });
}

// --- FUNGSI 1: MENU KIRIM REQUEST TPA ---
function openSendTPAMenu(player) {
    // Cek Cooldown Anti-Spam
    if (tpaCooldowns[player.name] && tpaCooldowns[player.name] > Date.now()) {
        const sisa = Math.ceil((tpaCooldowns[player.name] - Date.now()) / 1000);
        player.sendMessage(`§c[TPA] Tunggu ${sisa} detik lagi karena request-mu sebelumnya ditolak!`);
        return;
    }

    const onlinePlayers = world.getAllPlayers().filter(p => p.name !== player.name);
    if (onlinePlayers.length === 0) {
        player.sendMessage("§c[TPA] Tidak ada player lain yang sedang online!");
        return;
    }

    const playerNames = onlinePlayers.map(p => p.name);

    const form = new ModalFormData()
        .title("§l§eKirim Request TPA")
        .dropdown("Pilih Player Tujuan:", playerNames)
        .toggle("Mode TPA Here\n§7(Jika ON, target yang ditarik ke kamu)", { defaultValue: false });

    showUIWithSound(player, form, res => {
        if (res.canceled) return openTPADashboard(player);

        const targetName = playerNames[res.formValues[0]];
        const isTpaHere = res.formValues[1];
        const targetPlayer = onlinePlayers.find(p => p.name === targetName);

        if (!targetPlayer) return player.sendMessage("§cPlayer sudah offline.");

        // Buat ID unik untuk request
        const reqId = Date.now().toString();
        const requestData = { id: reqId, sender: player.name, isHere: isTpaHere, time: Date.now() };

        // Masukkan ke database pending target
        if (!pendingRequests[targetName]) pendingRequests[targetName] = [];
        pendingRequests[targetName].push(requestData);

        // Catat di History
        addToHistory(player.name, `§eMengirim ${isTpaHere ? "TPA Here" : "TPA"} ke §b${targetName} §7(Pending)`);

        player.sendMessage(`§a[TPA] Request berhasil dikirim ke ${targetName}!`);

        // Cek target pakai Silent Mode atau tidak
        if (targetPlayer.hasTag("tpa_silent")) {
            targetPlayer.sendMessage(`§e[TPA] §b${player.name} §eingin teleport ke kamu! Buka Menu TPA -> Pending untuk merespon.`);
        } else {
            // Tampilkan UI pop-up ke target
            showIncomingRequestUI(targetPlayer, requestData);
        }
    });
}

// --- FUNGSI 2: UI POP-UP TPA MASUK ---
function showIncomingRequestUI(targetPlayer, requestData) {
    const tipeTP = requestData.isHere ? "menarik kamu ke lokasinya" : "teleport ke lokasimu";
    
    const form = new ActionFormData()
        .title("§l§aTPA REQUEST MASUK!")
        .body(`§b${requestData.sender} §fingin ${tipeTP}.\n\nApa yang ingin kamu lakukan?`)
        .button("§2Terima TPA\n§rLangsung Teleport", "textures/ui/realms_green_check")
        .button("§4Tolak TPA\n§rBeri Alasan", "textures/ui/cancel");

    // Khusus untuk request masuk, putar suara notifikasi yang berbeda
    targetPlayer.playSound("random.orb", { volume: 1.0, pitch: 0.5 });

    form.show(targetPlayer).then(res => {
        if (res.canceled) return; // Abaikan, biarkan di daftar pending
        
        if (res.selection === 0) {
            acceptTPA(targetPlayer, requestData.id);
        } else {
            openDenyReasonMenu(targetPlayer, requestData);
        }
    });
}

// --- FUNGSI 3: MENU TOLAK (KASIH ALASAN) ---
function openDenyReasonMenu(targetPlayer, requestData) {
    const form = new ModalFormData()
        .title("§l§cTolak TPA")
        .textField("Berikan Alasan (Opsional):\n§7(Agar dia tidak spam)", "Ketik alasan di sini...");

    showUIWithSound(targetPlayer, form, res => {
        if (res.canceled) return showIncomingRequestUI(targetPlayer, requestData);

        const reason = res.formValues[0] === "" ? "Tidak ada alasan." : res.formValues[0];
        rejectTPA(targetPlayer, requestData.id, reason);
    });
}

// --- LOGIC: TERIMA & TOLAK TPA ---
function acceptTPA(targetPlayer, reqId) {
    if (!pendingRequests[targetPlayer.name]) return;
    
    const reqIndex = pendingRequests[targetPlayer.name].findIndex(r => r.id === reqId);
    if (reqIndex === -1) return targetPlayer.sendMessage("§cRequest sudah kadaluarsa/tidak ditemukan.");

    const request = pendingRequests[targetPlayer.name][reqIndex];
    const senderPlayer = world.getAllPlayers().find(p => p.name === request.sender);

    // Hapus dari pending
    pendingRequests[targetPlayer.name].splice(reqIndex, 1);

    if (!senderPlayer) return targetPlayer.sendMessage("§cPlayer yang request sudah offline.");

    // Putar efek suara teleport
    targetPlayer.playSound("mob.endermen.portal");
    senderPlayer.playSound("mob.endermen.portal");

    // Eksekusi Teleport
    if (request.isHere) {
        targetPlayer.teleport(senderPlayer.location, { dimension: senderPlayer.dimension });
        targetPlayer.sendMessage(`§a[TPA] Kamu telah ditarik ke lokasi ${senderPlayer.name}.`);
        senderPlayer.sendMessage(`§a[TPA] ${targetPlayer.name} menerima TPA Here kamu!`);
    } else {
        senderPlayer.teleport(targetPlayer.location, { dimension: targetPlayer.dimension });
        targetPlayer.sendMessage(`§a[TPA] ${senderPlayer.name} telah teleport ke lokasimu.`);
        senderPlayer.sendMessage(`§a[TPA] ${targetPlayer.name} menerima TPA kamu!`);
    }

    addToHistory(request.sender, `§aDiterima oleh §b${targetPlayer.name}`);
    addToHistory(targetPlayer.name, `§aMenerima TPA dari §b${request.sender}`);
}

function rejectTPA(targetPlayer, reqId, reason) {
    if (!pendingRequests[targetPlayer.name]) return;
    
    const reqIndex = pendingRequests[targetPlayer.name].findIndex(r => r.id === reqId);
    if (reqIndex === -1) return;

    const request = pendingRequests[targetPlayer.name][reqIndex];
    const senderPlayer = world.getAllPlayers().find(p => p.name === request.sender);

    // Hapus dari pending
    pendingRequests[targetPlayer.name].splice(reqIndex, 1);

    // Set Cooldown ke sender biar gak spam
    tpaCooldowns[request.sender] = Date.now() + COOLDOWN_TIME;

    if (senderPlayer) {
        senderPlayer.sendMessage(`§c[TPA] Request TPA kamu ke ${targetPlayer.name} DITOLAK!\n§eAlasan: §f${reason}`);
        senderPlayer.playSound("note.bass"); // Suara error untuk sender
    }
    targetPlayer.sendMessage(`§a[TPA] Kamu menolak TPA dari ${request.sender}.`);

    addToHistory(request.sender, `§cDitolak oleh §b${targetPlayer.name} §8(Alasan: ${reason})`);
    addToHistory(targetPlayer.name, `§cMenolak TPA dari §b${request.sender}`);
}

// --- MENU DAFTAR PENDING TPA ---
function openPendingMenu(player) {
    const myReqs = pendingRequests[player.name] || [];
    
    if (myReqs.length === 0) {
        const form = new ActionFormData()
            .title("Pending TPA")
            .body("Tidak ada request TPA yang masuk.")
            .button("Kembali", "textures/ui/cancel");
        showUIWithSound(player, form, () => openTPADashboard(player));
        return;
    }

    const form = new ActionFormData().title(`Pending TPA [${myReqs.length}]`).body("Klik nama untuk merespon:");
    myReqs.forEach(req => {
        form.button(`Dari: ${req.sender}\nTipe: ${req.isHere ? "TPA Here" : "TPA Normal"}`, "textures/ui/icon_multiplayer");
    });
    form.button("Kembali", "textures/ui/cancel");

    showUIWithSound(player, form, res => {
        if (res.canceled || res.selection === myReqs.length) return openTPADashboard(player);
        showIncomingRequestUI(player, myReqs[res.selection]);
    });
}

// --- MENU HISTORY ---
function openHistoryMenu(player) {
    const history = tpaHistory[player.name] || ["§7Belum ada riwayat TPA."];
    
    const form = new ActionFormData()
        .title("§l§dHistory TPA")
        .body(history.join("\n\n"))
        .button("Kembali", "textures/ui/cancel");

    showUIWithSound(player, form, () => openTPADashboard(player));
}

// Helper untuk menambah history
// Helper untuk menambah history
function addToHistory(playerName, text) {
    if (!tpaHistory[playerName]) tpaHistory[playerName] = [];
    
    const time = new Date();
    
    // Konversi ke WIB (UTC + 7)
    let hours = time.getUTCHours() + 7;
    if (hours >= 24) hours -= 24; // Reset ke 0 jika lewat jam 24
    
    // Tambahkan angka nol di depan jika angkanya satuan (biar rapi)
    const jam = hours.toString().padStart(2, '0');
    const menit = time.getUTCMinutes().toString().padStart(2, '0');
    
    tpaHistory[playerName].unshift(`§8[${jam}:${menit} WIB] §r${text}`);
    
    // Batasi history maksimal 10 log terakhir biar gak lag
    if (tpaHistory[playerName].length > 10) tpaHistory[playerName].pop();
}