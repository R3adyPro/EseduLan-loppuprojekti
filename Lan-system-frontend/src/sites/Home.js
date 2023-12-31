import LanLogo from '../logos/EseduLAN_logo_white_muutettu.png'
import eseduLogo from '../logos/transparentLogo_100.png'
import { Image } from "react-bootstrap"
import lanService from "../services/lan"
import { useEffect, useState } from 'react'

const Home = () =>{
    const [lan, setLan] = useState(null)
   
    useEffect(() => {   
        const settingLan = async() =>{
            const lanInfo = await lanService.getLan()
            setLan(lanInfo[0])  //hakee tiedon lanista databasesta ja asettaa sen 'lan' olioon
        }
        settingLan()
      }, [])

    const formattedDate = ()=>{   
        const alku = new Date(lan.Alku)
        const loppu = new Date(lan.Loppu)
        const formattedAlku = `${alku.getDate()}.${alku.getMonth() + 1}. klo ${alku.getHours().toString().padStart(2, '0')}:${alku.getMinutes().toString().padStart(2, '0')}` //muotoillaan aika haluttuun muotoon (00:00) 
        const formattedLoppu = `${loppu.getDate()}.${loppu.getMonth() + 1}. klo ${loppu.getHours().toString().padStart(2, '0')}:${loppu.getMinutes().toString().padStart(2, '0')}` //muotoillaan aika haluttuun muotoon (00:00)
        return `${formattedAlku} - ${formattedLoppu}` //palauttaa alkamis aika - loppumis aika
    }

    return(
        <div  className="home">
            <h1 className='esedu-lan-text'>Esedu LAN 2023</h1>
            <p className='home-page-text'>
                Paikka: {lan && lan.Osoite}<br></br>      
                Aika: {lan && formattedDate()}<br></br>
                Osallistumismaksu: {lan && lan.Maksu}€<br></br>
                Ikäraja: {lan && lan.Ikäraja}<br></br>
                Konepaikka: {lan && lan.Tila}<br></br>
                {lan && lan.Koneet} konepaikkaa<br></br>
                Osallistua voi myös konsolilla<br></br>
                Päihteetön tapahtuma
            </p>
            <div className="center-logo">
                <div className='lan-logo'>
                    <Image src={LanLogo} alt="lanLogo"/>
                </div>
                <div className='esedu-logo'>
                    <Image src={eseduLogo} alt='eseduLogo'/>
                </div>
            </div>
        </div>
    )
}

export default Home