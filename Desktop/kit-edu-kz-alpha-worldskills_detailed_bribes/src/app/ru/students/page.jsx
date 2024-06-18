import Image from 'next/image';
import styles from './styles.module.css';
import HeaderWithLogo from "../../../components/UI/HeaderWithLogo/HeaderWithLogo"

export default function Students() {
    return (
        <>
        <HeaderWithLogo />
            <section className={styles.section + ' ' + styles.container}>
                <h1 className={styles.section__title}>Расписания звонков</h1>
                <div className={styles.schedule__content}>
                    <div className={styles.schedule__content_body}>
                        <h3 className={styles.schedule__title}>Будние дни</h3>
                        <div className={styles.schedule__content_body_content}>
                            <p className={styles.schedule__item}>8:30</p>
                            <p className={styles.schedule__item}>10:00</p>
                        </div>
                        <div className={`${styles.schedule__content_body_content} ${styles.schedule__bg}`}>
                            <p>10:10</p>
                            <p>11:40</p>
                        </div>
                        <div className={styles.schedule__content_body_content}>
                            <p>12:20</p>
                            <p>12:20</p>
                        </div>
                        <div className={`${styles.schedule__content_body_content} ${styles.schedule__bg}`}>
                            <p>14:10</p>
                            <p>15:40</p>
                        </div>
                        <div className={styles.schedule__content_body_content}>
                            <p>15:45</p>
                            <p>17:15</p>
                        </div>
                        <div className={`${styles.schedule__content_body_content} ${styles.schedule__bg}`}>
                            <p>17:25</p>
                            <p>18:25</p>
                        </div>
                        <div className={styles.schedule__content_body_content}>
                            <p>18:30</p>
                            <p>19:30</p>
                        </div>
                    </div>
                    <div className={styles.schedule__content_body}>
                        <h3 className={styles.schedule__title}>Вторник</h3>
                        <div className={styles.schedule__content_body_content}>
                            <p className={styles.schedule__item}>8:30</p>
                            <p className={styles.schedule__item}>9:00</p>
                        </div>
                        <div className={`${styles.schedule__content_body_content} ${styles.schedule__bg}`}>
                            <p>9:05</p>
                            <p>10:25</p>
                        </div>
                        <div className={styles.schedule__content_body_content}>
                            <p>10:35</p>
                            <p>11:55</p>
                        </div>
                        <div className={`${styles.schedule__content_body_content} ${styles.schedule__bg}`}>
                            <p>12:35</p>
                            <p>13:55</p>
                        </div>
                        <div className={styles.schedule__content_body_content}>
                            <p>14:15</p>
                            <p>15:35</p>
                        </div>
                        <div className={`${styles.schedule__content_body_content} ${styles.schedule__bg}`}>
                            <p>15:40</p>
                            <p className={styles.schedule__number}>17:00</p>
                        </div>
                        <div className={styles.schedule__content_body_content}>
                            <p>17:10</p>
                            <p>18:10</p>
                        </div>
                        <div className={`${styles.schedule__content_body_content} ${styles.schedule__bg}`}>
                            <p>18:15</p>
                            <p>19:15</p>
                        </div>
                    </div>
                </div>
                <div className={styles.process__schedule}>
                    <div className={styles.process__schedule_title}>График учебного процесса</div>
                    <img src="/images/students/shedule__img.png" alt="schedule__image" className={styles.schedule__image} />
                </div>
                <div>
                    <a href="/" download="/" className={styles.schedule__button}>
                        Скачать
                        <img src="arrow-right.svg" alt="" className={styles.arrow_icon} />
                    </a>
                </div>
            </section>

            <section className={styles.section + ' ' + styles.container}>
                <h1 className={styles.section__events}>События</h1>
            </section>
            <footer className={styles.footer}></footer>
        </>
    );
}
