import React, { FC } from 'react'
import styles from './Heading.module.scss'

interface IHeadingProps {
    title: string;
    center?: boolean;
}

const Heading:FC<IHeadingProps> = ({title, center}) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
        <h1 className={styles.title}>{title}</h1>
    </div>
  )
}

export default Heading