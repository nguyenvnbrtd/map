import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Entypo, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import {markRegion, unMarkRegion, resetRegion, addRegion, deleteRegion} from '../state/action/action';
import {getData} from '../Model/Data';

import LoadingAnimation from '../route/LoadingAnimation'
import Button from '../Component/Button';

const PointList = ({
  navigation,
  route,
  }) => {
  const {Go, setLoading} = route.params;
  
  const dispatch = useDispatch();
  const markReg = (region, key) => dispatch(markRegion(region, key));
  const unMarkReg = (region, key) => dispatch(unMarkRegion(region, key));
  const resetReg = () => dispatch(resetRegion());
  const addReg = (reg, marked) => dispatch(addRegion(reg, marked));
  const deleteReg = (key) => dispatch(deleteRegion(key));
  const regions = useSelector(state => state.regionReducer.regionList);

  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{ 
    setTimeout(()=>{
      setIsLoading(false);
    }, 1000)
  },[isLoading])

  const markAll = () => {
    regions.map( (region) =>{
      !region.marked&&markReg(region.region, region.key)
    })
  }

  //it call when reset all the data, so i need to put it on loading for new data will be loaded
  const reset = () => {
    resetReg();
    getData(addReg);
    setLoading(true); // this in main screen
    setIsLoading(true); // this screen
    navigation.navigate('Map') 
  }

  if(isLoading) return <LoadingAnimation/>

  return(
    <SafeAreaView style={[styles.container, styles.centerContent]}>
      <StatusBar style="auto" ></StatusBar>
      <View style={[{flexDirection: 'row', justifyContent: 'center', width: '100%'}]}>
        <Entypo style={[{position: 'absolute', left: '2%'}]} name="chevron-small-left" color={'#8395a7'} size={50} onPress={()=>navigation.goBack()}/>
        <Button width={100} backgroundColor='#e67e22' style={{marginBottom: 20, marginRight: 10}} onPress={()=>reset()}>
          <Text style={[styles.text]}>Reset</Text>
        </Button>
        <Button width={100} backgroundColor='#74b9ff' style={{marginBottom: 20}} onPress={markAll}>
          <Text style={[styles.text]}>Mark all</Text>
        </Button>
        
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={regions}
        renderItem={ ({ item }) =>
          <Point item={item} navigation={navigation} Go={Go} markReg={markReg} unMarkReg={unMarkReg} deleteReg={deleteReg}/>
        }
        keyExtractor={(item) => `${item.key}`}
      />
  </SafeAreaView>
  );
}

const Point = ({
  item, 
  navigation, 
  Go,
  markReg,
  unMarkReg,
  deleteReg,
  }) => {
    
  return(
      <TouchableOpacity 
        style={[styles.pointContainer, styles.centerContent, {backgroundColor:(!item.marked)?'#fff':'#b2bec3'}]}
        onPress={()=>(!item.marked)?markReg(item.region, item.key):unMarkReg(item.region, item.key)}
        >
        <View style={[styles.actionContainer, styles.centerContent]}>
          <MaterialCommunityIcons name="delete" color={'#8395a7'} size={50} onPress={()=>deleteReg(item.key)} style={{position: 'absolute', left: '2%',}}/>
          <Text style={[styles.title]}>{item.region.title}</Text>
          <FontAwesome name="globe" color={'#8395a7'} size={50} onPress={()=>{Go(item); navigation.goBack(); }} style={{position: 'absolute', right: '2%',}}/>
        </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(rgba(149, 165, 166, 0.6))',
      flex: 1,
      padding: 10,
      paddingTop: 50,
    },
    centerContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    pointContainer: {
      flexDirection:'row',
      // marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#dfe6e9',
      padding: 5,
      width: '100%',
      // borderRadius: 10,
    },
    actionContainer:{
      flexDirection:'row',
      // marginBottom: 10,
      // padding: 5,
      height: 60,
      width: '100%',
    },
    title:{
      // height: 50,
      width: 180,
      flexWrap: 'wrap',
      textAlign: 'center'
    },
    button:{
      width:50,
      height: 50,
      marginRight: 10,
      backgroundColor: '#1abc9c',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: '#fff',
      elevation: 2,
    },
    text:{
      fontSize: 18,
    },
})

export default PointList;