import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsersList } from "../../../store/user";
import PropTypes from "prop-types";
import useTerminals from "../../../hooks/useTerminals";

const UserLoader = ({ children }) => {
    const { dispatch } = useTerminals()
    useEffect(() => {
        dispatch(loadUsersList());
    }, []);
    return children;
};
UserLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default UserLoader;
