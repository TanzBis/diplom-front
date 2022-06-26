import './App.sass';
import Navbar from './components/Navbar/Navbar.jsx'
import {AuthContext} from './context/AuthContext'
import {QueryClient, QueryClientProvider} from 'react-query'
import {useAuth} from './hooks/auth.hook'
import {Route, Routes} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import React from "react";
import MainPage from "./components/MainPage/MainPage";
import AddQuiz from "./components/QuizPage/AddQuiz";
import AddTheme from "./components/Theme/AddTheme";
import Protected from "./components/Auth/Protected";
import Themes from "./components/Theme/Themes";
import Quizzes from "./components/QuizPage/Quizzes";
import {StyledEngineProvider} from "@mui/material";

function App() {
    const {login, logout, token, userId, roles, isLogin} = useAuth()

    const queryClient = new QueryClient();

    return (
        <StyledEngineProvider injectFirst>
            <QueryClientProvider client={queryClient}>
                <AuthContext.Provider value={{login, logout, token, userId, roles, isLogin}}>
                    <Navbar/>
                    <div className='app-container'>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/registration" element={<Auth/>}/>
                            <Route path="/login" element={<Auth/>}/>
                            <Route path='/themes' element={
                                <Protected roles={['ADMIN', 'USER']}>
                                    <Themes/>
                                </Protected>
                            }/>
                            <Route path='themes/add-theme' element={
                                <Protected roles={['ADMIN']}>
                                    <AddTheme/>
                                </Protected>
                            }/>
                            <Route path='/themes/:slug' element={
                                <Protected roles={['ADMIN', 'USER']}>
                                    <Quizzes/>
                                </Protected>
                            }/>
                            <Route path='themes/:slug/add-quiz' element={
                                <Protected roles={['ADMIN']}>
                                    <AddQuiz/>
                                </Protected>
                            }/>
                        </Routes>
                    </div>
                </AuthContext.Provider>
            </QueryClientProvider>
        </StyledEngineProvider>
    )
}

export default App
 