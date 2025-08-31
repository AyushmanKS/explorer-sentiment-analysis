import { motion } from 'framer-motion';

const NavButton = ({ onClick, children, disabled }) => {
  // Height is reduced here
  const baseStyle = "flex w-20 h-[520px] items-center justify-center rounded-2xl backdrop-blur-sm transition-all duration-300";
  const enabledStyle = "bg-white/50 shadow-xl cursor-pointer";
  const disabledStyle = "bg-white/20 opacity-50 cursor-not-allowed";

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${disabled ? disabledStyle : enabledStyle}`}
      whileHover={!disabled ? { scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.75)" } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};

export default NavButton;