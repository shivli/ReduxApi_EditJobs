import { connect } from "react-redux";
import SignUp from '../components/signup';
import { getsignup } from '../Actions/userAction';
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        getsignup: (post_data) => dispatch(getsignup(post_data)),

    }
}
export default connect(null, mapDispatchToProps)(SignUp);