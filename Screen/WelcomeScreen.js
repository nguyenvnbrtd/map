import React, {useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Background from '../Component/Background';
import Button from '../Component/Button';


const Welcome = (props) => {
    const {navigation} = props;
    // const fadeInAnimation = useRef(new Animated.Value(0)).current;
    // const moveUpAnimation = useRef(new Animated.Value(0)).current;
    // const moveDownAnimation = useRef(new Animated.Value(0)).current;
    useEffect(()=>{
        // Animated.timing(fadeInAnimation, {
        //     toValue: 1,
        //     duration: 1000,
        //     delay: 1000,
        //     useNativeDriver: true,
        // }).start();

        // Animated.timing(moveUpAnimation, {
        //     toValue: 1,
        //     duration: 500,
        //     useNativeDriver: true,
        // }).start();

        // Animated.timing(moveDownAnimation, {
        //     toValue: 1,
        //     duration: 500,
        //     useNativeDriver: true,
        // }).start();

    },[])

    return(
        <Background color={'#636e72'} image={require('../assets/Image/bg1.jpg')} opacity={0.4} style={[styles.container, styles.centerContent]}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Well come</Text>
            {/* <Text>This is a test version</Text>
            <Text>There are some bug on this</Text>
            <Text>Let's contact me</Text> */}
            <Button height={60} backgroundColor={'#fff'} border={'none'} onPress={()=> navigation.navigate('Map')}>
                <Text style={styles.startButtonText}>Let's start</Text>
            </Button>
        </Background>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        color: '#dfe6e9',
        fontSize: 50,
        fontWeight: 'bold',
    },
    
    startButtonText:{
        fontSize: 25,
        color: '#636e72'
    }
})

export default Welcome;