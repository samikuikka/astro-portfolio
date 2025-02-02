import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profilePic from "../../assets/images/profile-pic.png";

gsap.registerPlugin(ScrollTrigger);

export function PinnedIntroduction() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Create a scroll trigger for pinning the section.
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "center center",
      end: "+=2000",
      pin: true,
      scrub: true,
    });

    // Create a timeline to animate the color of the words.
    gsap
      .timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "+=2000",
          scrub: true,
        },
      })
      .to(
        //  @ts-ignore
        textRef.current.querySelectorAll(".word"),
        {
          color: "#fff", // animate to white
          stagger: 0.05, // adjust if you want a staggered effect
        },
        0
      );
  }, []);

  // Split your text into words wrapped in spans with a class "word"
  const aboutText =
    "Hello, I'm Sami Kuikka—a passionate full-stack software engineer from Finland. I specialize in building scalable, robust systems that solve real-world challenges.";
  const words = aboutText.split(" ").map((word, index) => (
    <span key={index} className="word text-[#aaa7] inline-block">
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
