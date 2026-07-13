import { motion, type Variants } from "framer-motion";

interface AnimatedWeatherIconProps {
  iconCode: string;
  weatherId: number;
  description: string;
  className?: string;
}

const getWeatherIconAnimation = (weatherId: number): Variants => {
  if (weatherId >= 200 && weatherId < 300) {
    return {
      animate: {
        scale: [1, 1.08, 1],
        opacity: [1, 0.75, 1],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    };
  }

  if (weatherId >= 300 && weatherId < 600) {
    return {
      animate: {
        y: [0, 5, 0],
        transition: {
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    };
  }

  if (weatherId >= 600 && weatherId < 700) {
    return {
      animate: {
        y: [0, 4, 0],
        rotate: [0, 3, -3, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    };
  }

  if (weatherId >= 700 && weatherId < 800) {
    return {
      animate: {
        x: [-4, 4, -4],
        opacity: [0.75, 1, 0.75],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    };
  }

  if (weatherId === 800) {
    return {
      animate: {
        rotate: 360,
        scale: [1, 1.05, 1],
        transition: {
          rotate: {
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
      },
    };
  }

  return {
    animate: {
      x: [-5, 5, -5],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
};

export const AnimatedWeatherIcon = ({
  iconCode,
  weatherId,
  description,
  className = "",
}: AnimatedWeatherIconProps) => {
  const animation = getWeatherIconAnimation(weatherId);

  return (
    <motion.div
      key={iconCode}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      <motion.img
        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt={description}
        className={className}
        variants={animation}
        animate="animate"
      />
    </motion.div>
  );
};
