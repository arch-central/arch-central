import { FiArrowRight } from "react-icons/fi";
import './MiniArticle.scss'

export interface IMiniArticleProps {
    id: number
    title: string
    description: string
    img: string
    tags: string[]
    date: Date
    author: string
    onRead?: () => void
}

const MiniArticle = (props: IMiniArticleProps) => {
    return (
        <div className="mini-article">
            <h3 onClick={props.onRead}>{ props.title }</h3>
            <hr />
            <div className="date-author">
                <span>{ props.author }</span>-
                <span>{ props.date.toLocaleString('pt').split(' ')[0] }</span>
            </div>
            <div className="tag">
                { props.tags.map((e, i) => <span key={i}>#{ e }</span>) }
            </div>
            <div className='img'>
                <img src={props.img}/>
            </div>
            <span> { props.description } </span>
            <br/>
            <span className="readmore" onClick={props.onRead}>Read more <FiArrowRight/></span>
        </div>
    )
}

export default MiniArticle