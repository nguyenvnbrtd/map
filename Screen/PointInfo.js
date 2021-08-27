import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {postData, deleteData} from '../Model/Data'


import { useDispatch, useSelector } from 'react-redux';

const PointInfo = ({
    navigation,
    route,
}) => {
    const regions = useSelector(state => state.regionReducer.regionList);

    const {item} = route.params; 

    const add = () => {
        let id = 0;
        regions.map((region)=> {
            (region.region.save)&&(id+=1)
        })

        const point = {
            id: id,
            title: item.region.title,
            latitude: parseFloat(item.region.latitude).toFixed(2),
            longitude: parseFloat(item.region.longitude).toFixed(2),
            latitudeDelta: parseFloat(item.region.latitudeDelta).toFixed(2),
            longitudeDelta: parseFloat(item.region.longitudeDelta).toFixed(2),
        }
        postData(point);
        navigation.goBack();
    }
    console.log(item)
    const del = () =>{
        deleteData(item.region.id);
        navigation.goBack();
    }

    return (
        <View style= {[styles.container, styles.centerContent]}>
            <StatusBar/>
            <Text style={[styles.input]}>{item.region.title}</Text>
            <Text style={[styles.input]}>{parseFloat(item.region.latitude).toFixed(2)}</Text>  
            <Text style={[styles.input]}>{parseFloat(item.region.longitude).toFixed(2)}</Text>  
            <Text style={[styles.input]}>{parseFloat(item.region.latitudeDelta).toFixed(2)}</Text> 
            <Text style={[styles.input]}>{parseFloat(item.region.longitudeDelta).toFixed(2)}</Text>  
            <TouchableOpacity style={[styles.button, styles.centerContent]} onPress={add}><Text>Add</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.centerContent]}  onPress={del}><Text>Delete</Text></TouchableOpacity>

        </View>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const wdWidth = (per) => {return (windowWidth*per/100)}
const wdHeight = (per) => {return (windowHeight*per/100)}


const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        width: wdWidth(20),
        height: 60,
        backgroundColor:'#dfe6e9',
        borderRadius: 20,
        // borderColor: '#fff',
        // borderWidth: 1,
        overflow: 'hidden',
        elevation: 2,
        marginVertical: 10,
    },
    input:{
        height: 50,
        maxWidth: wdWidth(90),
        padding:5,
        textAlign: 'center',
        color: '#636e72',
        fontSize: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#636e72',
    },

})

export default PointInfo;