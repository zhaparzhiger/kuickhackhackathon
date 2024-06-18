'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../app/ru/main/main.module.css';
import header_logo from './assets/header/kit-icon.svg'
import eng from './assets/header/eng.svg'
import kaz from './assets/header/kaz.svg'
import ru from './assets/header/ru.svg'
import arrdown from './assets/header/arrow-down.svg'

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.header__changelang}`)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const selectLang = (lang) => {
    document.getElementById('selectedLang').textContent = lang;
    setOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.header__container } ${styles._container}`}>
        <div className={styles.header__logo}>
          <Image src={header_logo} alt="Logo" />
        </div>
        <nav className={`${styles.header__menu} ${menuOpen ? styles.active : ''}`}>
          <ul className={styles['menu-header__list']}>
            <a className={styles['menu-header__link']} href="#">О нас</a>
            <a className={styles['menu-header__link']} href="#">Новости</a>
            <a className={styles['menu-header__link']} href="#">Информация</a>
           <a className={styles['menu-header__link']} href="#">WorldSkills</a>
            <a className={styles['menu-header__link']} href="#">Контакты</a>
          </ul>
        </nav>
        <div className={styles['burger-menu']} onClick={toggleMenu}>
          <div className={`${styles.burger} ${menuOpen ? styles.active : ''}`}></div>
        </div>
        {open && <div className={styles.overlay}></div>}
        <div onClick={toggleDropdown} className={`${styles.header__changelang} ${open ? styles.open : ''}`}>
          <a id="selectedLang" onClick={toggleDropdown}>Ru</a>
          <Image className={styles.header__arrow} src={arrdown} alt="Open Dropdown" onClick={toggleDropdown} />
          {open && (
            <ul className={styles['dropdown-menu']}>
              <li onClick={() => selectLang('Ru')} data-lang="Ru">
                <div className={styles.vnossmach}>
                  <Image src={ru} alt="Russian" />Русский
                </div>
              </li>
              <li onClick={() => selectLang('Kz')} data-lang="Kz">
                <div className={styles.vnossmach}>
                  <Image src={kaz} alt="Kazakh" />Қазақ
                </div>
              </li>
              <li onClick={() => selectLang('En')} data-lang="En">
                <div className={styles.vnossmach}>
                  <Image src={eng} alt="English" />English
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className={styles.header__line_container}>
        <div className={styles.header__line}></div>
      </div>
    </header>
  );
}
