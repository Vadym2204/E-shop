import React, { FC } from 'react'
import FooterList from './footerList/FooterList'
import styles from './Footer.module.scss'

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
        <FooterList/>
    </footer>
  )
}

export default Footer