// File: js/script.js

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-mode');
}

async function getAccessToken(clientId, clientSecret) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
}

async function fetchPlaylistData(playlistId, accessToken) {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data;
}

async function fetchHistoryData(accessToken) {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data.items;
}

async function displayPlaylist() {
    const clientId = '9e6caf932a7f4418a28520e7950b4887'; // Ganti dengan Client ID Anda
    const clientSecret = 'b3ff13689eb0452cbf000748874aaa88'; // Ganti dengan Client Secret Anda
    const playlistId = '0wCNjdDpVFpMLytckLXsFX'; // Ganti dengan Playlist ID Anda
    
    const accessToken = await getAccessToken(clientId, clientSecret);
    const playlistData = await fetchPlaylistData(playlistId, accessToken);
    
    const playlistSongs = document.getElementById('playlist-songs');
    playlistData.tracks.items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.track.name} oleh ${item.track.artists.map(artist => artist.name).join(', ')}`;
        playlistSongs.appendChild(listItem);
    });
}

async function displayHistory() {
    const accessToken = localStorage.getItem('spotify_access_token');
    if (!accessToken) {
        console.error('Akses token tidak ditemukan. Lakukan otorisasi terlebih dahulu.');
        return;
    }

    const historyData = await fetchHistoryData(accessToken);
    const historyList = document.getElementById('history-list');
    historyData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.track.name} oleh ${item.track.artists.map(artist => artist.name).join(', ')}`;
        historyList.appendChild(listItem);
    });
}

async function addItem(event) {
    event.preventDefault();
    const clientId = '9e6caf932a7f4418a28520e7950b4887'; // Ganti dengan Client ID Anda
    const clientSecret = 'b3ff13689eb0452cbf000748874aaa88'; // Ganti dengan Client Secret Anda
    
    const accessToken = await getAccessToken(clientId, clientSecret);
    const itemId = document.getElementById('item-id').value;
    
    const itemData = await fetchPlaylistData(itemId, accessToken);
    
    const playlistSongs = document.getElementById('playlist-songs');
    const listItem = document.createElement('li');
    listItem.textContent = `${itemData.tracks.items[0].track.name} oleh ${itemData.tracks.items[0].track.artists.map(artist => artist.name).join(', ')}`;
    playlistSongs.appendChild(listItem);
}

document.getElementById('add-item-form').addEventListener('submit', addItem);

window.onload = () => {
    displayPlaylist(); // Memanggil fungsi untuk menampilkan playlist
    displayHistory();  // Memanggil fungsi untuk menampilkan riwayat pemutaran
};
