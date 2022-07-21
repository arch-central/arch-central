import { hot } from "react-hot-loader"
import { Route, Routes, useNavigate } from "react-router-dom"
import AboutPage from "./pages/AboutPage"
import ArticlePage from "./pages/ArticlePage"
import MainPage from "./pages/MainPage"
import { BsGithub } from 'react-icons/bs/index'

import './scss/global.scss'
import CreatePostPage from "./pages/CreatePostPage"

const App = () => {
    const navigate = useNavigate();
    return (
        <div id="globalRoot">
            <div id="header">
                <img src="/icon.png" onClick={() => navigate('/')}/>
                <div>
                    <span>
                        The open-source and arch centric blogpost
                    </span>
                </div>
            </div>
            <div id="nav">
                <span onClick={() => navigate('/about')}>About</span>
            </div>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/:id" element={<ArticlePage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/create" element={<CreatePostPage/>}/>
            </Routes>
            <div onClick={() => window.open("https://github.com/arch-central/arch-central", '_blank', "noopener,noreferrer")} id="github-btn">
                <BsGithub/>
            </div>
        </div>
    );
};

export default hot(module)(App);