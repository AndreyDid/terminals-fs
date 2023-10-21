import React from "react";
import classes from "./works.module.css";
import history from "../../../utils/history";
import PropTypes from "prop-types";

const Work = ({name, sum, _id, isLoggedIn}) => {

    const handleClick = (id) => {
        // history.push(history.location.pathname + `/${id}/editWork`)
        !isLoggedIn && history.push(history.location.pathname + `${id}/editWork`)
    }
    return (
        <button className={classes.work} onClick={() => handleClick(_id)}>
            {name}
            {name !== 'Без доработок'
                && <span className={classes.workSum}>{sum}</span>}
        </button>
    )
}
Work.propTypes = {
    name: PropTypes.string,
    sum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _id: PropTypes.string
}

export default React.memo(Work)