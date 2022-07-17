import Article from 'database/article'
import RestHelper from 'global/restHelper'

export interface IMiniArticleProps {
    article: Article
}

const ArticleDispaly = (props: IMiniArticleProps) => {
    const processDesc = (desc: string) => {
        return desc.replace('\n', '<br/>');
    }

    return (
        <div className="mini-article">
            <h3>{ props.article.title }</h3>
            <hr />
            <div className="date-author">
                <span>{ props.article.author }</span>-
                <span>{ props.article.date.toLocaleString('pt').split(' ')[0] }</span>
            </div>
            <div className="tag">
                { props.article.tags?.map((e, i) => <span key={i}>#{ e }</span>) }
            </div>
            <div className='img'>
                <img src={RestHelper.GET_URL('/article/' + props.article.id + "/img")}/>
            </div>
            <span dangerouslySetInnerHTML={{__html: processDesc(props.article.description)}}></span>
        </div>
    )
}

export default ArticleDispaly