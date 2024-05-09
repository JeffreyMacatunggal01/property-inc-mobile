import React, { useReducer } from "react";
import CustomInitJS from "./dev/custom/AdditionalPermissions";
import BlogHeaderAvatar from "./components/custom_bbapp/BlogHeaderAvatar.js";
import TopicTitle from "./components/custom_bbapp/ThreadItemText.js";
import ThreadItemHeader from "./components/custom_bbapp/ThreadItemHeader.js";
import { Pusher, PusherEvent } from "@pusher/pusher-websocket-react-native";

export const applyCustomCode = (externalCodeSetup) => {
  const initialState = { count: 0 };
  const pusher = Pusher.getInstance();

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        console.log("INCREMENTING");
        return { count: state.count + 1 };
      case "decrement":
        console.log("DECREMENTING");
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  }

  const {
    blogSingleApi,
    topicSingleApi,
    activitiesScreenApi,
    messagesSingleScreenApi,
    indexJsApi,
  } = externalCodeSetup;
  //
  // Call to custom initialization
  CustomInitJS(externalCodeSetup);

  // Register custom screen/pages

  // Call sir Sean added scripts
  messagesSingleScreenApi.setThreadItemHeader((props) => (
    <ThreadItemHeader {...props} />
  ));

  blogSingleApi.setBlogHeaderAvatar(BlogHeaderAvatar);
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

  // create test button on messagesinglescreen

  messagesSingleScreenApi.setActionsFilter((props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const newbuttons = {
      flow: [
        {
          check: () => true,
          buttons: [
            {
              icon: { fontIconName: "phone-call", weight: "400" },
              label: "Increment",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false,
              doFunction: (data) => {
                dispatch({ type: "increment" });
                console.log("Store data : ", JSON.stringify(state));
              },
            },
            {
              icon: { fontIconName: "phone-call", weight: "400" },
              label: "Increment",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false,
              doFunction: (data) => {
                dispatch({ type: "decrement" });
                console.log("Store data : ", JSON.stringify(state));
              },
            },
          ],
        },
      ],
    };
    return [...props, newbuttons];
  });

  indexJsApi.addIndexJsFunction(async () => {
    await pusher.init({
      apiKey: "e02076a427aa8428710c",
      cluster: "ap1",
    });

    await pusher.connect();

    let myChannel = await pusher.subscribe({
      channelName: "my-channel",
      onEvent: function (event) {
        console.log("onEvent: " + event);
      },
    });
    
  });
};

// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   Button,
//   PermissionsAndroid,
//   TextInput,
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native";

// import MessageSingleComponent from "./components/custom_bbapp/MessageSingleComponent.js";
// import ThreadItemHeader from "./components/custom_bbapp/ThreadItemHeader.js";
// import ThreadItemText from "./components/custom_bbapp/ThreadItemText.js";
// import TopicTitle from "./components/custom_bbapp/TopicTitle.js";
// import BlogHeaderAvatar from "./components/custom_bbapp/BlogHeaderAvatar.js";
// import { useNavigation } from "@react-navigation/native";
// import { WebView } from "react-native-webview";

// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
//   centeredView: {
//     top: 100,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//   },
// });

// const webstyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   video: {
//     marginTop: 20,
//     maxHeight: 200,
//     width: 320,
//     flex: 1,
//   },
// });

// const CustomWebView = ({ route }) => {
//   const { url } = route.params;
//   const navigation = useNavigation();
//   const [showButtonAndWebView, setShowButtonAndWebView] = useState(false);
//   const [showActivityIndicator, setShowActivityIndicator] = useState(true);

//   const runFirst = `
//       document.body.style.backgroundColor = 'red';
//       setTimeout(function() { window.alert('hi') }, 2000);
//       true; // note: this is required, or you'll sometimes get silent failures
//     `;

//   return (
//     <SafeAreaView style={{ flex: 1, marginTop: 40, marginBottom: 40 }}>
//       <Button onPress={() => navigation.goBack()} title="Back" />
//       {showActivityIndicator && (
//         <ActivityIndicator size="large" color="#00ff00" />
//       )}
//       <WebView
//         useWebkit
//         originWhitelist={["*"]}
//         onMessage={(event) => {}}
//         ref={() => {}}
//         // sharedCookiesEnabled={true}
//         allowsBackForwardNavigationGestures={true}
//         javaScriptEnabled={true}
//         // thirdPartyCookiesEnabled={true}
//         onLoad={(syntheticEvent) => {
//           setShowButtonAndWebView(true);
//           setShowActivityIndicator(false);
//         }}
//         source={{
//           uri: url,
//           // headers: {
//           //   Cookie: "bbapp=bbapp_view:domain=.property.inc:path=/;",
//           // },
//           headers: {
//             bbapp: "bbapp_view",
//           },
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// const CustomWebView2 = ({ route }) => {
//   const { url } = route.params;
//   const [showActivityIndicator, setShowActivityIndicator] = useState(true);

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

// //
// const CustomJitsiView = ({ route }) => {
//   const { url } = route.params;
//   const [modalVisible, setModalVisible] = useState(false);
//   const [meetingName, setMeetingName] = useState(null);

//   const startMeeting = () => {
//     console.log("Starting Meeting with name : ", meetingName);
//     setModalVisible(false);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <WebView
//         useWebkit
//         originWhitelist={["*"]}
//         baseurl=" "
//         onMessage={(event) => {}}
//         ref={() => {}}
//         sharedCookiesEnabled={true}
//         allowsBackForwardNavigationGestures={true}
//         javaScriptEnabled
//         source={{
//           uri: url,
//           headers: {
//             Cookie: "bbapp=bbapp_view:domain=.property.inc:path=/",
//           },
//         }}
//       />
//       {/* <Text>Custom JitsiView</Text>
//       <Text>URL : {url}</Text>
//       <Button onPress={() => setModalVisible(true)} title="View" />
//       <JitsiModal
//         modalVisible={modalVisible}
//         setModalVisible={setModalVisible}
//         meetingName={meetingName}
//         setMeetingName={setMeetingName}
//         startMeeting={startMeeting}
//       /> */}
//     </View>
//   );
// };

// export const applyCustomCode = (externalCodeSetup) => {
//   const {
//     messagesScreenApi,
//     messagesSingleScreenApi,
//     activitiesScreenApi,
//     topicSingleApi,
//     reduxApi,
//     navigationApi,
//   } = externalCodeSetup;

//   // External code User Variable/States
//   let userRefToken = ""; // holds the app/user jwt token for BuddyBoss app use to loginto site via webview

//   // // Wrap Epic
//   // const epicName = "newMessage";
//   // const filterActionsWrapper =
//   //   (originalEpic) => (action$, store, dependencies) => {
//   //     return action$.pipe(
//   //       filter((action) => action.type === "TEST_REQ"),
//   //       originalEpic // Invoke the original epic after filtering
//   //     );
//   //   };

//   // externalCodeSetup.reduxApi.wrapEpic(epicName, filterActionsWrapper);

//   // //try create new reducer
//   // const reducerName = "thread";
//   // //Initialize the custom reducer
//   // const customReducer =
//   //   (reducer) =>
//   //   (state = reducer(undefined, {}), action) => {
//   //     switch (action.type) {
//   //       case "TEST_NO_1":
//   //         alert("TEST NO 1 Dispatched!");
//   //         // //Use variables below to get index of id which will be removed from the list
//   //         // const removeWithIndex = state.all.ids.indexOf(
//   //         //   action.courseToRemove
//   //         // );
//   //         // const newIds = state.all.ids.splice(removeWithIndex, 1);

//   //         // //Assign new state with "newIds"
//   //         // const newState = {
//   //         //   ...state,
//   //         //   all: {
//   //         //     ...state.all,
//   //         //     ids: newIds,
//   //         //   },
//   //         // };

//   //         return reducer(newState, action);

//   //       default:
//   //         console.log("TEST REDUCER : ", JSON.stringify(action));
//   //         return reducer(state, action);
//   //     }
//   //   };

//   // // EpicWrapper
//   // externalCodeSetup.reduxApi.wrapReducer(reducerName, customReducer);

//   navigationApi.addNavigationRoute(
//     "JitsiView",
//     "JitsiView",
//     CustomJitsiView,
//     "All" // "Auth" | "noAuth" | "Main" | "All"
//   );

//   navigationApi.addNavigationRoute(
//     "CustomWebView",
//     "CustomWebView",
//     CustomWebView,
//     "All" // "Auth" | "noAuth" | "Main" | "All"
//   );

//   navigationApi.addNavigationRoute(
//     "CustomWebView2",
//     "CustomWebView2",
//     CustomWebView2,
//     "All" // "Auth" | "noAuth" | "Main" | "All"
//   );

//   // navigationApi.addNavigationRoute(
//   //   "customMessage",
//   //   "customMessage",
//   //   MyCustomScreen,
//   //   "All"
//   // );

//   // navigationApi.addNavigationRoute(
//   //   "customMessage",
//   //   "customMessage",
//   //   MyCustomScreen,
//   //   "Main"
//   // );

//   reduxApi.addOnStoreCreateListener((props) => {
//     // On app init and redux Store is created, check if authdata is present []

//     // try to get authApi instance
//     const authData = props.getState()["auth"];
//     // check if aready logged in
//     const isLoggedIn = authData.isLoggedIn;
//     if (isLoggedIn) {
//       // alert("App is already logged in proceed to Home Screen.");
//       console.log("App is already logged in proceed to Home Screen.");
//       // cache token to ExternalCode variable/state
//       userRefToken = authData.refreshToken;
//       console.log(userRefToken);
//     } else {
//       // alert("App not yet logged in no auth data found on AsyncStorage.");
//       console.log("App not yet logged in no auth data found on AsyncStorage.");
//     }

//     // console.log("REDUX STORE CREATED");
//     // const authData = props.getState()["auth"];
//     // const isLoggedIn = authData.isLoggedIn;
//     // if (isLoggedIn) {
//     //   const refreshToken = authData.refreshToken;
//     //   console.log("USER/APP STATE LOGGED IN token : ", refreshToken);
//     //   userRefToken = refreshToken;
//     // }
//   });

//   // messagesSingleScreenApi.setActionsFilter((props) => {
//   //   // console.log(JSON.stringify(props));
//   //   // console.log(props.getState());
//   //   return props;
//   // });

//   messagesScreenApi.setMessageSingleComponent((props) => (
//     <MessageSingleComponent {...props} />
//   ));

//   messagesSingleScreenApi.setThreadItemHeader((props) => (
//     <ThreadItemHeader {...props} />
//   ));

//   messagesSingleScreenApi.setThreadItemText((props) => (
//     <ThreadItemText {...props} />
//   ));

//   messagesSingleScreenApi.setActionsFilter((buttonConfig) => {
//     const navigation = useNavigation();
//     const newButton = {
//       flow: [
//         {
//           check: () => true, //Return `true` to show the button
//           buttons: [
//             // {
//             //   icon: { fontIconName: "video", weight: "400" },
//             //   label: "Audio/Video Call",
//             //   isNavigation: true, //If set to true, the button will not be set to a "loading" state
//             //   useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
//             //   doFunction: (data) => {
//             //     var user_id = data.currentUserId;
//             //     var user_link = data.recipients[user_id].user_link;
//             //     var convo_id = data.id;
//             //     var new_url = "https://property.inc?bbapp-call-jwt=audio";
//             //     var convo_url = "&convo-id=" + convo_id;
//             //     var uid_url = "&user-id=" + user_id;
//             //     var name_url = "&name=" + user_link;
//             //     var rtoken_url = "&rtoken=" + userRefToken;
//             //     var full_url =
//             //       new_url + convo_url + uid_url + name_url + rtoken_url;
//             //     console.log("URL : ", full_url);
//             //     navigation.navigate("CustomWebView", {
//             //       url: full_url,
//             //     });
//             //   },
//             // },
//             {
//               icon: { fontIconName: "video", weight: "400" },
//               label: "Audio/Video Call",
//               isNavigation: true, //If set to true, the button will not be set to a "loading" state
//               useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
//               doFunction: (data) => {
//                 var user_id = data.currentUserId;
//                 var user_link = data.recipients[user_id].user_link;
//                 var convo_id = data.id;
//                 var new_url = "https://property.inc?bbapp-call-jwt=audio";
//                 var convo_url = "&convo-id=" + convo_id;
//                 var uid_url = "&user-id=" + user_id;
//                 var name_url = "&name=" + user_link;
//                 var rtoken_url = "&rtoken=" + userRefToken;
//                 var full_url =
//                   new_url + convo_url + uid_url + name_url + rtoken_url;
//                 console.log("URL : ", full_url);
//                 navigation.navigate("CustomWebView2", {
//                   url: full_url,
//                 });
//               },
//             },
//             // CustomWebView
//             {
//               icon: { fontIconName: "video", weight: "400" },
//               label: "Jitsi Meet Beta",
//               isNavigation: true, //If set to true, the button will not be set to a "loading" state
//               useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
//               doFunction: (data) => {
//                 // // prepare URL for
//                 // var user_id = data.currentUserId;
//                 // var user_link = data.recipients[user_id].user_link;
//                 // var convo_id = data.id;
//                 // var url_post_head = "bp-messages/#/conversation/";
//                 // var action_url = "/?actions=bp-video-call";

//                 // var jwt_url = "https://property.inc/?bbapp-call-jwt=";
//                 // var full_url =
//                 //   jwt_url + user_link + url_post_head + convo_id + action_url;

//                 // console.log(
//                 //   "BUTTON USER/APP STATE LOGGED IN token : ",
//                 //   userRefToken
//                 // );

//                 navigation.navigate("JitsiView", {
//                   url: "https://property.inc/wp-content/uploads/jitsi/index.html",
//                 });
//               },
//             },
//           ],
//         },
//       ],
//     };
//     /// remove archive  message button
//     buttonConfig.splice(1, 1);
//     return [...buttonConfig, newButton];
//   });

//   externalCodeSetup.blogSingleApi.setBlogHeaderAvatar(BlogHeaderAvatar);
//   topicSingleApi.setTopicTitleComponent(TopicTitle);
//   activitiesScreenApi.setActivityToViewModelFilter(
//     (viewModel, activity, depend) => {
//       const hrefRegex = /href="([^"]+)"/;
//       const match = viewModel.content.match(hrefRegex);
//       // Extracted href value
//       const hrefValue = match ? match[1] : null;
//       return {
//         ...viewModel,
//         link: hrefValue,
//       };
//     }
//   );
// };
