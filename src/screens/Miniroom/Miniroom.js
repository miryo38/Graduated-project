import { View, Text,TouchableOpacity,StyleSheet,Image,SafeAreaView,Button,Dimensions} from 'react-native';
import React,{useState,useEffect} from 'react'
import hat from '../../data/hat'
import coat from '../../data/coat'
import back from '../../data/backimg';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { DraxView,DraxProvider,DraxList } from 'react-native-drax';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import ToolInven from './ToolInven';
import MinimiInven from './MinimiInven';
import MusicInven from './MusicInven';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const gestureRootViewStyle = { flex: 1 };

const Miniroom = () => {
  const [ShopData, setShopData] = useState(null);
  const usersCollection = firestore().collection('Inventory');  
  const [tool, setTool] = useState('');
  const getShopData = async () => {
    try {
      const data = await usersCollection.get();
      setTool(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
      console.log(tool[1].name);
      setShopData(documentSnapshot.data());
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getShopData();
  }, []);

  
  

  
  return (
    <GestureHandlerRootView style={gestureRootViewStyle}>      
          <View style={{flex: 1,justifyContent: 'space-evenly',borderWidth:1}}>
            <View resizeMode="stretch" >
              <Image style={{width:'100%',height:'100%'}}source={{uri: 'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/Background%2Fbackground1.png?alt=media&token=f59b87fe-3a69-46b9-aed6-6455dd80ba45'}}/>
              <View style={{position:'absolute', translateX:300,translateY:20, borderWidth:1,borderColor:'red',width:50,height:50}}></View>
              <View style={{position:'absolute', translateX:20,translateY:250, borderWidth:1,borderColor:'red',width:50,height:50}}></View>
              <View style={{position:'absolute', translateX:300,translateY:250, borderWidth:1,borderColor:'red',width:50,height:50}}></View>
              <View style={{position:'absolute', translateX:20,translateY:20, borderWidth:1,borderColor:'red',width:50,height:50}}></View>
            </View>
            
          </View>
        <View style={styles.miniroom}>
        <Tab.Navigator>
      <Tab.Screen name="가구" component={ToolInven} />
      <Tab.Screen name="미니미" component={MinimiInven} />
      <Tab.Screen name="음악" component={MusicInven} />
    </Tab.Navigator>
        </View>
    </GestureHandlerRootView>
  ); 
};

export default Miniroom;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column', // 혹은 'column'
      backgroundColor: '#fff',
      padding: 20,
      borderWidth: 1,
      borderColor: 'red',
      alignItems: 'center',
    },
    miniroom: {
      flex:1,
      width:'100%', 
      height:230,
      flexDirection:'row',
    },
    centeredContent: {
      borderRadius: 10,
    },
    receivingZone: {
      height: (Dimensions.get('window').width / 4) - 12,
      borderRadius: 10,
      width: (Dimensions.get('window').width / 4) - 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 5
    },
    receiving: {
      borderColor: 'red',
      borderWidth: 2,
    },
    draggableBox: {
      width: (Dimensions.get('window').width / 4) - 12,
      height: (Dimensions.get('window').width / 4) - 12,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 5
    },
    dragging: {
      opacity: 0.2,
    },
    hoverDragging: {
      borderColor: 'magenta',
      borderWidth: 2,
    },
    receivingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    itemSeparator: {//아래 리스트 안 사각형 간격
      height: 12
    },
    draxListContainer: {
      padding: 5,
      height: 250
    },
    receivingZoneContainer: {
      padding: 5,
      height: 300,
  
    },
    textStyle: {
      fontSize: 18
    },
    title:{ 
      height:50,
      backgroundColor: 'orange',
      justifyContent: "center",
      flexDirection: 'row',
      alignItems: "center",
    },
    titleText:{
      color:'white',
      marginTop:10,
      height:40,
      fontSize:20,
      textAlign:'center'
      },
  });