import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createStackNavigator } from "@react-navigation/stack";


//Screens
import HomePage from '../pages/HomePage';
import NoteBookPage from '../pages/NoteBookPage';
import AddNotePage from '../pages/AddNotePage';
import SettingsPage from "./SettingsPage";
import MapsPage from "../pages/MapsPage";

// Screen names
const homeName = 'Home';
const myNotebookName = 'My Notebook';
const settingsName = 'Settings';
const mapsName = 'Maps'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const NotebookStackPage = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'myNotebookName'}
                component={NoteBookPage}
                options={{ title: 'My Notebook' }} />
            <Stack.Screen
                name='AddNote'
                component={AddNotePage}
                options={{ title: 'Note' }} />
        </Stack.Navigator>
    )
}

const MainContainer = (props) => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;
                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === myNotebookName) {
                            iconName = focused ? 'book' : 'book-outline'
                        } else if (rn === settingsName) {
                            iconName = focused ? 'settings' : 'settings-outline'
                        } else if (rn === mapsName) {
                            iconName = focused ? 'map' : 'map-outline'
                        }
                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                    tabBarStyle: {
                        padding: 10,
                        height: 75
                    },
                    tabBarActiveTintColor: 'red',
                    tabBarInactiveTintColor: 'grey',
                    tabBarLabelStyle: {
                        fontSize: 10
                    },
                    tabBarStyle: [
                        {
                            display: "flex"
                        },
                        null
                    ]
                })}>

                <Tab.Screen name={homeName} component={HomePage} />
                <Tab.Screen name={myNotebookName} component={NotebookStackPage} options={{ headerShown: false }} />
                <Tab.Screen name={mapsName} component={MapsPage} />
                <Tab.Screen name={settingsName}>
                    {() => <SettingsPage logout={props.logout} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MainContainer

