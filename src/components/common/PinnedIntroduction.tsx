import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profilePic from "../../assets/images/profile-pic.png";
import { useTranslations } from "~/i18n/utils";
import type { ui } from "~/i18n/ui";

gsap.registerPlugin(ScrollTrigger);

interface PinnedIntroductionProps {
  lang: keyof typeof ui;
}

export function PinnedIntroduction({ lang }: PinnedIntroductionProps) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const t = useTranslations(lang);

  useEffect(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 768px)": () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "center center",
          end: "+=2000",
          pin: true,
          scrub: true,
        });

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
            // @ts-ignore
            textRef.current.querySelectorAll(".word"),
            {
              color: "#fff",
              stagger: 0.05,
            },
            0
          );
      },

      // Mobile devices: Disable pinning or apply a simpler animation
      "(max-width: 767px)": () => {
        // @ts-ignore
        gsap.to(textRef.current.querySelectorAll(".word"), {
          color: "#fff",
          stagger: 0.05,
          duration: 1,
          delay: 0.5,
        });
      },
    });
  }, []);

  // Split your text into words wrapped in spans with a class "word"
  const aboutText = t("about.introduction");
  const words =
    lang == "cn"
      ? aboutText.split("").map((char, index) => (
          <span
            key={index}
            className="word text-xl md:text-3xl text-[#aaa9] inline-block"
          >
            {char}
          </span>
        ))
      : aboutText.split(" ").map((word, index) => (
          <span
            key={index}
            className="word text-xl md:text-3xl text-[#aaa9] inline-block"
          >
            {word}&nbsp;
          </span>
        ));

  return (
    <section
      ref={containerRef}
      className="h-screen flex flex-col md:flex-row items-center justify-around bg-black px-4 md:px-6 lg:px-20"
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
          {t("about.about")}
        </h2>
        <div className="leading-tighter text-xl font-sans">{words}</div>
      </div>
    </section>
  );
}
