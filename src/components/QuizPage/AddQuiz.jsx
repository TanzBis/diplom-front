import {useFormik} from "formik";
import {Button, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import styles from './AddQuiz.module.sass'
import {useParams} from "react-router-dom";
import {QuizzesApi, ThemesApi} from "../../api/api";
import {AddPhotoAlternateRounded, AudioFileRounded} from "@mui/icons-material";
import {useQuery} from "react-query";
import * as yup from "yup";

const AddQuiz = (props) => {
    const {slug} = useParams();
    const {isLoading, isError, data, error} = useQuery(["theme", slug], () => ThemesApi.getThemeBySlug(slug));

    const initialValues = {
        question: '',
        correctAnswer: '',
        option1: '', audio1: '', picture1: '',
        option2: '', audio2: '', picture2: '',
        option3: '', audio3: '', picture3: '',
        option4: '', audio4: '', picture4: '',
    };

    const onSubmit = async (values, actions) => {
        try {
            console.log(values);
            const response = await QuizzesApi.createQuiz({...values, themeId: theme._id});
            actions.resetForm();
        } catch (err) {
            console.log();
        }
    };

    const validationSchema = yup.object({
        question: yup.string().required('Введите текст вопроса'),
        option1: yup.string().required('Введите вариант ответа'),
        option2: yup.string().required('Введите вариант ответа'),
        option3: yup.string().required('Введите вариант ответа'),
        option4: yup.string().required('Введите вариант ответа'),
        correctAnswer: yup.string().required('Выберите правильный вариант ответа')
    });

    const formik = useFormik({initialValues, onSubmit, validationSchema});

    if (isLoading) return <p>Идет загрузка данных</p>
    if (isError) return <p>Возникла ошибка при получении данных</p>
    if (!data) return null;

    const theme = data.data;

    return (

        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <h2 className={styles.title}>{theme.name}</h2>
            <TextField
                className={styles.question}
                name="question"
                label="вопрос"
                value={formik.values.question}
                onChange={formik.handleChange}
                error={formik.touched.question && Boolean(formik.errors.question)}
                helperText={formik.touched.question && formik.errors.question}
            />

            <div className={styles.fieldGroup}>
                <TextField
                    className={styles.input}
                    name="option1"
                    label="вариант 1"
                    value={formik.values.option1}
                    onChange={formik.handleChange}
                    error={formik.touched.option1 && Boolean(formik.errors.option1)}
                    helperText={formik.touched.option1 && formik.errors.option1}
                />
                <label>
                    <input
                        name="picture1"
                        onChange={e => formik.setFieldValue('picture1', e.currentTarget.files[0])}
                        accept="image/*"
                        type="file"
                        hidden
                    />
                    <IconButton tabIndex={-1} color="primary" aria-label="upload picture" component="span">
                        <AddPhotoAlternateRounded color={formik.values.picture1 ? 'success' : 'primary'}/>
                    </IconButton>
                </label>
                <label>
                    <input
                        name='audio1'
                        onChange={e => formik.setFieldValue('audio1', e.currentTarget.files[0])}
                        accept="audio/*"
                        type="file"
                        hidden
                    />
                    <IconButton tabIndex={-1} color="primary" aria-label="upload picture" component="span">
                        <AudioFileRounded color={formik.values.audio1 ? 'success' : 'primary'}/>
                    </IconButton>
                </label>
            </div>

            <div className={styles.fieldGroup}>
                <TextField
                    className={styles.input}
                    name="option2"
                    label="вариант 2"
                    value={formik.values.option2}
                    onChange={formik.handleChange}
                    error={formik.touched.option2 && Boolean(formik.errors.option2)}
                    helperText={formik.touched.option2 && formik.errors.option2}
                />
                <label>
                    <input
                        name="picture2"
                        onChange={e => formik.setFieldValue('picture2', e.currentTarget.files[0])}
                        accept="image/*"
                        type="file"
                        hidden
                    />
                    <IconButton tabIndex={-1} color="primary" aria-label="upload picture" component="span">
                        <AddPhotoAlternateRounded color={formik.values.picture2 ? 'success' : 'primary'}/>
                    </IconButton>
                </label>
                <label>
                    <input
                        name='audio2'
                        onChange={e => formik.setFieldValue('audio2', e.currentTarget.files[0])}
                        accept="audio/*"
                        type="file"
                        hidden
                    />
                    <IconButton tabIndex={-1} color="primary" aria-label="upload picture" component="span">
                        <AudioFileRounded color={formik.values.audio2 ? 'success' : 'primary'}/>
                    </IconButton>
                </label>
            </div>

            <div className={styles.fieldGroup}>
                <TextField
                    className={styles.input}
                    name="option3"
                    label="вариант 3"
                    value={formik.values.option3}
                    onChange={formik.handleChange}
                    error={formik.touched.option3 && Boolean(formik.errors.option3)}
                    helperText={formik.touched.option3 && formik.errors.option3}
                />
                <label>
                    <input
                        name="picture3"
                        onChange={e => formik.setFieldValue('picture3', e.currentTarget.files[0])}
                        accept="image/*"
                        type="file"
                        hidden
                    />
                    <IconButton tabIndex={-1} color="primary" aria-label="upload picture" component="span">
                        <AddPhotoAlternateRounded color={formik.values.picture3 ? 'success' : 'primary'}/>
                    </IconButton>
                </label>
                <label>
                    <input
                        name='audio3'
                        onChange={e => formik.setFieldValue('audio3', e.currentTarget.files[0])}
                        accept="audio/*"
                        type="file"
                        hidden
                    />
                    <IconButton tabIndex={-1} color="primary" aria-label="upload picture" component="span">
                        <AudioFileRounded color={formik.values.audio3 ? 'success' : 'primary'}/>
                    </IconButton>
                </label>
            </div>

            <div className={styles.fieldGroup}>
                <TextField
                    className={styles.input}
                    name="option4"
                    label="вариант 4"
                    value={formik.values.option4}
                    onChange={formik.handleChange}
                    error={formik.touched.option4 && Boolean(formik.errors.option4)}
                    helperText={formik.touched.option4 && formik.errors.option4}
                />
                <label>
                    <input
                        name="picture4"
                        onChange={e => formik.setFieldValue('picture4', e.currentTarget.files[0])}
                        accept="image/*"
                        type="file"
                        hidden
                    />
                    <IconButton tabIndex={-1} color="primary" aria-label="upload picture" component="span">
                        <AddPhotoAlternateRounded color={formik.values.picture4 ? 'success' : 'primary'}/>
                    </IconButton>
                </label>
                <label>
                    <input
                        name='audio4'
                        onChange={e => formik.setFieldValue('audio4', e.currentTarget.files[0])}
                        accept="audio/*"
                        type="file"
                        hidden
                    />
                    <IconButton tabIndex={-1} color="primary" aria-label="upload picture" component="span">
                        <AudioFileRounded color={formik.values.audio4 ? 'success' : 'primary'}/>
                    </IconButton>
                </label>
            </div>
            <FormControl className={styles.select}>
                <InputLabel id="demo-simple-select-label">Правильный ответ</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.correctAnswer}
                    label="Правильный ответ"
                    name='correctAnswer'
                    onChange={formik.handleChange}
                >
                    <MenuItem value={1}>Вариант 1</MenuItem>
                    <MenuItem value={2}>Вариант 2</MenuItem>
                    <MenuItem value={3}>Вариант 3</MenuItem>
                    <MenuItem value={4}>Вариант 4</MenuItem>
                </Select>
                {formik.errors.correctAnswer && <FormHelperText error>{formik.errors.correctAnswer}</FormHelperText>}
            </FormControl>

            <Button className={styles.button} type='submit' variant='contained'>Добавить квиз</Button>
        </form>

    );
};

export default AddQuiz;