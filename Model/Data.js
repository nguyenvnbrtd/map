import {Alert} from 'react-native'
import axios from 'axios';
axios.defaults.baseURL = 'https://simple-map-423a6-default-rtdb.asia-southeast1.firebasedatabase.app/'  

export const getData = async (submitRegion) => {

    await axios.get('.json').then((res) => {
        const fetchData = [];

        for(let key in res.data) {
            fetchData.push({...res.data[key], id: key})
        }
        fetchData.map((data) => {
            const reg = {
                id: data.id,
                title: data.title,
                latitude: data.latitude,
                longitude: data.longitude,
                latitudeDelta: data.latitudeDelta,
                longitudeDelta: data.longitudeDelta,
                save: true,
            };
            submitRegion(reg, false)
        })
    }).catch((err)=> console.log(err))
}

export const postData = async (data) => {
    await axios.post(`.json`, data).then(()=>Alert.alert('Saved')).catch((err)=> console.log(err))
}

export const deleteData = async (id) => {
    await axios.delete(`/${id}.json`).Alert.alert('Deleted').catch((err)=> console.log(err))
}
// class Region {
    
//     constructor(region) {
//         this.id = region.id;
//         this.title= region.title;
//         this.latitude = region.latitude;
//         this.longitude = region.longitude;
//         this.latitudeDelta = region.latitudeDelta;
//         this.longitudeDelta = region.longitudeDelta;
//     }

// }


// export default class Data{
//     constructor() {
//         this.data = [];
//     }

//     async loadData(){
//         await axios.get('/list.json').then((res) => {
//             res.data.map((data) => {
//                this.data.push(new Region(data))
//             })
//         })
//     }
    
//     async postData(region){
//         // await axios.post('/list.json', region).then((res) => {
//         //     console.log(res)
//         // })
//         console.log(region)
//         // this.loadData();
//     }

//     newPoint(point){
//         this.data.push(new Region(point));
//     }

//     getIndexData(index) {
//         if(index>=this.data.length ) return null;
//         return this.data[index];
//     }

//     getData = () =>{return this.data;}

//     async reset(){
//         this.data=[];
//         await this.loadData();
//     }
// }

// const DataProvider = (props) => {
//     const [isLoaded, setIsLoaded] = React.useState(false)
//     const [data, setData] = React.useState([]);

//     setData(loadData(setIsLoaded));
//     console.log(data);
    
//     return (<View></View>)
// }

// const loadData = async (setIsLoaded) => {
  
//     const data = await axios.get('/list.json').data
//     setIsLoaded(true);
//     console.log(res.data);
    
//     return data;

// }

// export default DataProvider;