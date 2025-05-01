'use client'

import Image from 'next/image'

import styles from '../css/style.module.css'
import HeaderWithLogo from "../../../../components/UI/HeaderWithLogo/HeaderWithLogo"
import bribes_banner from '../assets/bribes_banner.png'
import right_arrow from '../assets/icons/arrow_right.svg'


const BribesPage = () => {

    return (
        <div className={styles.wrapper}>
            <main className={styles.main}>
                <section className={styles.future__section}>
                    <HeaderWithLogo />
                </section>

                <section className={styles.picture__section}>
                    <div className={`${styles.picture__section__container} ${styles._container}`}>
                        <h2 className={styles.picture__section__header}>Противодействие коррупции</h2>
                        <div className={styles.picture__section__image}>
                            <Image src={bribes_banner} alt="" className={styles.picture__section__img} />
                        </div>
                    </div>
                </section>

                <section className={styles.documents__section}>
                    <div className={`${styles.documents__section__container} ${styles._container}`}>
                        <h2 className={styles.documents__section__header}>Документы</h2>
                        <div className={styles.documents__section__block}>
                            <div className={styles.documents__section__card}>
                                <div className={styles.documents__section__text}>Антикоррупционная политика КИТ</div>
                                <button className={styles.documents__section__download__button}>
                                    Скачать <Image src={right_arrow} alt="" className={styles.documents__section__img} />
                                </button>
                            </div>
                            <div className={styles.documents__section__card}>
                                <div className={styles.documents__section__text}>Антикоррупционная политика КИТ</div>
                                <button className={styles.documents__section__download__button}>
                                    Скачать <Image src={right_arrow} alt="" className={styles.documents__section__img} />
                                </button>
                            </div>
                            <div className={styles.documents__section__card}>
                                <div className={styles.documents__section__text}>Антикоррупционная политика КИТ</div>
                                <button className={styles.documents__section__download__button}>
                                    Скачать <Image src={right_arrow} alt="" className={styles.documents__section__img} />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}


export default BribesPage