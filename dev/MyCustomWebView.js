import React, { useState, Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import { WebView } from "react-native-webview";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

class MyWeb extends Component {
  webview = null;
  runFirst = `
  document.body.style.backgroundColor = 'red';
  setTimeout(function() { window.alert('hi') }, 2000);
  true; // note: this is required, or you'll sometimes get silent failures
`;

  render() {
    return (
      <WebView
        ref={(ref) => (this.webview = ref)}
        source={{ uri: "https://www.google.com/" }}
        onMessage={(event) => {}}
        javaScriptEnabled
        injectedJavaScript={runFirst}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
    );
  }

  handleWebViewNavigationStateChange = (newNavState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    if (!url) return;

    // redirect somewhere else
    if (url.includes("google.com")) {
      const newURL = "https://reactnative.dev/";
      const redirectTo = 'window.location = "' + newURL + '"';
      this.webview.injectJavaScript(redirectTo);
    }
  };
}

function AudioVideoCallScreen({}) {
  // script to do fullscreen, hide unwanted elements
  const customJavascript = ``;
  return {};
}

const WebViewUI = () => {
  const runFirst = `
      document.body.style.backgroundColor = 'red';
      setTimeout(function() { window.alert('hi') }, 2000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;
  return (
    <WebView
      // useWebkit
      originWhitelist={["*"]}
      // allowInlineMediaPlayback={true}
      // mediaPlaybackRequiresUserAction={false}
      onMessage={(event) => {}}
      ref={() => {}}
      sharedCookiesEnabled={true}
      style={styles.webview}
      allowsBackForwardNavigationGestures={true}
      // javaScriptEnabled
      // injectedJavaScript={runFirst}
      source={{
        uri: "https://property.inc/members/jeffstag-2/bp-messages/#/conversation/324",
      }}
    />
  );
};

const Stack = createStackNavigator();

const CustomWebView = ({ route }) => {
  const { url } = route.params;
  const navigation = useNavigation();

  const runFirst = `
        document.body.style.backgroundColor = 'red';
        setTimeout(function() { window.alert('hi') }, 2000);
        true; // note: this is required, or you'll sometimes get silent failures
      `;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="customScreen-2"
        component={
          <WebView
            useWebkit
            originWhitelist={["*"]}
            onMessage={(event) => {}}
            ref={() => {}}
            sharedCookiesEnabled={true}
            // style={styles.webview}
            allowsBackForwardNavigationGestures={true}
            javaScriptEnabled
            // injectedJavaScriptBeforeContentLoaded={"document.cookie='myCookie=myValue';"}
            // injectedJavaScript={runFirst}
            // onLoad = show the web
            // onLoading = show a loading screen
            source={{
              uri: url,
              headers: {
                Cookie: "sampletoken=:domain=.property.inc:path=/;",
              },
            }}
          />
        }
        options={{
          title: "Custom Web View",
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()} title="Back" />
          ),
        }}
      />
      {/* Other screens in your stack */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  webview: {
    flex: 1,
    width: "100%",
  },
});

// export default WebViewComponent;

// View Webview in an AppNavigator to add backbutton

// const Stack = createStackNavigator();

const WebViewScreenNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="customScreen-2"
        component={CustomWebView}
        options={{
          title: "Custom Web View",
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()} title="Back" />
          ),
        }}
      />
      {/* Other screens in your stack */}
    </Stack.Navigator>
  );
};

// export default WebViewScreenNavigator;
export default CustomWebView;
