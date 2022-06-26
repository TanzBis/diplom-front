import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {QuizzesApi, ThemesApi} from "../../api/api";

const [question, setQuestion] = useState('')
const {userId} = useContext(AuthContext)
const [quizzes, setQuizzes] = useState([])
const [themes, setThemes] = useState([])
//важный момент обрати внимание

useEffect(  () => {
    const getQuizzes = async () => {
        try {
            const response = await QuizzesApi.getQuizzes();
            setQuizzes(response.data);
        } catch (error){
            console.log(error)
        }
    };



    getQuizzes();
}, []);

const createQuiz = () => {};
const removeQuiz = () => {};

// const createQuiz = useCallback(async () => {
//         if(!question) return null
//         try {
//             await axios.post('/api/quiz/add', {question, userId}, {
//                 headers: {'Content-Type': 'application/json'}
//             })
//                 .then((response) => {
//                     setQuizzes([...quizzes, response.data])
//                     setQuestion('')
//                     getQuiz()
//                 })
//         } catch (error) {
//             console.log(error)
//         }
//     }, [question, userId, quizzes, getQuiz()]
// )

// const removeQuiz = useCallback(async (id) => {
//         try{
//             await axios.delete(`/api/quiz/delete/${id}`, {id}, {
//                 headers: {'Content-Type': 'application/json'}
//             })
//                 .then(()=> getQuiz())
//         }catch (e) {
//             console.log(e);
//         }
// }, [getQuiz()])