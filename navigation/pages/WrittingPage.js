import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Alert} from 'react-native';


// page for writting note
export default function WrittingPage({navigation}){
    // state hook
    // last modify time
    const [date, setDate] = useState();
    const [content, setContent] = useState("");
    const current = new Date();
    if(date == null){
        setDate("You have not modified this note yet.");
    }

    return (
        // style for the page's view port
        <View style={{flex: 1, textAlign:'left', marginLeft:20}}>
            <TouchableOpacity 
                onPress={()=>upLoad()}
                style={styles.buttonRight}>
                <Image
                    style={{height:50, width:50, marginBottom:10, marginTop:25}}
                    underlayColor='white'
                    source={require('./img/ok.png')}/>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={()=>navigation.navigate('Home')}
                style={styles.buttonLeft}>
                <Image
                    style={{height:40, width:40, marginBottom:10, marginTop:25, right:0}}
                    underlayColor='white'
                    source={require('./img/Back.png')}/>
            </TouchableOpacity>

            <TextInput
                style={{fontSize:26, fontWeight:'bold', color:'grey', textAlign:'left', marginTop:80, marginLeft:10}}
                placeholder="Title">
            </TextInput>

            <DateReader />
      
        </View>
    );
}

function upLoad(){
    alert("上传成功")
}



// component for the last notified date and text input for context
const DateReader = (props) => {
    const [date, setDate] = useState();
    const current = new Date;

    function ChangeDate(){
        setDate("Last modified: "
                +`${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`
                +"    " 
                +`${current.getHours()}: ${current.getMinutes()}: ${current.getSeconds()}`);
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
                onEndEditing={()=>ChangeDate()}>
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