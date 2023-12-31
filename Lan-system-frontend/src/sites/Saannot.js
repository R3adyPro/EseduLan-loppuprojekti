import { Image } from "react-bootstrap"
import SideBar from "../components/RulesSideBar"
import RulesText from "../components/RulesText"
import LanLogo from '../logos/EseduLAN_logo_white_muutettu.png'
import UpButton from "../components/UpButton"

const Saannot = () =>{
    return(
        <div className="rulesPage">
            <h1 className="text-center">SÄÄNNÖT</h1>
            <br></br>
            <div className="rules">
                <div className="navigation">
                    <SideBar></SideBar>
                </div>
                <div className="rules">
                    <RulesText></RulesText>
                </div>   
            </div>
            <br></br>
            <div className="rules-page-logo">
                <Image src={LanLogo} alt="lanLogo" />
            </div>
            <div>
                <UpButton/>
            </div>
        </div>
    )
}

export default Saannot