import Image from "next/image";
import styles from "./styles.module.css";
import HeaderWithLogo from "../../../components/UI/HeaderWithLogo/HeaderWithLogo";

export default function AntiTerror() {
    return (
        <>
        <HeaderWithLogo />
            <section className={styles.section__antiterr}>
                <div className="container">
                    <div className="inner">
                        <h2>Антитеррористическая деятельность</h2>
                        <div className={styles.deyatelnosti}>
                            <div className={styles.deyatelnost}>
                                <p>Радикализм. Экстремизм. Терроризм</p>
                                <div className={styles.cover}>
                                    <Image 
                                        src="/images/antiterror/terr1.png" 
                                        alt=""
                                        width={500}
                                        height={500}
                                    />
                                </div>
                            </div>
                            <div className={styles.deyatelnost}>
                                <p>Информация о правилах безопасности</p>
                                <div className={styles.cover}>
                                    <Image 
                                        src="/images/antiterror/terr2.png" 
                                        alt=""
                                        width={500}
                                        height={500}
                                    />
                                </div>
                            </div>
                            <div className={styles.deyatelnost}>
                                <p>Ложные звонки</p>
                                <div className={styles.cover}>
                                    <Image 
                                        src="/images/antiterror/terr3.png" 
                                        alt=""
                                        width={500}
                                        height={500}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
