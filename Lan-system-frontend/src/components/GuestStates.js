import { Breadcrumb } from "react-bootstrap"



const States = ({guests}) =>{
    const countedStates = guests.reduce((allStates, guest) => {
        const currentAmount = allStates[guest.status] ?? 0
        return {
          ...allStates,
          [guest.status]: currentAmount + 1,
        }
      }, {})

    return(
        <div className="mt-2">
        <Breadcrumb>
            <Breadcrumb.Item active>Odottaa {countedStates.odottaa ?? 0}</Breadcrumb.Item>
            <Breadcrumb.Item active>Maksettu {countedStates.maksettu ?? 0}</Breadcrumb.Item>
            <Breadcrumb.Item active>Jonossa {countedStates.jonossa ?? 0}</Breadcrumb.Item>
            <Breadcrumb.Item active>Hylätty {countedStates.hylätty ?? 0}</Breadcrumb.Item>
            <Breadcrumb.Item active>Töissä {countedStates.töissä ?? 0}</Breadcrumb.Item>
        </Breadcrumb>
        </div>
    )
}

export default States
