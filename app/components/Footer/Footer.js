import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import s from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footerContainer}>
        <div className={s.footerSection}>
          <h3>Контакти</h3>
          <ul>
            <li>
              Телефон: <a href="tel:+380961111111">+38 096 111 11 11</a>
            </li>
            <li>
              Email: <a href="mailto:info@devstudio.com">info@devstudio.com</a>
            </li>
            <li>Адреса: вул. Прикладна, 123, м. Київ</li>
          </ul>
        </div>

        <div className={s.footerSection}>
          <h3>Інформація</h3>
          <ul>
            <li>
              <a href="#">Про нас</a>
            </li>
            <li>
              <a href="#">Доставка</a>
            </li>
            <li>
              <a href="#">Повернення та обмін</a>
            </li>
            <li>
              <a href="#">Політика конфіденційності</a>
            </li>
          </ul>
        </div>

        <div className={s.footerSection}>
          <h3>Слідкуйте за нами</h3>
          <ul className={s.socialIcons}>
            <li>
              <a href="#" className={s.iconFacebook}>
                <BsFacebook size={22} />
              </a>
            </li>
            <li>
              <a href="#" className={s.iconInstagram}>
                <GrInstagram size={22} />
              </a>
            </li>
            <li>
              <a href="#" className={s.iconTwitter}>
                <AiFillTwitterCircle size={22} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.footerBottom}>
        <p>&copy; 2023 Ваш інтернет-магазин одягу. Усі права захищені.</p>
      </div>
    </footer>
  );
};

export default Footer;
