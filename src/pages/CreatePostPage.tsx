import Input from "custom_elements/Input"
import TextareaEditor from "custom_elements/TextareaEditor"
import React, { createRef, useRef, useState } from "react"

import './scss/create.scss'

interface ICreatePostPageState {
    title: string
    description: string
    img?: string
}

const CreatePostPage = () => {
    const [ state, setState ] = useState<ICreatePostPageState>({ title: "", description: "" })

    const fileInput = createRef<HTMLInputElement>()
    
    const onImageSelect = () => {
        if (fileInput.current && fileInput.current.files)
            setState({...state, img: URL.createObjectURL(fileInput.current.files[0])})
        else
            setState({...state, img: undefined})
    }

    return (
        <div id="create-page">
            <h2>Create Article</h2>
            <Input id="title" placeholder="Title" value={state.title} onChange={(v) => setState({...state, title: v})}/>
            <div onClick={() => fileInput.current?.click()} id="image-wrapper">
                <input type='file' accept="image/*" style={{display: 'none', visibility: 'collapse'}} onChange={onImageSelect} ref={fileInput}/>
                { !state.img ?
                    <div id="image-holder">
                        <span>Select Image</span>
                    </div>:
                    <img src={state.img}/>
                }
            </div>
            <TextareaEditor value={state.description} onChange={(v) => setState({...state, description: v})}/>
            <div style={{minHeight: 200}}/>
        </div>
    )
}

export default CreatePostPage