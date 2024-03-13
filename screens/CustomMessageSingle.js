//In custom_code/components/MessageSingle.js...
import React from "react";
import {View, StyleSheet, Text} from "react-native";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import {withSettings} from "@src/components/hocs/withSettings";
import {formatDate} from "@src/utils";
import {GUTTER} from "@src/styles/global";
import {RichHtmlText} from "@src/utils/htmlRender";
import {AvatarIcon, MessagesAvatars} from "@src/components/Messages/MessageSingle"; //Get avatar components from BuddyBoss app code. You can also create your own component to use

const dotSize = 10;
const dotGap = 8;

const MessageSingle = props => {
   const {item, index, global, colors, t, toThread} = props;


   console.log("MESSAGE ITEM INFO PROPS ITEM ONLY: ", props.item);

   return (
     <AppTouchableOpacity
       onPress={toThread(item)}
       style={[styles.item, index === 0 ? {paddingTop: 0} : {}]}
     >
        <View>
            <Text>Test Messages List</Text>
        </View>
       <View style={[global.row, styles.itemInner]}>
         <View
           style={[
             global.row,
             {
               justifyContent: "space-between",
               flex: 1,
               paddingLeft: item.unread ? GUTTER - dotSize : GUTTER + dotGap
             }
           ]}
         >
         {item.unread && (
           <View style={[styles.dot, {backgroundColor: colors.linkColor}]} />
         )}
           <View style={[styles.text, global.bottomBorder]}>
             <View
               style={[
                 global.row,
                 {
                   marginBottom: 3,
                   justifyContent: "space-between",
                   alignItems: "flex-start"
                 }
               ]}
             >
             <View style={{flex: 1}}>
               <RichHtmlText
                 colors={colors}
                 numberOfLines={1}
                 richText={item.title}
                 style={global.itemAuthorName}
               />
             </View>
             <Text style={[global.itemLightMeta]}>{item.date}</Text>
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
   paddingRight: GUTTER
 },
 itemInner: {
   flex: 1,
   justifyContent: "space-between"
 },
 text: {
   paddingTop: 15,
   paddingBottom: 15,
   marginLeft: 12,
   flex: 1
 },
 dot: {
   marginRight: dotGap,
   borderRadius: 5,
   width: dotSize,
   height: dotSize
 }
});
export default withSettings(MessageSingle);