import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract all h2 and h3 headings from the page
    const headingElements = Array.from(
      document.querySelectorAll("article h2, article h3")
    );

    const headingList = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: parseInt(heading.tagName.substring(1)),
    }));

    setHeadings(headingList);
  }, []);

  useEffect(() => {
    // Highlight active heading on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="w-full">
      <div className="border-l-2 border-gray-700 pl-6">
        <h4 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-widest">
          On this page
        </h4>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`${
                heading.level === 3 ? "ml-4 mt-2" : "mt-3"
              }`}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(heading.id);
                  if (element) {
                    const offset = 100;
                    const elementPosition =
                      element.getBoundingClientRect().top;
                    const offsetPosition =
                      elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`block py-1 px-2 text-sm border-l-2 transition-all duration-200 ${
                  activeId === heading.id
                    ? "text-emerald-400 border-emerald-400 bg-emerald-500/5"
                    : "text-gray-500 border-transparent hover:text-gray-300 hover:bg-gray-800/30"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
