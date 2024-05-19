import AsyncStorage from "@react-native-community/async-storage";
import PermissionHandler from "./jeff/prod/utilities/PermissionHandler";
import MessageSingleScreen from "./jeff/prod/components/MessageSingleScreen";
import ThreadItemHeader from "./jeff/prod/components/ThreadItemHeader";
import BlogHeaderAvatar from "./jeff/prod/components/BlogHeaderAvatar";
import TopicTitle from "./jeff/prod/components/TopicTitle";
import CustomSingleMessageScreen from "./jeff/dev/screens/CustomSingleMessageScreen";

import { useNavigation, useRoute } from "@react-navigation/native";

export const applyCustomCode = (externalCodeSetup) => {
  // define constant
  const {
    messagesScreenApi,
    messagesSingleScreenApi,
    activitiesScreenApi,
    topicSingleApi,
    indexJsApi,
    navigationApi
  } = externalCodeSetup;

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
  navigationApi.replaceScreenComponent("MessagesCreatePostScreen", CustomSingleMessageScreen);


  messagesSingleScreenApi.setActionsFilter((buttonConfig) => {
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
                console.log('Current Route: ', route.name);
                // console.log("CURRENT ROUTE : ", this.props.route.name);

                // var user_id = data.currentUserId;
                // var user_link = data.recipients[user_id].user_link;
                // var convo_id = data.id;
                // var new_url = "https://property.inc?bbapp-call-jwt=audio";
                // var convo_url = "&convo-id=" + convo_id;
                // var uid_url = "&user-id=" + user_id;
                // var name_url = "&name=" + user_link;
                // var rtoken_url = "&rtoken=" + userRefToken;
                // var full_url =
                //   new_url + convo_url + uid_url + name_url + rtoken_url;
                // console.log("URL : ", full_url);
                // navigation.navigate("CustomWebView2", {
                //   url: full_url,
                // });

                navigation.navigate("ProfileScreen");
              },
            },
            // CustomWebView
            {
              icon: { fontIconName: "video", weight: "400" },
              label: "Jitsi Meet Beta",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (data) => {
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
          ],
        },
      ],
    };
    /// remove archive  message button
    buttonConfig.splice(1, 1);
    return [...buttonConfig, newButton];
  });
};