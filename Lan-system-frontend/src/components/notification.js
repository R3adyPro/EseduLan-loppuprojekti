import { useLayoutEffect, useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useSelector } from "react-redux"

const Notification = () => {
    const [show, setShow] = useState(false)
    const notification = useSelector(state => state.notification)
    
    const firstUpdate = useRef(true)
    useLayoutEffect(() => { //estää ilmoituksen kun sivulle tulee ensimmäistä kertaa
        if(firstUpdate.current){
            firstUpdate.current = false
            return
        }
        setShow(true)
        setTimeout(() => {
            setShow(false)
        }, 5000)
    }, [notification])

    if(show){
        if(notification.warning === false){
            return (
                <div className="text-center">
                    <Alert className="custom-alert" variant="success">
                        {notification.message}
                    </Alert>
                </div>
            )
        }
        else if (notification.warning === true){
            return (
                <div className="text-center">
                    <Alert className="custom-alert" variant="danger">
                        {notification.message}
                    </Alert>
                </div>
            )
        }
    }
}

export default Notification