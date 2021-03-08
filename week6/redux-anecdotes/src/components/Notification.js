import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(state => state.notification)
  // const notificationToShow = () => {
  //   return props.notification
  // }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

// export default Notification
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification