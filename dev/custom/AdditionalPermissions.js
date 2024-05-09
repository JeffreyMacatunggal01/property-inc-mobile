import { getExternalCodeSetup } from "@src/externalCode/externalRepo";

const externalCodeSetup = getExternalCodeSetup();

/**
 * Handles Android Permissions on app Load
 */
const requestAppPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);

    var check = Object.keys(granted).every((key) => granted[key] === "granted");
    if (check) {
      //   console.log("You can use the camera and mic");
      return true;
    } else {
      //   console.log("Camera and mic permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const CustomInitJS = (code) => {
  const externalCodeSetup = code;
  externalCodeSetup.indexJsApi.addIndexJsFunction(async () => {
    await requestAppPermissions();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
      }),
    });
  });
};


export default CustomInitJS;