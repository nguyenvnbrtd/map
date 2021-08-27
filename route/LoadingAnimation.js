import React from 'react';
import {StyleSheet, View} from 'react-native'
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';

const LoadingAnimation = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <LottieView source={require('../assets/LottieJSON/map5.json')} autoPlay loop />
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3d3d3d'
    }
})

export default LoadingAnimation;