import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, BackHandler, Alert  } from 'react-native';
import MapView,{PROVIDER_GOOGLE, Marker, Callout, Polygon } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
  
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import LoadingAnimation from '../route/LoadingAnimation'

import { useDispatch, useSelector } from 'react-redux';
import {addRegion, unMarkRegion, markRegion} from '../state/action/action';

const MainScreen = (props) =>{
  const {navigation} = props;
  
  //redux here
  const dispatch = useDispatch();
  const markReg = (region, key) => dispatch(markRegion(region, key));
  const addReg = (reg, marked) => dispatch(addRegion(reg, marked));
  const unMarkReg = (region, key) => dispatch(unMarkRegion(region, key))
  const regions = useSelector(state => state.regionReducer.regionList);

  //normal hook here
  const MapRef = React.useRef(null)
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [latitudeDelta, setLatitudeDelta] = useState(0);
  const [longitudeDelta, setLongitudeDelta] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [area, setArea] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go off?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(()=>{ 
    setLatitude(regions[0].region.latitude);
    setLongitude(regions[0].region.longitude);
    setLatitudeDelta(regions[0].region.latitudeDelta);
    setLongitudeDelta(regions[0].region.longitudeDelta);
    setTimeout(()=>{
      setIsLoading(false);
    }, 2000)
  },[])

  useEffect(()=>{
    setTimeout(()=>{
      unMarkAll();
      setIsLoading(false);
    }, 1500)
  }, [isLoading])

  const Go = (region) =>{
    MapRef.current.animateToRegion(region.region);
    setTimeout(()=>{markReg(region.region, region.key); setSelectedRegion(region.region);}, 500)
    
  }

  const unMarkAll = () =>{
    regions.map( (region) =>{
      region.marked&&unMarkReg(region.region, region.key)
    })
    setSelectedRegion(null);
    setArea(false);
  }

  const getMarkList = (regions) => {
    const list = [];
    regions.map((region) =>{
      region.marked&&list.push(region.region);
    })
    return list;
  }

  if(isLoading) return <LoadingAnimation/>
  
  return (
    <LinearGradient colors={['#b2bec3', '#636e72']} style={[styles.container, styles.centerContent]}>
      
      <View style={[styles.block, styles.map, styles.centerContent, {width:wdWidth(95)}]}>
        <MapView 
          provider={PROVIDER_GOOGLE}
          ref={MapRef}
          
          // initialRegion={regions[0].region}

          onRegionChangeComplete={(Region)=>{
            setLatitude(Region.latitude); 
            setLongitude(Region.longitude);
            setLatitudeDelta(Region.latitudeDelta);
            setLongitudeDelta(Region.longitudeDelta);
          }}

          onPress={(event) => { 
            const {coordinate} = event.nativeEvent
            const _newRegion = {
              title: `New point ${regions.length+1}`,
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: 92,
              longitudeDelta: 78,
              }
            addReg(_newRegion, true)
            }}

          style={{width: '100%', height: '100%', zIndex: 9}}
          >
          {regions.map(region=>region.marked&&<CustomMarker region={region.region} key={region.key}/>)}
          {area&&<Polygon coordinates={getMarkList(regions)} fillColor={'rgba(39, 174, 96,0.6)'}></Polygon>}
          {selectedRegion!=null&&<CustomMarker region={selectedRegion} show={true}/>}
        </MapView>
        
        <TouchableOpacity style={[styles.pointListHover, styles.centerContent]} onPress={()=>{setSelectedRegion(null); navigation.navigate('PointList', {Go:Go, setLoading:setIsLoading})}}>
          <AntDesign name="calendar" color={'#426976'} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.pointListHover, styles.centerContent, {top: '16%'}]} onPress={()=> (getMarkList(regions).length>=3)&&setArea(area?false:true)}>
          <MaterialCommunityIcons name="rectangle-outline" color={'#426976'} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.pointListHover, styles.centerContent, {top: '22%'}]} onPress={unMarkAll}>
          <MaterialCommunityIcons name="map-marker-off-outline" color={'#426976'} size={20} />
        </TouchableOpacity>

        <View style={ [styles.pointInfo, styles.centerContent]}>
          <View style={[styles.pointCoordinateContainer]}>
            <Text style={[ styles.pointX, styles.pointCoordinate]}>La: {parseFloat(latitude).toFixed(2)}</Text>
            <Text style={[ styles.pointY, styles.pointCoordinate]}>Lo: {parseFloat(longitude).toFixed(2)}</Text>
          </View>
          <View style={[styles.pointCoordinateContainer]}>
            <Text style={[ styles.pointX, styles.pointCoordinate]}>LaD: {parseFloat(latitudeDelta).toFixed(2)}</Text>
            <Text style={[ styles.pointY, styles.pointCoordinate]}>LoD: {parseFloat(longitudeDelta).toFixed(2)}</Text>
          </View>
          
        </View>
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
  
}

const CustomMarker = ({
  show,
  region,
}) => {
  const MarkerRef = React.useRef(null);

  useEffect(() => {
    show&&MarkerRef.current.showCallout();
  }, [])

  return(
    <Marker tracksViewChanges={false} ref={MarkerRef} coordinate={region} title={region.title} >
      <View style={{backgroundColor: '#ff7675' ,width: 20, height: 20, borderRadius: 20}}></View>
      {/* <Image source={require('../assets/nguyen.jpg')}  style={{width:30, height:30}} ></Image> */}
      <Callout tooltip={true}>
        <View style={[styles.callout, styles.centerContent]}>
          <Text style={[ styles.calloutTitle]}>{region.title}</Text>
          <Text>{parseFloat(region.latitude).toFixed(2)}</Text>
          <Text>{parseFloat(region.longitude).toFixed(2)}</Text>
        </View>
      </Callout>
    </Marker>
  )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const wdWidth = (per) => {return (windowWidth*per/100)}
const wdHeight = (per) => {return (windowHeight*per/100)}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    // paddingTop: 50,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  block:{
    // backgroundColor: '#eff7fc',
    borderColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 10,

    //this shadow effect for pc and ios platform
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
      },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  map:{
    height: wdHeight(95),
    overflow: 'hidden',
    marginBottom: 10,
  },
  pointListHover:{
    position: 'absolute',
    left: '4%',
    top: '10%',
    height: 35,
    width: 35,
    backgroundColor: '#dfe6e9',
    borderColor: '#fff',
    borderRadius: 35,
    borderWidth: 1,
    elevation: 2,
    opacity: 0.8,
    zIndex: 10,
  },
  pointInfo:{
    // height: wdHeight(25),
    // with: wdWidth(50),
    position: 'absolute',
    bottom: 10,
    // backgroundColor: '#fff',
    // height: 50,
    width: 220,
    padding: 5,
    zIndex: 10,
  },
  pointCoordinateContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    // position: 'absolute',
    // bottom:'2%',
    width: 300,
  },
  pointCoordinate:{
    fontSize: 18,
    marginHorizontal: 5,
    color: '#747d8c',
  },
  callout:{
    width:100, 
    height:100, 
    backgroundColor: '#dff9fb', 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    elevation: 2,
  },
  calloutTitle:{
    color: '#535c68', 
    flexWrap: 'wrap',
    // fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  
});


export default MainScreen;