import React, {useContext} from 'react'
import styles from './Navbar.module.sass';
import {AuthContext} from "../../context/AuthContext";
import {NavLink} from "react-router-dom";
import DropDownMenu from "./DropDawnMenu";
import {Button} from "@mui/material";

const Navbar = () => {
    const {logout, roles, isLogin} = useContext(AuthContext);

    return (
        <nav>
            <div className={styles.navbar}>
                <a href='/' className={styles.brandLogo}>Learn Chechen</a>
                {isLogin
                    ? <DropDownMenu logout={logout} roles={roles}/>
                    : <NavLink to='/login' className={styles.loginLink}>
                        <Button className={styles.loginBtn}>Войти</Button>
                    </NavLink>
                }
            </div>
        </nav>
    )
}

export default Navbar