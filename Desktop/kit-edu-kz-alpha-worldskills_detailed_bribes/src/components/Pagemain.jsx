import React from 'react'
import Image from 'next/image'
import styles from '../app/ru/main/main.module.css'
import yellowarrrow from './assets/page-main/yellow-arrow.svg'
import greenarrow from './assets/page-main/green-arrow.svg'
import greendot from './assets/page-main/green-dot.svg'

const Pagemain = () => {
  return (
    <section className={styles['page-main']}>
        <video className={styles['background-video']} autoPlay loop muted playsInline>
          <source src="/images/IMG_4786.mp4" type="video/mp4"/>
          Ваш браузер не поддерживает видео тег.
        </video>
        <div className={`${styles['page-main__container']} ${styles._container}`}>
          <div className={styles['page-main__title']}>КОЛЛЕДЖ ТВОЕЙ МЕЧТЫ</div>
          <div className={`${styles['page-main__moreinfo']} ${styles['moreinfo-block']}`}>
            <a className={styles['moreinfo-block__greenlink']} href="#"><span>Как поступить?</span><Image src={greenarrow} alt=""/></a>
            <Image className={styles['moreinfo-block__greendot']} src={greendot} alt=""/>
            <a className={styles['moreinfo-block__yellowlink']} href="#"><span>Узнать подробнее</span><Image src={yellowarrrow} alt=""/></a>
          </div>
        </div>
      </section>
  )
}

export default Pagemain
