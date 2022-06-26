import * as yup from 'yup';
import {useFormik} from "formik";
import {Button, IconButton, TextField} from "@mui/material";
import styles from './AddTheme.module.sass'
import {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";
import {ThemesApi} from "../../api/api";
import {AddPhotoAlternateRounded} from "@mui/icons-material";

const Form = ({getThemes}) => {
    const {userId} = useContext(AuthContext);

    const initialValues = {
        name: '',
        picture: ''
    };

    const onSubmit = async (values, actions) => {
        try {
            const response = await ThemesApi.createTheme(values, userId);
            actions.resetForm();

            getThemes();
        } catch (err) {
            console.log()
        }
    };

    const validationSchema = yup.object({
        name: yup.string().required('Введите тему')
    });

    const formik = useFormik({initialValues, onSubmit, validationSchema});

    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <TextField
                    className={styles.input}
                    id="name"
                    name="name"
                    label="тема"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <label>
                    <input
                        name="picture"
                        onChange={e => formik.setFieldValue('picture', e.currentTarget.files[0])}
                        accept="image/*"
                        type="file"
                        hidden
                    />
                    <IconButton component="span">
                        <AddPhotoAlternateRounded
                            fontSize='large'
                            color={formik.values.picture ? 'success' : 'primary'}
                        />
                    </IconButton>
                </label>
            </div>

            <Button type='submit' variant='contained'>Добавить тему</Button>
        </form>

    );
}

export default Form;