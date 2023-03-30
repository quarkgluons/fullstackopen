import axios from 'axios'
import { useState, useEffect } from 'react'

const PersonForm = ({ persons, setPersons }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('');
    const addPerson = (event) => {
        event.preventDefault();
        if (persons.filter(person => person.name === newName).length > 0) {
            alert(`${newName} is already added to phonebook`);
            return;
        }
        setPersons(persons.concat({ name: newName, number: newNumber }));
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
const Persons = ({ persons }) => {
    return (
        persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
    )
}
const App = () => {

    const [persons, setPersons] = useState([])
    console.log('rendering component with persons as: ', persons)
    useEffect(() => {
        console.log('fetching persons');
        axios
            .get("http://localhost:3001/persons")
            .then(response => {
                setPersons(response.data);
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
            <Persons persons={persons} />
        </div>
    )
}

export default App
