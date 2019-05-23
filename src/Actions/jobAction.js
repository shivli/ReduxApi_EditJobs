
import axios from 'axios';
export const getData = (data) => {
    return {
        type: "GET_DATA_FULFILLED",
        payload: data
    }
}

export const postJobSucess = (data) => {
    return {
        type: "POST_JOB",
        payload: data
    }
}

export const updateJobSucess = (data) => {
    return {
        type: "UPDATE_JOB",
        payload: data
    }
}

export const getjob_user = (company) => {
    if (company) {
        return dispatch => {
            axios.get('http://localhost:8082/getjobs', {

                params: {
                    company_Name: company
                }

            }).then((res) => {
                dispatch(getData(res.data));
            }).catch((err) => {
                return err;
            })

        }
    }
    else {
        return dispatch => {
            axios.get('http://localhost:8082/jobs').then((res) => {
                dispatch(getData(res.data));
            }).catch((err) => {
                return err;
            })

        }
    }


}
export const postJob = (company) => {
    var url;

    url = 'http://localhost:8082/newjobs';
    return dispatch => {
        console.log(company)
        axios.post(url, company).then((res) => {
            console.log(res.data);
            if (res.data.errors) {
                window.alert(JSON.stringify(res.data.message))
            } else {
                // let pr = new Promise((resolve, reject) => {
                    dispatch(postJobSucess(res.data))
                //     resolve();
                // })
                // pr.then(() => {
                //     dispatch(getjob_user(company.company_Name))
                // })

            }

        }).catch((err) => {
            return err;
        })

    }
}

export const updateJobs= (data, company_name) => {
    return dispatch => {
        axios.put('http://localhost:8082/updatedjob', data)
            .then((res) => {
                if (res.data.errors) {
                    window.alert(JSON.parse(res.data.message));
                }
                else {
                    let pr = new Promise((resolve, reject) => {
                        dispatch(updateJobSucess(res.data));
                        resolve();
                    })
                    pr.then(() => {
                        dispatch(getjob_user(company_name));
                    })
                }
            }).catch((err) => {
                return err;
            })
    }
}