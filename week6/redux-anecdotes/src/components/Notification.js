import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeNotification } from './../reducers/notificationReducer'

const Notification = () => {
  const [show, setShow] = useState(false)
  const notification = useSelector(state => state.notification)
  // console.log('notifi:', notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  useEffect(() => {
    console.log('notifi:', notification)
    if (notification.length > 0) {
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000)
    }
  }, {notification})

  if (notification === '' || show === false) {
    return (
      <div>
        <br></br><br></br>
      </div>
    )
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification