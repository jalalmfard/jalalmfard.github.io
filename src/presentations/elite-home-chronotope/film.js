(() => {
  const host = document.getElementById('film-player');
  const offline = location.protocol === 'file:' || window.ELITE_OFFLINE === true;
  let player;
  const previousSetChapter = setChapter;
  setChapter = function(i, morph = false) {
    previousSetChapter(i, morph);
    const active = photoChapters[chapter - 6]?.video === true;
    if (active && !player) {
      if (offline) {
        player = document.createElement('video');
        player.controls = true;
        player.playsInline = true;
        player.preload = 'metadata';
        player.poster = 'assets/blackbox.webp';
        player.src = 'assets/elite-film.mp4';
        player.setAttribute('aria-label', 'فیلم الیت هوم');
        player.addEventListener('keydown', e => e.stopPropagation());
      } else {
        player = document.createElement('iframe');
        player.src = 'https://drive.google.com/file/d/19XPucXmOFHjrqskWfCZMi8jVubmcfS27/preview';
        player.title = 'فیلم الیت هوم';
        player.allow = 'autoplay; fullscreen';
        player.allowFullscreen = true;
      }
      host.append(player);
    }
    if (!active && player) {
      if (offline) player.pause();
      else { player.remove(); player = null; }
    }
  };
})();
