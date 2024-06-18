'use client'

import Image from 'next/image'

import college_icon from './assets/icons/college_icon.svg'
import insta from './assets/icons/insta.svg'
import tiktok from './assets/icons/tiktok.svg'
import facebook from './assets/icons/facebook.svg'
import styles from './css/style.module.css'


const Footer = () => {
    
    
    return (
        <footer class={styles.footer}>
            <div class={`${styles.footer__container} ${styles._container}`}>
                <div class={`${styles.footer__social__networks__block} ${styles.social__networks}`}>
                    <div class={`${styles.social__networks__title__block} ${styles.title__block}`}>
                        <div class={styles.title__block__image}>
                            <Image src={college_icon} alt="" class={styles.title__block__img} />
                        </div>
                        <div class={styles.title__block__header}>Колледж информационных технологий</div>
                    </div>
                    <div class={`${styles.social__networks__icons__block} ${styles.icons__block}`}>
                        <div class={styles.icons__block__insta__image}>
                            <Image src={insta} alt="" class={styles.icons__block__insta__img} />
                        </div>
                        <div class={styles.icons__block__tiktok__image}>
                            <Image src={tiktok} alt="" class={styles.icons__block__tiktok__img} />
                        </div>
                        <div class={styles.icons__block__facebook__image}>
                            <Image src={facebook} alt="" class={styles.icons__block__facebook__img} />
                        </div>
                    </div>
                </div>
                <div class={`${styles.footer__overview__block} ${styles.overview}`}>
                    <div class={`${styles.overview__lists__block} ${styles.overview}`}>
                        <div class={styles.about__college}>
                            <h6 class={styles.about__college__title}>О колледже</h6>
                            <ul class={styles.lists__about__college}>
                                <li class={styles.lists__about__college__item}>История колледжа</li>
                                <li class={styles.lists__about__college__item}>Документы</li>
                                <li class={styles.lists__about__college__item}>Структура</li>
                                <li class={styles.lists__about__college__item}>Попечительский совет</li>
                                <li class={styles.lists__about__college__item}>Индустриальный совет</li>
                                <li class={styles.lists__about__college__item}>Педагогический совет</li>
                            </ul>
                        </div>
                        <div class={styles.about__college}>
                            <h6 class={styles.about__college__title}>Информация</h6>
                            <ul class={styles.lists__about__college}>
                                <li class={styles.lists__about__college__item}>Студенту</li>
                                <li class={styles.lists__about__college__item}>Абитуриенту</li>
                                <li class={styles.lists__about__college__item}>Преподователю</li>
                                <li class={styles.lists__about__college__item}>Общежитие</li>
                                <li class={styles.lists__about__college__item}>Библиотека</li>
                                <li class={styles.lists__about__college__item}>Фин. отчетность</li>
                            </ul>
                        </div>
                        <div class={styles.about__college}>
                            <h6 class={styles.about__college__title}>Государство</h6>
                            <ul class={styles.lists__about__college}>
                                <li class={styles.lists__about__college__item}>Гос. символы</li>
                                <li class={styles.lists__about__college__item}>Гос. услуги</li>
                                <li class={styles.lists__about__college__item}>Послание Главы государства</li>
                                <li class={styles.lists__about__college__item}>Противодействие коррупции</li>
                                <li class={styles.lists__about__college__item}>Программа полиязычия</li>
                            </ul>
                        </div>
                        <div class={styles.about__college}>
                            <h6 class={styles.about__college__title}>Воспитательная работа</h6>
                            <ul class={styles.lists__about__college}>
                                <li class={styles.lists__about__college__item}>Общая информация</li>
                                <li class={styles.lists__about__college__item}>Кураторы</li>
                                <li class={styles.lists__about__college__item}>Психологическая служба</li>
                                <li class={styles.lists__about__college__item}>Кружки/секции</li>
                                <li class={styles.lists__about__college__item}>Антитеррористическая деятельность</li>
                            </ul>
                        </div>
                        <div class={styles.about__college}>
                            <h6 class={styles.about__college__title}>Блог руководителя</h6>
                            <ul class={styles.lists__about__college}>
                                <li class={styles.lists__about__college__item}>Приветствие</li>
                                <li class={styles.lists__about__college__item}>Вопрос-ответ</li>
                            </ul>
                        </div>
                    </div>

                    <div class={`${styles.overview__rights__reserved__block} ${styles.reserved}`}>
                        <p class={styles.reserved__text}>Все права защищены. © 2024</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer