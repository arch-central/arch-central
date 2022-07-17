import { CSSProperties, SVGAttributes } from "react";
import { IconContext } from "react-icons";
import loadable from "@loadable/component"

import './icon.scss'

export interface IIconProps { 
    icon: string
    color?: string
    fontSize?: string
    className?: string
    canHover?: boolean
    style?: CSSProperties
    attr?: SVGAttributes<SVGElement>
    onClick: () => void
}

const Icon = (props: IIconProps) => {

    const lib = props.icon.substring(0, 3).toLowerCase() == "vsc" ? "vsc" : props.icon.substring(0, 4).toLowerCase() == "ioio" || props.icon.substring(0, 4).toLowerCase() == "iomd"  ? "io" : props.icon.substring(0, 2).toLowerCase() == "io" ? "io5" : props.icon.substring(0, 2).toLowerCase()
    const iconComponent = props.icon
    const Icon = loadable(() => import(`react-icons/${lib}/index.js`), { resolveComponent: (el: JSX.Element) => el[iconComponent as keyof JSX.Element] })

    const value: IconContext = {
        color: props.color,
        size: props.fontSize,
        className: props.className,
        style: props.style,
        attr: props.attr
    }

    return (
        <div className="element-icon-wrapper">
            <div className={ "element-icon" + (props.canHover ? " element-icon-hover" : "") } onClick={props.onClick}>
                <IconContext.Provider value={value}>
                    <Icon />
                </IconContext.Provider>
            </div>
        </div>
    );
}

Icon.defaultProps = {
    icon: "",
    size: 24,
    canHover: false,
    onClick: () => {}
}

export default Icon