import Article from 'database/article'
import RestHelper from 'global/restHelper'
import React, { useEffect } from 'react'
import MiniArticle, { IMiniArticleProps } from 'custom_elements/MiniArticle'

import './scss/main.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface mainPageState {
    articles: IMiniArticleProps[]
    page: number | string | null
    totalPages?: number
    loading: boolean
}

const MainPage = () => {
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate()

    const [ state, setState ] = React.useState<mainPageState>({ articles: [], page: searchParams.get('page') ? searchParams.get('page') : 1, totalPages: undefined, loading: true })

    const GetPage = () => {
        RestHelper.GET<Article>('/article', { page: state.page }, (e) => {
            if (e.status != 200 || !e.data)
                return;
            const temp : IMiniArticleProps[] = []

            e.data.forEach(e => temp.push({ id: e.id, title: e.title, author: e.author, date: e.date, description: e.description, img: RestHelper.GET_URL('/article/' + e.id + "/img"), tags: e.tags }))            
            setState({ ...state, articles: [ ...state.articles, ...temp ], loading: false })
        })
    }

    const GetPageCount = () => {
        RestHelper.GET<{ pageCount: number }>('/article/page_count', { }, (e) => {
            if (e.status != 200 || !e.data)
                return;

            setState({...state, totalPages: e.data[0].pageCount})
        })
    }

    useEffect(() => { GetPageCount()  }, [])

    useEffect(() => {
        if(state.totalPages != undefined)
            GetPage()
    }, [state.totalPages])
    return (
        <div id="main-page">
            { state.articles.map((e, i) => <MiniArticle onRead={() => navigate('/' + e.id)} key={i} {...e}/>) }
            { state.articles.length == 0 && <div className='warning'><span>{ state.loading ? "Loading..." : "Page not found!!!" }</span></div> }
        </div>
    )
}
export default MainPage