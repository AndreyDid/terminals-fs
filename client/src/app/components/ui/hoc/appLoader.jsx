import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getDataStatus, getIsLoggedIn, getTerminalLoadingStatus, loadTerminalList} from "../../../store/terminals";
import {getBodyLoadingStatus, loadBodyList} from "../../../store/body";
import {getWorkLoadingStatus, loadWorkList} from "../../../store/works";
import {getExtraWorkLoadingStatus, loadExtraWorkList} from "../../../store/extraWorks";
import Loader from "../../common/loader";
import {getInfoLoadingStatus, loadInfoList} from "../../../store/info";
import {getUsersLoadingStatus, loadUsersList} from "../../../store/user";
import {getSettingLoadingStatus, loadSettingList} from "../../../store/settings";

const AppLoader = ({children}) => {
    const dispatch = useDispatch()
    const terminalStatusLoading = useSelector(getTerminalLoadingStatus())
    const userStatusLoading = useSelector(getUsersLoadingStatus())
    const bodyStatusLoading = useSelector(getBodyLoadingStatus())
    const workStatusLoading = useSelector(getWorkLoadingStatus())
    const extraWorkStatusLoading = useSelector(getExtraWorkLoadingStatus())
    const infoStatusLoading = useSelector(getInfoLoadingStatus())
    const settingStatusLoading = useSelector(getSettingLoadingStatus())
    const isLoggedIn = useSelector(getIsLoggedIn())
    const dataStatus = useSelector(getDataStatus());

    useEffect(() => {
        if (isLoggedIn && !dataStatus) {
            dispatch(loadTerminalList())
            dispatch(loadUsersList())
            dispatch(loadBodyList())
            dispatch(loadWorkList())
            dispatch(loadExtraWorkList())
            dispatch(loadInfoList())
            dispatch((loadSettingList()))
        }
    }, [isLoggedIn])

    if (terminalStatusLoading &&
        settingStatusLoading
    ) return <Loader/>
    return children
}

export default AppLoader