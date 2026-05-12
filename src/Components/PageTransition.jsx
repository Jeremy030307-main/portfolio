import { motion } from 'motion/react';

const variants = {
    initial: { opacity: 0, y: 12 },
    enter:   { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -8 },
};

const PageTransition = ({ children }) => (
    <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
        {children}
    </motion.div>
);

export default PageTransition;
