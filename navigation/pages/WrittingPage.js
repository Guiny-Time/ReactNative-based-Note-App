import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Alert, DeviceEventEmitter, Vibration} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clear } from 'react-native/Libraries/LogBox/Data/LogBoxData';

// page for writting note
export default function WrittingPage({navigation}) {
    // state hook
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [id, SetID] = useState("")

    const createTime = new Date();
    if(id == ""){
        // 设置初创时间
        SetID(`${createTime.getFullYear()}/${createTime.getMonth()+1}/${createTime.getDate()}  ${createTime.getHours()}:${createTime.getMinutes()}:${createTime.getSeconds()}`)
    }

    // 用来记录标题、最后修改时间以及文本内容，作为值传入存储
    let note_object = {
        // 将修改日期作为日志的唯一key，如果之前就存在key，则删除
        "title": title,
        "date": date,
        "content": content
      };
      // 生成随机字符串
      function randomToken(e) {
        // 模拟随机字符串库
        var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
        var a = t.length
        var n = ''
        for (var i = 0; i < e; i++) {
          // 随机生成长度为e的随机字符串拼接
          n += t.charAt(Math.floor(Math.random() * a))
        }
        // 返回随机组合字符串
        return n
      }

    // 设置最后更改的日期
    function SetDate(newDate){
        if(newDate == "You have not modified this note yet."){
            return
        }else{
            setDate(newDate)
        }
        note_object = {
            title: title,
            date: date,
            content: content
          };
    }

    // 设置更改的内容文本
    function SetContent(newCont){
        if(newCont == ''){
            return
        }else{
            setContent(newCont)
        }
        note_object = {
            // 赋值id作为日志的唯一key，若不存在则赋初始值0
            title: title,
            date: date,
            content: content
          };
    }
    
    // 设置标题
    function SetTitle(newTitle){
        if(newTitle == ''){
            return
        }else{
            setTitle(newTitle)
        }
        note_object = {
            title: title,
            date: date,
            content: content
          };
    }


    // 清理内容（在提交完之后）
    function ClearEverything(){
        SetID("")
        setContent("")
        setDate("")
        setTitle("")
        note_object = {
            title: title,
            date: date,
            content: content
        };
    }

    if(date == null){
        setDate("You have not modified this note yet.");
    }


    return (
        <View style={{flex: 1, textAlign:'left', marginLeft:20}}>
            <Text>创建时间: {id}</Text>
            <TouchableOpacity 
                onPress={ () =>{
                    // 提交日志
                    // 针对该笔记的唯一随机token
                    setID(id,randomToken(4))
                    let token = readID(id)
                    setJSONData(token,note_object)
                    navigation.navigate('Home')
                    ClearEverything()
                    
                }}
                style={styles.buttonRight}>
                <Image
                    style={{height:50, width:50, marginBottom:10, marginTop:25}}
                    underlayColor='white'
                    source={require('./img/ok.png')}/>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={()=>{
                    alert('如果你没有保存，你的更改可能会丢失')
                    navigation.navigate('Home')

                }}
                style={styles.buttonLeft}>
                <Image
                    style={{height:40, width:40, marginBottom:10, marginTop:25, right:0}}
                    underlayColor='white'
                    source={require('./img/Back.png')}/>
            </TouchableOpacity>

            <TextInput
                style={{fontSize:26, fontWeight:'bold', color:'grey', textAlign:'left', marginTop:80, marginLeft:10}}
                onChangeText={text=>{SetTitle(text)}}
                placeholder="Title">
            </TextInput>

            <DateReader _setDate = {SetDate} _setContent={SetContent}/>
      
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
    console.log(JSON.stringify(value))
    if(key == undefined){
        // 笔记初始id未定义
        alert('You do not have note id now: ' + key)
    }else if(value == ''){
        // 没写东西
        alert('You did not write anything: ' + value)
    }else{
        // 写入存储
        try {
            // value是一个JSON，包含了：最后修改时间、标题、内容文本
            // AsyncStorage.setItem(key, JSON.stringify(value));
            alert('写入成功! key: ' + key + 'value: ' + value)
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

// 记录最后一次编辑时间以及输入文本框的**函数式组件**
const DateReader = ({_setDate, _setContent, clear}) => {
    const [date, setDate] = useState();
    const current = new Date;

    function ChangeDate(){
        setDate("Last modified: "
            +`${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`
            +"    " 
            +`${current.getHours()}: ${current.getMinutes()}: ${current.getSeconds()}`
        );
        _setDate(`${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`
            +`${current.getHours()}: ${current.getMinutes()}: ${current.getSeconds()}`
        );
    }

    function onChangeText(text){
        _setContent(text);
    }

    if(date == null){
        setDate("Type to start.")
    }

    return (
        <View>
            <Text style={{marginLeft:10}}>{date}</Text>
            <TextInput 
                style={styles.input}
                multiline={true}
                maxLength={300}
                onChangeText={text => {onChangeText(text); ChangeDate()}}
                placeholder='Write anything you like.'
                >
            </TextInput>
      </View>
    );
  }

  // css part
const styles = StyleSheet.create({
    input:{
        backgroundColor:'#F7F7F7',
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