import {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {getIntersection} from "../../utils";


const Protected = ({ children, roles }) => {
    const user = useContext(AuthContext);
    const location = useLocation();

    if (!user.isLogin) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    if(roles && getIntersection(roles, user.roles).length !== 0) {
        return children;
    }

    return <Navigate to="/" replace/>;
};

export default Protected;
