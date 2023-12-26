import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import { withSettings } from "@src/components/hocs/withSettings";
import { formatDate } from "@src/utils";
import { GUTTER } from "@src/styles/global";
import { RichHtmlText } from "@src/utils/htmlRender";
import { AvatarIcon, MessagesAvatars } from "@src/components/Messages/MessageSingle";
//Get avatar components from BuddyBoss app code. You can also create your own component to use

const dotSize = 10;
const dotGap = 8;

function timeAgo(dateString) {
  const currentDate = new Date();
  const isoFormatString = dateString.replace(/ /, "T"); // Replace space with 'T'
  const targetDate = new Date(isoFormatString);

  const timeDifference = currentDate - targetDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (days < 30) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (months < 12) {
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
}

const MessageSingleComponent = (props) => {
  const { item, index, global, colors, t, toThread } = props;

  // console.log(item.recipients.find(), "item");
  let lastSenderData;
  for (var i in item.recipients) {
    if (item.recipients.hasOwnProperty(i)) {
      if (item.recipients[i].name === item.lastSenderName) {
        lastSenderData = item.recipients[i];
      }
    }
  }
 
  console.log(item, "item data");

  return (
    <AppTouchableOpacity onPress={toThread(item)} style={[styles.item, index === 0 ? { paddingTop: 0 } : {}]}>
      <View style={[global.row, styles.itemInner]}>
        <View
          style={[
            global.row,
            {
              justifyContent: "space-between",
              flex: 1,
              paddingLeft: item.unread ? GUTTER - dotSize : GUTTER + dotGap,
            },
          ]}
        >
          {item.unread && <View style={[styles.dot, { backgroundColor: colors.linkColor }]} />}
          {item.isGroupThread ? (
            <View style={avatarStyles.container}>
              <View style={avatarStyles.row}>
                <View style={avatarStyles.imageContainer}>
                  <Image source={{ uri: item.avatars[0]?.uri ?? "" }} style={avatarStyles.image} />
                </View>
                <View style={avatarStyles.imageContainer}>
                  <Image source={{ uri: item.avatars[1]?.uri ?? "" }} style={avatarStyles.image} />
                </View>
              </View>
              <View style={avatarStyles.row}>
                <View style={avatarStyles.imageContainer}>
                  <Image source={{ uri: item.avatars[2]?.uri ?? "" }} style={avatarStyles.image} />
                </View>
                <View style={avatarStyles.imageContainer}>
                  <Image source={{ uri: item.avatars[3]?.uri ?? "" }} style={avatarStyles.image} />
                </View>
              </View>
            </View>
          ) : (
            // item.avatars.slice(0, 4).map((x) => <Image source={{ uri: x.uri ?? "" }} style={styles.image} />)
            <MessagesAvatars item={item} global={global} circleColor={colors.bodyFrontBg} />
          )}

          <View style={[styles.text, global.bottomBorder]}>
            <View
              style={[
                global.row,
                {
                  marginBottom: 3,
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <RichHtmlText colors={colors} numberOfLines={1} richText={item.title} style={global.itemAuthorName} />
              </View>
              <Text style={[global.itemLightMeta]}>{timeAgo(item.dateUTC)}</Text>
            </View>
            <View style={[global.row]}>
              {item.isGroupThread && lastSenderData?.user_avatars?.thumb && (
                <Image
                  source={{ uri: lastSenderData.user_avatars.thumb ?? "" }}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}
              <Text style={[global.messageExcerpt, { flex: 1 }, item.unread ? { color: colors.textColor } : {}]}>
                {item.excerpt}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </AppTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    paddingRight: GUTTER,
  },
  itemInner: {
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 12,
    flex: 1,
  },
  dot: {
    marginRight: dotGap,
    borderRadius: 5,
    width: dotSize,
    height: dotSize,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 10, // Optional: Add styling, e.g., border radius
    marginRight: 10,
  },
});

const avatarStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 50, // Ensure the row takes up the full width
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%", // Ensure the row takes up the full width
  },
  imageContainer: {
    margin: 2,
    borderRadius: 2,
    overflow: "hidden",
    width: "45%", // Adjust the width based on your preference
  },
  image: {
    width: "100%",
    height: 20, // Adjust the height based on your preference
    resizeMode: "cover",
    borderRadius: 2,
  },
});

export default withSettings(MessageSingleComponent);
