import { ADD_FETCHED_BLUEPRINTS_DATA, FETCH_BLUEPRINTS_CATEGORY, ADD_BLUEPRINT_NODE, UPDATE_BLUEPRINT_NODE } from '../Actions/Types';

export default function BlueprintsReducer(state = {}, action) {
    switch (action.type) {

        case ADD_FETCHED_BLUEPRINTS_DATA:
            return state['blueprints'] = [ ...action.payload];
        case FETCH_BLUEPRINTS_CATEGORY:
            return state['category'] = [ ...action.payload];
        case ADD_BLUEPRINT_NODE:
            const itemObj = {
                blueprintid: "",
                id: "",
                isCard: true,
                label: action.payload.name,
                subText: "",
                type: ""
            }
            state.map(item => {
                if(item.id === 'draft'){
                    item.items = [...item.items, itemObj]
                }
            })
            return [...state];
        case UPDATE_BLUEPRINT_NODE:
            return state.filter((e) => {
                if (e.name === action.payload.name) {
                    return true;
                }
                return false;
            });
        default:
            return state;
    }
}