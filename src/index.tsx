import ThemeJs from '@pedro_s/theme.js'
import { createRoot } from 'react-dom/client'

import App from "./App";

import "@fontsource/sora";
import { BrowserRouter } from 'react-router-dom';

ThemeJs.CreateTheme("DarkMode", true)
ThemeJs.SetThemeValue("background", "#2b2a33")
ThemeJs.SetThemeValue("primary", "#8c97b9")
ThemeJs.SetThemeValue("font", "#fbfbfe")
ThemeJs.SetThemeValue("font-secondary", "#848388")

ThemeJs.SetThemeTransition("defaultTrans", { 
    duration: 0.3,
    timingFunc: 'ease-in-out'
})

ThemeJs.ApplyTheme();

createRoot(document.getElementById("root")!).render(<BrowserRouter><App /></BrowserRouter>)