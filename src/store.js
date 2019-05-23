
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import userRed from "./Reducer/userRed";
import Job from "./Reducer/jobRed";
// import promise from "redux-promise-middleware"

export default createStore(combineReducers({
    user: userRed,
    jobs: Job,
})
    , applyMiddleware(thunk));
    
// export default Store;