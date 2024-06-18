import React from 'react'
import styles from './message.module.css'
import tokayev from '../../../components/assets/message/01.svg'
import tokayev2 from '../../../components/assets/message/02.svg'
import tokayev3 from '../../../components/assets/message/03.svg'
import tokayev4 from '../../../components/assets/message/04.svg'
import tokayev5 from '../../../components/assets/message/05.svg'
import tokayev6 from '../../../components/assets/message/06.svg'

import HeaderWithLogo from '../../../components/UI/HeaderWithLogo/HeaderWithLogo'
import Image from 'next/image'

const Page = () => {
  return (
    <>
      <HeaderWithLogo />
      <section className={styles.message}>
        <div className={styles.message__container}>
          <div className={styles.message__title}>
            Послание Главы государства
          </div>
          <div className={styles.message__row}>
            <div className={styles.message__column}>
              <div className={styles.message__item}>
                <Image src={tokayev} alt="Токаев" className={styles.message__image}/>
                <div className={styles.message__date}>1 сентября 2021 г. 10:32</div>
                <div className={styles.message__desc}>
                  Послание Главы государства Касыма-Жомарта Токаева народу Казахстана
                </div>
              </div>
            </div>
            <div className={styles.message__column}>
              <div className={styles.message__item}>
                <Image src={tokayev2} alt="Токаев" className={styles.message__image}/>
                <div className={styles.message__date}>1 сентября 2020 г. 10:42</div>
                <div className={styles.message__desc}>
                Послание Главы  государства 
  Касыма - Жомарта Токаева 
  народу Казахстана. 1 сентября 2020 г.              </div>
              </div>
            </div>
            <div className={styles.message__column}>
              <div className={styles.message__item}>
                <Image src={tokayev3} alt="Токаев" className={styles.message__image}/>
                <div className={styles.message__date}>2 сентября 2019 г. 10:46</div>
                <div className={styles.message__desc}>
                Послание Главы  государства 
  Касыма - Жомарта Токаева 
  народу Казахстана 
                </div>
              </div>
            </div>
            <div className={styles.message__column}>
              <div className={styles.message__item}>
                <Image src={tokayev4} alt="Токаев" className={styles.message__image}/>
                <div className={styles.message__date}>1 сентября 2023 г. 11:56</div>
                <div className={styles.message__desc}>
                Послание Главы государства 
  Касыма - Жомарта Токаева
  народу Казахстана 
  «Экономический курс
  справедливого Казахстана»
  - 01.09.2023 г.              </div>
              </div>
            </div>
            <div className={styles.message__column}>
              <div className={styles.message__item}>
                <Image src={tokayev5} alt="Токаев" className={styles.message__image}/>
                <div className={styles.message__date}>1 сентября 2022 г. 10:24</div>
                <div className={styles.message__desc}>
                Послание Главы  государства 
  Касыма - Жомарта Токаева 
  народу Казахстана 
                </div>
              </div>
            </div>
            <div className={styles.message__column}>
              <div className={styles.message__item}>
                <Image src={tokayev6} alt="Токаев" className={styles.message__image}/>
                <div className={styles.message__date}>16 марта 2022 г. 10:28</div>
                <div className={styles.message__desc}>
                Послание Главы  государства 
  Касыма - Жомарта Токаева 
  народу Казахстана               </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
