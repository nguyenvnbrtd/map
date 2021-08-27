import {ADD_REGION, DELETE_REGION, MARK_REGION, UN_MARK_REGION, RESET_REGION} from '../action/types';

const initialState = {
    regionList: []
}

const regionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_REGION:
            return { 
                ...state,
                regionList: state.regionList.concat({
                    key: Math.random(),
                    region: action.region,
                    marked: action.marked,
                }) 
            };
        case DELETE_REGION:
            return { 
                ...state,
                regionList: state.regionList.filter(region => region.key != action.key)
            };
        case MARK_REGION:
            const regionList = state.regionList.filter(region => region.key != action.key)
            return { 
                ...state,
                regionList: regionList.concat({
                    key: action.key,
                    region: action.region,
                    marked: true,
                }) 
            };
        case UN_MARK_REGION:
            const regList = state.regionList.filter(region => region.key != action.key)
            return { 
                ...state,
                regionList: regList.concat({
                    key: action.key,
                    region: action.region,
                    marked: false,
                }) 
            };
        case RESET_REGION:
            
            return { 
                ...state,
                regionList: [],
            };
        default:
            return state;
      }
}

export default regionReducer;