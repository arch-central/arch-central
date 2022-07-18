import ArticleDispaly from "custom_elements/ArticleDispaly";
import Article from "database/article";
import RestHelper from "global/restHelper";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi/index'

import './scss/article.scss'

interface ArticlePageState {
    article? : Article
    loading: boolean
}

const ArticlePage = () => {
    const { id } = useParams()
    const navegate = useNavigate()
    const [ state, setState ] = React.useState<ArticlePageState>({ loading: true })

    useEffect(() => {
        RestHelper.GET<Article>('/article/' + id, {}, (e) => {
            if (e.status != 200 || !e.data)
                return;
            setState({ article: e.data[0], loading: false })
        })
    }, [])

    return (
        <div id="main-page">
            <div onClick={() => navegate('/')} id="return-btn">
                <FiArrowLeft/>
            </div>
            { state.article ? <ArticleDispaly article={state.article}/> :  <div className='warning'><span>{ state.loading ? "Loading..." : "Article not found!!!" }</span></div>}
        </div>
    );
}

export default ArticlePage