function onDeviceReady() {
  alert("onDeviceReady");
  document.removeEventListener('deviceready', onDeviceReady, false);

  // Set AdMobAds options:
  admob.setOptions({
    publisherId:          "ca-app-pub-8785449904139661/1465323866",  // Required
    isTesting: true, // receiving test ads (do not test with real ads as your account will be banned)
    autoShowBanner: true, // auto show banners ad when loaded
  });

      // Start showing banners (atomatic when autoShowBanner is set to true)
  alert("createBannerView");
  admob.createBannerView();
}

document.addEventListener("deviceready", onDeviceReady, false);
