import axios from 'axios'

const baseUrl = process.env.REACT_APP_BACKEND_URL
const api = "/api"
const persons = "/persons"

const url = baseUrl + api

const getAllPersons = () => {
	return axios.get(url + persons)
}

const createPerson = (newPerson) => {
	return axios.post(url + persons, newPerson)
}

const updatePerson = (id, newNumber) => {
    return axios.put(`${url}${persons}/${id}`, newNumber)
}

const removePerson = (id) => {
    return axios.delete(`${url}${persons}/${id}`)
}

export const apiService = {
    getAllPersons,
    createPerson,
    updatePerson,
    removePerson
};


export default apiService

