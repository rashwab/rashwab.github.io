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
const DISCORD_ID = "934340360610652180"; // your Discord ID
const API_KEY = "608730918dd448bd45298bc95c31e44f"; // your Lanyard API key

async function loadLanyard() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${934340360610652180}`, {
      headers: {
        "Authorization": API_KEY
      }
    });
    const data = await res.json();

    // Discord status
    const statusEl = document.getElementById("discord-status");
    statusEl.textContent = `Status: ${data.data.discord_status}`;

    // Spotify
    const spotifyEl = document.getElementById("spotify");
    if (data.data.spotify) {
      const s = data.data.spotify;
      spotifyEl.innerHTML = `
        <img src="${s.album_art_url}" width="48" style="border-radius:8px">
        <div>
          <strong>${s.song}</strong><br>
          <span style="color:#9ca3af">${s.artist}</span>
        </div>
      `;
    } else {
      spotifyEl.innerHTML = `<i class="fas fa-music"></i><p>Not listening to anything</p>`;
    }

    // KV example
    console.log("KV Store:", data.data.kv);

  } catch (err) {
    console.error(err);
  }
}

// Run the function
loadLanyard();
setInterval(loadLanyard, 5000); // refresh every 5s
