import axios from 'axios'
import { useState, useEffect } from 'react'

import personServices from './services/persons';

const PersonForm = ({ persons, setPersons }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('');
    const addPerson = (event) => {
        event.preventDefault();
        let personExist = persons.find(person => person.name === newName);
        if (personExist !== undefined) {
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personServices.update({ ...personExist, number: newNumber }).then(data => {
                    setPersons(persons.map(person => person.id !== data.id ? person : data));
                }).catch(response => {
                    console.log(response)
                    alert(`${response.message}`)
                })
    
            }
            return;
        }

        personServices.create({ name: newName, number: newNumber }).then(data => {
            setPersons(persons.concat(data));    
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
        if(window.confirm(`Delete ${persons.find(x => x.id === id).name} ?`)) {
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
            <Filter filterPerson={filterPerson} />
            <PersonForm persons={persons} setPersons={setPersons} />
            <h2>Numbers</h2>
            <Persons persons={persons} setPersons={setPersons}/>
        </div>
    )
}

export default App
