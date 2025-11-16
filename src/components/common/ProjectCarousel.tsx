import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { type Project, getProjects } from "./project";
import { Button } from "~/components/ui/button";
import type { Language } from "~/types/common";
import { useTranslations } from "~/i18n/utils";
import { cn } from "~/lib/utils";

const ProjectCarousel = ({ lang }: { lang: Language }) => {
  const t = useTranslations(lang);
  const projects = getProjects(t);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    console.log("Embla API:", emblaApi);

    // Get the current scroll snap index
    const currentIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(currentIndex);
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());

    emblaApi.on("select", onSelect);

    onSelect();

    const handleResize = () => {
      emblaApi.reInit();
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      emblaApi.off("select", onSelect);
      window.removeEventListener("resize", handleResize);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-12">
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        ref={emblaRef}
      >
        <div className="flex -ml-4">
          {projects.map((project, index) => (
            <ProjectSlide
              key={project.id}
              project={project}
              isHovered={isHovered === index}
              onHover={() => setIsHovered(index)}
              onLeave={() => setIsHovered(null)}
            />
          ))}
        </div>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center mt-8 gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-10 h-2 rounded-full transition-all duration-300 ease-in-out",
              index === selectedIndex
                ? "bg-white w-16"
                : "bg-gray-600 hover:bg-gray-400"
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex ? "true" : "false"}
          />
        ))}
      </div>

      <Button
        className={cn(
          "absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full w-12 h-12 p-0 bg-black/30 backdrop-blur-sm border border-white/10 text-white shadow-lg transition-all duration-300",
          prevBtnEnabled
            ? "hover:bg-black/50 opacity-100"
            : "opacity-40 cursor-not-allowed"
        )}
        onClick={scrollPrev}
        variant="ghost"
        size="icon"
        disabled={!prevBtnEnabled}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        className={cn(
          "absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full w-12 h-12 p-0 bg-black/30 backdrop-blur-sm border border-white/10 text-white shadow-lg transition-all duration-300",
          nextBtnEnabled
            ? "hover:bg-black/50 opacity-100"
            : "opacity-40 cursor-not-allowed"
        )}
        onClick={scrollNext}
        variant="ghost"
        size="icon"
        disabled={!nextBtnEnabled}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
};

const ProjectSlide = ({
  project,
  isHovered,
  onHover,
  onLeave,
}: {
  project: Project;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => (
  <div
    className="flex-[0_0_90%] overflow-hidden p-2 sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0 pl-4"
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <div
      className={cn(
        "relative h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-black border border-gray-700"
      )}
    >
      {/* 👉 Only this inner wrapper scales */}
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-500 ease-out",
          isHovered ? "scale-[1.02]" : ""
        )}
      >
        <div className="absolute inset-0 w-full h-1/2 overflow-hidden">
          <div
            className={cn(
              "w-full h-full bg-cover bg-center transition-transform duration-700",
              isHovered ? "scale-110" : ""
            )}
            style={{ backgroundImage: `url(${project.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        </div>

        <div className="absolute bottom-0 w-full p-8">
          <div
            className={cn(
              "transition-all duration-500",
              isHovered ? "transform -translate-y-4" : ""
            )}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800/80 backdrop-blur-sm text-gray-300 text-xs font-medium rounded-full border border-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-3 text-white">
              {project.title}
            </h3>
            <p className="text-gray-300 mb-6 line-clamp-3">
              {project.description}
            </p>

            <div className="flex gap-4">
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              )}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  className="inline-flex items-center rounded-full bg-white text-black px-4 py-2 hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCarousel;
