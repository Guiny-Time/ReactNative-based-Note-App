import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Alert, DeviceEventEmitter, Vibration} from 'react-native';
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
        <View style={{flex: 1, textAlign:'left', marginLeft:20, backgroundColor:'#EEF2F6'}}>
            <TouchableOpacity 
                onPress={ () => {
                    // 提交日志
                    if(note_object.title == '' || note_object.content == '' || note_object.date == ''){
                        alert("Oops. You are missing to write something. Maybe title?")
                    }else{
                        // 随机生成4位token
                        let token = randomToken(4)
                        // 设置笔记token
                        setID(id, token)
                        // 设置token对应的内容
                        setJSONData(token, note_object)
                        ClearEverything()
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
                    alert('If you did not submit your note, your note may loose.')
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
        </View>
    );
}

// 储存ID
const setID = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
        console.log('写入数据库成功')
      } catch (e) {
        console.log(e.message)
      }
  }
// 读取ID
  const readID = async(key) => {
    console.log('读取')
    try {
        const value = await AsyncStorage.getItem(key)
        if(value != null) {
            console.log('token值为: ' + value)
        }else{
            console.log('你读取的token啥也没有，估计出问题了')
        }
      } catch(e) {
        console.log(e.message)
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
  // 读取JSON数据
  const getJSONData = async(key) => {
    return AsyncStorage.getItem(key).then((value) => {
      const jsonValue = JSON.parse(value);
      return jsonValue;
    });
  }
  // css part
const styles = StyleSheet.create({
    input:{
        backgroundColor:'#fff',
        textAlignVertical: 'top',
        textAlign:'left',
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 15,
        width: 350,
        height: 450,
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
    }
});