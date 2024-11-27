import './home-projects.css';
import ProductCell from '../Components/ProductCell/productCell'; 
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';

const HomeProjects = () => {

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const translateY = useTransform(scrollYProgress, [0.4,0.5], ['-100px','0px'])

    return (
        <div className='product-page'>
            <motion.div style={{translateY}} className='products-container'>
                <ProductCell />
            </motion.div>
        </div>
    )
}

export default HomeProjects;
