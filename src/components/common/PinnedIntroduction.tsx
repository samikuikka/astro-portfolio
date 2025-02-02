import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profilePic from "../../assets/images/profile-pic.png";

gsap.registerPlugin(ScrollTrigger);

export function PinnedIntroduction() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Set up pinning
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "center center",
      end: "+=2000",
      pin: true,
      scrub: true,
    });

    // Create a timeline for the text animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=2000",
        scrub: true,
      },
    });

    // Animate each word individually.
    // Make sure each word in your text is wrapped in a span that you can select.
    // For example, if you have added a class "word" to each word:
    timeline.fromTo(
      // @ts-ignore
      textRef.current.querySelectorAll(".word"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1 }
    );
  }, []);

  // Split your text into words wrapped in spans with a className "word"
  const aboutText =
    "Hello, I'm Sami Kuikka—a passionate full-stack software engineer from Finland. I specialize in building scalable, robust systems that solve real-world challenges.";
  const words = aboutText.split(" ").map((word, index) => (
    <span key={index} className="word inline-block">
      {word}&nbsp;
    </span>
  ));

  return (
    <section
      ref={containerRef}
      className="h-screen flex flex-col md:flex-row items-center justify-between bg-page px-4 md:px-6 lg:px-20"
    >
      {/* Profile Image */}
      <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
        <img
          src={profilePic.src}
          width={300}
          height={300}
          alt="Sami Kuikka"
          className="rounded-full border-4 border-white shadow-lg max-w-xs md:max-w-sm"
        />
      </div>
      {/* Animated Text */}
      <div
        ref={textRef}
        className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-6"
      >
        <h2 className="font-bold font-heading leading-tighter tracking-tighter text-heading md:text-4xl text-3xl">
          About Me
        </h2>
        <div className="leading-tighter text-xl font-sans">{words}</div>
      </div>
    </section>
  );
}
