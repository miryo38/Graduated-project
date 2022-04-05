import { View, Text ,Image,FlatList,StyleSheet,TouchableOpacity,TextInput,Dimensions} from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import SearchBar from "react-native-dynamic-search-bar";
import firestore from '@react-native-firebase/firestore'
var { height, width } = Dimensions.get('window');

const SearchScreen = (props) => {
  const [posts,setPosts] = useState(null)

  const getPosts = async ()=>{
    const querySanp = await firestore().collection('posts').get()
    const allposts = querySanp.docs.map(docSnap=>docSnap.data())
   //  console.log(allusers)
   setPosts(allposts)
}

useEffect(()=>{
    getPosts()
},[])

  const RenderCard = ({item})=>{
    return (
      <TouchableOpacity 
        onPress={() => props.navigation.navigate('SNS', { postId: item.postId, fromUserProfile: true })}
      >
      <View  style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }]}>
      <Image 
      style={{
          flex: 1,
          alignSelf: 'stretch',
          width: undefined,
          height: undefined,
          backgroundColor: '#c2c2c2'
      }}
      source={{uri: item.postImg}}
      />
    
      </View>
      </TouchableOpacity>
    )
}

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
    <View style={styles.serach}>
      <SearchBar
  placeholder="Search here"
  onPress={() => alert("onPress")}
  onChangeText={(text) => console.log(text)}
/>

       
    </View>
    <FlatList 
          data={posts}
          horizontal={false}
          numColumns={3}
          renderItem={({item})=> {return <RenderCard item={item} />
        }}
         
        />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  serach: {
    marginTop: 10,
    marginBottom: 10,
  },
});
