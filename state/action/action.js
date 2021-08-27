import {ADD_REGION, DELETE_REGION, MARK_REGION, UN_MARK_REGION, RESET_REGION} from './types';

export const addRegion = (region, marked) => (
    {
      type: ADD_REGION,
      region: region,
      marked: marked
    }
);
  
export const deleteRegion = (key) => (
    {
        type: DELETE_REGION,
        key: key
    }
);


export const markRegion = (region, key) => (
    {
        type: MARK_REGION,
        region: region,
        key: key,
    }
);

export const unMarkRegion = (region, key) => (
    {
        type: UN_MARK_REGION,
        region: region,
        key: key,
    }
);

export const resetRegion = () => (
    {
        type: RESET_REGION,
    }
);