import React from 'react';
import { motion } from 'framer-motion';

const anim = {
    initial: { opacity: 0, x: 0},
    animate: { opacity: 1, x: 0},
    exit: { opacity: 0, x: 0},
}
function Animation({children}) {
  return (
    <motion.div variants={anim} initial="initial" animate="animate" exit="exit" transition={{duration: 0.3}}>
        {children}
    </motion.div>
  )
}

export default Animation