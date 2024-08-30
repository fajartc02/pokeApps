/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import * as Linking from "expo-linking";

export default {
    prefixes: [Linking.createURL("/")],
    config: {
        screens: {
            Root: {
                screens: {
                    TabOne: {
                        screens: {
                            HomeScreen: "HomeScreen",
                        },
                    },
                    TabTwo: {
                        screens: {
                            AboutScreen: "AboutScreen",
                        },
                    },
                },
            },
            NotFound: "*",
        },
    },
};