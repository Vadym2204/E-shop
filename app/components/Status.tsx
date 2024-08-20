import React, { FC } from 'react'
import { IconType } from 'react-icons'

interface IStatusProps {
    text: string,
    icon: IconType,
    bg: string,
    color: string
}

const Status:FC<IStatusProps> = ({text, icon:Icon, bg, color}) => {
  return (
    <div className={`${bg} ${color} px-1 rounded flex items-center gap-1`}>
       {text} <Icon size={15}/> 
    </div>
  )
}

export default Status