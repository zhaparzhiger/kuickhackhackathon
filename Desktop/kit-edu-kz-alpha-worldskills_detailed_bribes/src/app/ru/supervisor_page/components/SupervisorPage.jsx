'use client'


import Image from 'next/image'

import supervisor from '../assets/information__section/supervisor.png'
import styles from '../css/style.module.css'
import HeaderWithLogo from "../../../../components/UI/HeaderWithLogo/HeaderWithLogo"
import Footer from '../../../../components/Footer'

const SupervisorPage = () => {
    

    return (
        <div className={styles.wrapper}>
        <main className={styles.main}>
            <section className={styles.future__section}>
                <HeaderWithLogo listItemColour='black'/>
            </section>

            <section className={styles.information}>
                <div className={`${styles.information__container} ${styles._container}`}>
                    <div className={styles.information__image__block}>
                        <Image src={supervisor} alt="" className={styles.information__img} />
                    </div>
                    <div className={styles.information__text}>
                        <div className={styles.information__title__block}>
                            <div className={styles.information__suptitle}>Руководитель</div>
                            <h4 className={styles.information__title}>Джартыбаев Серик Тлеуханович</h4>
                        </div>
                        <div className={`${styles.information__detailed} ${styles.detailed}`}>
                            <div className={`${styles.detailed__birthdate} ${styles.birthdate}`}>
                                <h6 className={styles.birthdate__title}>Дата рождения:</h6>
                                <div className={styles.birthdate__year}>10.07.1981 г.р.</div>
                            </div>
                            <div className={`${styles.detailed__birthplace} ${styles.birthplace}`}>
                                <h6 className={styles.birthplace__title}>Место рождения:</h6>
                                <div className={styles.birthplace__region}>ПГТ. Чаган, Семипалатинской области</div>
                            </div>
                            <div className={`${styles.detailed__academic__degree} ${styles.degree}`}>
                                <h6 className={styles.degree__title}>Ученая степень, ученое звание:</h6>
                                <ul className={styles.degree__list}>
                                    <li className={styles.degree__list__item}>Магистр географии.</li>
                                    <li className={styles.degree__list__item}>Магистр - Международный менеджмент в образовании.</li>
                                </ul>
                            </div>
                            <div className={`${styles.detailed__qualification} ${styles.qualification}`}>
                                <h6 className={styles.qualification__title}>Квалификационная категория:</h6>
                                <ul className={styles.qualification__list}>
                                    <li className={styles.qualification__list__item}> Первая квалификационная категория по должности руководителя– 2021 год.</li>
                                    <li className={styles.qualification__list__item}> Преподаватель специальных дисциплин  «Педагог-исследователь» - 2021 год.</li>
                                </ul>
                            </div>
                            <div className={`${styles.detailed__major} ${styles.major}`}>
                                <h6 className={styles.major__title}>Специальность по образованию:</h6>
                                <ul className={styles.major__list}>
                                    <li className={styles.major__list__item}>Учитель истории и географии</li>
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
                            <li className={styles.education__lsit__item}>2003 год - Павлодарский государственный университет им.С.Торайгырова.</li>
                            <li className={styles.education__lsit__item}>2007 год - Павлодарский государственный педагогический институт.</li>
                            <li className={styles.education__lsit__item}>2014 год - обладатель международной образовательной стипендии Президента Республики Казахстан Нурсултана Назарбаева «Болашақ».</li>
                            <li className={styles.education__lsit__item}>2016 год - University of  Leeds. MA «International Educational Management», Университет Лидса. Великобритания.</li>
                        </ul>
                    </div>
                    <div className={`${styles.huge__text__labor__activity__block} ${styles.activity}`}>
                        <h5 className={styles.activity__title}>Трудовая деятельность:</h5>
                        <ul className={styles.activity__list}>
                            <li className={styles.activity__list__item}>2003-2004    Учитель истории и географии - ГУ «Розовская СОШ», Акимата Павлодарского района, с.Розовка, Павлодарский район.</li>
                            <li className={styles.activity__list__item}>2004-2008    Преподаватель общественных дисциплин - КГКП «Красноармейский аграрно-технический колледж» с.Красноармейка, Павлодарский район.</li>
                            <li className={styles.activity__list__item}>2005-2008    Заместитель директора по воспитательной работе - КГКП «Красноармейский аграрно-технический колледж» с.Красноармейка, Павлодарский район.</li>
                            <li className={styles.activity__list__item}>2008-2010    Директор - ГУ «Чернорецкая СОШ №1» Акимата Павлодарского района, с.Чернорецк, Павлодарский район.</li>
                            <li className={styles.activity__list__item}>2010-2011    Директор - ГУ «Ефремовская СОШ» Акимата Павлодарского района, с.Ефремовка, Павлодарский район.</li>
                            <li className={styles.activity__list__item}>2011-2016    Директор - КГКП «Красноармейский аграрно-технический колледж» управления образования Павлодарской области, с.Красноармейка, Павлодарский район.</li>
                            <li className={styles.activity__list__item}>2016-2017    Начальник управления анализа и коммуникаций НАО "Холдинг «Холдинг «Кәсіпқор» г. Астана</li>
                            <li className={styles.activity__list__item}>2017-2018     Директор колледжа ПГУ им.С.Торайгырова, г.Павлодар.</li>
                            <li className={styles.activity__list__item}>2018-2020    Руководитель - КГКП «Высший инновационный аграрный колледж «Ertis» управления образования Павлодарской области,</li>
                            <li className={styles.activity__list__item}>2020 - по настоящее время Руководитель КГП на ПХВ «Колледж информационных технологий»</li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>

        <Footer />
    </div>
    )
}


export default SupervisorPage