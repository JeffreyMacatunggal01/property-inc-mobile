import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import { WebView, WebViewProps } from "react-native-webview";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons"; // Choose the icon set you want to use
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

const CustomMessageView = () => {
  const [webViewState, setWebViewState] = useState({});

  // Create a ref to webView
  const webViewRef = useRef(null);
  const auth = useSelector((state) => state.auth);

  const handleSwipeDown = () => {
    console.log("Swiped Down!");
    // Add your logic here
  };

  const site =
    "https://property.inc?chatscreen=true&user_id=" +
    auth.user.user_id +
    "&token=" +
    auth.refreshToken;

  const testSite = "https://google.com";

  const [url, setUrl] = useState(site);

  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    // console.log("AUTH : ", auth);
    console.log("SITE IS : ", site);

    // console.log("Auth State : ", auth.refreshToken);
    // console.log("ID : ", auth.user.user_id);
    // site = "https://property.inc?chatscreen=true&user_id=";
    // site = site + auth.user.user_id + "&token=" + auth.refreshToken;

    // console.log(site);
    handleRefresh();
  });

  const customCSS = `
    body {
      background: red !important;
    }

    div#bugpilot-root {
      display: none !important;
    }
      

    html.tawk-mobile {
      display: none;
    }
  `;

  // JavaScript to inject the custom CSS
  const injectedJavaScript = `
    (function() {
      // JQuery here
      // jQuery(document).ready(function($) {
      // });
    })();
  `;

  const handleBack = () => {
    // Handle back action
  };

  const handleRefresh = () => {
    // Handle refresh action
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleAction = () => {
    // Handle action button press
  };

  const onPageLoadStart = () => {
    console.log("LOADING STARTED!");
  };

  const onPageLoadFinish = () => {
    console.log("LOADING FINISHED!");

    // Call your JavaScript function here
    webViewRef.current.injectJavaScript(`
          (function() {
            jQuery(document).ready(function($) {
                
                let banner = $('#smartbanner');
                if(banner.length > 0){
                  banner.remove();
                  // alert("Banner removed.?");
                }






                // Inject custom CSS
                var style = document.createElement('style');
                style.innerHTML = \`
                    html.tawk-mobile {
                      display: none !important;
                    }
                    .tawk-min-container {
                      display: none !important;
                    }
                    div#bugpilot-root {
                      display: none !important;
                    }
                \`;
                document.head.appendChild(style);



                // Remove specific script tag
                $('script[src="https://embed.tawk.to/_s/v4/app/66850556628/languages/en.js"]').remove();
                // console.log("Tawk remove in bbapp");
                                  

                var waitBugPilot = setInterval(function () {
                var $bugpilot = $('#bug-pilot)';
                    if ($bugpilot.length > 0) {
                      bugpilot.remove();
                      alert("BUG PILOT FOUND AND REMOVED!");

                      // Element is available, do something with it
                      clearInterval(waitBugPilot);
                    } else{
                      console.log("Not found.");
                      alert("Not found!");
                    }
                }, 1000);
              });
            });
      `);
  };

  return (
    // <GestureHandlerRootView style={styles.safeArea}>
    //   <SafeAreaView>
    //     <View>
    //       <WebView
    //         source={{ uri: url }}
    //         ref={webViewRef}
    //       />
    //     </View>
    //   </SafeAreaView>
    // </GestureHandlerRootView>

    <SafeAreaView style={styles.safeArea}>
      {/* Android do text */}
      {/* If IOS do icon */}
      {/* <View style={styles.header}>
        <Icon.Button
          name="arrow-back"
          backgroundColor="transparent"
          color="#000"
          onPress={handleBack}
        />
        <Icon.Button
          name="refresh"
          backgroundColor="transparent"
          color="#000"
          onPress={handleRefresh}
        />
        <Icon.Button
          name="more-vert"
          backgroundColor="transparent"
          color="#000"
          onPress={handleAction}
        />
      </View> */}

      {/* <TextInput
        style={styles.urlInput}
        value={currentUrl}
        onChangeText={(text) => setUrl(text)}
        onSubmitEditing={() => setCurrentUrl(url)}
      /> */}
      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: url }}
          style={styles.webview}
          ref={webViewRef}
          scalesPageToFit
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled={true}
          allowsProtectedMedia={true}
          // onLoadStart={onPageLoadStart}
          // onLoadEnd={onPageLoadFinish}
          injectedJavaScript={injectedJavaScript}
        />
      </View>
    </SafeAreaView>
  );
};

// // allowsInlineMediaPlayback={true}
// mediaPlaybackRequiresUserAction={false}
// mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
// // allowsProtectedMedia={true}
// // allowsAirPlayForMediaPlayback={true}
// // startInLoadingState
// // scalesPageToFit
// // javaScriptEnabled={true}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  urlInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  webviewContainer: {
    flex: 1,
    paddingBottom: 50, // Adjust this value based on the height of your BottomTabBar
  },
  webview: {
    flex: 1,
  },
});

export default CustomMessageView;

// const CustomMessageView = () => {
//   const [webViewState, setWebViewState] = useState({});
//   const webViewRef = useRef(null);
//   const auth = useSelector((state) => state.auth);

//   const [refreshToken, setRToken] = useState({});
//   const [userId, setUserId] = useState({});
//   const [canGoBack, setCanGoBack] = useState(false);
//   // const [url, setUrl] = useState({});
//   let site =
//     "https://property.inc?chatscreen=true&user_id=" +
//     auth.user.user_id +
//     "&token=" +
//     auth.refreshToken;
//   const [url, setUrl] = useState(site);

//   useEffect(() => {
//     console.log("AUTH : ", auth);
//     console.log("SITE IS : ", site);

//     // console.log("Auth State : ", auth.refreshToken);
//     // console.log("ID : ", auth.user.user_id);
//     // site = "https://property.inc?chatscreen=true&user_id=";
//     // site = site + auth.user.user_id + "&token=" + auth.refreshToken;

//     // console.log(site);
//   });

//   const handleNavigationStateChange = (navState) => {
//     // Update the canGoBack state
//     setCanGoBack(navState.canGoBack);
//   };

//   const injectCookies = () => {
//     const script = `
//         document.cookie = 'mobile=bbapp';
//         document.cookie = 'token=123123123123';
//         true; // Return true to signify completion
//       `;
//     webViewRef.current?.injectJavaScript(script);
//   };

//   const reloadWebView = () => {
//     if (webViewRef.current) {
//       // site = "https://property.inc?chatscreen=true&user_id=";
//       // site = site + auth.user.user_id + "&token=" + auth.refreshToken;
//       // setUrl(site);
//       webViewRef.current.reload();
//     }
//   };

//   const goBack = () => {
//     if (canGoBack) {
//       webViewRef.current.goBack();
//     }
//   };

//   const handleLoad = () => {
//     injectCookies(); // Inject cookies once WebView is loaded
//   };

//   //   // Customize WebView props as needed
//   const webViewProps = {
//     source: { uri: site },
//   };

//   return (
//     <SafeAreaView>
//       <WebView
//       />
//     </SafeAreaView>
//   );

//   // return (
//   //   <SafeAreaView style={{ marginBottom: 10 }}>
//   //     <View style={styles.buttonContainer}>
//   //       <Button title="Refresh" onPress={reloadWebView} />
//   //       <Button title="GoBack" onPress={goBack} />
//   //     </View>
//   //     <WebView ref={webViewRef} source={{ uri: "https://google.com" }} />
//   //   </SafeAreaView>
//   // );

//   // return (
//   //   <SafeAreaView style={{ marginTop: 40, marginBottom: 40 }}>
//   // <View style={styles.buttonContainer}>
//   //   <Button title="Refresh" onPress={reloadWebView} />
//   //   <Button title="GoBack" onPress={goBack} />
//   // </View>;
//   //     <WebView
//   //       ref = {webViewRef}
//   //       source={{ uri: url }}
//   //       onNavigationStateChange={handleNavigationStateChange}
//   //     />
//   //   </SafeAreaView>
//   // );
// };
// const styles = StyleSheet.create({
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     padding: 10,
//   },
// });

// {
//   /* <WebView {...webViewProps} /> */
// }
// const webViewProps = {
//   source: {
//     uri: "https://property.inc?chatscreen=true",
//   },
//   javaScriptEnabled: true,
//   sharedCookiesEnabled: true,
//   allowsBackForwardNavigationGestures: true,
//   onLoadProgress: ({ nativeEvent }) => {
//     console.log(`Loading progress: ${nativeEvent.progress}`);
//   },
//   onLoad: injectCookies,
//   ref: webViewRef,
// };
