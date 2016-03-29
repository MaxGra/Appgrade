App.info({
  name: 'AppGrade',
  description: 'AppGrade die Notenapp der HTL-Rennweg',
  author: 'Team Appgrade',
  email: 'info@appgrade.at',
  website: 'www.appgrade.at',
  version: '0.0.1'
});

App.icons({
  // iOS
//  'iphone': 'resources/icons/icon-60x60.png',
//  'iphone_2x': 'resources/icons/icon-60x60@2x.png',
//  'ipad': 'resources/icons/icon-76x76.png',
//  'ipad_2x': 'resources/icons/icon-76x76@2x.png',

  // Android
  'android_mdpi': 'resources/icons/android/agmdpi.png',
  'android_hdpi': 'resources/icons/android/aghdpi.png',
  'android_xhdpi': 'resources/icons/android/agxhdpi.png',
  'android_xxhdpi': 'resources/icons/android/agxxhdpi.png',
  'android_xxxhdpi': 'resources/icons/android/agxxxhdpi.png'
});

App.launchScreens({
  // iOS
//  'iphone': 'resources/splash/splash-320x480.png',
//  'iphone_2x': 'resources/splash/splash-320x480@2x.png',
//  'iphone5': 'resources/splash/splash-320x568@2x.png',
//  'ipad_portrait': 'resources/splash/splash-768x1024.png',
//  'ipad_portrait_2x': 'resources/splash/splash-768x1024@2x.png',
//  'ipad_landscape': 'resources/splash/splash-1024x768.png',
//  'ipad_landscape_2x': 'resources/splash/splash-1024x768@2x.png',
//
//  // Android
//  'android_mdpi_portrait': 'resources/splash/drawable-de-mdpi/background.9.png',
//  'android_hdpi_portrait': 'resources/splash/drawable-de-hdpi/background.9.png',
//  'android_xhdpi_portrait': 'resources/splash/drawable-de-xhdpi/background.9.png',
//  'android_xxhdpi_portrait': 'resources/splash/drawable-de-xxhdpi/background.9.png',
//  'android_xxxhdpi_portrait': 'resources/splash/drawable-de-xxxhdpi/background.9.png'
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');

App.accessRule("blob:*");