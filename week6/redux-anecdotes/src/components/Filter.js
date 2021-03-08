import React, { useState } from 'react'
import { connect } from 'react-redux'
import { changeFilter } from './../reducers/filterReducer'

const Filter = (props) => {
    const [input, setInput] = useState('')

    const handleChange = (event) => {
        event.preventDefault()
        const filter = event.target.value
        event.target.value = ''
        props.changeFilter(filter)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input value={input} 
            onInput={event => setInput(event.target.value)} 
            type='text'  
            onChange={handleChange} />
        </div>
    )
}

// export default Filter

const mapDispatchToProps = {
    changeFilter,
  }

// const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter