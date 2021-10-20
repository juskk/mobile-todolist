import React from 'react'
import Icon from './Icon'
import { TouchableOpacity } from 'react-native'

interface IProps {
    checked: Boolean,
    pressed?: () => void
}

const Checkbox: React.FC<IProps> = (props) => {
    return (
        <TouchableOpacity onPress={props.pressed}>
            {props.checked 
            ? <Icon name="checkbox-outline"/>
            : <Icon name="square-outline"/>}
        </TouchableOpacity>
    )
}

export default Checkbox
