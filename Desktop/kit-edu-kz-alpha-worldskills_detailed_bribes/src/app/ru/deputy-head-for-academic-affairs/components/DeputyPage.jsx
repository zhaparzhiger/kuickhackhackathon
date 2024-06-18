'use client'

import Image from 'next/image'

import deputy from '../assets/information__section/deputy_head_for_academic_affairs.png'
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
                            <div className={styles.information__suptitle}>Заместитель руководителя по учебной работе</div>
                            <h4 className={styles.information__title}>Иванова Ирина Николаевна</h4>
                        </div>
                        <div className={`${styles.information__detailed} ${styles.detailed}`}>
                            <div className={`${styles.detailed__birthdate} ${styles.birthdate}`}>
                                <h6 className={styles.birthdate__title}>Дата рождения:</h6>
                                <div className={styles.birthdate__year}>26.09.1968 г.р.</div>
                            </div>
                            <div className={`${styles.detailed__birthplace} ${styles.birthplace}`}>
                                <h6 className={styles.birthplace__title}>Место рождения:</h6>
                                <div className={styles.birthplace__region}>Павлодарская область, Иртышский район, с. Кайманачиха</div>
                            </div>
                            <div className={`${styles.detailed__qualification} ${styles.qualification}`}>
                                <h6 className={styles.qualification__title}>Квалификационная категория:</h6>
                                <ul className={styles.qualification__list}>
                                    <li className={styles.qualification__list__item}>«Педагог-исследователь» - 2021 год.</li>
                                </ul>
                            </div>
                            <div className={`${styles.detailed__major} ${styles.major}`}>
                                <h6 className={styles.major__title}>Специальность по образованию:</h6>
                                <ul className={styles.major__list}>
                                    <li className={styles.major__list__item}>Математика информатика и вычислительная техника</li>
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
                            <li className={styles.education__lsit__item}>Высшее, Павлодарский педагогический институт, 1991г.</li>
                        </ul>
                    </div>
                    <div className={`${styles.huge__text__labor__activity__block} ${styles.activity}`}>
                        <h5 className={styles.activity__title}>Трудовая деятельность:</h5>
                        <ul className={styles.activity__list}>
                            <li className={styles.activity__list__item}>1985-1986    Воспитатель, Кайманачихинская средняя школа</li>
                            <li className={styles.activity__list__item}>1991-1993    Учитель математики и физики, Кайманачихинская НСШ №2</li>
                            <li className={styles.activity__list__item}>1993-1999    Учитель математики, Средняя школа №15</li>
                            <li className={styles.activity__list__item}>1999-1999    Учитель математики и физики, Средняя школа №39</li>
                            <li className={styles.activity__list__item}>1999-2005    Преподаватель математики, Профессиональная техническая школа №5</li>
                            <li className={styles.activity__list__item}>2005-2006    Заместитель директора по учебно-производственной работе, Профессиональная техническая школа №5</li>
                            <li className={styles.activity__list__item}>2006-2014    Заместитель директора по учебной работе, КГКП «Павлодарский колледж технического сервиса»</li>
                            <li className={styles.activity__list__item}>2014-2017    Заведующая механическим отделением, ПХМК</li>
                            <li className={styles.activity__list__item}>2017-2018    Заместитель директора по учебно-методической работе, Колледж ПГУ им. С. Торайгырова</li>
                            <li className={styles.activity__list__item}>2018-2019    Заместитель директора по воспитательной работе, Колледж ПГУ им. С. Торайгырова</li>
                            <li className={styles.activity__list__item}>2019-2021    Заместитель директора по учебно-производственной работе, Колледж ПГУ им. С. Торайгырова</li>
                            <li className={styles.activity__list__item}>2021- По настоящее время    Заместитель руководителя по учебной работе, КГП на ПХВ «Колледж информационных технологий»</li>
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