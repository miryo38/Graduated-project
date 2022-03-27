import React, {useState, useEffect, useContext} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';

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
import MarqueeText from 'react-native-marquee';
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
      
      <TouchableOpacity style={styles.music} onPress={() => onMusicPressed()}>
      <MarqueeText
          style={{ fontSize: 20 }}
          duration={4000}
          marqueeOnStart
          loop
          marqueeDelay={1500}
          marqueeResetDelay={1500}
        >
        now playing  now playing  now playing  now playing  now playing  now playing  now playing
        </MarqueeText>
            </TouchableOpacity>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titlecontainer}>
          <View style={styles.leftcontainer}>
            <TouchableOpacity onPress={() => onprofilePressed()}>
              <Image style={styles.userImg} source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}/>
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
                <Text style={styles.userBtnTxt}> 사진첩</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.userBtn} onPress={() => onweblogpress()}>
                <Text style={styles.userBtnTxt}> 방명록</Text>
              </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.miniroom} onPress={() => onMiniroompress()}>
        <View>
        <Text style={{fontSize:20,textAlign:'center',marginBottom:10 }}>{userData ? userData.name : ''}님의 미니룸</Text>
          <Image source={{uri: 'https://t1.daumcdn.net/cafeattach/MT4/648d42cb50cafc47f7d02fdfc380f91449afca84'}}
       style={{width: 400, height: 230,marginTop:0}}>

          </Image>
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
    marginTop:10,
   
  },
  music:{
    marginTop:10,
    height:25,
    marginLeft:25,
    marginRight:25,
  },
  title:{ 
    height:50,
    backgroundColor: 'orange',
    justifyContent: "center",
    flexDirection: 'row',
    alignItems: "center",
    
   
  },
  titleText:{
    fontSize: 20,
    color:'#fff',
   
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
      },
  userBtn: {
    width:120,
    backgroundColor:'orange',
    borderColor: 'orange',
    borderBottomColor:'#fff',
    borderWidth:1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  userBtnTxt: {
    color: '#fff',
    textAlign:'center',  
    fontSize:15,
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
    height:300,
    justifyContent: 'space-around',
    alignItems:'center',
    paddingVertical: 8,
    paddingHorizontal: 8,

  },

});