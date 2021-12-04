import * as React from 'react'

import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomePage from './pages/HomePage'
import SettingPage from './pages/SettingPage'
import WrittingPage from './pages/WrittingPage'

const homeName = "Home";
const settingName = "Setting";
const writtingName = "Writting";
const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}=>{
                    let iconName;
                    let rn = route.name;
                    if(rn === homeName){
                        iconName=focused ? 'home' : 'home-outline'
                    }else if(rn === settingName){
                        iconName=focused ? 'settings' : 'settings-outline'
                    }else{
                        iconName=focused ? 'list' : 'list-outline'
                    }
                })
            })}>
            </Tab.Navigator>
        </NavigationContainer>
    )
}