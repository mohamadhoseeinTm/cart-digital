let m = document.getElementsByClassName("sarpacat")[0].addEventListener("click", function () {
    console.log("mohamad");
    document.getElementById("imagd2").classList.add("imagd12");
    this.classList.add("sarpacat2");
  });

document.addEventListener("DOMContentLoaded", (event) => {
  const controlBtn = document.getElementById("play-pause");
  let track = document.getElementById("track"),
    duration = track.duration, // Duration of audio clip (NaN here as the track is not loaded)
    playhead = document.getElementById("playhead"), // playhead
    timeline = document.getElementById("timeline"), // timeline
    timelineWidth = timeline.offsetWidth - playhead.offsetWidth,
    source = controlBtn.getAttribute("data-audio"),
    leftTimer = document.getElementById("is-left"),
    rightTimer = document.getElementById("is-right");

  if (!track) return;

  // Update the track duration when the track is loaded.
  track.addEventListener(
    "canplaythrough",
    function () {
      duration = track.duration;
    },
    false
  );

  function playPause() {
    null === track.getAttribute("src") ? track.setAttribute("src", source) : "";
    document.getElementById("thumb").classList.add("thumb2");

    if (track.paused) {
      track.play();
      controlBtn.className = "pause";

      document.getElementById("thumb").classList.add("thumb2");

    } else {
      track.pause();
      controlBtn.className = "play";
      document.getElementById("thumb").classList.remove("thumb2");

    }
  }

  controlBtn.addEventListener("click", playPause);
  document.getElementsByClassName("sarpacat")[0].addEventListener("click", playPause);

  track.addEventListener("ended", function () {
    controlBtn.className = "play";
    track.currentTime = 0; // reset the playhead
  });

  // timeupdate event listener
  track.addEventListener("timeupdate", timeUpdate, false);

  // makes timeline clickable
  timeline.addEventListener(
    "click",
    function (event) {
      moveplayhead(event);
      track.currentTime = duration * clickPercent(event);
    },
    false
  );

  // Moves playhead as user clicks
  function moveplayhead(event) {
    let newMargLeft = event.clientX - getPosition(timeline);

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
      playhead.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
      playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
      playhead.style.marginLeft = timelineWidth + "px";
    }
  }

  function getPosition(el) {
    return el.getBoundingClientRect().left;
  }

  // returns decimal number of the total timelineWidth
  function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;
  }

  // Time update
  function timeUpdate() {
    let playPercent = timelineWidth * (track.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    scrub.style.width = playPercent + "px";

    // Current time
    document.getElementById("duration-time").innerHTML =
      formatSecondsAsTime(duration);
    document.getElementById("current-time").innerHTML = formatSecondsAsTime(
      Math.floor(track.currentTime)
    );
  }

  // Synchronizes playhead position with current point in audio
  function formatSecondsAsTime(secs, format) {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - hr * 3600) / 60);
    let sec = Math.floor(secs - hr * 3600 - min * 60);

    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }

    return min + ":" + sec;
  }

  /**
   * Progress Locator
   */

  function hmsToSecondsOnly(str) {
    var p = str.split(":"),
      s = 0,
      m = 1;

    while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
    }

    return s;
  }

  function moveToDuration() {
    let searchLink = document.querySelectorAll(".search-duration");
    let audio = document.querySelector("#track");

    if (searchLink.length > 0) {
      searchLink.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          if (audio) {
            let currentTime = audio.currentTime;
            if (currentTime == 0) {
              playPause();
            }

            let seekTime = hmsToSecondsOnly(link.textContent);
            audio.currentTime = seekTime;
          }
        });
      });
    }
  }
  moveToDuration();
});
