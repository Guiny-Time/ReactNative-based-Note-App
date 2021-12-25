import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function SettingPage({navigation}){
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#EEF2F6'}}>
            <Text
                onPress={()=>navigation.navigate('All Notes')}
                style={styles.texts}>Hey! It seems that nothing in this page...?</Text>
            <Text
                onPress={()=>navigation.navigate('All Notes')}
                style={styles.texts}>But don't worry, you can choose a note in the list!</Text>
            <Text
                onPress={()=>navigation.navigate('All Notes')}
                style={styles.texts}>If you don't have any notes, just write one!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    texts: {
        fontSize:20, 
        marginLeft:50, 
        marginRight:50,
        marginTop:10
    }
});