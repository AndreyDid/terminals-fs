import React, {useState} from "react";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import {getCurrentUserData, getUsersList} from "../../store/user";

const NavProfile = () => {
    // const currentUser = useSelector(getUsersList());
    // console.log(currentUser)
    const currentUser = {name: 'Андрей Диденко'};
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    if (!currentUser) return "Loading";
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                {currentUser.img ? (
                    <img
                        src={currentUser.image}
                        alt="img"
                        height="40"
                        className="img-responsive rounded-circle"
                    />

                ) : (
                    <div className='d-flex rounded-circle bg-secondary justify-content-center align-items-center' style={{height: 40, width: 40}}>
                        <h3 className='m-0 p-0 text-light'>{currentUser.name[0]}</h3>
                    </div>
                )}
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link
                    className="dropdown-item"
                    to={`/user/${currentUser._id}/edit`}
                >
                    Настройки
                </Link>
                <Link className="dropdown-item" to="/logout">
                    Выход
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
