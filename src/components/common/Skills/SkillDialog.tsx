import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import githubLogo from "../../../assets/logos/github.svg";
import type { Skill } from "~/types/skills";

interface SkillDialogProps {
  isOpen: boolean;
  onClose: () => void;
  skill: Skill | null;
}

const SkillDialog: React.FC<SkillDialogProps> = ({
  isOpen,
  onClose,
  skill,
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        {skill && (
          <>
            <DialogTitle className="flex items-center space-x-2">
              {skill.logo && (
                <img
                  src={skill.logo}
                  alt={`${skill.name} Logo`}
                  className="w-6 h-6 object-contain"
                />
              )}
              <span>{skill.name}</span>
            </DialogTitle>
            <DialogDescription className="mt-2 text-xl">
              {skill.description}
            </DialogDescription>
            {skill.projects && skill.projects.length > 0 && (
              <div className="mt-4">
                <h3 className="text-md font-semibold mb-2">Projects:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {skill.projects.map((project, index) => (
                    <div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub Repository"
                        className="text-blue-500 hover:underline flex items-center"
                        aria-label={`${project.name} GitHub Repository`}
                      >
                        <img
                          src={githubLogo.src}
                          alt="github"
                          className="mr-1 w-4 h-4"
                          aria-hidden="true"
                        />
                        {project.name}
                      </a>
                      {project.description && (
                        <p className="text-sm text-gray-600 ml-6">
                          {project.description}
                        </p>
                      )}
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SkillDialog;
