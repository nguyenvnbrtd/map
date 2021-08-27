import { createStore, combineReducers } from 'redux';
import regionReducer from '../reducer/regionReducer';

const rootReducer = combineReducers({
    regionReducer: regionReducer
})

const configureStore = () => createStore(rootReducer)

export default configureStore;