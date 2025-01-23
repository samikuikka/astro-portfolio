import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Project, projects } from "./project";
import { Button } from "~/components/ui/button";

const ProjectCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback((): void => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  // @ts-ignore
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-8">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {projects.map((project) => (
            <ProjectSlide key={project.id} project={project} />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {scrollSnaps.map((_, index) => (
          <Button
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${index === selectedIndex ? "bg-white" : "bg-gray-500"}`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
      <Button
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
        onClick={scrollPrev}
        variant="ghost"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
        onClick={scrollNext}
        variant="ghost"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
};

const ProjectSlide = ({ project }: { project: Project }) => (
  <div className="flex-[0_0_100%] min-w-0 pl-4">
    <div className="bg-wave-default rounded-lg overflow-hidden shadow-lg">
      <img
        src={project.imageUrl || "/placeholder.svg"}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-wave-slower text-gray-300 text-sm rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCarousel;
