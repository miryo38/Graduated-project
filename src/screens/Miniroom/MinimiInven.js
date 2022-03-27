import { View, Text,TouchableOpacity,StyleSheet,Image,SafeAreaView,Button,Dimensions,ScrollView} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import React,{useState,useEffect} from 'react'

const MinimiInven = () => { 
  const usersCollection = firestore().collection('Inventory');  
  const [tool, setTool] = useState();
  
  const getShopData = async () => {
    try {
      const data = await usersCollection.get();
      setTool(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getShopData();
  }, []);

  return (
    <ScrollView>
    <View style={styles.container}>
      {
        tool?.map((row, idx) => {
          if(row.classification==='미니미'){
            return  <TouchableOpacity style={{borderWidth:1,}}>
            <Image source ={{uri:row.address}} style={{width:70,height:70,}} resizeMode="contain" ></Image>
            </TouchableOpacity>;} else{
          }
      })
      }
    </View>
    
    </ScrollView>
  )
}
export default MinimiInven;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 혹은 'column'
    padding: 20,
    alignItems: 'center',
    flexWrap:"wrap",
},
});
