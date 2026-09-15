document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. PENCARIAN (SEARCH ICON NAVBAR)
  // ==========================================
  const searchBtn = document.querySelector('.search-icon');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const keyword = prompt("Masukkan kata kunci pencarian (misal: Nobita, Audio, Gallery):");
      if (keyword) {
        alert("Mencari informasi tentang: " + keyword);
      }
    });
  }

  // ==========================================
  // 2. PEMUTAR MUSIK (SOUNDTRACK PAGE)
  // ==========================================
  const songPlayBtns = document.querySelectorAll('.play-btn');
  const mainPlayBtn = document.getElementById('main-play-btn');
  const nowTitle = document.getElementById('now-playing-title');
  const nowArtist = document.getElementById('now-playing-artist');
  const vinyl = document.querySelector('.vinyl');

  let currentAudio = null;
  let activeBtn = null;

  songPlayBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const audioSrc = this.getAttribute('data-src');
      const songTitle = this.getAttribute('data-title');
      const songArtist = this.getAttribute('data-artist');

      // Jika lagu yang sama diklik (Toggle Play/Pause)
      if (currentAudio && activeBtn === this) {
        if (currentAudio.paused) {
          currentAudio.play();
          this.textContent = '⏸';
          if (mainPlayBtn) mainPlayBtn.textContent = '⏸';
          if (vinyl) vinyl.classList.add('spinning');
        } else {
          currentAudio.pause();
          this.textContent = '▶';
          if (mainPlayBtn) mainPlayBtn.textContent = '▶';
          if (vinyl) vinyl.classList.remove('spinning');
        }
      } else {
        // Hentikan lagu sebelumnya jika ada
        if (currentAudio) {
          currentAudio.pause();
          if (activeBtn) activeBtn.textContent = '▶';
        }

        // Putar lagu baru
        currentAudio = new Audio(audioSrc);
        activeBtn = this;
        currentAudio.play();

        // Update tampilan UI
        this.textContent = '⏸';
        if (mainPlayBtn) mainPlayBtn.textContent = '⏸';
        if (nowTitle) nowTitle.textContent = songTitle;
        if (nowArtist) nowArtist.textContent = songArtist;
        if (vinyl) vinyl.classList.add('spinning');

        // Saat lagu selesai
        currentAudio.onended = () => {
          this.textContent = '▶';
          if (mainPlayBtn) mainPlayBtn.textContent = '▶';
          if (vinyl) vinyl.classList.remove('spinning');
        };
      }
    });
  });

  // Tombol Main Play/Pause di Bar Atas Player
  if (mainPlayBtn) {
    mainPlayBtn.addEventListener('click', () => {
      if (currentAudio) {
        if (currentAudio.paused) {
          currentAudio.play();
          mainPlayBtn.textContent = '⏸';
          if (activeBtn) activeBtn.textContent = '⏸';
          if (vinyl) vinyl.classList.add('spinning');
        } else {
          currentAudio.pause();
          mainPlayBtn.textContent = '▶';
          if (activeBtn) activeBtn.textContent = '▶';
          if (vinyl) vinyl.classList.remove('spinning');
        }
      } else if (songPlayBtns.length > 0) {
        // Putar lagu pertama jika belum ada lagu yang diputar
        songPlayBtns[0].click();
      }
    });
  }

  // ==========================================
  // 3. INTERAKSI GALERI FOTO (GALLERY PAGE)
  // ==========================================
  const thumbImages = document.querySelectorAll('.thumb-item img');
  const mainGalleryImg = document.getElementById('main-gallery-img');

  if (thumbImages.length > 0 && mainGalleryImg) {
    thumbImages.forEach(thumb => {
      thumb.addEventListener('click', function() {
        mainGalleryImg.src = this.src;
        mainGalleryImg.alt = this.alt;
      });
    });
  }
});