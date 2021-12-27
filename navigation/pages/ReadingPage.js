import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

export default function ReadingPage({navigation}){
    // basic props of note object
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // token from home
    const [currentToken, setToken] = useState("");
    const createTime = new Date();
    // The JSON used to store into Async storage
    let note_object = {
        "title": title,
        "date": date,
        "content": content
    };

    // set last modified time
    function ChangeDate(){
        setDate("Last modified: "
            +`${createTime.getFullYear()}/${createTime.getMonth()+1}/${createTime.getDate()}`
            +"  " 
            +`${createTime.getHours()}: ${createTime.getMinutes()}: ${createTime.getSeconds()}`
        );
    }

    // if nothing here
    if(date == ''){
        try {
            AsyncStorage.getItem('@storage_Note')
            .then((token)=>{
                AsyncStorage.getItem(token)
                .then((value)=>{
                    if(value != null){
                        const jsonValue = JSON.parse(value);
                        if(token!=currentToken){
                            setToken(token)
                            setTitle(jsonValue.title)
                            setContent(jsonValue.content)
                            setDate(jsonValue.date)
                        }
                    }
                })
            })
        } catch(e) {
            console.log(e.message)
        }
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#9dabab'}}>
                
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
    }else{
        // if has things
        AsyncStorage.getItem('@storage_Note')
            .then((token)=>{
                AsyncStorage.getItem(token)
                .then((value)=>{
                    const jsonValue = JSON.parse(value);
                    if(token!=currentToken){
                        setToken(token)
                        setTitle(jsonValue.title)
                        setContent(jsonValue.content)
                        setDate(jsonValue.date)
                    }
                    
                })
            })
        return (
            <View style={{flex: 1, textAlign:'left', paddingLeft:20, backgroundColor:'#d9c6bf'}}>
            
            <TouchableOpacity 
                onPress={ () => {
                    // submit again
                    if(note_object.title.trim() == '' || note_object.content.trim() == '' || note_object.date == ''){
                        alert("Oops. You are missing to write something. Maybe title?")
                    }else{
                        // update the note object
                        setJSONData(currentToken, note_object)
                        navigation.navigate('All Notes')
                    }}}
                style={styles.buttonRight}>
                <Image
                    style={{height:50, width:50, marginBottom:10, marginTop:25}}
                    underlayColor='white'
                    source={require('../../assets/ok.png')}/>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate('All Notes')}}
                style={styles.buttonLeft}>
                <Image
                    style={{height:40, width:40, marginBottom:10, marginTop:25, right:0}}
                    underlayColor='white'
                    source={require('../../assets/Back.png')}/>
            </TouchableOpacity>

            <TextInput
                style={ {fontSize:26, fontWeight:'bold', color:'grey', textAlign:'left', marginTop:80, marginLeft:10} }
                onChangeText={ text => {setTitle(text);} }
                placeholder="Title"
                value={title}>
            </TextInput>

            <Text style={{marginLeft:10}}>{date}</Text>
            <TextInput 
                style={styles.input}
                multiline={true}
                maxLength={300}
                onChangeText={text => {setContent(text);ChangeDate()}}
                placeholder='Write anything you like.'
                value={content}>
            </TextInput>
            <TouchableOpacity 
                onPress={()=>{
                    // delete the note
                    AsyncStorage.removeItem(currentToken, function (error) {
                        if (error) {
                            alert('some thing wrong.')
                        }else {
                            alert('delete successfully.')
                        }
                    })
                    setToken('')
                    setTitle('')
                    setContent('')
                    setDate('')
   
                    navigation.navigate('All Notes')}}
                style={styles.buttonbuttom}>
                <Image
                    style={{height:40, width:40, marginBottom:10, marginTop:25, right:0}}
                    underlayColor='white'
                    source={require('../../assets/delete.png')}/>
            </TouchableOpacity>
        </View>
        );
    }
    
}

// this function is same as writting page's
const setJSONData = async (key, value) => {
    console.log(JSON.stringify(value))
    if(key == undefined){
        console.log('You do not have note token now.')
    }else if(value == ''){
        alert('You did not write anything yet.')
    }else{
        try {
            AsyncStorage.setItem(key, JSON.stringify(value));
            alert('Submit successfully!')
        } catch (e) {
            console.log(e.message)
        }
    }
  }

  const styles = StyleSheet.create({
    input:{
        backgroundColor:'#faf3ed',
        textAlignVertical: 'top',
        textAlign:'left',
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#faf3ed',
        padding: 15,
        margin: 15,
        width: 350,
        height: '65%',
        fontSize:20, 
        fontWeight:'bold',
        /*use for fuzzy board of text-input*/
        elevation:4,
        shadowColor:'#8a9f9a',
        shadowOffset:{width:100,height:25},
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    buttonRight:{
        width: 60,  
        height: 60,                                            
        position: 'absolute',                                          
        top: 5,                                                    
        right: 5, 
    },
    buttonLeft:{
        width: 60,  
        height: 60,                                            
        position: 'absolute',                                          
        top: 10,
        left: 10
    },
    buttonbuttom: {
        position: 'absolute',
        bottom:2,
        left: '47%'
    },
    texts: {
        color:'#fff',
        fontSize:20, 
        marginLeft:50, 
        marginRight:50,
        marginTop:10
    }
});