import { connect } from "react-redux";
import CompanyForm from '../components/companyForm';
import { postJob} from '../Actions/jobAction';
const mapDispatchToProps=(dispatch)=>{
    
    return {
        postJob: (company)=>dispatch(postJob(company)) ,
      
    }
}
export default connect(null, mapDispatchToProps)(CompanyForm);