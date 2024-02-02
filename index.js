import React from "react";
import { NativeModules, Text, View } from "react-native";
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
    /// remove archive  message button
    buttonConfig.splice(1, 1);

    return [...buttonConfig];
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
