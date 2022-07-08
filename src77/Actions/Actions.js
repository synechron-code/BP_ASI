import { ADD_FETCHED_BLUEPRINTS_DATA, ADD_BLUEPRINT_NODE, UPDATE_BLUEPRINT_NODE, FETCH_BLUEPRINTS_CATEGORY } from './Types';
import { getBluePrints } from './Build';

export const addBlueprintNode = (data) => {
  return (dispatch) => {
    return dispatch({
      type: ADD_BLUEPRINT_NODE,
      payload: {
          description: data.description, 
          descriptionError: data.descriptionError, 
          name: data.name, 
          nameError: data.nameError, 
          tags: data.tags, 
          category: data.category, 
          categoryerror:  data.categoryerror, 
          lifecyclestatus: data.lifecyclestatus, 
          lifecyclestatusError: data.lifecyclestatusError
      }
    });
  }
};

export const updateBlueprintNode = (data) => {
  return {
      type: UPDATE_BLUEPRINT_NODE,
      payload: {
          description: data.description,
          environment: data.environment,
          name: data.name,
          tags: data.tags
      }
  }
};

export const fetchBlueprints =  () => {
  return (dispatch) => {
    const response = getBluePrints();
    return response.then(data => {
      dispatch({
        type: ADD_FETCHED_BLUEPRINTS_DATA,
        payload: data
      })
    })
  };
};

export const fetchBlueprintsCategory =  (data) => {
  return (dispatch) => {
    return dispatch({
      type: FETCH_BLUEPRINTS_CATEGORY,
      payload: data
    })
  };
};