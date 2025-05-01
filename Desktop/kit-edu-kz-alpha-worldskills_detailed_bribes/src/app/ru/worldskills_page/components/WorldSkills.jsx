'use client'



import styles from '../css/style.module.css'
import pictures from '../assets/future__section/pictures.png'
import green_arrow from '../assets/future__section/icons/green_arrow.svg'
import orange_arrow from '../assets/future__section/icons/orange_arrow.svg'
import small_circle from '../assets/future__section/icons/small_circle.svg'
import worldskills from '../assets/future__section/worldskills.png'

import worldskills_pic from '../assets/championship__section/worldskills_pic.png'

import girl__coding from '../assets/photos__section/girl__coding.png'
import guys_on_podium from '../assets/photos__section/guys_on_podium.png'
import daniil_bart from '../assets/photos__section/daniil_bart.png'

import urusik from '../assets/contenders__section/icons/urusik.svg'
import medal from '../assets/contenders__section/icons/medal.svg'

import Image from 'next/image'
import Header from '../../../../components/UI/Header/Header'


const WorldSkills = () => {
    const styling = {
        backgroundImage: `url(${worldskills.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '296px 293px'
    }

    return (
        <div className={styles.wrapper}>
        <main className={styles.main}>
            <section className={styles.future__section} style={styling}>

                <Header listItemColour='white'/>           
                
                <div className={styles.information}>
                    <div className={`${styles.information__container} ${styles._container}`}>
                        <div className={styles.information__image_block}>
                            <Image src={pictures} alt=""/>
                        </div>
                        <div className={styles.information__text__block}>
                            <h2 className={styles.information__text__block__header}>Твои навыки. Твое будущее</h2>
                        </div>
                        <div className={styles.information__links__block}>
                            <div className={styles.information__first__link}>
                                <a className={styles.information__first__link__item} href="#">Документация</a>
                                <Image className={styles.information__first__link__arrow} src={green_arrow} alt=""/>
                                <Image className={styles.information__first__link__small__circle} src={small_circle} alt=""/>
                            </div>
                            <div className={styles.information__second__link}>
                                <a className={styles.information__second__link__item} href="#">Сайт WorldSkills Kazakhstan</a>
                                <Image className={styles.information__second__link__arrow} src={orange_arrow} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.championship}>
                <div className={`${styles.championship__container} ${styles._container}`}>
                    <div className={styles.championship__header__block}>
                        <h3 className={styles.championship__header}>Про чемпионат</h3>
                        <div className={`${styles.championship__header__more__block} ${styles.more__block}`}>
                            <a href="#" className={styles.more__block__link}>Узнать больше</a>
                            <Image className={styles.more__block__arrow} src={orange_arrow} alt=""/>
                        </div>
                    </div>
                    
                    <div className={`${styles.championship__long__text__block} ${styles.long__text__block}`}>
                        <p className={styles.long__text__block__paragraph}><b>WorldSkills</b> — это международная организация, которая занимается развитием профессионального образования и популяризацией рабочих профессий по всему миру. Она проводит различные соревнования и чемпионаты, в которых участвуют молодые специалисты, демонстрируя свои навыки и компетенции в различных профессиональных областях. Основная цель WorldSkills — повысить стандарты профессионального образования и подготовку кадров, а также повысить престиж рабочих профессий среди молодежи.</p>
                        <div className={styles.long__text__block__image}>
                            <Image className={styles.long__text__block__img} src={worldskills_pic} alt=""/>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.photos}>
                <div className={`${styles.photos__container} ${styles._container}`}>
                    <div className={styles.photos__header__block}>
                        <h3 className={styles.photos__header}>Фотографии</h3>
                    </div>
                    <div className={`${styles.photos__pictures__block} ${styles.pictures__block}`}>
                        <div className={styles.pictures__block__girl__coding__block}>
                            <Image className={`${styles.pictures__block__item} ${styles.item_1}`} src={girl__coding} alt=""/>
                        </div>
                        <div className={styles.pictures__block__guys__on__podium__block}>
                            <Image className={`${styles.pictures__block__item} ${styles.item_2}`} src={guys_on_podium} alt=""/>
                        </div>
                        <div className={styles.pictures__block__daniil__bart__block}>
                            <Image className={`${styles.pictures__block__item} ${styles.item_3}`} src={daniil_bart} alt=""/>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.contenders}>
                <div className={`${styles.contenders__container} ${styles._container}`}>
                    <div className={styles.contenders__header__block}>
                        <h3 className={styles.contenders__header}>Победители</h3>
                    </div>
                    <div className={`${styles.contenders__slider__block} ${styles.slider__block}`}>
                        <div className={styles.slider__block__item}>
                            <h4 className={styles.slider__block__header}>WorldSkills Pavlodar 2024</h4>
                            <div className={styles.slider__block__container}>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className={styles.slider__block__item}>
                            <h4 className={styles.slider__block__header}>WorldSkills Pavlodar 2024</h4>
                            <div className={styles.slider__block__container}>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className={styles.slider__block__item}>
                            <h4 className={styles.slider__block__header}>WorldSkills Pavlodar 2024</h4>
                            <div className={styles.slider__block__container}>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className={styles.slider__block__item}>
                            <h4 className={styles.slider__block__header}>WorldSkills Pavlodar 2024</h4>
                            <div className={styles.slider__block__container}>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slider__block__card} ${styles.card}`}>
                                    <div className={styles.slider__block__card__container}>
                                        <div className={styles.card__image__block}>
                                            <div className={styles.card__image}>
                                                <Image src={urusik} alt="" className={styles.card__image} />
                                            </div>
                                            <div className={styles.card__text__block}>
                                                <h5 className={styles.card__text__block__name}>Имя Фамилия</h5>
                                                <p className={styles.card__text__block__competence}>Компетенция</p>
                                            </div>
                                        </div>
                                        <div className={styles.card__medal__block}>
                                            <div className={styles.card__medal__block__image}>
                                                <Image src={medal} alt="" className={styles.card__medal__block__Image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
    )
}

export default WorldSkills