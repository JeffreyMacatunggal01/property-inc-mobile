import React from 'react';
import { View } from 'react-native';
import MessagesSingleScreen from "@src/containers/Custom/MessagesSingleScreen";
import messaging from '@react-native-firebase/messaging';

const MyCustomScreen = (props) => {
 return <View style={{flex: 1, paddingBottom: 80}}>
     <MessagesSingleScreen {...props} messageThreadId={4} />
   </View>
}


export default MyCustomScreen;
