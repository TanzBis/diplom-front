import React, {useContext} from 'react'
import './MainPage.sass'
import {AuthContext} from "../../context/AuthContext";

export default function MainPage() {

    const {roles} = useContext(AuthContext);

    return (
        <div className="container">
            <img className="img" src={roles.includes('ADMIN') ? 'https://i.pinimg.com/originals/5b/83/ef/5b83ef5ba73ca499f556bce1859dd9ab.gif' : 'https://cdn.dribbble.com/users/3050354/screenshots/14646894/media/1f31948afd5401c44d4bae934f07641a.gif'}/>

            <h1 className="greet">Добро пожаловать {roles.includes('ADMIN') ? "Админ" : 'Студент'}!</h1>
        </div>
    )
}

