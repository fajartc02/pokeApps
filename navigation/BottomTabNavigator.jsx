// Learn more AboutScreen createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, Text, useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import DefaultHeader from "../components/DefaultHeader";
import { View } from "../components/Themed";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: "gray",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: true,
          unmountOnBlur: true,
          // tabBarIcon: ({ color }) => (
          //   <TabBarIcon name="tennisball-outline" color={color} />
          // ),
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <View>
                {focused ? (
                  <Image
                    source={require("../assets/images/move-pokeball.gif")}
                    style={{ width: 30, height: 30 }}
                  />
                ) : (
                  <Image
                    source={require("../assets/images/pokeball.png")}
                    style={{ width: 30, height: 30 }}
                  />
                )}
              </View>
            );
          },
          headerTitle: (props) => <DefaultHeader {...props} />,
        }}
      />
      <BottomTab.Screen
        name="Profile "
        component={AboutNavigator}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarItemStyle: { color: "red" },
          tabBarIcon: ({ color, focused }) => {
            return (
              <View>
                {focused ? (
                  <Image
                    source={require("../assets/images/ash-move.gif")}
                    style={{ width: 30, height: 30 }}
                  />
                ) : (
                  <Image
                    source={require("../assets/images/ash.png")}
                    style={{ width: 30, height: 30 }}
                  />
                )}
              </View>
            );
          },
          // headerTitle: (props) => <DefaultHeader {...props} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more AboutScreen this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabHomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <TabHomeStack.Navigator>
      <TabHomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "Home", headerShown: false }}
      />
    </TabHomeStack.Navigator>
  );
}

const TabAboutStack = createStackNavigator();

function AboutNavigator() {
  return (
    <TabAboutStack.Navigator>
      <TabAboutStack.Screen
        name="Profile"
        component={AboutScreen}
        options={{
          headerShown: true,
          headerTitle: (props) => <DefaultHeader {...props} />,
        }}
      />
    </TabAboutStack.Navigator>
  );
}
