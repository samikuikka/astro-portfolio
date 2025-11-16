import type { Language } from "~/types/common";
import { StickyScroll } from "../../ui/sticky-scroll-reveal";
import SkillTree from "./SkillTree";
import { useTranslations } from "~/i18n/utils";
import { getSkillCategories } from "./skillConfig";

const SkillReveal = ({ lang }: { lang: Language }) => {
  const t = useTranslations(lang);

  const allSkillCategories = getSkillCategories(t);

  const years = [
    {
      title: t("timeline.master.title"),
      description: t("timeline.master.description"),
      year: 2019,
    },
    {
      title: t("timeline.vertex.title"),
      description: t("timeline.vertex.description"),
      year: 2021,
    },
    {
      title: t("timeline.ai_side_projects.title"),
      description: t("timeline.ai_side_projects.description"),
      year: 2023,
    },
    {
      title: t("timeline.ai_startup.title"),
      description: t("timeline.ai_startup.description"),
      year: 2025,
    },
  ];

  const content = years.map((yearContent) => ({
    title: yearContent.title,
    description: yearContent.description,
    content: (
      <SkillTree
        skillCategories={allSkillCategories}
        currentYear={yearContent.year}
        lang={lang}
      />
    ),
  }));

  return (
    <div className="pt-20 border-t border-border">
      <StickyScroll content={content} />
    </div>
  );
};

export default SkillReveal;
