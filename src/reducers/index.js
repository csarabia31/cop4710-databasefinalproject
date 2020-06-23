import { combineReducers } from 'redux';
import { authentication } from './user';

const rootReducer = combineReducers({
    authentication
});

export default rootReducer;