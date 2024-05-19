import { PermissionsAndroid, Platform } from "react-native";

const CheckPermission = (granted) => {
  var check = Object.keys(granted).every((key) => granted[key] === "granted");
  if (check) {
    console.log("You can use the camera and mic");
    return true;
  } else {
    console.log("Camera and mic permission denied");
    return false;
  }
};

const PermissionHandler = async () => {
  try {
    // Android
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      return CheckPermission(granted);
    } else if (Platform.OS === "ios") {
      //
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default PermissionHandler;
