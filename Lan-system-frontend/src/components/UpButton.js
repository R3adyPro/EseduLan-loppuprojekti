import { useState } from "react"
import { Button } from "react-bootstrap"
import {FaAngleUp} from 'react-icons/fa';

const UpButton = () => { //nappi joka rullaa sivun ylös
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scroll = document.documentElement.scrollTop
        if (scroll > 300){
            setVisible(true)
        }else if (scroll <= 300){
            setVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    window.addEventListener('scroll', toggleVisible)

    return (
        <div>
            <Button className="up-button ml-auto" variant="link" >
                <FaAngleUp onClick={scrollToTop}/>
            </Button>
        </div>
    )
}

export default UpButton