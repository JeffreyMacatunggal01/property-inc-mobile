import React from "react";
import { NativeModules } from "react-native";
const { RNCustomCode } = NativeModules;

const MyCustomScreen = (props) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>My Custom screen</Text>
    </View>
);

export const applyCustomCode = (externalCodeSetup) => {
    const { navigationApi } = externalCodeSetup;

    navigationApi.setFilterAfterAuthRoutes((afterAuthRoutes) => {
        return {
            ...afterAuthRoutes,
            MyCustomScreen: MyCustomScreen,
        };
    });

    navigationApi.setInitialAfterAuthRoute((props) => {
        return "MyCustomScreen";
    });
};
