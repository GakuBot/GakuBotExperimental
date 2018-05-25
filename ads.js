//https://github.com/admob-google/admob-cordova
//https://stackoverflow.com/questions/38059587/admob-not-working-in-phonegap-and-android

var AdmobManager = {
    // admob configuration
    admobCfg: {},

    // Initialize admob support, and start showing a banner right away
    initAdmob: function () {
        // If we don't have admob support, don't try to configure anything
        if (!admob)
            return;

        // Configure the IDs for the iOS and Android banner and interstitial ads
        AdmobManager.admobCfg.iosCfg = {
            banner: "ca-app-pub-8785449904139661/1465323866",
            interstitial: "ca-app-pub-8785449904139661/1465323866"
        };
        AdmobManager.admobCfg.androidCfg = {
            banner: "ca-app-pub-8785449904139661/1465323866",
            interstitial: "ca-app-pub-8785449904139661/1465323866"
        };

        // Choose ad IDs based on platform
        AdmobManager.admobCfg.activeCfg = (/(android)/i.test(navigator.userAgent)) ? AdmobManager.admobCfg.androidCfg : AdmobManager.admobCfg.iosCfg;

        // Now we can init admob: set the IDs, and build a param for testing mode
        admob.initAdmob(AdmobManager.admobCfg.activeCfg.banner, AdmobManager.admobCfg.activeCfg.interstitial);
        AdmobManager.admobCfg.extraParams = new admob.Params();
        AdmobManager.admobCfg.extraParams.isTesting = true;

        // Request banner ads immediately upon app start
        admob.showBanner(admob.BannerSize.BANNER, admob.Position.BOTTOM_CENTER, AdmobManager.admobCfg.extraParams);
    },

    // start allowing Admob interstitials
    enableAdmobInterstitial: function () {
        // If we don't have admob support, don't try to configure anything
        if (!admob)
            return;

        // Set up a listener for showing an interstitial once it arrives
        document.addEventListener(admob.Event.onInterstitialReceive, function (message) {
            admob.showInterstitial();
        }, false);

        // Request an interstitial to be sent
        admob.cacheInterstitial(AdmobManager.admobCfg.extraParams);
    }
}

document.addEventListener("deviceready", AdmobManager.initAdmob, false);
