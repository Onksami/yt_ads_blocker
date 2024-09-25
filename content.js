chrome.storage.local.get("skipperEnabled", (result) => {
  if (result.skipperEnabled !== false) {
    // Monitor ads only if the skipper is enabled
    monitorAds();
  }
});

// Function to skip skippable ads
function skipAd() {
  const skipButton = document.querySelector(".ytp-ad-skip-button"); // Skip ad button
  if (skipButton) {
    skipButton.click();
    console.log("Ad skipped.");
  }
}

// Function to mute non-skippable ads and restore volume
function handleNonSkippableAds() {
  const adOverlay = document.querySelector(".ytp-ad-overlay-close-button"); // Close overlay ads
  if (adOverlay) {
    adOverlay.click();
    console.log("Overlay ad closed.");
  }

  const player = document.querySelector("video");
  if (player) {
    if (document.querySelector(".ad-showing")) {
      // Detect if an ad is playing
      if (!player.muted) {
        player.muted = true; // Mute video during non-skippable ads
        console.log("Video muted for non-skippable ad.");
      }
    } else {
      if (player.muted) {
        player.muted = false; // Restore volume when no ad is playing
        console.log("Volume restored.");
      }
    }
  }
}

// Function to monitor YouTube ads
function monitorAds() {
  setInterval(() => {
    skipAd(); // Try skipping skippable ads
    handleNonSkippableAds(); // Mute non-skippable ads
  }, 1000); // Check every second
}

// Start monitoring ads when the page loads
window.addEventListener("load", monitorAds);
