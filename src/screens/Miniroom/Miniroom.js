import { View, Text,TouchableOpacity,StyleSheet,Image,SafeAreaView,Button} from 'react-native';
import React,{useState,useEffect} from 'react'
import hat from '../../data/hat'
import coat from '../../data/coat'
import shoes from '../../data/shoes'
import back from '../../data/backimg';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
const Miniroom = () => {
  const [tool, setTool] = useState();
  const usersCollection = firestore().collection('shop');  
  
  const getShopData = async () => {
    try {
      const data = await usersCollection.get();
      setTool(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
      console.log(tool[0].name);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getShopData();
  }, []);
  const [hatimageVar, sethatImageVar] = useState(0);
  const [coatimageVar, setcoatImageVar] = useState(0);
  const [shoesimageVar, setshoesImageVar] = useState(0); 
  const [backimageVar, setbackImageVar] = useState(0); 
  const changehat=()=> {
    hatimageVar == (hat.length - 1) ? sethatImageVar(0) : sethatImageVar(hatimageVar + 1);
    console.log(hat[hatimageVar].image);
  }
  const changecoat=()=> {
    coatimageVar == (coat.length - 1) ? setcoatImageVar(0) : setcoatImageVar(coatimageVar + 1);
    console.log(coat[coatimageVar].image);
  }
  const changeshoes=()=> {
    shoesimageVar == (shoes.length - 1) ? setshoesImageVar(0) : setshoesImageVar(shoesimageVar + 1);
    console.log(shoes[shoesimageVar].image);
  }
  const changeback=()=> {
    backimageVar == (back.length - 1) ? setbackImageVar(0) : setbackImageVar(backimageVar + 1);
    console.log(back[backimageVar].image);
  }
  return (
    <View style={styles.container}>
      
        <Text style={{fontSize:30}}>미니룸</Text>    
          <View style={styles.miniroom2}>
            <View style={{borderWidth:1,borderColor:'blue',flex:1}} resizeMode="stretch" >
              <Image style={{width:'100%',height:230}}source={back[backimageVar].imageUrl}/>  
            </View>
            <View style={styles.dress}>
              <Image style={{height: 100, width: 100,borderWidth:1,borderColor:'red',flex:1}} resizeMode="stretch" source={hat[hatimageVar].imageUrl}/>
              <Image style={{height: 100, width: 100,borderWidth:1,borderColor:'red',flex:1}} resizeMode="stretch" source={coat[coatimageVar].imageUrl}/>
              <Image style={{height: 100, width: 100,borderWidth:1,borderColor:'red',flex:1}} resizeMode="stretch" source={shoes[shoesimageVar].imageUrl}/>
            </View>
          </View>

        <View style={styles.miniroom} >
        {tool?.map((row, idx) => {
        return <TouchableOpacity><Image source ={{uri:row.address}} style={{width:70,height:70}}></Image></TouchableOpacity>;
      })}
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={changehat}>
              <Image style={{height: 70, width: 70,borderWidth:1,borderColor:'red',}} resizeMode="contain" source={hat[0].imageUrl} />
            </TouchableOpacity>
            <TouchableOpacity onPress={changecoat}>
              <Image style={{height: 70, width: 70,borderWidth:1,borderColor:'red',}} resizeMode="contain" source={coat[0].imageUrl} />
            </TouchableOpacity>
            <TouchableOpacity onPress={changeshoes}>
              <Image style={{height: 70, width: 70,borderWidth:1,borderColor:'red',}} resizeMode="contain" source={shoes[0].imageUrl} />
            </TouchableOpacity>
            <TouchableOpacity onPress={changeback}>
              <Image style={{height: 70, width: 70,borderWidth:1,borderColor:'red',}} resizeMode="contain" source={back[0].imageUrl} />
            </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

export default Miniroom;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', // 혹은 'column'
      backgroundColor: '#fff',
      padding: 20,
      borderWidth: 1,
      borderColor: 'blue',
      alignItems: 'center',
    },
    title:{
      flexDirection: 'row', // 혹은 'column'
      flex: 1,
    },
    miniroom: {
      width:'100%', 
      height:230,
      justifyContent: 'space-around',
      alignItems:'center',
      marginTop: 30,
      //paddingVertical: 8,
      //paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: 'green',
    },
    miniroom2: {
      width:'100%', 
      height:230,
      //justifyContent: 'space-around',
      marginTop: 30,
      //paddingVertical: 8,
      //paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: 'orange',
    },
    dress:{
      width:'100%',
      height:'100%',
      alignItems:'center',
      justifyContent:'center'
    }
  });
