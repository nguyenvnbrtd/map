import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

export default ({
    backgroundColor, 
    opacity, 
    border,
    width,
    height,
    children,
    onPress,
    style,
    }) => {
    return(
        <TouchableOpacity style={[styles.button, {borderWidth:(border=='none'?0:1), backgroundColor, width:(width!=null?width:150), height:(height!=null?height:50)}, style]} 

            onPress={onPress}>

            {children}
        </TouchableOpacity>
    );

}


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#dfe6e9',
        borderRadius: 30,
        borderColor: '#fff',
        elevation: 2,
    },
});