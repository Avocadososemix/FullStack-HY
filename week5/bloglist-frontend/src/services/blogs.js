import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log('request data: ', request.then(response => response.data))
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    console.log('updating id: ', id)
    const request = axios.put(`${ baseUrl }/${id}`, newObject)
    console.log('request contents: ', request)
    return request.then(response => response.data)
}

export default { getAll, create, update, setToken }