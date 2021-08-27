import React,{useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Background from '../Component/Background';


const Login = (props) => {
    const {navigation} = props;
    const [isChecking, setIsChecking] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const fadeAnim = useRef(new Animated.Value(1)).current
    
    const [op1, setOp1] = useState(1);
    const [op2, setOp2] = useState(0);
    

    useEffect(()=>{

        if(isChecking) return(<View style={styles.container}><Text>Checking</Text></View>);


    },[isChecking])

    useEffect(()=>{

        if(!isLogin){
            
        }


    },[isLogin])

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

   
    const _loginUp = () => {
        fadeOut();
    }

    return (
        
        <Background opacity={0.8} image={require('../assets/Image/bg2.jpg')} style={[styles.container, styles.centerContent]}>
            <StatusBar style='auto'></StatusBar>
            {/* <Animated.View style={[styles.container, styles.centerContent, {opacity: fadeAnim}]}>
                <TouchableOpacity style={[styles.button, styles.centerContent, {backgroundColor:'#dfe6e9'}]}   onPress={_loginUp}><Text style={styles.loginText}>Log in</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.centerContent, {backgroundColor:'#0984e3'}]}   onPress={()=>navigation.navigate('Welcome')}><Text style={styles.fbLoginText}>Log in with Facebook</Text></TouchableOpacity>
            </Animated.View> */}
            <View style={[styles.container, styles.centerContent, styles.loginForm, {opacity: 1}]}>
                <TouchableOpacity style={[styles.closeButton, styles.centerContent]} onPress={ _loginUp}><Text>X</Text></TouchableOpacity>

                <TextInput style={[styles.loginInput]} value={userName} onChange={setUserName}></TextInput>
                <TextInput style={[styles.loginInput]} value={password} onChange={setPassword}></TextInput>

                <TouchableOpacity style={[styles.button, styles.centerContent, {backgroundColor:'#dfe6e9'}]}   onPress={()=>navigation.navigate('Welcome')}><Text style={styles.loginText}>Log in</Text></TouchableOpacity>
            </View>
            {/* <CubeAnimation></CubeAnimation> */}
        </Background>
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
        width: wdWidth(90),
        height: 70,
        
        backgroundColor:'#dfe6e9',
        borderRadius: 40,
        // borderColor: '#fff',
        // borderWidth: 1,
        overflow: 'hidden',
        elevation: 2,
        marginBottom: 10,
    },
    closeButton:{
        width: 50,
        height: 50,
        borderRadius: 50,
        position: 'absolute',
        top: -30,
        backgroundColor: '#dfe6e9',
    },
    loginText:{
        color: '#636e72',
        fontSize: 25,
    },
    fbLoginText:{
        color: '#dfe6e9',
        fontSize: 25,
    },
    loginForm:{
        width: wdWidth(100),
        height: wdHeight(40),
        position: 'absolute',
        bottom: 0,
        
        // zIndex: 10,
    },
    loginInput:{
        width: wdWidth(90),
        height: 70,
        borderRadius: 25,
        backgroundColor: '#dfe6e9',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',

    },

})

export default Login;