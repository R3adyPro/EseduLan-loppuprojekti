import { useEffect, useState, useRef } from "react"



const SideBar = () =>{
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)
    const windowSize = useRef([window.innerWidth])

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset

        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10)
        setPrevScrollPos(currentScrollPos)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [prevScrollPos, visible, handleScroll])

    return(
        <div>
            {windowSize.current[0] >= 1601 && //sääntö sivun navigointi isommille laitteille
                <div className="sidebar" style={{ top: visible ? '19%' : '20%' }}>
                    <ul className="rules-ul">
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#yleista">Ylestä</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#pakkauslista">Pakkauslista</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#laitteisto">Laitteisto</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#ohjelmisto">Ohjelmisto</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#virustorjunta">Virustorjunta</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#palomuuri">Palomuuri</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#paattyminen">Päättyminen</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#kielletyt_tavarat">Kielletyt tavarat</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#paihteet">Päihteet</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#tekijanoikeudet">Tekijänoikeudet</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#musiikki">Musiikki</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#vauriot">Vauriot</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#lahiverkko">Lähiverkko</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#sopimaton_materiaali">Sopimaton materiaali</a>
                        </li>
                    </ul>
                </div>
            }

            {windowSize.current[0] <= 1600 && //sääntö sivun navigointi pienemmille laitteille
                <div className="sidebar" style={{ top: visible ? '18%' : '11%' }}>
                    <ul className="rules-ul">
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#yleista">Ylestä</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#pakkauslista">Pakkauslista</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#laitteisto">Laitteisto</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#ohjelmisto">Ohjelmisto</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#virustorjunta">Virustorjunta</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#palomuuri">Palomuuri</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#paattyminen">Päättyminen</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#kielletyt_tavarat">Kielletyt tavarat</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#paihteet">Päihteet</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#tekijanoikeudet">Tekijänoikeudet</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#musiikki">Musiikki</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#vauriot">Vauriot</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#lahiverkko">Lähiverkko</a>
                        </li>
                        <li className="rules-list">
                            <a className="custom-a" href="/saannot/#sopimaton_materiaali">Sopimaton materiaali</a>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default SideBar