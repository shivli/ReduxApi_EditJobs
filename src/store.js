
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import userRed from "./Reducer/userRed";
import Job from "./Reducer/jobRed";
import ApplyRed from './Reducer/applyRed';
// import promise from "redux-promise-middleware"

export default createStore(combineReducers({
    user: userRed,
    jobs: Job,
    apply_data:ApplyRed
})
    , applyMiddleware(thunk));
    
// export default Store;