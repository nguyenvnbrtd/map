import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

export default ({
    image, 
    color, 
    opacity, 
    children, 
    style,
    }) => {
    return(
        <View style={[styles.container, style, {backgroundColor:color}]}>
            {/* opacity default = 0.3 */}
            <Image style={[styles.backgroundImage, {opacity: (opacity!=0.3?opacity:0.3)}]} source={image}></Image> 
            {children}
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        position: 'absolute',   
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    backgroundImage: {
        // resizeMode: 'cover',
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },

});