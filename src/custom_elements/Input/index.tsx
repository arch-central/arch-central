
import './input.scss'

interface IInputProps {
    value: string
    onChange: (val:string) => void
    id: string
    placeholder: string
}

const Input = (props: IInputProps) => {
    return (
        <div id={props.id} className="custom-input">
            <input value={props.value} placeholder={props.placeholder} onChange={(e) => props.onChange(e.target.value)}/>
        </div>
    )
}

Input.defaultProps = {
    id: "",
    placeholder: ""
}

export default Input