import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/user";
import NavProfile from "./navProfile";

const NavBar = () => {
    // const isLoggedIn = useSelector(getIsLoggedIn());
    const isLoggedIn = true;
    return (
        <div className="bg-light shadow-sm">
            <div className="container d-flex justify-content-between align-items-center navbar-text">
                <div>
                    {isLoggedIn && (
                        <ul className="nav ">
                            <li className="nav-item">
                                <Link
                                    className="nav-link "
                                    aria-current="page"
                                    to={"/"}
                                >
                                    Главная
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link "
                                    aria-current="page"
                                    to={"/infoPage"}
                                >
                                    Информация
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
                <div>{isLoggedIn ? <NavProfile /> : <Link className='btn btn-light btn-sm border' to={'/login'}>Войти</Link>}</div>
            </div>
        </div>
    );
};

export default NavBar;
