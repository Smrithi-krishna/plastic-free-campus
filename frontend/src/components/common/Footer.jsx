import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';
import { DEMO_NOTE } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <p className="logo" style={{ marginBottom: '0.8rem' }}>
              <LogoMark size={28} />
              <span className="logo__word" style={{ color: '#fff' }}>Plastic-Free Campus</span>
            </p>
            <p style={{ maxWidth: '38ch', color: '#b5c7bc' }}>
              Borrow a reusable container with a refundable deposit, bring it back, and earn Green Points.
            </p>
          </div>
          <div>
            <h4>Portals</h4>
            <ul>
              <li><Link to="/student/login">Student login</Link></li>
              <li><Link to="/student/register">Create student account</Link></li>
              <li><Link to="/staff/login">Staff login</Link></li>
            </ul>
          </div>
          <div>
            <h4>Learn more</h4>
            <ul>
              <li><a href="/#how-it-works">How it works</a></li>
              <li><a href="/#deposits">Deposits and points</a></li>
              <li><a href="/#impact">Campus impact</a></li>
            </ul>
          </div>
        </div>
        <p className="site-footer__note">{DEMO_NOTE}</p>
      </div>
    </footer>
  );
}
