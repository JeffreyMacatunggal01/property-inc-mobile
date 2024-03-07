import React from "react";
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
              doFunction: (a) => {
                console.log(a, "dofunc");
                return Linking.openURL("https://property.inc/?custom-link-jwt-generate=https://property.inc/members?a=" + a);
              },
            },
            {
              icon: { fontIconName: "video", weight: "400" },
              label: "Video Call",
              isNavigation: true, //If set to true, the button will not be set to a "loading" state
              useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
              doFunction: (a) => {
                console.log(a, "dofunc");
                return Linking.openURL("https://property.inc/?custom-link-jwt-generate=https://property.inc/members?a=" + a);
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
