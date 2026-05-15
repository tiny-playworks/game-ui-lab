import React from 'react';
import type { ReactNode } from 'react';

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
  return (
    <div className="page-intro">
      <span className="page-intro__eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      {children ? <div className="page-intro__meta">{children}</div> : null}
    </div>
  );
}
