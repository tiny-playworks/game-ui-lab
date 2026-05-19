import React from 'react';
import { QuestTracker } from '../quest-tracker';
import type { QuestTrackerObjective } from '../quest-tracker';
import {
  mergeClass,
  questLogActiveClass,
  questLogClass,
  questLogHeaderClass,
  questLogListClass,
} from '../styles';

export interface QuestLogQuest {
  id: string;
  title: string;
  subtitle?: string;
  objectives: QuestTrackerObjective[];
}

export interface QuestLogProps {
  title?: string;
  quests: QuestLogQuest[];
  activeId?: string;
  className?: string;
}

export function QuestLog({ title = 'Quest log', quests, activeId, className }: QuestLogProps) {
  return (
    <section className={mergeClass(questLogClass, className)} aria-label={title}>
      <header className={questLogHeaderClass}>
        <strong>{title}</strong>
        <span>{quests.length} quests</span>
      </header>
      <div className={questLogListClass}>
        {quests.map((quest) => (
          <QuestTracker
            key={quest.id}
            title={quest.title}
            subtitle={quest.subtitle}
            objectives={quest.objectives}
          />
        ))}
      </div>
      {activeId ? <span className={questLogActiveClass}>Tracking {activeId}</span> : null}
    </section>
  );
}
