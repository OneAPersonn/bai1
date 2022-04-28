import axios from '../axios'

export const test1 = (data) => {
    return axios({
        url: "/report/setResult",
        method: "post",
        data
    })
}
