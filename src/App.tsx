import Icon from "custom_elements/Icon";
import { hot } from "react-hot-loader"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";
import MainPage from "./pages/MainPage";

import './scss/global.scss'

const App = () => {
    const navigate = useNavigate();
    return (
        <div id="globalRoot">
            <div id="header">
                <img src="/icon.png" onClick={() => navigate('/')}/>
                <div>
                    <span>
                        The open-source the arch centric blogpost
                    </span>
                </div>
            </div>
            <div id="nav">
                <span onClick={() => navigate('/about')}>About</span>
            </div>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/:id" element={<ArticlePage/>}/>
                <Route path="about" element={<AboutPage/>}/>
            </Routes>
            <div onClick={() => window.open("https://github.com/arch-central/arch-central", '_blank', "noopener,noreferrer")} id="github-btn">
                <Icon icon="BsGithub"/>
            </div>
        </div>
    );
};

export default hot(module)(App);