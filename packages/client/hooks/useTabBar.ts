import React from "react";
import { getFocusedRouteNameFromRoute, RouteProp } from "@react-navigation/native";

type TabBarProps = {
    route: RouteProp<any, any>;
    navigation: any;
    initialScreenName: string;
};

export default function useTabBar({ navigation, route, initialScreenName }: TabBarProps) {
    React.useEffect(() => {
        const tabBarRoutes = ["HomeScreen", "SettingsScreen"];
        const routeName = getFocusedRouteNameFromRoute(route) ?? initialScreenName;

        if (tabBarRoutes.includes(routeName)) {
            navigation.setOptions({ tabBarStyle: { display: "flex", position: "absolute" } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: "none" } });
        }
    }, [navigation, route]);
}
