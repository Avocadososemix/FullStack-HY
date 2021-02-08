import React from 'react'
import Person from './Person'

const PersonFilter = ({ persons, newFilter, deletePerson }) => {

    console.log('tyypit', persons)
    const personsToShow =
    persons.filter(person => 
        person.name.toLowerCase().includes(newFilter.toLowerCase()))
    
    // const personsToShow = !showAll
    //     ? persons
    //     : persons.filter(person => (person.name.toLowerCase().includes(newFilter.toLowerCase())))

    return (
        <dir>
            {personsToShow.map(person =>
                <Person key={person.name} person={person} deletePerson={deletePerson}/>
            )}
        </dir>
    )
}

export default PersonFilter