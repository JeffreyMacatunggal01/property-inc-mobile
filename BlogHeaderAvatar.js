import React from 'react';
import { Text, View, Share } from "react-native";
import AppAvatar from "@src/components/AppAvatar";
import {FontWeights} from "@src/styles/global";
import Icon from "@src/components/Icon";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";

const BlogHeaderAvatar = (props) => {
    const { blog, global, textStyle } = props; 

    const shareUrl = async () => {
        const urlToShare = blog.link; // Replace with your URL
        try {
          await Share.share({
            message: `Check out this link: ${urlToShare}`,
          });
        } catch (error) {
          console.error("Error while sharing:", error.message);
        }
    };

    return (
      <View style={[global.row, { flex: 1, alignItems: "center" }]}>
         <AppAvatar
             size={35}
             source={{ uri: blog.avatar }}
             style={{ marginRight: 10 }}
         />
         <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}> 
            <View style={{ flex: 10  }}>
                <Text
                    style={[global.text, { fontWeight: FontWeights.semiBold, }, textStyle]}>
                    {blog.authorName}
                </Text>
                <Text style={[global.textMeta, textStyle]}>{blog.date}</Text>
            </View>
            <AppTouchableOpacity style={{ flex: 2 }} onPress={shareUrl}>
                <Icon
                icon={{ fontIconName: "share-dots", weight: 400 }}
                webIcon={"Share Dots"} 
                tintColor={global.primaryButtonContainer.backgroundColor}
                style={{
                    width: 14,
                    height: 12,
                }}
                />
            </AppTouchableOpacity>
         </View>
      </View>
    ); 
}

export default BlogHeaderAvatar;