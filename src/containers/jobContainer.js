import  {connect} from  "react-redux";
import Body from '../components/body'
import {getjob_user} from '../Actions/jobAction';

const mapStateToProps = (state) =>{
    return {
        alljobs:state.jobs.data
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        dispatch,
        getjob_user: (company_Name) => dispatch(getjob_user(company_Name)),

    }
}
// export const Body= connect(mapStateToProps, mapDispatchToProps)(Body);
export default connect(mapStateToProps, mapDispatchToProps)(Body);