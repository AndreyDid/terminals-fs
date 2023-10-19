import React from "react";
import TerminalsTable from "../ui/terminasTable";
import {useSelector} from "react-redux";
import {getTerminal, getTerminalLoadingStatus} from "../../store/terminals";
import {getExtraWork, getExtraWorkLoadingStatus} from "../../store/extraWorks";
import {getSetting, getSettingLoadingStatus} from "../../store/settings";
import {getBodyLoadingStatus} from "../../store/body";

const TerminalsListPage = () => {
    const terminals = useSelector(getTerminal())
    const extraWorks = useSelector(getExtraWork())
    const terminalsLoading = useSelector(getTerminalLoadingStatus())
    const extraWorkLoading = useSelector(getExtraWorkLoadingStatus())
    const settingLoading = useSelector(getSettingLoadingStatus())
    const bodyLoading = useSelector(getBodyLoadingStatus())
    return (
        <>
            {!terminalsLoading && !extraWorkLoading && terminals && extraWorks && !settingLoading && !bodyLoading &&(
                <div>
                    <TerminalsTable terminals={terminals} extraWorks={extraWorks}/>
                </div>
            )}
        </>
    )

}
export default TerminalsListPage