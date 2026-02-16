Face Detection App – React Native

<!-- Project Description -->

This project is a React Native mobile application that performs real-time face detection
using the device camera and Google ML Kit.

The application was developed using `@react-native-community/cli` and tested on a
physical Android device.

---

<!-- Setup Instructions -->

<!-- Installed Software -->

* Node.js (v22.0)
* Java JDK 17
* Android Studio (for SDK tools)
* Gradle 9
* React Native CLI

-----

<!-- Install Project Dependencies -->

From the project root folder, run:

```bash
npm install
```

--------

<!-- Install Required Libraries -->


Run the following commands to install all required dependencies:

<!-- Camera + Face Detection -->

```bash
npm install react-native-vision-camera
npm install @react-native-ml-kit/face-detection
npm install react-native-worklets-core
```

<!--  Navigation -->

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-screens
npm install react-native-safe-area-context
```

<!-- Icons -->

```bash
npm install react-native-vector-icons
```

--------

<!-- Additional Manual Configuration -->

Some native configuration changes were required for camera access,
icons support, and real-time face detection.


<!-- Camera Permission -->

Added the following line in:
android/app/src/main/AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

This is required to allow the application to access the device camera
for live face detection.

-------

<!-- Enable Vector Icons (Gradle Configuration) -->

Added this line in:
android/app/build.gradle

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"


This links the Ionicons font files so icons can display correctly in the app UI.

-------

<!-- Enable Frame Processors for Vision Camera -->

android/gradle.properties

VisionCamera_enableFrameProcessors=true

This enables Vision Camera’s frame processor feature, which is required
for running ML Kit face detection in real time.

Without this setting, face detection would not work.

--------



<!-- Start Metro Server -->

```bash
npm start
```

--------

<!-- Run Application on Android Phone -->

Connect device with USB debugging enabled and run:

```bash
npm run android
```

The app will install directly on the connected device.

> Note: Android Emulator was not used due to compatibility issues.

----------


<!-- Libraries Used -->
Library                                     Purpose                                 
react-native-vision-camera                  Access device camera and stream frames 
@react-native-ml-kit/face-detection         Detect faces using on-device ML         
react-native-worklets-core                  Required for real-time frame processing 

---------

<!-- Assumptions Made -->

* Application is developed and tested only for Android devices.
* A physical Android phone is used instead of emulator.
* iOS build requires macOS + Xcode (not available).
* Internet connection is not required (offline ML processing).

----------


 <!-- Short Screen Recording -->

A short demo video is included showing:

* App launch
* Camera opening
* Face detection working in real time


------------


<!-- File Location: -->

<video controls src="demovideo.mp4" title="C:\Face_app\demovideo.mp4"></video>

----------

<!-- Conclusion -->

This project demonstrates integration of React Native with device camera and
Google ML Kit to perform real-time face detection on a mobile device.
