import MessageSingleScreen from "./jeff/prod/components/MessageSingleScreen"; // jeff update #1
import ThreadItemHeader from "./jeff/prod/components/ThreadItemHeader"; // jeff update #2
import TopicTitle from "./jeff/prod/components/TopicTitle"; // jeff update #3
import BlogHeaderAvatar from "./jeff/prod/components/BlogHeaderAvatar"; // jeff update #4
import React from "react";
// import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { Linking } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import PermissionHandler from "./jeff/prod/utilities/PermissionHandler";
import CustomSingleMessageScreen from "./jeff/dev/screens/CustomSingleMessageScreen";

import { useNavigation, useRoute } from "@react-navigation/native";
// to get the current loggedinUser
import { useSelector } from "react-redux";
// try get cookies
import CookieManager from "@react-native-cookies/cookies";
import { WebView } from "react-native-webview";

export const applyCustomCode = (externalCodeSetup) => {
  // define constant
  const {
    messagesScreenApi,
    messagesSingleScreenApi,
    activitiesScreenApi,
    topicSingleApi,
    indexJsApi,
    navigationApi,
  } = externalCodeSetup;

  let userRefToken = "";

  // Register custom screens
  // webview for bettermessages loading of page
  // webview for jitsimeet call

  // extra permission calling
  // define logic to call before app
  indexJsApi.addIndexJsFunction(async () => {
    // Try get all stored keys/data in device search for token
    const keys = await AsyncStorage.getAllKeys();
    console.log(JSON.stringify(keys));
    // Call App Permission Dialog while App is loading
    await PermissionHandler();
  });

  // Add previous custom code on buddy boss app
  messagesScreenApi.setMessageSingleComponent((props) => (
    <MessageSingleScreen {...props} />
  ));

  messagesSingleScreenApi.setThreadItemHeader((props) => (
    <ThreadItemHeader {...props} />
  ));

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

  // replace screen for singlescreen message
  // navigationApi.replaceScreenComponent("MessagesCreatePostScreen", CustomSingleMessageScreen);

  messagesSingleScreenApi.setActionsFilter((buttonConfig) => {
    // Get state of auth to get the token
    const allState = useSelector((state) => state);
    const auth = useSelector((state) => state.auth);

    const user = useSelector((state) => state.user);
    const thread = useSelector((state) => state.thread);

    const navigation = useNavigation();
    const route = useRoute();
    const newButton = {
      flow: [
        {
          check: () => true, //Return `true` to show the button
          buttons: [
            {
              icon: { fontIconName: "video", weight: "400" },
              label: "Audio/Video Call",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (data) => {
                // log auth state

                // console.log('Auth : ', auth);
                // console.log('Current Route: ', route.name);
                // console.log("CURRENT ROUTE : ", this.props.route.name);
                // prepare user params for audio/video calling
                var test = "";
                var user_id = data.currentUserId;
                var user_link = data.recipients[user_id].user_link;
                var convo_id = data.id;
                var new_url = "https://property.inc?bbapp-call-jwt=audio";
                var convo_url = "&convo-id=" + convo_id;
                var uid_url = "&user-id=" + user_id;
                var name_url = "&name=" + user_link;
                var rtoken_url = "&rtoken=" + auth.token;
                var full_url =
                  new_url + convo_url + uid_url + name_url + rtoken_url;
                // console.log("URL : ", full_url);

                console.log(thread);
                console.log(auth);
                console.log(user);
                // navigation.navigate("CustomWebView2", {
                //   url: full_url,
                // });

                // navigation.navigate("ProfileScreen");

                // return Linking.openURL(full_url);
              },
            },
            // CustomWebView
            {
              icon: { fontIconName: "video", weight: "400" },
              label: "Jitsi Meet Beta",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (data) => {
                // Get user name to point to Web Current Messages
                const name = user.userObject["name"];
                // Get current thread ID
                const threadId = thread.currentId;
                //
                const url =
                  "https://property.inc/members/" +
                  name +
                  "/bp-messages/#/conversation/" +
                  threadId +
                  "/?actions=bp-audio-call";

                console.log("URL TO OPEN: ", url);
                return Linking.openURL("https://property.inc?testbbapp=1");
                // return Linking.openURL(url);

                // console.log(allState);
                // // prepare URL for
                // var user_id = data.currentUserId;
                // var user_link = data.recipients[user_id].user_link;
                // var convo_id = data.id;
                // var url_post_head = "bp-messages/#/conversation/";
                // var action_url = "/?actions=bp-video-call";
                // var jwt_url = "https://property.inc/?bbapp-call-jwt=";
                // var full_url =
                //   jwt_url + user_link + url_post_head + convo_id + action_url;
                // console.log(
                //   "BUTTON USER/APP STATE LOGGED IN token : ",
                //   userRefToken
                // );
                // navigation.navigate("JitsiView", {
                //   url: "https://property.inc/wp-content/uploads/jitsi/index.html",
                // });
              },
            },
            {
              icon: { fontIconName: "video", weight: "400" },
              label: "App to IOS Safari",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (data) => {
                // get the refreshToken
                let refreshToken = auth.refreshToken;
                let home = "https://property.inc/";
                let url =
                  home +
                  "?bbapptest=" +
                  refreshToken +
                  "&id=" +
                  user.userObject["id"];
                custom - jwt - login - bbapp;

                return Linking.openURL(url);
              },
            },
            {
              icon: { fontIconName: "video", weight: "400" },
              label: "Custom Login",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (data) => {
                let refreshToken = auth.refreshToken;
                let userID = user.userObject["id"];
                return Linking.openURL(
                  "https://property.inc/?custom-jwt-login-bbapp=1" +
                    "&userID=" +
                    userID +
                    "&refreshToken=" +
                    refreshToken
                );

                // 'custom-jwt-login-bbap=true'
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
};
