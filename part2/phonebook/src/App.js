import axios from 'axios'
import { useState, useEffect } from 'react'

import personServices from './services/persons';

const Notification = ({ message }) => {
    console.log('message', message)
    const style = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (message === '') {
        return null;
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}
const ErrorNotification = ({ message }) => {
    console.log('message', message)
    const style = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (message === '') {
        return null;
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}
const PersonForm = ({ persons, setPersons, setErrorNotification, setNotificationMessage}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('');
    const addPerson = (event) => {
        event.preventDefault();
        let personExist = persons.find(person => person.name === newName);
        if (personExist !== undefined) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personServices.update({ ...personExist, number: newNumber }).then(data => {
                    setPersons(persons.map(person => person.id !== data.id ? person : data));
                }).catch(response => {
                    console.log(response)
                    setErrorNotification(`Note ${newName} has already been removed from server`)
                    setTimeout(() => {
                        setErrorNotification('')
                    }, 5000)
                    // alert(`${response.message}`)
                })

            }
            return;
        }

        personServices.create({ name: newName, number: newNumber, setNotificationMessage }).then(data => {
            setPersons(persons.concat(data));

            setNotificationMessage(`Added ${newName}`)
            setTimeout(() => {
                setNotificationMessage('')
            }, 5000)
        });

        setNewName('');
        setNewNumber('');
    }

    return (
        <>
            <h2>add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
                </div>
                <div>number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )

}
const Filter = ({ filterPerson }) => {

    return (
        <div><input onChange={filterPerson} /></div>
    )
}


const Persons = ({ persons, setPersons }) => {
    const deletePerson = id => {
        console.log(`delete person with id ${id}`)
        if (window.confirm(`Delete ${persons.find(x => x.id === id).name} ?`)) {
            personServices.deletePerson(id).then(statusText => {
                personServices.getAll().then(data => {
                    setPersons(data);
                })
            }).catch(response => {
                console.log(response)
                alert(`${response.message}`)
            });
        }
    }
    return (
        persons.map(person => <div key={person.name}>{person.name} {person.number}
                              <button onClick={() => deletePerson(person.id)}>delete</button></div>)
    )
}
const App = () => {

    const [persons, setPersons] = useState([])
    const [notificationMessage, setNotificationMessage] = useState('');
    const [errorNotification, setErrorNotification] = useState('');
    console.log('rendering component with persons as: ', persons)
    useEffect(() => {
        console.log('fetching persons');
        personServices.getAll()
            .then(persons => {
                setPersons(persons);
                console.log('Received data');
            })
    }, [])

    const filterPerson = (event) => {
        if (event.target.value === '') {
            axios
                .get("http://localhost:3001/persons")
                .then(response => {
                    setPersons(response.data);
                    console.log('Received data');
                })
        }
        setPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())));
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} />
            <ErrorNotification  message={errorNotification} />
            <Filter filterPerson={filterPerson} />
            <PersonForm persons={persons} setPersons={setPersons} setNotificationMessage={setNotificationMessage}
                        setErrorNotification={setErrorNotification}/>
            <h2>Numbers</h2>
            <Persons persons={persons} setPersons={setPersons} />
        </div>
    )
}

export default App
