import React from "react";
import clsx from "clsx";

export type SectionProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function Section({ title, description, action, className, children }: SectionProps) {
  return (
    <section className={clsx("py-12", className)}>
      {title || description || action ? (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            {title ? <h2 className="text-2xl font-bold text-white mb-2">{title}</h2> : null}
            {description ? (
              <p className="text-slate-400 text-sm max-w-2xl">{description}</p>
            ) : null}
          </div>
          {action ? <div>{action}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
