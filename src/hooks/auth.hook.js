import {useCallback, useEffect, useState} from 'react'

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [roles, setRoles] = useState([]);
    const [isLogin, setIsLogin] = useState(false);

    const login = useCallback((jwtToken, id, roles) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            token: jwtToken,
            roles
        }));
        setRoles(roles);
        setIsLogin(true);
    }, [])

    const logout = () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userData');
        setRoles([]);
        setIsLogin(false);
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'));

        if (data && data.token) {
            login(data.token, data.userId, data.roles)
        }
    }, [login])

    return {login, logout, token, userId, roles, isLogin}
}