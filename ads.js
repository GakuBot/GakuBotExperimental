let isAppForeground = true;

function onDeviceReady() {
  document.removeEventListener('deviceready', onDeviceReady, false);

  // Set AdMobAds options:
  AdMob.setOptions({
    publisherId: "ca-app-pub-8785449904139661/1465323866",  // Required
  	adSize: 'SMART_BANNER',
  	position: AdMob.AD_POSITION.BOTTOM_CENTER
  });

  document.addEventListener("pause", onPauseGame, false);
  document.addEventListener("resume", onResumeGame, false);

  // Start showing banners (atomatic when autoShowBanner is set to true)
  AdMob.createBannerView();
}

function onResumeGame() {
  if (isAppForeground) {
    AdMob.destroyBannerView();
    isAppForeground = false;
  }
}

function onPauseGame() {
  if (!isAppForeground) {
    setTimeout(AdMob.createBannerView, 1);
    isAppForeground = true;
  }
}

document.addEventListener("deviceready", onDeviceReady, false);
