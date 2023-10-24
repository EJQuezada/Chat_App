# Chat_App

The purpose of this project was to create an application for mobile devices using React Native, where users are able to use the chat interface to send messages, share images, and share their location.

![image](https://github.com/EJQuezada/Chat_App/assets/115997231/0d2dcfb0-8f56-457a-a048-cc3753e31906)


# Instructions for use (starting in PowerShell/Terminal)
- Run npm install to set up dependencies
- Start Expo Go application
- Open terminal/powershell from Chat Application folder
- On Terminal/Powershell, run "npm start" command
- Scan the shown QR code using the Expo Go application on your phone to open the Chat Application

# Technologies Used
- React Native
- Expo (toolchain to write native applications in JS)
- React Native Gifted Chat library
- Google Firestore DB
- Google Firebase Authentication
- AsyncStorage caching for offline use
- Firebase cloud storage (for storing images)
- Expo ImagePicker & MediaLibrary for integrating communication features

# Key Features
- Page where users are able to input their name and select a background color to use in the chat screen before joining the chat.
- A page displays the conversation with an input field and a submit button.
- Chat provides users with two features: send an image, and send location data.
- Data is stored online as well as offline.

# Setting up the Application
- Aplication requires React Native and is developed with Expo, thus it is important to use a node version that is compatible with Expo:
    * **npm install 16.19.0**
    * **npm use 16.19.0**

- Then, install expo CLI using the following command:
    * **npm install -g expo-cli**

- Next, create an expo acccount (http://expo.dev/), and either install the Expo application on your smartphone **or** install a virtual machine on your computer (i.e., **Android Studio**).
- Create a React Native template by running the following command on your Terminal/Powershell:
    * **npx create-expo-app Chat App --template**
- Run Expo:
    * **npm start**, or **expo start**

# Database Configuration
To use your own database for this project create a new database on https://firebase.google.com (after you have first signed-up using a Gmail account). 
  * Run the following command: **npm i firebase**.
  * Navigate to the console ("Go to Console" in the top right)
  * Add Project
  * Once you are in the project, on the left side column under 'Product Categories' use "Build --> Firestore Database"
  * Create Database, Start in production mode, click on Next, then Enable.
  * Once you are in Firestore Database, navigate to rules and change "allow read, write: if false;" to "allow read, write: if true;" then Publish.
  * Navigate to "Project Settings --> General"
  * Under "Your Apps" select webapp (</>)
  * Select a nickname (you do not need to set up Firebase Hosting) and follow the prompts.
  * Copy the section of code starting with 'const firebaseConfig =', then paste it in the App.js file to replace what is already under const firebaseConfig = {[your unique credentials]}.
  * Setup Android Studio

# Libraries necessary to install
If you wish to use all of the features of this application, you will need to run the following commands in your Terminal/Powershell:
  * **expo install expo-image-picker**
  * **expo install react-native.maps**
  * **expo install expo-location**
  * **expo install expo-media-library**

# Github Link
https://github.com/EJQuezada/Chat_App

