import axios from 'axios';
export const postDataSignup =(data) => {
    return {
        type: "POST_SIGNUP",
        payload: data
    }
}
export const getDataLogin =(data) => {
    return {
        type: "GET_LOGIN",
        payload: data
    }
}

export const getlogin = (user) => {
    var url;

    url = 'http://localhost:8082/retriveuser';
    return dispatch => {
        axios.post(url, user).then((res) => {
            console.log(res.data)
            if (res.data.errors) {
                window.alert(JSON.stringify(res.data.message))
            }else if(res.data=== ''){
                window.alert('Invalid Username/ Password')
            } 
            else{
                dispatch(getDataLogin(res.data))
                
                
            }
            
        }).catch((err) => {
            alert("Please enter a valid username and password");
        })

    }

  
}

export const getsignup = (data) => {

    return dispatch => {
        axios.post('http://localhost:8082/jobapp',data)
        .then((res) => {
            dispatch(postDataSignup(res.data));
        }).catch((err) => {
            return err;
        })

    }
}