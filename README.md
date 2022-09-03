# MobileApp

#### Instructions to setup environment:
- preferably setup conda env
- if you don't have node installed run one of the following commands
  -  brew install node
  -  conda install -c conda-forge nodejs
- to install watchman run one of the following commands:
  - brew install watchman
  - pip install watchdog
- iOS specific : 
  - sudo gem install cocoapods
  - instructions to setup Xcode and simulator : https://reactnative.dev/docs/environment-setup
- android specific :
  - follow instructions here : https://reactnative.dev/docs/environment-setup

#### Instructions to run the app:
- git clone the project
- cd into root(MobileApp) folder
  - run : 'npm install' OR 'yarn add'
  - if any dependencies are missing 'npm install <package_name>' OR 'yarn add <package_name>' them individually
- before running the projecct on ios device : cd into ios folder and run the following command -
  - pod install
- when you are ready to run the app : move to root(MobileApp) folder: 
  - to run iOS : npx react-native run-ios
  - to run android : npx react-native run-android
