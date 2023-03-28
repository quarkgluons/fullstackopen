import { useState } from 'react'

const PersonForm = ({ persons, addPerson, newName, newNumber, setNewName, setNewNumber }) => {

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
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
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

    const [search, setSearch] = useState('');
    const filterPerson = (event) => {
        setPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())));
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterPerson={filterPerson} />
            <PersonForm persons={persons} addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
            <h2>Numbers</h2>
            <Persons persons={persons} />
        </div>
    )
}

export default App
