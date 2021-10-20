import React from 'react'
import Ionicons  from '@expo/vector-icons/Ionicons'
import { View } from 'react-native'
import { BUFFER_SIZE, mainColor } from '../styles/globalStyles'

interface IProps {
    name: any,
    size?: number,
    color?: string,
    style?: any,
}

const Icon: React.FC<IProps> = ({ name, size, color, style }) => {
    const theSize = size ? size : BUFFER_SIZE;
    const theColor = color ? color : mainColor;
    return (
        <View style={style}>
            <Ionicons name={name} size={theSize} color={theColor} />
        </View>
    )
}

export default Icon
