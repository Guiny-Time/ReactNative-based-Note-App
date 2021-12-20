import * as React from 'react'

import { NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomePage from './pages/HomePage'
import SettingPage from './pages/SettingPage'
import WrittingPage from './pages/WrittingPage'

const homeName = "All Notes";
const settingName = "Setting";
const writtingName = "Writting";

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return (
        
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if(rn === homeName) {
                        iconName=focused ? 'list' : 'list-outline'
                    }else if(rn === settingName) {
                        iconName=focused ? 'settings' : 'settings-outline'
                    }else if(rn === writtingName){
                        iconName=focused ? 'add' : 'add-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}>

                <Tab.Screen name={homeName} component={HomePage} options={{refresh: true}} />
                <Tab.Screen name={writtingName} component={WrittingPage} options={{ headerShown: false, tabBarVisible:false }}/>
                <Tab.Screen name={settingName} component={SettingPage}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}