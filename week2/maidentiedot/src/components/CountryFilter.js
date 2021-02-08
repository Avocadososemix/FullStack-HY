import React from 'react'
import Country from './Country'

const CountryFilter = ({ countries: countries, newFilter, showAll }) => {
console.log('hei')
    const countriesToShow = !showAll
        ? countries
        : countries.filter(country => (country.name.toLowerCase().includes(newFilter.toLowerCase())))

    return (
        <dir>
            {countriesToShow.map(country =>
                <Country key={country.name} country={country} />
            )}
        </dir>
    )
}

export default CountryFilter