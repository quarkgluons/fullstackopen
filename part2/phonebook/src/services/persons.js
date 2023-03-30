import axios from 'axios';
const url = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(url).then(response => {
        return response.data;
    })
}

const create = (newPerson) => {
    return axios.post(url, newPerson)
        .then(response => {
            console.log('response is ', response)
            return response.data;
        })
}

const deletePerson = id => {
    return axios.delete(`${url}/${id}`).then(response => {
        console.log(response);
        return response.statusText;

    })
}
const update = (updatedPerson) => {
    return axios.put(`${url}/${updatedPerson.id}`, updatedPerson).then(response => {
        return response.data;
    })
}

export default {
    getAll,
    create,
    deletePerson,
    update
}
