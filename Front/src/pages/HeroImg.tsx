import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HeroImgProps {
  showHeroImage: boolean;
  setShowHeroImage: (show: boolean) => void;
}

function HeroImg({ showHeroImage, setShowHeroImage }: HeroImgProps) {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [showDelayedButton, setShowDelayedButton] = useState(false);

  const handleButtonClick = () => {
    setShowHeroImage(false);
    navigate("/home");
  };

  const handleImageLoad = () => {
    setShowDelayedButton(true);
  };

  useEffect(() => {
    if (showDelayedButton) {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [showDelayedButton]);

  return (
    <div className="flex flex-col lg:flex-row items-center bg-gray-100">
      <div className="p-6 lg:self-start">
        <h1 className="text-xl font-medium text-right text-sky-900 italic hover:not-italic">
          Uknow
        </h1>
      </div>
      {showHeroImage && (
        <motion.div
          initial={{ scale: 0.8, rotate: 0, borderRadius: "0%" }}
          animate={{
            scale: [0.8, 1.1, 1, 1],
            rotate: [0, 0, 0, 0],
            borderRadius: ["25%", "25%", "25%", "25%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.4, 0.7, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="p-6 lg:w-1/2"
        >
          <img src="hero.png" alt="" onLoad={handleImageLoad} />
        </motion.div>
      )}
      {showButton && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, ease: "easeInOut" }} 
          className="p-6 lg:w-1/2"
        >
          <h1 className="text-3xl mt-5 font-medium text-center lg:text-right">
            Choose your <br />
            <span className="text-orange-500 italic hover:not-italic ">
              Learning{" "}
            </span>
            path
          </h1>
          <h6 className="mt-4 text-center lg:text-right ">
            Explore all the most exciting job roles based <br /> on your
            interest and study major.
          </h6>
          <div className="lg:flex lg:justify-end mt-4">
            <button onClick={handleButtonClick}>
              <img className="p-6 animate-pulse" src="button.png" alt="" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default HeroImg;
