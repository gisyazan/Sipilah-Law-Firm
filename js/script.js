document.addEventListener('DOMContentLoaded', function() {
    inisialisasiDataAwal();
    tampilRiwayat();
    
    if (typeof loadKlien === 'function') loadKlien();
    if (typeof loadArtikelAdmin === 'function' && document.getElementById('tabel-artikel-admin')) loadArtikelAdmin();
    if (typeof loadArtikelPublik === 'function' && document.getElementById('daftar-artikel-publik')) loadArtikelPublik();
    if (typeof loadPengacara === 'function' && document.getElementById('tabel-pengacara')) loadPengacara();
    if (typeof loadDirektoriPengacara === 'function' && document.getElementById('tabel-direktori')) loadDirektoriPengacara();
    if (typeof loadPengacaraSelect === 'function' && document.getElementById('pengacara')) loadPengacaraSelect();
    
    let currentUser = localStorage.getItem('currentUser');
    let namaUserEls = document.querySelectorAll('.nama-user');
    if (currentUser && namaUserEls.length > 0) {
        namaUserEls.forEach(el => el.innerText = currentUser);
    }

    // Mencegah klien memilih tanggal yang sudah lampau di kalender
    let inputTanggal = document.getElementById('tanggal');
    if (inputTanggal) {
        let tzOffset = (new Date()).getTimezoneOffset() * 60000;
        let todayLocal = (new Date(Date.now() - tzOffset)).toISOString().split('T')[0];
        inputTanggal.setAttribute('min', todayLocal);
    }
});

// ==========================================
// FITUR PENYUNTIKAN DATA DUMMY AWAL
// ==========================================
function inisialisasiDataAwal() {
    if (!localStorage.getItem('dummyDataLoaded')) {
        let users = [
            { username: 'admin', email: 'admin@sipilah.com', password: 'admin123' },
            { username: 'Budi', email: 'budi@gmail.com', password: '123' },
            { username: 'Siti', email: 'siti@gmail.com', password: '123' },
            { username: 'Agus', email: 'agus@gmail.com', password: '123' }
        ];
        localStorage.setItem('users', JSON.stringify(users));

        let pengacara = [
            { nama: 'Budi Santoso, S.H., M.H.', spesialisasi: 'Hukum Pidana', telp: '081234567890', status: 'Aktif' },
            { nama: 'Siti Aminah, S.H.', spesialisasi: 'Hukum Keluarga', telp: '081987654321', status: 'Sibuk' },
            { nama: 'Ahmad Fauzi, S.H., LL.M.', spesialisasi: 'Hukum Bisnis', telp: '08122334455', status: 'Tidak Aktif' }
        ];
        localStorage.setItem('pengacara', JSON.stringify(pengacara));

        let riwayat = [
            { username: 'Budi', pengacara: 'Budi Santoso, S.H., M.H.', tanggal: '2026-07-15', kasus: 'Dugaan kasus penipuan investasi online bodong.', status: 'MENUNGGU' },
            { username: 'Siti', pengacara: 'Siti Aminah, S.H.', tanggal: '2026-07-10', kasus: 'Konsultasi hak asuh anak.', status: 'DISETUJUI' },
            { username: 'Agus', pengacara: 'Ahmad Fauzi, S.H., LL.M.', tanggal: '2026-07-05', kasus: 'Sengketa pelanggaran kontrak kerja sama.', status: 'DITOLAK' }
        ];
        localStorage.setItem('riwayat_konsultasi', JSON.stringify(riwayat));

        let artikel = [
            { id: 101, judul: 'Pentingnya Memahami Kontrak Bisnis', kategori: 'Edukasi', tanggal: '2026-07-01', konten: 'Dalam dunia bisnis, kesepakatan lisan tidaklah cukup. Sebelum menandatangani dokumen atau kontrak apapun dengan pihak ketiga, pastikan Anda memahami seluruh klausul di dalamnya.', cover: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80' },
            { id: 102, judul: 'Apa yang Harus Dilakukan Jika Ditipu Online?', kategori: 'Tips', tanggal: '2026-07-05', konten: 'Langkah pertama adalah jangan panik. Kumpulkan semua bukti percakapan (screenshot). Hubungi bank terkait untuk memblokir rekening tujuan. Laporkan ke kantor polisi terdekat.', cover: 'https://images.unsplash.com/photo-1505664159858-6d274ea595d2?auto=format&fit=crop&w=600&q=80' }
        ];
        localStorage.setItem('artikel', JSON.stringify(artikel));
        localStorage.setItem('dummyDataLoaded', 'true');
    } else {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (!users.some(u => u.username === 'admin')) {
            users.push({ username: 'admin', email: 'admin@sipilah.com', password: 'admin123' });
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

// ==========================================
// FUNGSI AKUN & LOGIN
// ==========================================
function prosesDaftar(event) {
    event.preventDefault();
    let username = document.getElementById('reg_username').value;
    let email = document.getElementById('reg_email').value;
    let password = document.getElementById('reg_password').value;
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (username.toLowerCase() === 'admin' || users.some(u => u.username === username)) {
        alert('Username sudah terdaftar atau tidak bisa digunakan!');
        return;
    }
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Pendaftaran berhasil! Silakan Login.');
    window.location.href = 'login.html';
}

function prosesLogin(event) {
    event.preventDefault();
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let validUser = users.find(u => u.username === user && u.password === pass);
    
    if (validUser) {
        localStorage.setItem('currentUser', validUser.username);
        if (validUser.username === 'admin') {
            window.location.href = 'dashboard_admin.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    } else {
        alert('Username atau password salah!');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function resetPassword(event) {
    event.preventDefault();
    let user = document.getElementById('reset_user').value;
    let email = document.getElementById('reset_email').value;
    let newPass = document.getElementById('reset_pass').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let index = users.findIndex(u => u.username === user && u.email === email);

    if (index !== -1) {
        users[index].password = newPass;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Password berhasil direset!');
        window.location.href = 'login.html';
    } else {
        alert('Username dan Email tidak cocok.');
    }
}

// ==========================================
// FUNGSI KELOLA KLIEN (ADMIN)
// ==========================================
function loadKlien() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let tbody = document.getElementById('tabel-klien');
    if (!tbody) return;
    tbody.innerHTML = '';
    let klienList = users.filter(u => u.username !== 'admin');

    if (klienList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">Belum ada klien.</td></tr>';
        return;
    }
    klienList.forEach((k, i) => {
        tbody.innerHTML += `<tr>
            <td>${i + 1}</td>
            <td><b>${k.username}</b></td>
            <td>${k.email}</td>
            <td><button onclick="hapusKlien('${k.username}')" class='btn btn-danger btn-sm'>🗑️ Hapus Akun</button></td>
        </tr>`;
    });
}

function hapusKlien(username) {
    if (confirm(`Yakin hapus akun '${username}'? Semua riwayatnya akan ikut terhapus.`)) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let newUsers = users.filter(u => u.username !== username);
        localStorage.setItem('users', JSON.stringify(newUsers));
        
        let riwayat = JSON.parse(localStorage.getItem('riwayat_konsultasi')) || [];
        let newRiwayat = riwayat.filter(r => r.username !== username);
        localStorage.setItem('riwayat_konsultasi', JSON.stringify(newRiwayat));
        
        loadKlien();
    }
}

// ==========================================
// FUNGSI KELOLA PENGACARA (ADMIN & PUBLIK)
// ==========================================
function simpanPengacara(e) {
    e.preventDefault();
    let nama = document.getElementById('nama').value;
    let spesialisasi = document.getElementById('spesialisasi').value;
    let telp = document.getElementById('telp').value;
    
    let data = JSON.parse(localStorage.getItem('pengacara')) || [];
    data.push({ nama, spesialisasi, telp, status: 'Aktif' }); 
    localStorage.setItem('pengacara', JSON.stringify(data));
    
    e.target.reset();
    loadPengacara();
    alert('Pengacara berhasil ditambahkan!');
}

function loadPengacara() {
    let data = JSON.parse(localStorage.getItem('pengacara')) || [];
    let tbody = document.getElementById('tabel-pengacara');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">Belum ada data pengacara.</td></tr>';
        return;
    }

    data.forEach((p, i) => {
        let statusAktual = p.status || 'Aktif';
        let badgeStatus = statusAktual === 'Aktif' ? 'bg-success' : (statusAktual === 'Sibuk' ? 'bg-warning text-dark' : 'bg-secondary');
        
        let opsiStatus = `
            <select onchange="ubahStatusPengacara(${i}, this.value)" class="form-select form-select-sm d-inline-block w-auto">
                <option value="Aktif" ${statusAktual === 'Aktif' ? 'selected' : ''}>Aktif</option>
                <option value="Sibuk" ${statusAktual === 'Sibuk' ? 'selected' : ''}>Sibuk</option>
                <option value="Tidak Aktif" ${statusAktual === 'Tidak Aktif' ? 'selected' : ''}>Tidak Aktif</option>
            </select>
        `;

        tbody.innerHTML += `<tr>
            <td>${i + 1}</td>
            <td>${p.nama}</td>
            <td><span class='badge bg-info text-dark'>${p.spesialisasi}</span></td>
            <td>${p.telp}</td>
            <td><span class='badge ${badgeStatus}'>${statusAktual}</span></td>
            <td>
                ${opsiStatus}
                <button onclick="hapusPengacara(${i})" class='btn btn-danger btn-sm ms-2'>🗑️ Hapus</button>
            </td>
        </tr>`;
    });
}

function ubahStatusPengacara(index, statusBaru) {
    let data = JSON.parse(localStorage.getItem('pengacara')) || [];
    if(data[index]) {
        data[index].status = statusBaru;
        localStorage.setItem('pengacara', JSON.stringify(data));
        loadPengacara();
    }
}

function hapusPengacara(index) {
    if (confirm('Yakin ingin menghapus pengacara ini dari sistem secara permanen?')) {
        let data = JSON.parse(localStorage.getItem('pengacara')) || [];
        data.splice(index, 1);
        localStorage.setItem('pengacara', JSON.stringify(data));
        loadPengacara();
    }
}

function loadDirektoriPengacara() {
    let data = JSON.parse(localStorage.getItem('pengacara')) || [];
    let tbody = document.getElementById('tabel-direktori');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">Belum ada pengacara yang terdaftar.</td></tr>';
        return;
    }

    data.forEach((p, i) => {
        let statusAktual = p.status || 'Aktif';
        let badgeStatus = statusAktual === 'Aktif' ? 'bg-success' : (statusAktual === 'Sibuk' ? 'bg-warning text-dark' : 'bg-secondary');
        tbody.innerHTML += `<tr>
            <td>${i + 1}</td>
            <td>${p.nama}</td>
            <td><span class='badge bg-info text-dark'>${p.spesialisasi}</span></td>
            <td>${p.telp}</td>
            <td><span class='badge ${badgeStatus}'>${statusAktual}</span></td>
        </tr>`;
    });
}

function loadPengacaraSelect() {
    let select = document.getElementById('pengacara');
    if(!select) return;
    
    select.innerHTML = '<option value="" disabled selected>-- Pilih Pengacara --</option>';
    let dataPengacara = JSON.parse(localStorage.getItem('pengacara')) || [];
    
    let pengacaraTersedia = dataPengacara.filter(p => (p.status || 'Aktif') !== 'Tidak Aktif');

    if (pengacaraTersedia.length > 0) {
        pengacaraTersedia.forEach(p => {
            let statusAktual = p.status || 'Aktif';
            let isSibuk = statusAktual === 'Sibuk';
            let disabledAttr = isSibuk ? 'disabled' : '';
            let statusLabel = isSibuk ? ' (Sedang Sibuk)' : '';
            
            select.innerHTML += `<option value="${p.nama}" ${disabledAttr}>${p.nama} - ${p.spesialisasi}${statusLabel}</option>`;
        });
    } else {
        select.innerHTML = '<option value="" disabled selected>Belum ada pengacara tersedia</option>';
    }
}

// ==========================================
// FUNGSI KONSULTASI
// ==========================================
function ajukanKonsultasi(event) {
    event.preventDefault();
    let currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Silakan login terlebih dahulu!');
        window.location.href = 'login.html';
        return;
    }
    
    let pengacara = document.getElementById('pengacara').value;
    let tanggal = document.getElementById('tanggal').value;
    let kasus = document.getElementById('kasus').value;
    
    // Keamanan tambahan: Validasi tanggal saat tombol submit diklik
    let tzOffset = (new Date()).getTimezoneOffset() * 60000;
    let todayLocal = (new Date(Date.now() - tzOffset)).toISOString().split('T')[0];
    if (tanggal < todayLocal) {
        alert('Gagal! Anda tidak dapat mengajukan konsultasi di tanggal yang sudah lewat.');
        return;
    }

    let riwayat = JSON.parse(localStorage.getItem('riwayat_konsultasi')) || [];
    
    riwayat.push({ username: currentUser, pengacara, tanggal, kasus, status: 'MENUNGGU' });
    localStorage.setItem('riwayat_konsultasi', JSON.stringify(riwayat));
    alert('Konsultasi berhasil diajukan!');
    document.getElementById('form-konsultasi').reset();
    tampilRiwayat();
}

function tampilRiwayat() {
    let currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    let riwayat = JSON.parse(localStorage.getItem('riwayat_konsultasi')) || [];
    let riwayatUser = riwayat.filter(r => r.username === currentUser);
    let tbody = document.getElementById('tabel-riwayat');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    if (riwayatUser.length === 0) {
        tbody.innerHTML = "<tr><td colspan='4' class='text-center'>Belum ada riwayat konsultasi.</td></tr>";
        return;
    }
    riwayatUser.forEach(r => {
        let badgeClass = r.status === 'DISETUJUI' ? 'bg-success' : (r.status === 'DITOLAK' ? 'bg-danger' : 'bg-warning text-dark');
        tbody.innerHTML += `<tr><td>${r.tanggal}</td><td><b>${r.pengacara}</b></td><td>${r.kasus}</td><td><span class='badge ${badgeClass}'>${r.status}</span></td></tr>`;
    });
}

// ==========================================
// FITUR ARTIKEL HUKUM
// ==========================================
function simpanArtikel(e) {
    e.preventDefault();
    let judul = document.getElementById('judul_artikel').value;
    let kategori = document.getElementById('kategori_artikel').value;
    let konten = document.getElementById('konten_artikel').value;
    let fileInput = document.getElementById('cover_artikel');
    let tanggal = new Date().toISOString().split('T')[0];
    let id = Date.now();

    let prosesSimpan = (coverData) => {
        let artikel = JSON.parse(localStorage.getItem('artikel')) || [];
        artikel.push({ id, judul, kategori, tanggal, konten, cover: coverData });
        localStorage.setItem('artikel', JSON.stringify(artikel));

        e.target.reset();
        alert('Artikel berhasil diterbitkan!');
        loadArtikelAdmin();
    };

    if (fileInput && fileInput.files && fileInput.files[0]) {
        let reader = new FileReader();
        reader.onload = function(event) {
            prosesSimpan(event.target.result); 
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        prosesSimpan(null); 
    }
}

function loadArtikelAdmin() {
    let artikel = JSON.parse(localStorage.getItem('artikel')) || [];
    let tbody = document.getElementById('tabel-artikel-admin');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (artikel.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">Belum ada artikel.</td></tr>';
        return;
    }

    artikel.reverse().forEach((a) => {
        let badgeColor = a.kategori === 'Edukasi' ? 'bg-info text-dark' : (a.kategori === 'Tips' ? 'bg-success' : 'bg-warning text-dark');
        tbody.innerHTML += `<tr>
            <td>${a.tanggal}</td>
            <td><b>${a.judul}</b></td>
            <td><span class='badge ${badgeColor}'>${a.kategori}</span></td>
            <td><button onclick="hapusArtikel(${a.id})" class='btn btn-danger btn-sm'>Hapus</button></td>
        </tr>`;
    });
}

function hapusArtikel(id) {
    if (confirm('Yakin ingin menghapus artikel ini?')) {
        let artikel = JSON.parse(localStorage.getItem('artikel')) || [];
        let newArtikel = artikel.filter(a => a.id !== id);
        localStorage.setItem('artikel', JSON.stringify(newArtikel));
        loadArtikelAdmin();
    }
}

function loadArtikelPublik() {
    let artikel = JSON.parse(localStorage.getItem('artikel')) || [];
    let container = document.getElementById('daftar-artikel-publik');
    if (!container) return;
    container.innerHTML = '';

    if (artikel.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">Belum ada berita atau artikel yang diterbitkan saat ini.</p></div>';
        return;
    }

    artikel.reverse().forEach((a) => {
        let badgeColor = a.kategori === 'Edukasi' ? 'bg-info text-dark' : (a.kategori === 'Tips' ? 'bg-success' : 'bg-warning text-dark');
        let defaultImg = a.kategori === 'Edukasi' ? 'https://placehold.co/600x400/17a2b8/ffffff?text=Edukasi+Hukum' :
                         (a.kategori === 'Tips' ? 'https://placehold.co/600x400/28a745/ffffff?text=Tips+Hukum' : 'https://placehold.co/600x400/212529/ffffff?text=Berita+Terkini');
        let finalCover = a.cover ? a.cover : defaultImg;

        container.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0">
                    <img src="${finalCover}" class="card-img-top" alt="Cover" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <span class="badge ${badgeColor} mb-2 align-self-start">${a.kategori}</span>
                        <h5 class="card-title fw-bold text-dark">${a.judul}</h5>
                        <p class="text-muted small mb-3">🗓️ ${a.tanggal}</p>
                        <a href="baca_artikel.html?id=${a.id}" class="btn btn-outline-primary mt-auto w-100">Baca Selengkapnya</a>
                    </div>
                </div>
            </div>
        `;
    });
}

function muatArtikelFull() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if(!id) return;

    let artikel = JSON.parse(localStorage.getItem('artikel')) || [];
    let art = artikel.find(a => a.id == id);

    if(art) {
        let badgeColor = art.kategori === 'Edukasi' ? 'bg-info text-dark' : (art.kategori === 'Tips' ? 'bg-success' : 'bg-warning text-dark');
        let defaultImg = art.kategori === 'Edukasi' ? 'https://placehold.co/1200x600/17a2b8/ffffff?text=Edukasi+Hukum' :
                         (art.kategori === 'Tips' ? 'https://placehold.co/1200x600/28a745/ffffff?text=Tips+Hukum' : 'https://placehold.co/1200x600/212529/ffffff?text=Berita+Terkini');
        let finalCover = art.cover ? art.cover : defaultImg;
        
        document.getElementById('judul_full').innerText = art.judul;
        document.getElementById('tanggal_full').innerText = 'Diterbitkan pada: ' + art.tanggal;
        
        let katBadge = document.getElementById('kategori_full');
        katBadge.innerText = art.kategori;
        katBadge.className = `badge ${badgeColor} mb-2 px-3 py-2`;
        
        document.getElementById('konten_full').innerText = art.konten;
        document.getElementById('img_full').src = finalCover;
    } else {
        document.getElementById('konten_artikel_full').innerHTML = '<h3 class="text-center text-danger mt-5">Artikel tidak ditemukan atau telah dihapus!</h3>';
    }
}