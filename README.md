# MobileApp

#### Instructions to setup environment:
- preferably setup conda env
- if you don't have node installed : Brew install node
- Brew install watchman
- iOS specific : 
  - sudo gem install cocoapods
  - instructions to setup Xcode and simulator : https://reactnative.dev/docs/environment-setup
- android specific :
  - follow instructions here : https://reactnative.dev/docs/environment-setup

#### Instructions to run the app:
- git clone the project
- cd into MobileApp folder
  - run npm install/yarn add
  - if any dependencies are missing npm install/yarn add them individually
- cd into ios folder
  - run pod install
- to run iOS : npx react-native run-ios
- to run android : npx react-native run-android
