import React from "react";
import {
  Button,
  StatusBar,
  PermissionsAndroid,
  NativeModules,
  Linking,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MessageSingleComponent from "./MessageSingleComponent";
import ThreadItemHeader from "./ThreadItemHeader";
import TopicTitle from "./TopicTitle";
import BlogHeaderAvatar from "./BlogHeaderAvatar";

// import MyCustomScreen from "./screens/MyCustomScreen";
// import MessageSingle from "./screens/CustomMessageSingle";

const { RNCustomCode } = NativeModules;

// Function for calling app permission access
const requestAppPermissions = async () => {
  console.log("CHECKING PERMISSIONSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
  try {
    // Request multiple app permissions
    // if android
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);

    // if IOS
    // TODO
    var check = Object.keys(granted).every((key) => granted[key] === "granted");
    if (check) {
      console.log("You can use the camera and mic");
      return true;
    } else {
      console.log("Camera and mic permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     justifyContent: "center",
//     alignItems: "stretch",
//   },
//   button: {
//     height: 50,
//     backgroundColor: "blue",
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

export const applyCustomCode = (externalCodeSetup) => {

  // Run on App Load to check if permissions are permitted
  externalCodeSetup.indexJsApi.addIndexJsFunction(async () => {
    // Call App Permission Dialog while App is loading
    await requestAppPermissions();
    // console.log("NATIVE MODULES! - ", NativeModules);
  });


  
  // // Test modify message display
  // externalCodeSetup.messagesScreenApi.setMessageSingleComponent((props) => (
  //   <MessageSingle {...props} />
  // ));

  // Test log user
  // const exposeUserInfo = (user) => {
  //   // console.log("USER INFO : ", user);
  //   // var head = "https://property.inc/members/";
  //   // var user_nn = user.nicename;
  //   // var post_head = "/bp-messages/#/conversation/";
  //   // var convoID = "277";
  //   // var actionUrl = "/?actions=bp-audio-call";

  //   // var full_url = head + user_nn + post_head + convoID + actionUrl;
  //   // Linking.openURL(
  //   //   "https://property.inc/?custom-link-jwt-generate=" + full_url
  //   // );

  //   //                 "bp-messages/#/conversation/" +
  //   //                 convoID +
  //   //                 "/?actions=bp-audio-call";
  //   // https://property.inc/members/
  // };

  // Test log props
  // const exposeProps = async (p) => {
  //   // console.log(p);

  //   // requestCameraPermission();
  //   requestAppPermissions();
  // };

  // externalCodeSetup.navigationApi.addNavigationRoute(
  //   "book",
  //   "BookScreen",
  //   MyCustomScreen,
  //   "All"
  // );
  // externalCodeSetup.navigationApi.addNavigationRoute(
  //   "book",
  //   "BookScreen",
  //   MyCustomScreen,
  //   "Main"
  // );

  /**
   * Debug Button in Profile Page by adding audio and video call
   */
  // externalCodeSetup.profileScreenHooksApi.setAfterProfileHeader((props) => {
  //   // console.log(props);
  //   // return <Text>showing user id after header, {props.user.id}</Text>;
  //   return (
  //     <View style={styles.container}>
  //       <View>
  //         {/* <Text>showing user id after header, {props.user.id}</Text> */}
  //         <Text>Log Member</Text>
  //         <TouchableOpacity
  //           style={styles.button}
  //           onPress={() => exposeUserInfo(props.user)}
  //         >
  //           <Text style={styles.buttonText}>Log Member Info</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View>
  //         <Text>Log Props</Text>
  //         <TouchableOpacity
  //           style={styles.button}
  //           onPress={() => exposeProps(props)}
  //         >
  //           <Text style={styles.buttonText}>Ask Permission</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // });

  const {
    messagesScreenApi,
    messagesSingleScreenApi,
    activitiesScreenApi,
    topicSingleApi,
  } = externalCodeSetup;

  messagesScreenApi.setMessageSingleComponent((props) => (
    <MessageSingleComponent {...props} />
  ));

  messagesSingleScreenApi.setThreadItemHeader((props) => (
    <ThreadItemHeader {...props} />
  ));
  messagesSingleScreenApi.setActionsFilter((buttonConfig) => {
    console.log();

    const newButton = {
      flow: [
        {
          check: () => true, //Return `true` to show the button
          buttons: [
            {
              icon: { fontIconName: "phone-call", weight: "400" },
              label: "Audio Call",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (a) => {
                // Current user nickname
                var user_nickname = props.user.nicename;
                // Chat/Convo ID
                var chat_id = props.item.id;
                var url_head = "https://property.inc/members/";
                var url_post_head = "/bp-messages/#/conversation/";
                var action_url = "/?actions=bp-audio-call";
                var full_url =
                  url_head +
                  user_nickname +
                  url_post_head +
                  chat_id +
                  action_url;
                return Linking.openURL(
                  "https://property.inc/?custom-link-jwt-generate=" + full_url
                );
              },
            },
            {
              icon: { fontIconName: "video", weight: "400" },
              label: "Video Call",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (a) => {
                // Current user nickname
                var user_nickname = props.user.nicename;
                // Chat/Convo ID
                var chat_id = props.item.id;
                var url_head = "https://property.inc/members/";
                var url_post_head = "/bp-messages/#/conversation/";
                var action_url = "/?actions=bp-audio-call";
                var full_url =
                  url_head +
                  user_nickname +
                  url_post_head +
                  chat_id +
                  action_url;
                return Linking.openURL(
                  "https://property.inc/?custom-link-jwt-generate=" + full_url
                );
              },
            },
          ],
        },
      ],
    };

    /// remove archive  message button
    buttonConfig.splice(1, 1);

    return [...buttonConfig, newButton];
  });

  externalCodeSetup.blogSingleApi.setBlogHeaderAvatar(BlogHeaderAvatar);
  topicSingleApi.setTopicTitleComponent(TopicTitle);
  activitiesScreenApi.setActivityToViewModelFilter(
    (viewModel, activity, depend) => {
      const hrefRegex = /href="([^"]+)"/;
      const match = viewModel.content.match(hrefRegex);

      // Extracted href value
      const hrefValue = match ? match[1] : null;
      return {
        ...viewModel,
        link: hrefValue,
      };
    }
  );

  // // Test restrict page
  // externalCodeSetup.pageScreenHooksApi.setPageComponent((props, Component) => {

  //   if (props.user.userObject.id === 1278){

  //     return <View style={{flex: 1, alignSelf: "ce-nter", justifyContent: "center"}}>
  //       <Text> Sorry, you do not have access this page </Text>
  //       <Button title="Tap here to return" onPress={() => props.navigation.goBack()} />
  //     </View>
  //   }

  //   return Component;

  // })
};
