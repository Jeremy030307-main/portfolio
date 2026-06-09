import useReveal from '../hooks/useReveal';
import './reveal.css';

/**
 * Wraps children in a scroll-revealed element. `as` lets it render any tag,
 * `delay` (ms) staggers siblings. Motion is justified: it builds reading
 * hierarchy as the recruiter scrolls, and collapses to instant on reduced motion.
 */
const Reveal = ({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) => {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-shown' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
