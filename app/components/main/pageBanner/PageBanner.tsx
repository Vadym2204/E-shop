import React, { FC } from 'react'
import styles from './PageBanner.module.scss'
import Image from 'next/image'

const PageBanner: FC = () => {
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.info}>
                <h3>Summer Sale!</h3>
                <p>Enjoy discounts on selected items</p>
                <span>GET 50% OFF</span>
            </div>
            <Image src={'/banner-image.png'} width={400} height={40} alt='banner'/>
        </div>
    </div>
  )
}

export default PageBanner