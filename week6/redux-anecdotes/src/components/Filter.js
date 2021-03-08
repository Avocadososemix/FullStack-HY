import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeFilter } from './../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState('')

    const handleChange = (event) => {
        event.preventDefault()
        const filter = event.target.value
        event.target.value = ''
        dispatch(changeFilter(filter))
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

export default Filter

// const ConnectedFilter = connect(mapStateToProps)(Filter)

// export default ConnectedFilter