// ---------------- UK TIME ----------------
function updateTime() {
  const time = new Date().toLocaleTimeString("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById("time").textContent = "UK time • " + time;
}
updateTime();
setInterval(updateTime, 60000);

// ---------------- SPOTIFY via LANYARD ----------------
const DISCORD_ID = "934340360610652180"; // string

async function loadSpotify() {
  try {
    const res = await fetch('https://api.lanyard.rest/v1/users/934340360610652180');
    const data = await res.json();
    const el = document.getElementById("spotify");

    if (!data.data.spotify) {
      el.innerHTML = `<i class="fas fa-music"></i><p>Not listening to anything</p>`;
      return;
    }

    const s = data.data.spotify;
    el.innerHTML = `
      <img src="${s.album_art_url}" width="48" style="border-radius:8px">
      <div>
        <strong>${s.song}</strong><br>
        <span style="color:#9ca3af">${s.artist}</span>
      </div>
    `;
  } catch (err) {
    console.error(err);
    document.getElementById("spotify").innerHTML = `<p>Error loading Spotify</p>`;
  }
}

loadSpotify();
setInterval(loadSpotify, 5000);
