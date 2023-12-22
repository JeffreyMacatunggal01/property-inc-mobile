import React from "react";
import { NativeModules } from "react-native";
import MessageSingleComponent from "./MessageSingleComponent";
const { RNCustomCode } = NativeModules;

export const applyCustomCode = (externalCodeSetup) => {
  const { messagesScreenApi, activitiesScreenApi } = externalCodeSetup;

  messagesScreenApi.setMessageSingleComponent((props) => <MessageSingleComponent {...props} />);

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
