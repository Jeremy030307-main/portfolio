import './footer.css';

const GITHUB = 'https://github.com/Jeremy030307-main';
const LINKEDIN = 'https://linkedin.com/in/teng-kong-cheng-439bba312';
const EMAIL = 'jeremy030307@gmail.com';

const Footer = () => (
  <footer>
    <div className="footer-text">
      Teng Kong Cheng — {new Date().getFullYear()}
    </div>

    <ul className="footer-links">
      <li>
        <a href={GITHUB} target="_blank" rel="noopener noreferrer">Github</a>
      </li>
      <li>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">Linkedin</a>
      </li>
      <li>
        <a href={`mailto:${EMAIL}`}>Email</a>
      </li>
    </ul>
  </footer>
);

export default Footer;
