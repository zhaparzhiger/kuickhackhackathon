import React from 'react'
import Image from 'next/image'
import styles from '../app/ru/main/main.module.css';
import girlicon from './assets/questions/girl-icon.svg'
import gitria from './assets/questions/grtria.svg'
import ortria from './assets/questions/ortria.svg'
import phone from './assets/questions/phone.svg'
import whtria from './assets/questions/whtria.svg'
const Pagemain = () => {
  return (
    <section className={styles.questions}>
    <div className={`${styles.questions__container} _container`}>
      <div className={styles.questions__body}>
        <div className={styles.questions__contacts}>
          <div className={styles.questions__title}>Есть вопросы?</div>
          <div className={styles.questions__title}>Ответим в <span className={styles.questions__title_gr}>Whatsapp</span></div>
          <div className={styles.questions__title}>и по <span className={styles.questions__title_or}>телефону</span></div>
          <div className={styles.questions__girlimg}>
            <Image src={girlicon} alt=""/>
          </div>
          <div className={styles.questions__number}>
            <Image className={styles.questions__numimg} src={phone} alt=""/> +7 777 777 7777
          </div>
        </div>
        <div className={styles.questions__chat}>
          <div className={`${styles['chat-questions__question']} ${styles['chat-questions__questions_or']}`}>
            Сколько стоит обучение? <Image className={styles.question__tria} src={ortria} alt=""/>
          </div>
          <div className={`${styles['chat-questions__answer']} ${styles['chat-questions__answer_gr']}`}>
            <Image className={styles.answer__tria} src={whtria} alt=""/> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className={`${styles['chat-questions__question']} ${styles['chat-questions__questions_gr']}`}>
            Сколько стоит обучение? <Image className={styles.question__tria} src={gitria} alt=""/>
          </div>
          <div className={`${styles['chat-questions__answer']} ${styles['chat-questions__answer_gr']}`}>
            <Image className={styles.answer__tria} src={whtria} alt=""/> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className={`${styles['chat-questions__question']} ${styles['chat-questions__questions_or']}`}>
            Сколько стоит обучение? <Image className={styles.question__tria} src={ortria} alt=""/>
          </div>
          <div className={`${styles['chat-questions__answer']} ${styles['chat-questions__answer_gr']}`}>
            <Image className={styles.answer__tria} src={whtria} alt=""/> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Pagemain
