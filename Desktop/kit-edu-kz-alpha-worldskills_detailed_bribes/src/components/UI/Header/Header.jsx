'use client'

import { useState } from 'react'


import Image from 'next/image'

import kz from './assets/icons/kz.svg'
import rus from './assets/icons/rus.svg'
import bt from './assets/icons/bt.svg'
import chevron_down from './assets/icons/chevron_down.svg'

import styles from './css/style.module.css'


const Header = ({listItemColour}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Ru');

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={`${styles.header__container} ${styles._container}`}>
                <nav className={styles.header__nav}>
                    <ul className={`${styles.header__list} ${styles.list}`}>
                        <li className={`${styles.list__item} ${listItemColour === 'white' ? styles.white : styles.black}`}>О нас</li>
                        <li className={`${styles.list__item} ${listItemColour === 'white' ? styles.white : styles.black}`}>Новости</li>
                        <li className={`${styles.list__item} ${listItemColour === 'white' ? styles.white : styles.black}`}>Информация</li>
                        <li className={`${styles.list__item} ${listItemColour === 'white' ? styles.white : styles.black}`}>Блог руководителя</li>
                        <li className={`${styles.list__item} ${listItemColour === 'white' ? styles.white : styles.black}`}>WorldSkills</li>
                        <li className={`${styles.list__item} ${listItemColour === 'white' ? styles.white : styles.black}`}>Контакты</li>
                    </ul>
                </nav>
                <div className={`${styles.header__select_menu} ${isDropdownOpen ? styles.active : ''}`}>
                    <div className={styles.header__select_btn} onClick={toggleDropdown}>
                        <span className={styles.header__sBtn_text}>{selectedOption}</span>
                        <Image src={chevron_down} alt="" />
                    </div>

                    {isDropdownOpen && (
                        <ul className={styles.header__options}>
                            <li className={styles.header__option} onClick={() => handleOptionClick('Ru')}>
                                <Image src={rus} alt=""/>
                                <span className={styles.header__option_text}>Русский</span>
                                <span className={styles.header__option_hidden}>Ru</span>
                            </li>
                            <li className={styles.header__option} onClick={() => handleOptionClick('Kz')}>
                                <Image src={kz} alt=""/>
                                <span className={styles.header__option_text}>Қазақ</span>
                                <span className={styles.header__option_hidden}>Kz</span>
                            </li>
                            <li className={styles.header__option}  onClick={() => handleOptionClick('En')}>
                                <Image src={bt} alt=""/>
                                <span className={styles.header__option_text}>English</span>
                                <span className={styles.header__option_hidden}>En</span>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
};



export default Header