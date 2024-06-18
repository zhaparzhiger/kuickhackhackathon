'use client'

import Image from 'next/image'

import deputy from '../assets/information__section/deputy_head_for_training_and_production_work.png'
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
                            <div className={styles.information__suptitle}>Заместитель руководителя по учебно-производственной работе</div>
                            <h4 className={styles.information__title}>Баширова Гульзира Каирбергеновна</h4>
                        </div>
                        <div className={`${styles.information__detailed} ${styles.detailed}`}>
                            <div className={`${styles.detailed__birthdate} ${styles.birthdate}`}>
                                <h6 className={styles.birthdate__title}>Дата рождения:</h6>
                                <div className={styles.birthdate__year}>25.02.1978 г.р.</div>
                            </div>
                            <div className={`${styles.detailed__birthplace} ${styles.birthplace}`}>
                                <h6 className={styles.birthplace__title}>Место рождения:</h6>
                                <div className={styles.birthplace__region}>г. Павлодар</div>
                            </div>
                            <div className={`${styles.detailed__major} ${styles.major}`}>
                                <h6 className={styles.major__title}>Специальность по образованию:</h6>
                                <ul className={styles.major__list}>
                                    <li className={styles.major__list__item}>Экономика и менеджмент;</li>
                                    <li className={styles.major__list__item}>Экономика</li>
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
                            <li className={styles.education__lsit__item}>Высшее, Карагандинский государственный технический университет, 2000 г.</li>
                            <li className={styles.education__lsit__item}>Магистратура, Инновационный Евразийский университет, 2018 г.</li>
                        </ul>
                    </div>
                    <div className={`${styles.huge__text__labor__activity__block} ${styles.activity}`}>
                        <h5 className={styles.activity__title}>Трудовая деятельность:</h5>
                        <ul className={styles.activity__list}>
                            <li className={styles.activity__list__item}>1999-2002    Отдел труда, занятости и социальной защиты населения Павлодарского района</li>
                            <li className={styles.activity__list__item}>2002-2005    Главный специалист, Контрольно – ревизионный отдел Управления финансов Павлодарской области.</li>
                            <li className={styles.activity__list__item}>2005-2008    Главный специалист, Отдел планирования расходов учреждений социальной сферы Управления Экономики и бюджетного планирования области</li>
                            <li className={styles.activity__list__item}>2008-2010    Главный эксперт, Министерство экономики и бюджетного планирования Республики Казахстан</li>
                            <li className={styles.activity__list__item}>2010-2011    Начальник отдела планирования расходов учреждений здравоохранения. Управления экономики и бюджетного планирования Павлодарской области.</li>
                            <li className={styles.activity__list__item}>2011-2015    Руководитель отдела анализа и мониторинга охраны, историко культурного наследия. Управления культуры, архивов и документации Павлодарской области.</li>
                            <li className={styles.activity__list__item}>2015-2017    Главный специалист отдела культуры и искусства, охраны историко культурного наследия Управления культуры, архивов и документации Павлодарской области.</li>
                            <li className={styles.activity__list__item}>2017-2021    Заместитель руководителя Управления культуры, развития языков и архивного дела Павлодарской области.</li>
                            <li className={styles.activity__list__item}>2021-2021    Преподаватель специальных экономических дисциплин Высшего колледжа НАО «Торайгыров университет»</li>
                            <li className={styles.activity__list__item}>2021-2022    Заместитель директора по экономическим вопросам Высшего колледжа НАО «Торайгыров университет»</li>
                            <li className={styles.activity__list__item}>2022-по настоящее время    И.о. заместитель руководителя по учебно-производственной работе, КГП на ПХВ «Колледж информационных технологий»</li>
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