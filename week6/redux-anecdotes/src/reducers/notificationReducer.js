const initialState = ''

export const setNotification = (notification, fadeout ) => {
    return async (dispatch) => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            data: notification
        })
        setTimeout(() => {
            dispatch(removeNotification())
        }, fadeout * 1000)
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
        data: ""
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