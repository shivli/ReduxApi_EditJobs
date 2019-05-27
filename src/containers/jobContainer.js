import  {connect} from  "react-redux";
import Body from '../components/body'
import {getjob_user} from '../Actions/jobAction';
import {apply_job,get_applyjob, get_applyjob_company,get_applyjob_user} from '../Actions/applyAction'

const mapStateToProps = (state) =>{
    return {
        alljobs:state.jobs.data,
        apply:state.apply_data.data,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        dispatch,
        getjob_user: (company_Name,skills) => dispatch(getjob_user(company_Name,skills)),
        apply_job:(data)=>dispatch(apply_job(data)),
        get_applyjob:(userid)=>dispatch(get_applyjob(userid)),
        get_applyjob_company:(company)=>dispatch(get_applyjob_company(company)),
        get_applyjob_user:(userid)=>dispatch(get_applyjob_user(userid))

    }
}
// export const Body= connect(mapStateToProps, mapDispatchToProps)(Body);
export default connect(mapStateToProps, mapDispatchToProps)(Body);
// export default connect(mapStateToProps, mapDispatchToProps)(Showapplied);
// export default connect(mapStateToProps, mapDispatchToProps)( Getappliedusers );