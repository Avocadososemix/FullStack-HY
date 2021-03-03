const initialState = ''

export const changeNotification = (notification) => {
    return {
        type: 'NEW_NOTIFICATION',
        data: notification
    }
}

export const removeNotification = () => {
    console.log('Im removing notifications')
    return {
        type: 'REMOVE_NOTIFICATION',
        data: ''
    }
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return action.data
        default: return state
    }
}

export default notificationReducer