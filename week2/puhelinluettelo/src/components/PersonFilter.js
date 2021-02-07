import React from 'react'
import Person from './Person'

const PersonFilter = ({ persons, newFilter, showAll }) => {

    const personsToShow = !showAll
        ? persons
        : persons.filter(person => (person.name.toLowerCase().includes(newFilter.toLowerCase())))

    return (
        <dir>
            {personsToShow.map(person =>
                <Person key={person.name} person={person} />
            )}
        </dir>
    )
}

export default PersonFilter