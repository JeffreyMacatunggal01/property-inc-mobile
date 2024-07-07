import MessageSingleScreen from "./jeff/prod/components/MessageSingleScreen"; // jeff update #1
import ThreadItemHeader from "./jeff/prod/components/ThreadItemHeader"; // jeff update #2
import TopicTitle from "./jeff/prod/components/TopicTitle"; // jeff update #3
import BlogHeaderAvatar from "./jeff/prod/components/BlogHeaderAvatar"; // jeff update #4
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import PermissionHandler from "./jeff/prod/utilities/PermissionHandler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import MessageWebsocketVersion from "./dev/custom/MessageWebsocketVersion";
import WebSocketExample from "./jeff/dev/screens/CustomWebsocketScreen";
import CustomMessageView from "./jeff/dev/views/CustomMessageView";

import CustomView from "./jeff/dev/views/CustomView";

import { Websocket } from "react-use-websocket";
import RenderHtml from "react-native-render-html";

// const CustomWebView = ({ route }) => {
//   const { url } = route.params;

//   return (
//     <SafeAreaView style={{ flex: 1, marginTop: 40, marginBottom: 40 }}>
//       <WebView
//         useWebkit
//         originWhitelist={["*"]}
//         onMessage={(event) => {}}
//         ref={() => {}}
//         // sharedCookiesEnabled={true}
//         allowsBackForwardNavigationGestures={true}
//         javaScriptEnabled={true}
//         // thirdPartyCookiesEnabled={true}
//         source={{
//           uri: url,
//           headers: {
//             bbapp: "bbapp_view",
//           },
//         }}
//         onLoad={(syntheticEvent) => {
//           // setShowActivityIndicator(false);
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// // Define a test persisten WebView
const PersistentWebView = () => {
  const [webViewState, setWebViewState] = useState({});

  // Get app current user or accessToken
  // pass in url
  // on load let backend do the redirect to message screen



  // Customize WebView props as needed
  const webViewProps = {
    source: { uri: "https://property.inc" },
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40, marginBottom: 40 }}>
      <WebView {...webViewProps} />
    </SafeAreaView>
  );
};


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

  // ##########################################################################
  // Register custom screens
  // webview for bettermessages loading of page
  // webview for jitsimeet call
  // navigationApi.addNavigationRoute(
  //   "newmessage",
  //   "newmessage",
  //   MessageWebsocketVersion,
  //   "All" // "Auth" | "noAuth" | "Main" | "All"
  // );

  // navigationApi.addNavigationRoute(
  //   "customwebsocket",
  //   "customwebsocket",
  //   WebSocketExample,
  //   "All" // "Auth" | "noAuth" | "Main" | "All"
  // );

  navigationApi.addNavigationRoute(
    "persistentview",
    "persistentview",
    CustomMessageView,
    "All" // "Auth" | "noAuth" | "Main" | "All"
  );

  // navigationApi.addNavigationRoute(
  //   "persistwebview",
  //   "persistwebview",
  //   CustomMessageView,
  //   "All" // "Auth" | "noAuth" | "Main" | "All"
  // );
  // ##########################################################################

  // ##########################################################################


  // Uncomment this to override default BBApp Message Page/View/Screen
  // navigationApi.replaceScreenComponent("messages", CustomMessageView);


  // ##########################################################################
  // extra permission calling
  // define logic to call before app
  indexJsApi.addIndexJsFunction(async () => {
    // Try get all stored keys/data in device search for token
    const keys = await AsyncStorage.getAllKeys();
    console.log(JSON.stringify(keys));
    // Call App Permission Dialog while App is loading
    await PermissionHandler();
  });

  // indexJsApi.addIndexJsFunction(() => {
  //   console.log("INIT APP ON INDEX JS");
  //   const auth = useSelector((state) => state.auth);
  //   console.log("AUTH IS : ", auth);
  // });

  // ############################################################## //
  // ############################################################## //
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
  //
  // ############################################################## //
  // ############################################################## //
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
            // Audio Call
            {
              icon: { fontIconName: "audio", weight: "400" },
              label: "Audio Call",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (data) => {
                var user_id = data.currentUserId;
                // var user_link = data.recipients[user_id].user_link;
                var convo_id = data.id;
                var new_url = "https://property.inc?bbapp-call-jwt=audio";
                var convo_url = "&cID=" + convo_id;
                var uid_url = "&uID=" + user_id;
                // var name_url = "&name=" + user_link;
                var rtoken_url = "&rtoken=" + auth.refreshToken;
                var full_url = new_url + convo_url + uid_url + rtoken_url;

                // navigation.navigate("customwebview", {
                //   url: full_url,
                // });

                navigation.navigate("messages");
              },
            },
            // Video Call
            {
              icon: { fontIconName: "video", weight: "400" },
              label: "Video Call",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (data) => {
                // var test = "";
                var user_id = data.currentUserId;
                // var user_link = data.recipients[user_id].user_link;
                var convo_id = data.id;
                var new_url = "https://property.inc?bbapp-call-jwt=video";
                var convo_url = "&cID=" + convo_id;
                var uid_url = "&uID=" + user_id;
                // var name_url = "&name=" + user_link;
                var rtoken_url = "&rtoken=" + auth.refreshToken;
                var full_url = new_url + convo_url + uid_url + rtoken_url;
                console.log(full_url);

                navigation.navigate("customwebview", {
                  url: full_url,
                });
              },
            },
            // Open Custom Webview
            {
              icon: { fontIconName: "video", weight: "400" },
              label: "Custom Webview",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (data) => {
                var test = "";
                var user_id = data.currentUserId;
                var user_link = data.recipients[user_id].user_link;
                var convo_id = data.id;
                var new_url = "https://property.inc?bbapp-call-jwt=video";
                var convo_url = "&cID=" + convo_id;
                var uid_url = "&uID=" + user_id;

                // var name_url = "&name=" + user_link;

                var rtoken_url = "&rtoken=" + auth.refreshToken;
                var full_url = new_url + convo_url + uid_url + rtoken_url;

                navigation.navigate("customwebview", {
                  url: full_url,
                });
              },
            },
            // Debug States
            {
              icon: { fontIconName: "video", weight: "400" },
              label: "Debug States",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (data) => {
                console.log(thread);
                console.log(auth);
                console.log(user);

                navigation.navigate("newmessage");
              },
            },
            {
              icon: { fontIconName: "video", weight: "400" },
              label: "Websocket",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (data) => {
                navigation.navigate("customwebsocket");
              },
            },
            {
              icon: { fontIconName: "video", weight: "400" },
              label: "Persistent Webview",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (data) => {
                navigation.navigate("persistentview");
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

// export const applyCustomCode = (externalCodeSetup) => {
//   const {
//     messagesScreenApi,
//     messagesSingleScreenApi,
//     activitiesScreenApi,
//     topicSingleApi,
//     indexJsApi,
//     navigationApi,
//   } = externalCodeSetup;

//   indexJsApi.addIndexJsFunction(() => {
//     console.log("INIT APP ON INDEX JS");
//     const auth = useSelector((state) => state.auth);
//     console.log("AUTH IS : ", auth);
//   });
// };
