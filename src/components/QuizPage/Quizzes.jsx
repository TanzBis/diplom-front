import {Alert, Box, Button, Card, CardContent, CardMedia, LinearProgress, Snackbar, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from './Quizzes.module.sass'
import {useQuery} from "react-query";
import {ThemesApi} from "../../api/api";

const Quizzes = () => {
    const {slug} = useParams();
    const {isLoading, isError, data, error} = useQuery(["theme", slug], () => ThemesApi.getThemeBySlug(slug));
    const [quizNumber, setQuizNumber] = useState(0);
    const [progress, setProgress] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('error');
    let quizzes;
    let score = 0;

    useEffect(() => {
        if (data) {
            const progress = (100 / quizzes.length) * (quizNumber + 1);
            setProgress(progress);
        }
    }, [quizNumber])

    if (isLoading) return <p>Загрузка...</p>;
    if (isError) return <p>Возникла ошибка при загрузке данных (</p>

    quizzes = data.data.quizzes;

    let currentQuiz = quizzes[quizNumber];

    return (
        <Box display='flex' sx={{fontSize: 28}} flexDirection='column' alignItems='center'>
            {quizzes.length > 0
                ? <>
                    <LinearProgress sx={{width: "70%", height: '10px', borderRadius: 2}} variant="determinate"
                                    value={progress}/>
                    <Typography className={styles.question} variant='h5' mb={2}>{currentQuiz.question}</Typography>
                    <Box className={styles.cardBox} display='flex' flexWrap='wrap'>
                        {currentQuiz.options.map(option => (
                            <Card
                                className={styles.card}
                                key={option._id}
                                onClick={() => {
                                    if (option.text === currentQuiz.correctAnswer) {
                                        score++;
                                        setAlertVariant('success');
                                    } else {
                                        setAlertVariant('error')
                                    }

                                    setOpenAlert(true);
                                }}
                            >
                                {option.picture && <CardMedia
                                    className={styles.cardImg}
                                    component='img'
                                    image={option.picture}
                                />}
                                <CardContent className={styles.content} sx={{padding: 0, paddingBottom: 0}}>
                                    <Typography className={styles.answer} gutterBottom variant="h5" component="div"
                                                textAlign='center'>
                                        {option.text}
                                    </Typography>
                                    {option.audio && <audio controls src={option.audio}></audio>}
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                    {quizNumber + 1 < quizzes.length && <Button onClick={() => setQuizNumber(quizNumber + 1)}>Следующий квиз</Button>}
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openAlert} autoHideDuration={1500} onClose={() => setOpenAlert(false)}>
                        <Alert onClose={() => setOpenAlert(false)} severity={alertVariant} sx={{ width: '100%' }}>
                            {alertVariant === 'success' ? 'Правильный ответ' : 'Неправильный ответ'}
                        </Alert>
                    </Snackbar>
                </>
                : <p>Квизы еще не добавлены</p>
            }
        </Box>
    );
};

export default Quizzes;