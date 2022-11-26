const axios = require('axios')

const api = axios.create({
    baseURL: 'https://projeto-final-cubos-academy.herokuapp.com/',
    timeout: 1000,
    headers:{
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    rejectUnauthorized: false
})
export default api

    