import React from "react";
import ReadMore from "@src/components/ReadMore";
import HTML from "react-native-render-html";
import htmlclean from "htmlclean";
import { Platform, Text, View } from "react-native";
import RenderHtml from "react-native-render-html";

const ThreadItemText = (props) => {
  const { message, global, thread, item, size, t } = props;
  const lastMessageId = thread.lastMessage.id;
  var marginBot = 2;

  if (item.id === lastMessageId) {
    if (Platform.OS === "ios") {
      marginBot = 2;
    } else {
      marginBot = 100;
    }
  }

  // }
  // console.log("ITEM HERE: ");
  // console.log("ITEM ID : " + item.id + " LAST ITEM ID : " + lastMessageId);
  // // console.log(item.id);
  // console.log(JSON.stringify(message));
  // const source = {
  //   html: `<p style="color: black; font-size: 1.2rem;">
  //   ${message.message}
  //   </p>`,
  // };
  const source = {
    html: `<p style="color: black; font-size: 1.2rem;">
    ${message.message}
    </p>`,
  };

  return (
    <View
      style={[
        global.row,
        {
          justifyContent: "space-between",
          marginBottom: marginBot,
          marginTop: 2,
        },
      ]}
    >
      <RenderHtml source={source} />
    </View>
  );
};

export default ThreadItemText;
