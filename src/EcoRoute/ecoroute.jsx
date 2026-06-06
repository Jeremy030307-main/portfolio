import { useEffect } from 'react';

const REDIRECT_URL = 'https://canva.link/y49tiagar9b53js';

const EcoRoute = () => {
  useEffect(() => {
    window.location.replace(REDIRECT_URL);
  }, []);

  return (
    <div style={{ padding: '10% 1rem', textAlign: 'center' }}>
      <p>
        Redirecting… If nothing happens,{' '}
        <a href={REDIRECT_URL}>click here</a>.
      </p>
    </div>
  );
};

export default EcoRoute;
