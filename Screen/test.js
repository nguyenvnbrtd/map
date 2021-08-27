import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';


const Test = (props) => {
    const [test, setTest] = useState('abc');

    useEffect(() => {
        //do something 

        return{
            //do something
        }

    },[/*dependence*/])

    return 
        <View>
            <Text>Test</Text>
        </View>
}

export default Test;


// export default class Test extends React.Component{
//     Constructor(props){
//         super(props);
//         this.state = {
//             data: []
//         }
//     }

//     ComponentDidMount(){
//         //do something
//     }

//     ComponentDidUpdate(){
//         //do something
//     }

//     ComponentWillUnMount(){
//         //do something
//     }

//     render() {
//         return 
//             <View>
//                 <Text>Test</Text>
//             </View>
//     }
// }

