import Vue from 'vue'
import axios from 'axios'

// post
export function postAction (url, parameter) {
    return axios({
        url: url,
        method: 'post',
        data: parameter
    })
}

// get
export function getAction (url, parameter) {
    return axios({
        url: url,
        method: 'get',
        params: parameter
    })
}


