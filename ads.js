function onDeviceReady() {
  document.removeEventListener('deviceready', onDeviceReady, false);

  // Set AdMobAds options:
  admob.setOptions({
    publisherId:          "ca-app-pub-8785449904139661/1465323866",  // Required
  });

      // Start showing banners (atomatic when autoShowBanner is set to true)
  admob.createBannerView();
}

document.addEventListener("deviceready", onDeviceReady, false);
