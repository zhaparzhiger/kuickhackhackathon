import React from 'react'
import Image from 'next/image'
import styles from '../app/ru/main/main.module.css'
import gis from './assets/reviews/2gis-icon.svg'
import stud1 from './assets/reviews/stud-icon01.svg'
import stud2 from './assets/reviews/stud-icon02.svg'
import stud3 from './assets/reviews/stud-icon03.svg'
import stud4 from './assets/reviews/stud-icon04.svg'
import stud5 from './assets/reviews/stud-icon05.svg'
import stud6 from './assets/reviews/stud-icon06.svg'
const Pagemain = () => {
  return (
    <section className={styles.reviews}>
    <div className={`${styles.reviews__container} ${styles._container}`}>
      <div className={styles.reviews__header}>
        <div className={styles.reviews__title}>Отзывы</div>
        <div className={styles['reviews__sub-title']}>Что говорят о нас наши студенты?</div>
      </div>
      <div className={styles.reviews__row}>
        <div className={styles.reviews__column}>
          <div className={`${styles.reviews__item} ${styles['item-reviews']}`}>
            <div className={styles['item-reviews__desc']}>
              Отличный колледж, учителя добрые и справедливые, столовая 10/10, новые технологии, компьютеры, 3д принтеры. Очень классный колледж, сам там учусь, все новое, поломок нету
            </div>
            <div className={styles['item-reviews__student']}>
              <div className={styles['item-reviews__student_icon']}>
                <Image src={gis} alt="Student Icon" />
              </div>
              <div className={styles['item-reviews__student_info']}>
                <div className={styles['item-reviews__student-name']}>Артур</div>
                <div className={styles['item-reviews__student-group']}>Студент группы ПО-333</div>
              </div>
            </div>
          </div>
          <div className={`${styles.reviews__item} ${styles['item-reviews']}`}>
            <div className={styles['item-reviews__desc']}>
              Колледж информационных технологий предоставляет превосходную академическую программу, сосредоточенную на практических навыках. Преподаватели заботятся о студентах и стимулируют их к успеху.
            </div>
            <div className={styles['item-reviews__student']}>
              <div className={styles['item-reviews__student_icon']}>
                <Image src={stud1} alt="Student Icon" />
              </div>
              <div className={styles['item-reviews__student_info']}>
                <div className={styles['item-reviews__student-name']}>Тимур</div>
                <div className={styles['item-reviews__student-group']}>Студент группы ПО-103</div>
              </div>
            </div>
          </div>
          <div className={`${styles.reviews__item} ${styles['item-reviews']}`}>
            <div className={styles['item-reviews__desc']}>
              Современное оборудование, увлекательные занятия и опытные преподаватели делают обучение здесь незабываемым.
            </div>
            <div className={styles['item-reviews__student']}>
              <div className={styles['item-reviews__student_icon']}>
                <Image src={stud2} alt="Student Icon" />
              </div>
              <div className={styles['item-reviews__student_info']}>
                <div className={styles['item-reviews__student-name']}>Жигер</div>
                <div className={styles['item-reviews__student-group']}>Студент группы ПО-123</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.reviews__column}>
        <div className={`${styles.reviews__item} ${styles['item-reviews']}`}>
            <div className={styles['item-reviews__desc']}>
              Отличный колледж, учителя добрые и справедливые, столовая 10/10, новые технологии, компьютеры, 3д принтеры. Очень классный колледж, сам там учусь, все новое, поломок нету
            </div>
            <div className={styles['item-reviews__student']}>
              <div className={styles['item-reviews__student_icon']}>
              <Image src={stud3} alt="Student Icon" />
              </div>
              <div className={styles['item-reviews__student_info']}>
                <div className={styles['item-reviews__student-name']}>Дарья</div>
                <div className={styles['item-reviews__student-group']}>Студент группы ПО-333</div>
              </div>
            </div>
          </div>
        <div className={`${styles.reviews__seccolumn} ${styles.seccolumn}`}>
    <div className={styles['seccolumn-first']}>
      <div className={`${styles.reviews__item} ${styles['item-reviews']}`}>
        <div className={styles['item-reviews__desc']}>
          Очень крутой колледж, дизайн и преподаватели очень хорошие
        </div>
        <div className={styles['item-reviews__student']}>
          <div className={styles['item-reviews__student_icon']}>
          <Image src={stud4} alt="Student Icon" />
          </div>
          <div className={styles['item-reviews__student_info']}>
            <div className={styles['item-reviews__student-name']}>Василий</div>
            <div className={styles['item-reviews__student-group']}>Студент группы ПО-282</div>
          </div>
        </div>
      </div>
      <div className={`${styles.reviews__item} ${styles['item-reviews']}`}>
        <div className={styles['item-reviews__desc']}>
          Наш колледж уверенно защищает титул "лучшего колледжа в стране", новое оборудование делает обучение в нем гораздо легче и интереснее, если вам интересно it то смело можете подавать документы в наш колледж, не пожалейте👍👍💪💪
        </div>
        <div className={styles['item-reviews__student']}>
          <div className={styles['item-reviews__student_icon']}>
            <Image src={stud5} alt=""/>
          </div>
          <div className={styles['item-reviews__student_info']}>
            <div className={styles['item-reviews__student-name']}>Кирилл</div>
            <div className={styles['item-reviews__student-group']}>Студент группы ПО-123</div>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.seccolumn_second}>
        
      <div className={`${styles.reviews__item} ${styles['item-reviews']}`}>
        <div className={styles['item-reviews__desc']}>
          Я учусь в Колледже Информационных Технологий и хотела бы поделиться своим опытом. В целом, обучение здесь превосходит мои ожидания. Учебная программа насыщенная и современная, охватывает все ключевые аспекты IT-индустрии.
        </div>
        <div className={styles['item-reviews__student']}>
          <div className={styles['item-reviews__student_icon']}>
            <Image src={stud6} alt=""/>
          </div>
          <div className={styles['item-reviews__student_info']}>
            <div className={styles['item-reviews__student-name']}>Мерей</div>
            <div className={styles['item-reviews__student-group']}>Студент группы ПО-282</div>
          </div>
        </div>
      </div>
      <div className={`${styles.reviews__item} ${styles['item-reviews']}`}>
        <div className={styles['item-reviews__desc']}>
          Учусь в этом колледже! Всё нравится! Опытные преподаватели 🫶🏻🫶🏻🫶🏻и классная атмосфера 👍🏻Классный Колледж!!!
        </div>
        <div className={styles['item-reviews__student']}>
          <div className={styles['item-reviews__student_icon']}>
            <Image src={gis} alt=""/>
          </div>
          <div className={styles['item-reviews__student_info']}>
            <div className={styles['item-reviews__student-name']}>Нургуль</div>
            <div className={styles['item-reviews__student-group']}>Студент группы ПО-242</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

                <div className={styles['reviews__column']}>
    <div className={`${styles['reviews__item']} ${styles['item-reviews']}`}>
      <div className={styles['item-reviews__desc']}>
        Лучший из всех доступных колледжей города, на данное время самый инновационный и технологичный образовательный центр. Есть все доступное для получения квалифицированного образования. Преподы илоны маски ))) Общежитие имба
      </div>
      <div className={styles['item-reviews__student']}>
        <div className={styles['item-reviews__student_icon']}>
          <Image src={gis} alt="Student" />
        </div>
        <div className={styles['item-reviews__student_info']}>
        <div className={styles['item-reviews__student-name']}>Руслан</div>
        <div className={styles['item-reviews__student-group']}>Студент группы ПО-323</div>
        </div>
      </div>
    </div>
    <div className={`${styles['reviews__item']} ${styles['item-reviews']}`}>
      <div className={styles['item-reviews__desc']}>
        Колледж отличный, в колледже предоставлено все что нужно для начинающих программистов и для других специальностей, преподаватели очень добрые учат отлично и понятно объясняют
      </div>
      <div className={styles['item-reviews__student']}>
        <div className={styles['item-reviews__student_icon']}>
          <Image src={gis} alt="Student" />
        </div>
        <div className={styles['item-reviews__student_info']}>
        <div className={styles['item-reviews__student-name']}>Алдияр</div>
        <div className={styles['item-reviews__student-group']}>Студент группы ПО-301</div>
        </div>
      </div>
    </div>
  </div>
            </div>
        </div>
    </section>
  )
}

export default Pagemain
