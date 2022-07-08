import { combineReducers } from 'redux';
import BlueprintsReducer from './BlueprintsReducer';

export default combineReducers({
    blueprints: BlueprintsReducer
})