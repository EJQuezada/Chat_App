import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  storage,
  userID,
}) => {
  const actionSheet = useActionSheet();

  //Sets up the options for the action button in the input toolbar
  const onActionPress = () => {
    const options = [
      "Choose from Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
            return;
          default:
        }
      }
    );
  };

  //requesting permission to access media library
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      //launches image library
      let result = await ImagePicker.launchImageLibraryAsync();
      //update the state if user does not cancel image picking
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions have not been granted yet.");
    }
  };

  //requesting permission to use the camera on the device to add picture to the chat
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions have not been granted yet.");
    }
  };

  //requesting permission to access and send device location
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert("Error occurred while fetching your location");
    } else Alert.alert("Permissions have not been granted.");
  };

  //To create a unique reference for each uploaded image
  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    //combining multiple strings to creat an image reference
    return `${userID}-${timeStamp}-${imageName}`;
  };

  const uploadAndSendImage = async (imageURI) => {
    //creates a reference string for image
    const uniqueRefString = generateReference(imageURI);
    //creates a reference to store on Firebase cloud
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    //converts image to Blob format
    const blob = await response.blob();
    //uploads file to cloud storage
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      console.log("File has uploaded successfully");
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend({ image: imageURL });
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 15,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;
