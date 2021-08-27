import React from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const wdWidth = (per) => {return (windowWidth*per/100)}
const wdHeight = (per) => {return (windowHeight*per/100)}

const Popup = (props) => {
    const [display, setDisplay] = React.useState(0);
    const [title, setTitle] = React.useState('New Point');
    return(
        <View style={[styles.centerContent, {width: wdWidth(100), height: wdHeight(100), position: 'absolute', opacity:display}]}>
            <View style={[styles.popupBackground]}/>
            <View style={[styles.popupContent, styles.centerContent]}>
                <TextInput style={[styles.submitForm]} value={title} onChange={setTitle}></TextInput>
                <TouchableOpacity style={[styles.submitButton, styles.centerContent, {marginBottom: 10}]}><Text>Submit</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.submitButton, styles.centerContent]} onPress={()=> setDisplay(0)}><Text>Cancel</Text></TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    popupContent:{
        width:250, 
        height:200, 
        backgroundColor: '#fff', 
        borderRadius: 30,
        zIndex: 11, 
    },
    popupBackground:{
      width: '100%',
      height: '100%',
      backgroundColor: '#636e72',
      opacity: 0.8,
      position: 'absolute',
      zIndex: 10,
    },
    submitButton:{
        width: 160,
        height: 50,
        borderRadius: 25,
        elevation: 2,
    },
    submitForm:{
        width: 160,
        // height: 150,
        textAlign: 'center',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
})

export default Popup;