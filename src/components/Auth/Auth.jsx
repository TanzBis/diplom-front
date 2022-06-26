import React, {useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {AuthApi} from "../../api/api";
import * as yup from 'yup';
import {useFormik} from "formik";
import {Button, TextField} from "@mui/material";
import styles from "./Auth.module.sass";
import {Navigate, NavLink, useLocation} from 'react-router-dom';

export default function Auth() {
    const location = useLocation();
    let { pathname } = location;
    let from = location.state?.from?.pathname || "/";

    pathname = pathname.replace('/', '');

    const {login, isLogin} = useContext(AuthContext);

    const initialValues = {
        email: '',
        password: ''
    };

    const onSubmit = async (values, actions) => {
        try {
            const response = pathname === 'login' ? await AuthApi.login(values) : await AuthApi.registration(values);
            const { token, userId, roles } = response.data;

            login(token, userId, roles);
        } catch (err) {
            const errorMessage = err.response.data.message;
            actions.setStatus(errorMessage);
        }
    };

    const validationSchema = yup.object({
        email: yup.string().required('Введите email').email('Вы ввели невалидный email'),
        password: yup.string().required('Введите пароль').min(8, 'Вы ввели короткий пароль'),
    });


    const formik = useFormik({initialValues, onSubmit, validationSchema});

    if (isLogin) {
        return <Navigate to={from} replace/>
    }

    return (
        <form onSubmit={formik.handleSubmit} className={styles.container}>
            <TextField
                className={styles.input}
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}

            />
            <TextField
                className={styles.input}
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}

            />

            {formik.status ? <p className={styles.errorMessage}>{formik.status}</p> : null}

            <Button className={styles.buttonLog} color="primary" variant="contained" fullWidth type="submit">
                {pathname === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>

            <Button>
                {pathname === 'login'
                    ? <NavLink className={styles.authLink} to='/registration'>У вас еще нет аккаунта?</NavLink>
                    : <NavLink className={styles.authLink} to='/login'>У вас уже есть аккаунт ?</NavLink>
                }
            </Button>
        </form>

    )
}

