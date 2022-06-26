import {useQuery} from "react-query";
import {ThemesApi} from "../../api/api";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import styles from "./AddTheme.module.sass";
import {NavLink} from "react-router-dom";


const Themes = props => {
    const {isLoading, isError, data, error} = useQuery('themes', ThemesApi.getThemes);

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    console.log(data.data);

    return (
        <>
            {data.data.map(theme => (
                <NavLink
                    key={theme._id} to={`/themes/${theme.slug}`}
                    className={styles.themeLink}
                >
                    <Card sx={
                        {
                            width: 395,
                            height: 135, display: 'flex',
                            margin: 'auto', marginBottom: 3,
                            boxShadow: '3px 3px 3px 3px grey',
                            alignItems: 'center'
                        }
                    }>
                        <CardMedia
                            sx={{
                                width: 130,
                                height: 120,
                                marginLeft: 1,
                            }}
                            component='img'
                            image={theme.picture}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                {theme.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </NavLink>
            ))}
        </>
    );
};

export default Themes;

