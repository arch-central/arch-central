import React from "react"
import { BsListUl, BsTypeBold } from "react-icons/bs"
import ReactMarkdown from 'react-markdown'

import './textareaEditor.scss'

interface ITextareaEditorProps {
    value: string
    onChange: (v: string) => void
}

interface ITextareaEditorState {
    isEditing: boolean
}

enum EStyleLocationc {
    START,
    END,
    BOTH
}

const TextareaEditor = (props: ITextareaEditorProps) => {

    const [ state, setState ] = React.useState<ITextareaEditorState>({ isEditing: true })

    const textArea = React.createRef<HTMLTextAreaElement>()

    const AddStyle = (target: string, style: string, loc: EStyleLocationc, perLine: boolean = false) => {
        if (!perLine)
            switch (loc) {
                case EStyleLocationc.START:
                    return style + target
                case EStyleLocationc.END:
                    return target + style
                case EStyleLocationc.BOTH:
                    return style + target + style
            }
        else
            switch (loc) {
                case EStyleLocationc.START:
                    return target.split('\n').map(e => style + e).join("\n")
                case EStyleLocationc.END:
                    return target.split('\n').map(e => e + style).join("\n")
                case EStyleLocationc.BOTH:
                    return target.split('\n').map(e => style + e + style).join("\n")
            }
    }

    const ExtractSelection = () => props.value.substring(textArea.current ? textArea.current.selectionStart : 0, textArea.current?.selectionEnd)

    const ApplyStyle = (style: string) => !textArea.current ? "" : props.value.substring(0, textArea.current.selectionStart) + style + props.value.substring(textArea.current.selectionEnd, props.value.length)

    const AddBold = (target: string) => AddStyle(target, "**", EStyleLocationc.BOTH)
    const AddList = (target: string) => AddStyle(target, " - ", EStyleLocationc.START, true)

    const Process = (desc: string) => {
        return desc.replace('\n', "<br/><br/>").replace('**', '<strong>')
    }

    return (
        <div className="custom-textarea-editor">
            <div className="topbar">
                <div className="mode">
                    <button onClick={() => setState({...state, isEditing: true})}>Edit</button>
                    <button onClick={() => setState({...state, isEditing: false})}>Preview</button>
                </div>
                { state.isEditing ?
                    <div className="style">
                        <BsTypeBold onClick={() => props.onChange(ApplyStyle(AddBold(ExtractSelection())))}/>
                        <BsListUl onClick={() => props.onChange(ApplyStyle(AddList(ExtractSelection())))}/>
                    </div>
                    : <></>
                }
            </div>
            <div className="textarea">
                { state.isEditing ?
                    <textarea ref={textArea} value={props.value} onChange={e => props.onChange(e.target.value)} rows={10}/>:
                    <ReactMarkdown>{ props.value }</ReactMarkdown>
                }
            </div>
        </div>
    )
}

export default TextareaEditor