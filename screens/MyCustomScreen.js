//In custom_code/components/MyCustomScreen.js...

import React from 'react';
import { View } from 'react-native';
import MessagesScreen from "@src/containers/Custom/MessagesScreen";

const MyCustomScreen = (props) => {

 return (
   <View style={{ flex: 1 }}>
       <MessagesScreen {...props} screenTitle="My Messages" hideNavigationHeader={true} />
   </View>)
}


export default MyCustomScreen;