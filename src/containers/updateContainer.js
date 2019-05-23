import EditJobs from '../components/companyUpdateForm'
import  {connect} from  "react-redux";
import {updateJobs} from '../Actions/jobAction'

const mapDispatchtoProps=(dispatch)=>{
    
    return {
        updateJobs: (data,company_Name)=>dispatch(updateJobs(data,company_Name)) ,

    }
}
export default connect(null,mapDispatchtoProps)(EditJobs)