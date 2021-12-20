import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, DeviceEventEmitter, Vibration, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
  const Item = ({ title }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }

export default function HomePage(){
    const [flag, setFlag] = useState();
    const [keysElm, setKeysElm] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setFlag(true)
      wait(2000).then(() => setRefreshing(false));
    }, []);

    if(flag == undefined){
      setFlag(true)
    }

    function setKeys(value){
      setKeysElm(value)
    }
    

    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );
    
      return (
        
        <SafeAreaView style={styles.container}>

          <ImportData _SetKeys={setKeys} flag={flag} _SetFlag={setFlag} />
          <FlatList
            data={keysElm}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </SafeAreaView>
      );
}

const ImportData = ({_SetKeys,flag,_SetFlag})=>{
  const [localFlag, setFlag] = useState(false);
  var dataBack = {}
  var trueData = []
  console.log("window flag from home page: " + flag)

  AsyncStorage.getAllKeys()
    .then((keys)=> AsyncStorage.multiGet(keys)
      .then((data) => {
        for(var i = 0;i<data.length;i++){
          dataBack = {'id':data[i][0],'title':data[i][1]}
          trueData[i] = dataBack
        }
        // 有数据传来，需要更新
        if(flag){
          setFlag(false)
          console.log(localFlag)
          _SetFlag(false)
        }

        if(trueData!=null && !localFlag){
          _SetKeys(trueData)
          setFlag(true)
        }
      }));

        // _SetKeys(trueData)
        return(
          <View></View>
        );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});