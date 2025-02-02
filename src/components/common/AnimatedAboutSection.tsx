import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AnimatedAboutText() {
  const ref = useRef(null);
  // Listen to the scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Use scroll progress to control opacity and y translation.
  // Adjust the ranges as needed for your effect.
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  const aboutText =
    "Hello, I'm Sami Kuikka—a passionate full-stack software engineer from Finland. I specialize in building scalable, robust systems that solve real-world challenges. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam leo libero, consequat quis tellus volutpat, vulputate consectetur massa. Vivamus dignissim sapien ut finibus congue. Nulla pretium lacinia augue at blandit. Sed auctor auctor mattis. Maecenas porta eu quam id egestas. Nam ullamcorper diam non augue viverra fermentum. Cras ac lobortis tellus. Fusce vulputate rutrum commodo. Etiam fermentum elementum ipsum. Proin dictum magna quis lectus porta tristique. Proin lacinia est mauris, ac gravida lectus elementum ac. Nunc ut sem sed ante eleifend interdum. Curabitur metus nibh, auctor et sagittis egestas, aliquam in dolor. Ut lobortis, ligula eu maximus bibendum, nunc purus lacinia odio, vitae imperdiet quam elit vitae purus. Phasellus elementum tincidunt mi.";

  // Wrap each word so you could also apply individual animations if desired.
  const words = aboutText.split(" ").map((word, index) => (
    <motion.span key={index} className="inline-block" style={{ opacity, y }}>
      {word}&nbsp;
    </motion.span>
  ));

  return (
    <motion.div ref={ref} className="leading-tighter text-xl font-sans">
      {words}
    </motion.div>
  );
}
