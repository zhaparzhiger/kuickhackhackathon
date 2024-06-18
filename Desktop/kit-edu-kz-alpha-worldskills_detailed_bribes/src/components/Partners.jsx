import React from 'react'
import Image from 'next/image'
import styles from '../app/ru/main/main.module.css'
import fr from './assets/partners/fr.svg'
import sec from './assets/partners/sec.svg'
import third from './assets/partners/third.svg'
import four from './assets/partners/four.svg'
import fifth from './assets/partners/fifth.svg'
import six from './assets/partners/six.svg'
import seven from './assets/partners/sev.svg'
import eig from './assets/partners/eig.svg'
const Pagemain = () => {
  return (
    <section className={styles['partners']}>
    <div className={`${styles['partners__container']} _container`}>
      <div className={styles['partners__header']}>
        Наши партнеры
      </div>
      <div className={styles['partners__row']}>
        <div className={styles['partners__colone']}>
          <div className={styles['partners__col']}>
            <Image src={fr} alt=""/>
          </div>
          <div className={styles['partners__col']}>
            <Image src={sec} alt=""/>
          </div>
          <div className={styles['partners__col']}>
            <Image src={third} alt=""/>
          </div>
          <div className={styles['partners__col']}>
            <Image src={four} alt=""/>
          </div>
        </div>
        <div className={styles['partners__col2']}>
          <div className={styles['partners__col']}>
            <Image src={fifth} alt=""/>
          </div>
          <div className={styles['partners__col']}>
            <Image src={six} alt=""/>
          </div>
          <div className={styles['partners__col']}>
            <Image src={seven} alt=""/>
          </div>
          <div className={styles['partners__col']}>
            <Image src={eig} alt=""/>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Pagemain
