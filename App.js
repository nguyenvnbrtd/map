import React, {useState, useEffect} from 'react'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state', `Can't perform a React state update on an unmounted component`, 'Failed prop type']);

import Navigation from './route/Navigation';
import LoadingAnimation from './route/LoadingAnimation'
import { useDispatch} from 'react-redux';
import {addRegion} from './state/action/action';
import {getData} from './Model/Data' 

const App = (props) => {
    const dispatch = useDispatch();
    const addReg = (reg, marked) => {dispatch(addRegion(reg, marked))}
    const [isReady, setIsReady] = useState(false);

    useEffect( ()=>{
        getData(addReg);
        setTimeout( async() => {
            setIsReady( true );
        }, 2000);
    },[])
    
    if(!isReady) 
        return (<LoadingAnimation/>);
    return(<Navigation/>)
}

export default App;

// export default class  App  extends React.Component {
//     state = {
//         isReady: false,
//     };

//     render() {
//         if (!this.state.isReady) {
//             return (
//                 <View>
//                     <Text>Loading</Text>
//                     <AppLoading
//                         startAsync={this._cacheResourcesAsync}
//                         onFinish={() => this.setState({ isReady: true })}
//                         onError={console.warn}/>
//                 </View>
//             )}
       
//         return (
//             <Navigation/>
//         );
//     }
  
//     async _cacheResourcesAsync() {

//     }
//   }