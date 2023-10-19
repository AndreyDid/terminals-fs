import React from "react";
import {useSelector} from "react-redux";
import {getTerminalById} from "../../store/terminals";
import {getBodyById} from "../../store/body";
import useTerminals from "../../hooks/useTerminals";


const TerminalInfo = () => {
    const {params} = useTerminals()

    const {id} = params

    const currentTerminal = useSelector(getTerminalById(id))

    const currentBody = useSelector(getBodyById(currentTerminal.body))
    return (
        <div>Terminal {id} </div>
    )
}

export default TerminalInfo