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

/**
 * Handles Android Permissions on app Load
 */
const requestAppPermissions = async () => {
  // console.log("CHECKING PERMISSIONSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
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

export const applyCustomCode = (externalCodeSetup) => {
  // Run on App Load to check if permissions are permitted
  externalCodeSetup.indexJsApi.addIndexJsFunction(async () => {
    // Call App Permission Dialog while App is loading
    await requestAppPermissions();
    // console.log("NATIVE MODULES! - ", NativeModules);
  });

  // externalCodeSetup.messagesScreenApi.setMessageSingleComponent((props) => {
  //   console.log("PROPS: ", props);
  //   console.log("=========================================================");
  //   var user_id = props.item.currentUserId;
  //   var user_link = props.item.recipients[user_id].user_link;
  //   var convo_title = props.item.title;
  //   console.log("PRIMARY VARS");
  //   var url_post_head = "bp-messages/#/conversation/";
  //   var action_url = "/?actions=bp-audio-call";
  //   var jwt_url = "https://property.inc/?custom-link-jwt-generate=";
  //   console.log("SECONDARY VARS");
  //   if (props.item.id === 213) {
  //     console.log("PREPARING LINKING");
  //     var full_url = jwt_url + user_link + url_post_head + 213 + action_url;
  //     Linking.openURL(full_url);
  //     // console.log(full_url);
  //   }
  //   // console.log("USER_ID : ", user_id);
  //   // console.log("USER_LINK :", user_link);
  //   // console.log("CONVO_TITLE :", convo_title);
  //   // // console.log("PROPS: ", props);
  //   // // console.log("CURRENTUSERID : ", props.item.currentUserId);
  //   // console.log("=========================================================");
  // });

  // externalCodeSetup.setMessageSingleComponent((props) => (
  //   // console.log(props);
  //   // return <Text>showing user id after header, {props.user.id}</Text>;
  //   return (
  //     <View>
  //       <View>
  //         {/* <Text>showing user id after header, {props.user.id}</Text> */}
  //         <Text>Log Member</Text>
  //         <TouchableOpacity
  //           onPress={() => {
  //             exposeUserInfo(props.user);
  //           }}
  //         >
  //           <Text>Log Member Info</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View>
  //         <Text>Log Props</Text>
  //         <TouchableOpacity
  //           onPress={() => {
  //             //exposeProps(props)
  //           }}
  //         >
  //           <Text>Ask Permission</Text>
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

  //

  messagesScreenApi.setMessageSingleComponent((props) => (
    <MessageSingleComponent {...props} />
  ));

  //

  messagesSingleScreenApi.setThreadItemHeader((props) => (
    <ThreadItemHeader {...props} />
  ));

  //

  messagesSingleScreenApi.setActionsFilter((buttonConfig) => {
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
              doFunction: (data) => {
                var user_id = data.currentUserId;
                var user_link = data.recipients[user_id].user_link;
                // var convo_title = data.title;
                var convo_id = data.id;
                var url_post_head = "bp-messages/#/conversation/";
                var action_url = "/?actions=bp-audio-call";
                var jwt_url = "https://property.inc/?custom-link-jwt-generate=";
                var full_url =
                  jwt_url + user_link + url_post_head + convo_id + action_url;
                return Linking.openURL(full_url);
              },
            },
            {
              icon: { fontIconName: "video", weight: "400" },
              label: "Video Call",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (data) => {
                var user_id = data.currentUserId;
                var user_link = data.recipients[user_id].user_link;
                // var convo_title = data.title;
                var convo_id = data.id;
                var url_post_head = "bp-messages/#/conversation/";
                var action_url = "/?actions=bp-video-call";
                var jwt_url = "https://property.inc/?custom-link-jwt-generate=";
                var full_url =
                  jwt_url + user_link + url_post_head + convo_id + action_url;
                return Linking.openURL(full_url);
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

  //

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
};
