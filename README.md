# React Native Demo

## Getting started

Clone the Repo
- ```npm install```
- Navigate to App.js in the root folder, and change the ```options``` object with the desired entries, such as the ```api key/token, userId, content_language``` etc
```
const options = {
  user_id: "USER_ID_HERE",
  group_id: "GROUP_ID_HERE",
  content_language: "CONTENT_LANGUAGE_HERE",
  phrase: "PHRASE",
  apiKey: "API_KEY_HERE",
  apiToken: "API_TOKEN_HERE"
  };
  ```

## Troubleshooting and Build Process

#### 

#### Android Debug Bridge 

Adb can be a useful build tool for Android React Native development and troubleshooting. Add the following to your path by exporting to bashrc (zshrc):
```
export PATH=/Users/hasssan/Library/Android/sdk/platform-tools:$PATH
```

#### Running on Android Device 
Make sure there is a local.properties file in the android/ directory. It should have the sdk directory: 
```
sdk.dir = /Users/YOUR_USER_NAME/Library/Android/sdk
```
Connect your device and get the device id 
```
adb devices
```
Use the device id to run on your physical device 
```
npx react-native run-android --deviceId=DEVICE_ID
```

Depending on your react version, you might need to bundle the JS side to so it can be taken in by native Android (make sure the android/app/src/main/assets folder exists): 

```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

#### Running on IOS Device 
Connect your device and unlock it 
```
npx react-native run-ios --device
```



- IOS Screenshot
<br>
<img src="/res/ios.jpeg" width=300px></img>
- Android Screenshot
<br>
<img src="/res/android.png" width=300px></img>




