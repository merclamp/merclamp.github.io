var ytPlayer = null;
var ytReady = false;
var playing = false;
var pendingPlay = false;
var btn = document.getElementById('music-toggle');

// Called automatically by the YouTube IFrame API once it loads.
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('yt-player', {
    videoId: 'nfnAfy40gjM',
    playerVars: {
      autoplay: 0,
      loop: 1,
      playlist: 'nfnAfy40gjM',
      controls: 0,
      modestbranding: 1
    },
    events: {
      onReady: function () {
        ytReady = true;
        if (pendingPlay) { ytPlayer.playVideo(); }
      },
      onStateChange: function (e) {
        if (e.data === YT.PlayerState.PLAYING) { setPlaying(true); }
        else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) { setPlaying(false); }
      }
    }
  });
}

function setPlaying(state) {
  playing = state;
  btn.classList.toggle('playing', state);
  btn.innerHTML = state ? '❚❚ PAUSE' : '♫ PLAY MUSIC';
}

btn.addEventListener('click', function () {
  if (!ytReady || !ytPlayer) { pendingPlay = true; setPlaying(true); return; }
  if (playing) { ytPlayer.pauseVideo(); }
  else { ytPlayer.playVideo(); }
});

// Load the YouTube IFrame API.
(function () {
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
})();
