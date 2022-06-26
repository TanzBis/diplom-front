import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import {ThemesApi} from "../../api/api";
import styles from './AddTheme.module.sass';
import Form from './Form';
import {NavLink} from "react-router-dom";


const AddTheme = (props) => {
    const [themes, setThemes] = useState([]);

    const getThemes = async () => {
        const {data} = await ThemesApi.getThemes();
        setThemes(data);
    };


    useEffect(() => {
        getThemes();
    }, []);

    return (
        <>
            <Form getThemes={getThemes}/>

            {themes.map(theme => (
                <NavLink
                    key={theme._id} to={`/themes/${theme.slug}/add-quiz`}
                    className={styles.themeLink}
                    state={{themeId: theme._id, themeName: theme.name}}
                >
                    <Button>{theme.name}</Button>
                    <img src={theme.picture} alt='profile-pic'/>
                </NavLink>
            ))}
        </>
    )
};

export default AddTheme;