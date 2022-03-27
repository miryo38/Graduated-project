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
  const draggableItemList = [
    {
      "id": 1,
      "name": "A",
      "background_color": "red"
    },
    {
      "id": 2,
      "name": "B",
      "background_color": "pink"
    },
    {
      "id": 3,
      "name": "C",
      "background_color": "orange"

    },
    {
      "id": 4,
      "name": "D",
      "background_color": "#aaaaff"
    },
  ];
  const FirstReceivingItemList = [
    {
      "id": 13,
      "name": "M",
      "background_color": '#ffaaff'
    },
    {
      "id": 14,
      "name": "N",
      "background_color": '#ffaaff'
    },
    {
      "id": 15,
      "name": "O",
      "background_color": '#ffaaff'
    },
    {
      "id": 16,
      "name": "P",
      "background_color": '#ffaaff'
    }
  ];
  const usersCollection = firestore().collection('Inventory');  
  const [tool, setTool] = useState('');
  const getShopData = async () => {
    try {
      const data = await usersCollection.get();
      setTool(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
      console.log(tool[1].name);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getShopData();
  }, []);
  const [receivingItemList, setReceivedItemList] = useState(FirstReceivingItemList);
  const [dragItemMiddleList, setDragItemListMiddle] = useState(draggableItemList);
  
  
  const DragUIComponent = ({ item, index }) => {
    return (
      <DraxView
        style={[styles.centeredContent, styles.draggableBox, { backgroundColor: 'white',borderWidth:1 }]}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        dragPayload={index}
        longPressDelay={150}
        key={index}
      >
        <Text style={styles.textStyle}>{item.name}</Text>
      </DraxView>
    );
  } 

  const ReceivingZoneUIComponent = ({ item, index }) => {
    return (
      <DraxView
        style={[styles.centeredContent, styles.receivingZone, { backgroundColor: item.background_color }]}
        receivingStyle={styles.receiving}
        renderContent={({ viewState }) => {
          const receivingDrag = viewState && viewState.receivingDrag;
          const payload = receivingDrag && receivingDrag.payload;
          return (
            <View>
              <Text style={styles.textStyle}>{item.name}</Text>
            </View>
          );
        }}
        key={index}
        onReceiveDragDrop={(event) => {
          let selected_item = dragItemMiddleList[event.dragged.payload];
          let newReceivingItemList = [...receivingItemList];
          newReceivingItemList[index] = selected_item;
          setReceivedItemList(newReceivingItemList);

          let newDragItemMiddleList = [...dragItemMiddleList];
          newDragItemMiddleList[event.dragged.payload] = receivingItemList[index];
          setDragItemListMiddle(newDragItemMiddleList);
        }}
      />
    );
  }

  const FlatListItemSeparator = () => {
    return (<View style={styles.itemSeparator} />);
  }
  
  
  return (
    <GestureHandlerRootView style={gestureRootViewStyle}>      
          <View style={{flex: 1,justifyContent: 'space-evenly',borderWidth:1}}>
            <View resizeMode="stretch" >
              <Image style={{width:'100%',height:'100%'}}source={require('../../../assets/images/backimg/1.gif')}/>  
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
