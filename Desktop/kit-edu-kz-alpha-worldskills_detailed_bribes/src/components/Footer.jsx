import React from 'react'
import Image from 'next/image'
import styles from '../app/ru/main/main.module.css'
import footlogo from './assets/footer/logo.svg'
import tiktok from './assets/footer/tiktok.svg'
import facebook from './assets/footer/facebook.svg'
import inst from './assets/footer/inst.svg'
const Pagemain = () => {
  return (
    <footer className={styles['footer']}>
    <div className={`${styles['footer__container']} _container`}>
      <div className={styles['footer__header']}>
        <div className={styles['footer__main']}>
          <Image src={footlogo} alt=""/>
          <span>Колледж информационных технологий</span>
        </div>
        <div className={styles['footer__media']}>
          <Image src={inst} alt=""/>
          <Image src={tiktok} alt=""/>
          <Image src={facebook} alt=""/>
        </div>
      </div>
      <div className={styles['footer__row']}>
        <div className={styles['footer__column']}>
          <div className={styles['footer__maintitle']}>О колледже</div>
          <div className={styles['footer__subtitle']}>История колледжа</div>
          <div className={styles['footer__subtitle']}>Документы</div>
          <div className={styles['footer__subtitle']}>Структура</div>
          <div className={styles['footer__subtitle']}>Попечительский совет</div>
          <div className={styles['footer__subtitle']}>Индустриальный совет</div>
          <div className={styles['footer__subtitle']}>Педагогический совет</div>
        </div>
        <div className={styles['footer__column']}>
          <div className={styles['footer__maintitle']}>Информация</div>
          <div className={styles['footer__subtitle']}>Студенту</div>
          <div className={styles['footer__subtitle']}>Абитуриенту</div>
          <div className={styles['footer__subtitle']}>Преподователю</div>
          <div className={styles['footer__subtitle']}>Общежитие</div>
          <div className={styles['footer__subtitle']}>Библиотека</div>
          <div className={styles['footer__subtitle']}>Фин.отчетность</div>
        </div>
        <div className={styles['footer__column']}>
          <div className={styles['footer__maintitle']}>Государство</div>
          <div className={styles['footer__subtitle']}>Гос.символы</div>
          <div className={styles['footer__subtitle']}>Гос.услуги</div>
          <div className={styles['footer__subtitle']}>Послание Главы государства</div>
          <div className={styles['footer__subtitle']}>Противодействие коррупции</div>
          <div className={styles['footer__subtitle']}>Программа полиязычия</div>
        </div>
        <div className={styles['footer__column']}>
          <div className={styles['footer__maintitle']}>Воспитательная работа</div>
          <div className={styles['footer__subtitle']}>Общая информация</div>
          <div className={styles['footer__subtitle']}>Кураторы</div>
          <div className={styles['footer__subtitle']}>Психологическая служба</div>
          <div className={styles['footer__subtitle']}>Кружки/секции</div>
          <div className={styles['footer__subtitle']}>Антитеррористическая деятельность</div>
        </div>
        <div className={styles['footer__column']}>
          <div className={styles['footer__maintitle']}>Блог руководителя</div>
          <div className={styles['footer__subtitle']}>Приветствие</div>
          <div className={styles['footer__subtitle']}>Вопрос-ответы</div>
        </div>
      </div>
      <div className={styles['footer__bottom']}>
        Все права защищены. © 2024
      </div>
    </div>
  </footer>
  )
}

export default Pagemain
