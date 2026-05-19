import React from 'react';
import { QuestTracker } from '../quest-tracker';
import type { QuestTrackerObjective } from '../quest-tracker';

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
    <section className={['game-ui-quest-log', className].filter(Boolean).join(' ')} aria-label={title}>
      <header className="game-ui-quest-log__header">
        <strong>{title}</strong>
        <span>{quests.length} quests</span>
      </header>
      <div className="game-ui-quest-log__list">
        {quests.map((quest) => (
          <QuestTracker
            key={quest.id}
            className="game-ui-quest-log__quest"
            title={quest.title}
            subtitle={quest.subtitle}
            objectives={quest.objectives}
          />
        ))}
      </div>
      {activeId ? <span className="game-ui-quest-log__active">Tracking {activeId}</span> : null}
    </section>
  );
}
