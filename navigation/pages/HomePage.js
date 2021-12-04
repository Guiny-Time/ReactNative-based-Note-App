import * as React from 'react';
import {View,Text} from 'react-native';

export default function HomePage({navigation}){
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
                onPress={()=>alert('This is home page')}
                style={{fontSize:26, fontWeight:'blod'}}>Home Page</Text>
        </View>
    );
}