import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ padding: '10% 1rem', textAlign: 'center' }}>
    <h1>404</h1>
    <p>The page you're looking for doesn't exist.</p>
    <Link to="/">Back to home</Link>
  </div>
);

export default NotFound;
