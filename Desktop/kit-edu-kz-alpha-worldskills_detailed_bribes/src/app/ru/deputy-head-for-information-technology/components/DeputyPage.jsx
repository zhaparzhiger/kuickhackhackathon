'use client'

import Image from 'next/image'

import deputy from '../assets/information__section/deputy_head_for_information_technology.png'
import styles from '../css/style.module.css'
import HeaderWithLogo from "../../../../components/UI/HeaderWithLogo/HeaderWithLogo"
import Footer from '../../../../components/Footer'

const DeputyPage = () => {
    

    return (
        <div className={styles.wrapper}>
        <main className={styles.main}>
            <section className={styles.future__section}>
                <HeaderWithLogo listItemColour='black' />
            </section>

            <section className={styles.information}>
                <div className={`${styles.information__container} ${styles._container}`}>
                    <div className={styles.information__image__block}>
                        <Image src={deputy} alt="" className={styles.information__img} />
                    </div>
                    <div className={styles.information__text}>
                        <div className={styles.information__title__block}>
                            <div className={styles.information__suptitle}>Заместитель руководителя по информационным технологиям</div>
                            <h4 className={styles.information__title}>Хаипергина Айгерим Юрьевна</h4>
                        </div>
                        <div className={`${styles.information__detailed} ${styles.detailed}`}>
                            <div className={`${styles.detailed__birthdate} ${styles.birthdate}`}>
                                <h6 className={styles.birthdate__title}>Дата рождения:</h6>
                                <div className={styles.birthdate__year}>16.02.1988 г.р.</div>
                            </div>
                            <div className={`${styles.detailed__birthplace} ${styles.birthplace}`}>
                                <h6 className={styles.birthplace__title}>Место рождения:</h6>
                                <div className={styles.birthplace__region}>Павлодарская обл., Лебяжинский район, с.Акку</div>
                            </div>
                            <div className={`${styles.detailed__major} ${styles.major}`}>
                                <h6 className={styles.major__title}>Специальность по образованию:</h6>
                                <ul className={styles.major__list}>
                                    <li className={styles.major__list__item}>Информатика;</li>
                                    <li className={styles.major__list__item}>Учёт и аудит</li>
                                </ul>
                            </div>
                        </div>  
                    </div>
                </div>
            </section>

            <section className={styles.huge__text}>
                <div className={`${styles.huge__text__container} ${styles._container}`}>
                    <div className={`${styles.huge__text__education__block} ${styles.education}`}>
                        <h5 className={styles.education__title}>Образование:</h5>
                        <ul className={styles.education__list}>
                            <li className={styles.education__lsit__item}>Высшее, Павлодарский государственный педагогический институт, 2015 год;</li>
                            <li className={styles.education__lsit__item}>Высшее, Алматинский гуманитарно-экономический университет, 2022 год.</li>
                        </ul>
                    </div>
                    <div className={`${styles.huge__text__labor__activity__block} ${styles.activity}`}>
                        <h5 className={styles.activity__title}>Трудовая деятельность:</h5>
                        <ul className={styles.activity__list}>
                            <li className={styles.activity__list__item}>2010-2013    Экспедитор, «Профессиональный лицей №28»</li>
                            <li className={styles.activity__list__item}>2013-2016    Экспедитор, КГУ «Лебяжинский колледж»</li>
                            <li className={styles.activity__list__item}>2016-2022    Менеджер по государственным закупкам, КГКП «Высший инновационный аграрный колледж «Ertis»</li>
                            <li className={styles.activity__list__item}>2022-По настоящее время    Заместитель руководителя по ИТ, менеджер по государственным закупкам, КГП на ПХВ «Колледж информационных технологий»</li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>

        <Footer />
    </div>
    )
}


export default DeputyPage