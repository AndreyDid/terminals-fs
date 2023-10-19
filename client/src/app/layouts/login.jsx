import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";
import ContainerFormWrapper from "../components/common/containerForm";
// import CardTitle from "../components/common/typografy/cardTitle";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <ContainerFormWrapper>
            <div>
                {formType === "register" ? (
                    <>
                        {/*<CardTitle>Регистрация</CardTitle>*/}
                        <h3>Регистрация</h3>
                        <RegisterForm />
                        <p className="container mt-2">
                            Уже есть аккаунт?{" "}
                            <a
                                role="button"
                                className="text-underline"
                                onClick={toggleFormType}
                            >
                                Вход
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        {/*<CardTitle>Вход</CardTitle>*/}
                        <h3>Вход</h3>
                        <LoginForm />
                        <p className="container mt-2">
                            Нет аккаунта?{" "}
                            <a
                                role="button"
                                className="text-underline"
                                onClick={toggleFormType}
                            >
                                Зарегистрироваться
                            </a>
                        </p>
                    </>
                )}
            </div>
        </ContainerFormWrapper>
    );
};

export default Login;
