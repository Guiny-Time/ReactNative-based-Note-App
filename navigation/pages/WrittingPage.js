import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// page for writting note
export default function WrittingPage({navigation}) {
    // states for basic note props
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // id, as the key of token of the note
    const [id, SetID] = useState("")
    const createTime = new Date();
    // set the first created time
    if(id == ""){
        SetID(`${createTime.getFullYear()}/${createTime.getMonth()+1}/${createTime.getDate()}  ${createTime.getHours()}:${createTime.getMinutes()}:${createTime.getSeconds()}`)
    }
    // set the default value of last modified time
    if(date == ''){
        setDate("You have not modified this note yet.");
    }
    // The JSON used to store into Async storage
    let note_object = {
        "title": title,
        "date": date,
        "content": content
    };
    // random string(as token)
    function randomToken(e) {
        var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
        var a = t.length
        var n = ''
        for (var i = 0; i < e; i++) {
          n += t.charAt(Math.floor(Math.random() * a))
        }
        return n
    }
    // clear everything after submit
    function ClearEverything(){
        SetID("")
        setDate("")
        setContent("")
        setTitle("")
        note_object = {
            title: title,
            date: date,
            content: content
        };
    }
    // set last modified time
    function ChangeDate(){
        setDate("Last modified: "
            +`${createTime.getFullYear()}/${createTime.getMonth()+1}/${createTime.getDate()}`
            +"  " 
            +`${createTime.getHours()}: ${createTime.getMinutes()}: ${createTime.getSeconds()}`
        );
    }

    return (
        <View style={{flex: 1, textAlign:'left', paddingLeft:20, backgroundColor:'#9dabab'}}>
            <TouchableOpacity 
                onPress={ () => {
                    // submit and store the note
                    if(note_object.title.trim() == '' || note_object.content.trim() == '' || note_object.date == ''){
                        alert("Oops. You are missing to write something. Maybe title?")
                    }else{
                        // randomly generate token
                        let token = randomToken(4)
                        // set the token
                        setID(id, token)
                        // use token as key to store note object
                        setJSONData(token, note_object)
                        // after submit, clear the type-things
                        ClearEverything()
                        // back to the home
                        navigation.navigate('All Notes')
                    }}}
                style={styles.buttonRight}>
                <Image
                    style={{height:50, width:50, marginBottom:10, marginTop:25}}
                    underlayColor='white'
                    source={require('../../assets/对勾.png')}/>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={()=>{
                    alert('If you did not submit your note, your note may loose.')
                    navigation.navigate('All Notes')}}
                style={styles.buttonLeft}>
                <Image
                    style={{height:40, width:40, marginBottom:10, marginTop:25, right:0}}
                    underlayColor='white'
                    source={require('../../assets/返回.png')}/>
            </TouchableOpacity>

            <TextInput
                style={ styles.inputTitle }
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
        </View>
    );
}

// store the id(created time) and token
const setID = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
        console.log('token written successfully')
    } catch (e) {
        console.log(e.message)
    }
}

// store the token and note object
const setJSONData = async (key, value) => {
    if(key == undefined){
        console.log('You do not have note token now.')
    }else if(value == ''){
        // write nothing
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

  // css part
const styles = StyleSheet.create({
    inputTitle:{
        fontSize:26, 
        fontWeight:'bold', 
        color:'#E7E7E7', 
        textAlign:'left', 
        marginTop:80, 
        marginLeft:10
    },
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
        height: '73%',
        fontSize:20, 
        fontWeight:'bold',
        /*use for fuzzy board of text-input*/
        elevation:4,
        shadowColor:'#d9c6bf',
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
    }
});