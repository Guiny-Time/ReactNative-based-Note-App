import React, {useState} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}


export default function HomePage({navigation}){
    // control the refresh of import data from async-storage
    const [flag, setFlag] = useState();
    // key elements
    const [keysElm, setKeysElm] = useState([]);
    // control the refresh of list item's display
    const [refreshing, setRefreshing] = React.useState(false);
    // total notes
    const [count,setCount] = useState(0)
    // refresh the flat-list
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setFlag(true)
      // waiting for 1s
      wait(1000).then(() => setRefreshing(false));
    }, []);

    if(flag == undefined){
      setFlag(true)
    }

    function setKeys(value){
      setKeysElm(value)
    }

    // compare function, use for date
    function localCompare(a, b){
      return a.replace('/')<b.replace('/')
    }
    // item of flat-list
    const renderItem = ({ item }) => (
        <Item id={item.id} title={item.title} content={item.content} date={item.date} navigation={navigation}/>
      );
    
      return (
        <SafeAreaView style={styles.container}>
          <Text style={{marginHorizontal:20,marginTop:5,color:'#E7E7E7'}}>Total: {count} notes. Slide to refresh</Text>
          <ImportData _SetKeys={setKeys} flag={flag} _SetFlag={setFlag} _SetCount={setCount} />
          <FlatList
            data={keysElm.sort((a, b)=> localCompare(a.date,b.date))}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={refreshing}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </SafeAreaView>
      );
}

// item for each element of flat-list
const Item = ({ id, title, content, date, navigation }) => {
  return (
    <View style={styles.item}>
      <Text numberOfLines={1} style={styles.title} onPress={() => {
        // store current note's note object(using for reading)
        storeData({id}.id)
        navigation.navigate('Reading',{callBack:()=>{setFlag(true)}})
      }}>{title}</Text>
      <Text style={styles.date} onPress={() => {
        // store current note's note object(using for reading)
        storeData({id}.id)
        navigation.navigate('Reading',{callBack:()=>{setFlag(true)}})
      }}>{date}</Text>
      <Text numberOfLines={1} style={styles.contents} onPress={() => {
        // store current note's note object(using for reading)
        storeData({id}.id)
        navigation.navigate('Reading',{callBack:()=>{setFlag(true)}})
      }}>{content}</Text>
    </View>
  );
}

// import data from async-storage
const ImportData = ({_SetKeys, flag, _SetFlag, _SetCount})=>{
  const [localFlag, setFlag] = useState(false);
  var dataBack = {}
  var trueData = []
  console.log("flag from home page: " + flag)
  var count = 0;
  // get all keys
  AsyncStorage.getAllKeys()
    .then((keys)=> AsyncStorage.multiGet(keys)
      .then((data) => {
        for(var i = 0; i < data.length; i++){
          // is token and the value is not null
          if(data[i][0].length == 4 && data[i][1].title!=''){
            const jsonValue = JSON.parse(data[i][1]);
            // make the new array
            dataBack = {'id':data[i][0],'title':jsonValue.title, 'content':jsonValue.content, 'date':jsonValue.date}
            trueData[count] = dataBack
            count++
          }
        }
        _SetCount(count)
        count = 0
        // need to refresh
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

    return(
      <View></View>
    );
}

// store the current readng note
const storeData = async (value) => {
  try {
    // current reading
    await AsyncStorage.setItem('@storage_Note', value)
    console.log('open successfully:' + value)
  } catch (e) {
    console.log(e.message)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9dabab',
    paddingTop: 5
  },
  item: {
    backgroundColor: '#faf3ed',
    borderRadius: 25,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    maxHeight:160,
    overflow:'hidden'
  },
  title: {
    fontSize: 30
  },
  date: {
    color: '#9B9B9B',
    marginLeft: 5
  },
  contents:{
    fontSize: 20,
    margin: 5
  },
});