const NotificationMessage = ({ notificationMessage, errorHappened }) => {

    if (notificationMessage === null) {
        return null
    }

    else if (errorHappened) {
        return (
            <div className="error_red">
                {notificationMessage}
            </div>
        )
    }

    else {
        return (
            <div className="notification_green">
                {notificationMessage}
            </div>
        )
    }
}

export default NotificationMessage