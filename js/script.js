document.addEventListener('DOMContentLoaded', () => {
    // Periksa preferensi tema pengguna saat halaman dimuat
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }

    // Tambahkan animasi pada elemen yang masuk ke dalam viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Berhenti mengamati setelah animasi diterapkan
            }
        });
    });

    // Amati semua elemen dengan kelas .section
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Tambahkan smooth scroll pada container
    const smoothScrollContainers = document.querySelectorAll('.playlists, .artists, .top, .favorite-songs');
    smoothScrollContainers.forEach(container => {
        container.addEventListener('wheel', (event) => {
            event.preventDefault();
            container.scrollBy({
                left: event.deltaY < 0 ? -300 : 300,
                behavior: 'smooth'
            });
        });
    });
});

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
