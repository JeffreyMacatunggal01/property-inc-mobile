import React from "react";

export const applyCustomCode = (externalCodeSetup) => {
  externalCodeSetup.activitiesScreenApi.setActivityToViewModelFilter((viewModel, activity, depend) => {
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
