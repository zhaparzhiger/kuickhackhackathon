import Image from "next/image";
import styles from "./styles.module.css";
import HeaderWithLogo from "../../../components/UI/HeaderWithLogo/HeaderWithLogo"

export default function NewsPage() {
    return (
        <>
        <HeaderWithLogo />
        <main>
            <section className={styles.news}>
                <div className={styles.container}>
                    <div className={styles.inner}>
                        <div className={styles.categories}>
                            <div className={`${styles.category} ${styles.choosen}`}>Все новости</div>
                            <div className={styles.category}>Преподователи</div>
                            <div className={styles.category}>WorldSkills</div>
                            <div className={styles.category}>Мероприятия</div>
                        </div>
                        <div className={styles.newsList}>
                            <div className={`${styles.newsItem} ${styles.newsItem1}`}>
                                <div className={styles.bgImg}>
                                    <Image
                                        src="/images/news/news.png"
                                        alt=""
                                        width={500}  
                                        height={500} // Placeholder height
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.chtoto}>Соревнования</div>
                                    <div className={styles.title}>Иртыш</div>
                                    <div className={styles.desc}>На лыжной базе "Ертіс" прошли соревнования по лыжным гонкам.</div>
                                </div>
                            </div>
                            <div className={styles.newsItem}>
                                <div className={styles.bgImg}>
                                    <Image
                                        src="/images/news/news.png"
                                        alt=""
                                        width={500}  
                                        height={500} // Placeholder height
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.title}>Иртыш</div>
                                    <div className={styles.desc}>На лыжной базе "Ертіс" прошли соревнования по лыжным гонкам.</div>
                                </div>
                            </div>
                            <div className={styles.newsItem}>
                                <div className={styles.bgImg}>
                                    <Image
                                        src="/images/news/news.png"
                                        alt=""
                                        width={500}  
                                        height={500} // Placeholder height
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.title}>Иртыш</div>
                                    <div className={styles.desc}>На лыжной базе "Ертіс" прошли соревнования по лыжным гонкам.</div>
                                </div>
                            </div>
                            <div className={styles.newsItem}>
                                <div className={styles.bgImg}>
                                    <Image
                                        src="/images/news/news.png"
                                        alt=""
                                        width={500}  
                                        height={500} // Placeholder height
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.title}>Иртыш</div>
                                    <div className={styles.desc}>На лыжной базе "Ертіс" прошли соревнования по лыжным гонкам.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.prepody}>
                <div className={styles.container}>
                    <div className={styles.inner}>
                        <h2>Преподователи</h2>
                        <div className={styles.Daaaaaaa}>
                            <div className={styles.Yeeeees}>
                                <div className={styles.cover}>
                                    <Image
                                        src="/images/news/news.png"
                                        alt=""
                                        width={500}  // Placeholder width
                                        height={500} // Placeholder height
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.title}>Заголовок</div>
                                    <div className={styles.Nooooo}>
                                        <span>Категория</span>
                                        <span>Дата</span>
                                    </div>
                                    <div className={styles.desc}>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </div>
                                </div>
                            </div>
                            <div className={styles.Yeeeees}>
                                <div className={styles.cover}>
                                    <Image
                                        src="/images/news/news.png"
                                        alt=""
                                        width={500}  // Placeholder width
                                        height={500} // Placeholder height
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.title}>Заголовок</div>
                                    <div className={styles.Nooooo}>
                                        <span>Категория</span>
                                        <span>Дата</span>
                                    </div>
                                    <div className={styles.desc}>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </div>
                                </div>
                            </div>
                            <div className={styles.Yeeeees}>
                                <div className={styles.cover}>
                                    <Image
                                        src="/images/news/news.png"
                                        alt=""
                                        width={500}  // Placeholder width
                                        height={500} // Placeholder height
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.title}>Заголовок</div>
                                    <div className={styles.Nooooo}>
                                        <span>Категория</span>
                                        <span>Дата</span>
                                    </div>
                                    <div className={styles.desc}>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.prepody}>
                <div className={styles.container}>
                    <div className={styles.inner}>
                        <h2>Мероприятия</h2>
                        <div className={styles.Daaaaaaa}>
                            <div className={styles.Yeeeees}>
                                <div className={styles.cover}>
                                    <Image
                                        src="/images/news/news.png"
                                        alt=""
                                        width={500}  // Placeholder width
                                        height={500} // Placeholder height
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.title}>Заголовок</div>
                                    <div className={styles.Nooooo}>
                                        <span>Категория</span>
                                        <span>Дата</span>
                                    </div>
                                    <div className={styles.desc}>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </div>
                                </div>
                            </div>
                            <div className={styles.Yeeeees}>
                                <div className={styles.cover}>
                                    <Image
                                        src="/images/news/news.png"
                                        alt=""
                                        width={500}  
                                        height={500} 
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.title}>Заголовок</div>
                                    <div className={styles.Nooooo}>
                                        <span>Категория</span>
                                        <span>Дата</span>
                                    </div>
                                    <div className={styles.desc}>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </div>
                                </div>
                            </div>
                            <div className={styles.Yeeeees}>
                                <div className={styles.cover}>
                                    <Image
                                        src="/images/news/news.png"
                                        alt=""
                                        width={500}  
                                        height={500} 
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.title}>Заголовок</div>
                                    <div className={styles.Nooooo}>
                                        <span>Категория</span>
                                        <span>Дата</span>
                                    </div>
                                    <div className={styles.desc}>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}
