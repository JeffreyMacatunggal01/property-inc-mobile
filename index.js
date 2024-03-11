import React from "react";
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { NativeModules, Linking, View } from "react-native";
import MessageSingleComponent from "./MessageSingleComponent";
import ThreadItemHeader from "./ThreadItemHeader";
import TopicTitle from "./TopicTitle";
import BlogHeaderAvatar from "./BlogHeaderAvatar";



const { RNCustomCode } = NativeModules;

export const applyCustomCode = (externalCodeSetup) => {
  const { messagesScreenApi, messagesSingleScreenApi, activitiesScreenApi, topicSingleApi } = externalCodeSetup;

  messagesScreenApi.setMessageSingleComponent((props) => <MessageSingleComponent {...props} />);
  messagesSingleScreenApi.setThreadItemHeader((props) => <ThreadItemHeader {...props} />);
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
              doFunction: async (a) => {

                // To Test - Maybe Try in Dev by using a Button add to maybe in a custom Screen?
                var dataStr = JSON.stringify(a.id);
                var dataDict = JSON.parse(dataStr);
                var convoID = dataDict["id"];
                var accUserLink = Object.values(dataDict['recipients'])[0]['user_link']; // https://property.inc/members/jeffrey18/bp-messages/ TOKEN /#/conversation/
                var fullUrl = accUserLink + "bp-messages/#/conversation/" + convoID + "/?actions=bp-audio-call";
                var callurl = "https://property.inc/?custom-link-jwt-generate=" + fullUrl;
                await InAppBrowser.open(
                  callurl,
                  {
                    // Include any other options as needed
                    // ..
                    // Enable microphone access
                    mediaPlaybackRequiresUserAction: true,
                  },
                );

                // a if stringify holds data in a json format
                // data of interest is "id" for conversation identifier and
                // Get currentusername
                // get current selected conversation to use for audio/video calling
                // console.log(a, "dofunc");
                // return Linking.openURL("https://property.inc/?custom-link-jwt-generate=https://property.inc/members?a=" + JSON.stringify(a));
                // return Linking.openURL("https://property.inc/?custom-link-jwt-generate=" + fullUrl);
                
              },
            },
            {
              icon: { fontIconName: "video", weight: "400" },
              label: "Video Call",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: async (a) => {
                var dataStr = JSON.stringify(a.id);
                var dataDict = JSON.parse(dataStr);
                var convoID = dataDict["id"];
                var accUserLink = Object.values(dataDict['recipients'])[0]['user_link']; // https://property.inc/members/jeffrey18/bp-messages/ TOKEN /#/conversation/
                var fullUrl = accUserLink + "bp-messages/#/conversation/" + convoID + "/?actions=bp-video-call";
                var callurl = "https://property.inc/?custom-link-jwt-generate=" + fullUrl;
                await InAppBrowser.open(
                  callurl,
                  {
                    // Include any other options as needed
                    // ..
                    // Enable microphone access
                    mediaPlaybackRequiresUserAction: true,
                  },
                );

                // console.log(a, "dofunc");
                // Linking.openURL("https://property.inc/?custom-link-jwt-generate=https://property.inc/members?a=" + JSON.stringify(a));
                // return Linking.openURL("https://property.inc/?custom-link-jwt-generate=https://property.inc/members/jeffrey18/bp-messages/#/conversation/277/?actions=bp-audio-call");
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
  activitiesScreenApi.setActivityToViewModelFilter((viewModel, activity, depend) => {
    const hrefRegex = /href="([^"]+)"/;
    const match = viewModel.content.match(hrefRegex);

    // Extracted href value
    const hrefValue = match ? match[1] : null;
    return {
      ...viewModel,
      link: hrefValue,
    };
  });
};
