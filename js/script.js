function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-mode');
    // Simpan preferensi tema pengguna di penyimpanan lokal
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.removeItem('theme');
    }
}

// Periksa preferensi tema pengguna saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }
});
