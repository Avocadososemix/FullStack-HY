const initialState = ''

// const timeOutId = (dispatch, fadeout) => {
//     clearTimeout(timeOutId)
//     setTimeout(() => {
//         dispatch(removeNotification())
//     }, fadeout * 1000)
// }

let timeOutID = null

// useEffect(() => {
//     const timer = setTimeout(props.onClose, 4000)
//     return () => clearTimeout(timer) }, []) 

export const setNotification = (notification, fadeout ) => {
    return async (dispatch) => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            data: notification
        })
        clearTimeout(timeOutID)
        timeOutID = setTimeout(() => {
            dispatch(removeNotification())
        }, fadeout * 1000)
        console.log('timeoutID ', timeOutID)
        // timeOutID = setTimeout(
        //     dispatch(removeNotification(), fadeout * 1000))
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