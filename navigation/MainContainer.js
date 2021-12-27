import * as React from 'react'

import { NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
// pages
import HomePage from './pages/HomePage'
import ReadingPage from './pages/ReadingPage'
import WrittingPage from './pages/WrittingPage'

const homeName = "All Notes";
const readingName = "Reading";
const writtingName = "Writting";

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return (
        // Nav container
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    // generate the icon of each page
                    let iconName;
                    let rn = route.name;

                    if(rn === homeName) {
                        iconName=focused ? 'list' : 'list-outline'
                    }else if(rn === readingName) {
                        iconName=focused ? 'book' : 'book-outline'
                    }else if(rn === writtingName){
                        iconName=focused ? 'add' : 'add-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor: '#488D63',
                tabBarInactiveTintColor: 'gray',
            })}>

                <Tab.Screen name={homeName} component={HomePage} options={{refresh: true}} />
                <Tab.Screen name={writtingName} component={WrittingPage} options={{ headerShown: false, tabBarVisible:false }}/>
                <Tab.Screen name={readingName} component={ReadingPage} options={{ headerShown: false, tabBarVisible:false }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}