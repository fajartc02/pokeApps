// Learn more AboutScreen createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import DefaultHeader from "../components/DefaultHeader";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="tennisball-outline" color={color} />
          ),
          headerTitle: (props) => <DefaultHeader {...props} />,
        }}
      />
      <BottomTab.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          headerTitle: (props) => <DefaultHeader {...props} />,
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
        options={{ headerTitle: "Home" }}
      />
    </TabHomeStack.Navigator>
  );
}

const TabAboutStack = createStackNavigator();

function AboutNavigator() {
  return (
    <TabAboutStack.Navigator>
      <TabAboutStack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{ headerTitle: "About" }}
      />
    </TabAboutStack.Navigator>
  );
}
