import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Alert, DeviceEventEmitter, Vibration} from 'react-native';

export default function SettingPage({navigation}){
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
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


    if(date == ''){
        try {
            AsyncStorage.getItem('@storage_Note')
            .then((token)=>{
                AsyncStorage.getItem(token)
                .then((value)=>{
                    const jsonValue = JSON.parse(value);
                    console.log("呵呵，想不到吧"+jsonValue)
                    if(token!=currentToken){
                        setToken(token)
                        setTitle(jsonValue.title)
                        setContent(jsonValue.content)
                        setDate(jsonValue.date)
                    }
                })
            })
                // 
        } catch(e) {
            console.log(e.message)
        }
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
    }else{
        AsyncStorage.getItem('@storage_Note')
            .then((token)=>{
                AsyncStorage.getItem(token)
                .then((value)=>{
                    const jsonValue = JSON.parse(value);
                    console.log("想不到吧*2 " + jsonValue)
                    if(token!=currentToken){
                        setToken(token)
                        setTitle(jsonValue.title)
                        setContent(jsonValue.content)
                        setDate(jsonValue.date)
                    }
                    
                })
            })
        return (
            <View style={{flex: 1, textAlign:'left', marginLeft:20, backgroundColor:'#EEF2F6'}}>
            
            <TouchableOpacity 
                onPress={ () => {
                    // 提交日志
                    if(note_object.title == '' || note_object.content == '' || note_object.date == ''){
                        alert("Oops. You are missing to write something. Maybe title?")
                    }else{
                        // 更新该token下的内容
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
                    // 根据token删除掉这篇文章
                    AsyncStorage.removeItem(currentToken, function (error) {
                        if (error) {
                            alert('删除失败')
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

// 储存JSON格式数据
const setJSONData = async (key, value) => {
    // 这里的key作为本日记的token
    console.log(JSON.stringify(value))
    if(key == undefined){
        // 笔记初始id未定义
        console.log('You do not have note token now: ' + key)
    }else if(value == ''){
        // 没写东西
        alert('You did not write anything yet.')
    }else{
        // 写入存储
        try {
            // value是一个JSON，包含了：最后修改时间、标题、内容文本
            AsyncStorage.setItem(key, JSON.stringify(value));
            alert('Submit successfully! Note token: ' + key)
        } catch (e) {
            console.log(e.message)
        }
    }
  }
const styles = StyleSheet.create({
    input:{
        backgroundColor:'#fff',
        textAlignVertical: 'top',
        textAlign:'left',
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 15,
        width: '88%',
        height: '65%',
        fontSize:20, 
        fontWeight:'bold',
        /*use for fuzzy board of text-input*/
        elevation:4,
        shadowColor:'grey',
        shadowOffset:{width:100,height:25},
        shadowOpacity: 1,
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
    },
    buttonbuttom: {
        position: 'absolute',
        bottom:2,
        left: '42.5%'
    },
    texts: {
        fontSize:20, 
        marginLeft:50, 
        marginRight:50,
        marginTop:10
    }
});