import React, {useState, useEffect, useContext} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../utils/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
const ProfileScreen = () => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
 
  const navigation = useNavigation();
  
  const getUser = async() => {
    const currentUser = await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }

  useEffect(() => {
    getUser();
  }, []);

  const onprofilePressed = () => {
    navigation.navigate('EditProfile');
};
  const onMusicPressed = () => {
 
    navigation.navigate('Music');
};
const onEditFriendPressed = () => {
  navigation.navigate('Friend');
};
  const onweblogpress = () => {
    navigation.navigate('Weblog');
};

const onDiarypress = () => {
  navigation.navigate('Diary');
};
const onalbumpress = () => {
 
  navigation.navigate('Album');
};
const onFollowpress = () => {
  navigation.navigate('Follow');
};
const onMiniroompress = () => {
  navigation.navigate('Miniroom'); 
}; 


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{userData ? userData.name : ''}님의 미니홈피</Text>
       
        
      </View>
      
      <TouchableOpacity onPress={() => onMusicPressed()}>
      <View style={styles.music}>
        <Text>music</Text>
      </View>
      </TouchableOpacity>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center',borderWidth: 1,
        borderColor: 'blue',}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titlecontainer}>
          <View style={styles.leftcontainer}>
            <TouchableOpacity onPress={() => onprofilePressed()}>
              <Image style={styles.userImg} source={{uri: userData ? userData.userImg : 'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/AppImage%2Fprofile.jpg?alt=media&token=719929c2-defb-4cbf-99ca-fddd21bfeaa4' }}/>
            </TouchableOpacity>
          
          
          </View>
          
          <View style={styles.rightcontainer}>
            <View style={styles.action}>
            <Text>이름                     {userData ? userData.name : ''}</Text>
            </View>
            
            <View style={styles.action}>
            <Text>나이                          {userData ? userData.age : ''}</Text>
            </View>
            <View style={styles.action}>
            <Text>생일                  {userData ? userData.birthday : ''}</Text>
            </View>
            <View style={styles.action}>
            <Text>Today                        0</Text>
            </View>
            <View style={styles.action}>
            <Text>오늘의 기분             행복</Text>
            </View>
            
            </View>
          </View> 
        
       
        

        <View style={styles.userInfoWrapper}>
        <TouchableOpacity onPress={() => onEditFriendPressed()}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10</Text>
            <Text style={styles.userInfoSubTitle}>친구관리</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onFollowpress()}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onFollowpress()}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View style={styles.userBtnWrapper}>
              <TouchableOpacity style={styles.userBtn} onPress={() => onDiarypress()}>
                <Text style={styles.userBtnTxt}>다이어리</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.userBtn} onPress={() => onalbumpress()}>
                <Text style={styles.userBtnTxt}>사진첩</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.userBtn} onPress={() => onweblogpress()}>
                <Text style={styles.userBtnTxt}>방명록</Text>
              </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.miniroom} onPress={() => onMiniroompress()}>
        <View>
          <Text>미니룸</Text>
        </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  titlecontainer: {
    flex: 1,
    flexDirection: 'row', // 혹은 'column'
  },
  leftcontainer: {
    flex:0.7,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  userinfotext: {
    justifyContent: "center",
    flexDirection: 'row',
    alignItems: "center",
  },

  rightcontainer: {
    flex:0.8,
    
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
   
  },
  music:{
    borderWidth: 1,
    borderColor: 'green',
    justifyContent: "center",
    flexDirection: 'row',
    alignItems: "center",
  },
  title:{
    justifyContent: "center",
    flexDirection: 'row',
    alignItems: "center",
    
   
  },
  titleText:{
    fontSize: 20,
   
   
  },
  userImg: {
    height: 125,
    width: 125,
    borderRadius: 75,
    backgroundColor: '#fff',
    
  },
  action: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 1,
    
    paddingBottom: 5,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
    
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  miniroom: {
    width:'100%',
    height:150,
    justifyContent: 'space-around',
    alignItems:'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
  },
});