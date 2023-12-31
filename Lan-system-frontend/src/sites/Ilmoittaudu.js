import RegistrationForm from "../components/RegistrationForm"
import Notification from "../components/notification"

const Ilmoittaudu = () =>{
    return(
        <div className="form-page">
            <h1 className='page-text'>Ilmoittaudu</h1>
            <Notification /> 
            <RegistrationForm />
        </div>
    )
}

export default Ilmoittaudu