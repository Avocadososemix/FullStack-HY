const initialState = ''

export const changeFilter = (filter) => {
    return {
        type: 'NEW_FILTER',
        data: filter
    }
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_FILTER':
            return action.data
        default: return state
    }
}

export default filterReducer