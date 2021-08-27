import { StatusBar } from 'expo-status-bar';
import React, {useRef, useEffect, useState} from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions } from 'react-native';

// const mainColor = '#6c5ce7'
const mainColor = '#dff9fb'
export default function CubeAnimation(props) {
  const upAnimation = new Animated.Value(1);
  const downAnimation = new Animated.Value(1);
  const collapseAnimation = new Animated.Value(1);
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [width, setWidth] = useState(0)

  useEffect(() => {
    Animated.parallel(
      [
        Animated.spring( upAnimation, {
          toValue: top,
          // duration: 00,
          bounciness: 20,
          useNativeDriver: true,
        }),
        Animated.spring( downAnimation, {
            toValue: bottom,
            // duration: 200,
            bounciness: 20,
            useNativeDriver: true,
          }
        ),
        Animated.timing( collapseAnimation, {
          toValue: width,
          duration: 300,
          // bounciness: 5,
          // delay: 1,
          useNativeDriver: true
          }
        )
      ]).start();
      
  }, [upAnimation, downAnimation, collapseAnimation])

  const _onPress = () => {
    setTop(top===-50?0:-50);
    setBottom(bottom===80?0:80);
    setWidth(0);
  }

  return (
    <View style={styles.container}>
        
        
      <Animated.View style={[styles.cubeContainer, styles.container ]}>
        <View style={[styles.stringContainer]}>
          <Animated.View style={[styles.stringPart, {width: getWidth(5), transform: [{ scaleX: collapseAnimation }]}]}/>
          <Animated.View style={[styles.stringPart, {width: getWidth(5), transform: [{ scaleX: collapseAnimation }]}]}/>
          <Animated.View style={[styles.stringPart, {width: getWidth(16), transform: [{ scaleX: collapseAnimation }]}]}/>
          <Animated.View style={[styles.stringPart, {width: getWidth(6), transform: [{ scaleX: collapseAnimation }]}]}/>
          <Animated.View style={[styles.stringPart, {width: getWidth(10), transform: [{ scaleX: collapseAnimation }]}]}/>
          <Animated.View style={[styles.stringPart, {width: getWidth(3), transform: [{ scaleX: collapseAnimation }]}]}/>
        
        </View>
          
        <Animated.View style={[styles.cube, styles.topPart, {transform: [{ translateY: upAnimation }]}]}>
            <View>
              <TouchableOpacity style={[styles.loginButton, {marginBottom:10}]} onPress={_onPress}><Text style={[styles.loginText]} >Log in</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.loginButton]}><Text style={[styles.loginText]}>Facebook</Text></TouchableOpacity>
            </View>
        </Animated.View>
        <Animated.View  style={[styles.cube, styles.bottomPart, {transform: [{ translateY: downAnimation }]}]}>

        </Animated.View>

      </Animated.View>

      {/* <TouchableOpacity style={[styles.buttonActive, {transform: [{ translateY: upAnimation }]}]} onPress={_onPress}>
        <Animated.View style={[, styles.animation]}>
          <StatusBar style="auto" />
        </Animated.View>
      </TouchableOpacity> */}
    </View>
    // {transform: [{scale:testAnimation}]}
    
  );
}

const getHeight = (height) => {
  return (height*Dimensions.get('window').height)/100
}
const getWidth = (width) => {
  return (width*Dimensions.get('window').width)/100
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  animation:{
    width: 50, 
    height: 50, 
    backgroundColor: 'red',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonActive: {
    position: 'absolute',
    top: getHeight(50),
    zIndex: 1,

  },
  cubeContainer:{
    height: null, 
    width: null,
  },
  cube:{
    position: 'absolute',
    width: getWidth(75),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainColor,
    borderRadius: 5,

  },
  stringContainer:{
    position: 'absolute',
    flexDirection: 'row',

  },
  stringPart:{
    backgroundColor: mainColor,
    borderRadius: 50,
    marginHorizontal: getWidth(3),
    height:getHeight(35),
  },
  topPart:{
    height:getHeight(30),
    top: (getHeight(50)-getHeight(27)),
  },
  bottomPart:{
    height: getHeight(20),
    top: getHeight(50),
  },
  loginButton:{
    width: getWidth(50),
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0984e3',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 30,
    elevation: 2,
  },
  loginText:{
    fontSize: 24,
    flexWrap: 'wrap',
    textAlign: 'center',
    
    // fontWeight: 'bold',
  },

});
