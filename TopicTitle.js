import React from "react";
import { Text, View, Share } from "react-native";
import Icon from "@src/components/Icon";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";

const TopicTitle = ({ colors, global, topic }) => { 
  const { link } = JSON.parse(topic.hash);

  const shareUrl = async () => {
    const urlToShare = link; // Replace with your URL
    try {
      await Share.share({
        message: `Check out this link: ${urlToShare}`,
      });
    } catch (error) {
      console.error("Error while sharing:", error.message);
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
      <Text style={[global.topicSingleTitle, { flex: 11 }]}>{topic.title}</Text>
      <AppTouchableOpacity style={{ flex: 1 }} onPress={shareUrl}>
        <Icon
          icon={{ fontIconName: "share-dots", weight: 400 }}
          webIcon={"Share Dots"}
          tintColor={colors.primaryColor}
          style={{
            width: 14,
            height: 12,
          }}
        />
      </AppTouchableOpacity>
    </View>
  );
};

export default TopicTitle;
