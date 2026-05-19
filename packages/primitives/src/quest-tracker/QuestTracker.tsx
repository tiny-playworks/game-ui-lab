import React from 'react';
import { ObjectiveChip } from '../objective-chip';
import type { ObjectiveChipProps } from '../objective-chip';

export interface QuestTrackerObjective extends ObjectiveChipProps {
  id: string;
}

export interface QuestTrackerProps {
  title: string;
  subtitle?: string;
  objectives: QuestTrackerObjective[];
  className?: string;
}

function getCompleteCount(objectives: QuestTrackerObjective[]) {
  return objectives.filter((objective) => objective.state === 'complete').length;
}

export function QuestTracker({ title, subtitle, objectives, className }: QuestTrackerProps) {
  const completeCount = getCompleteCount(objectives);
  const countText = `${completeCount} / ${objectives.length}`;

  return (
    <section
      className={['game-ui-quest-tracker', className].filter(Boolean).join(' ')}
      role="region"
      aria-label={`${title} ${completeCount} of ${objectives.length} complete`}
    >
      <header className="game-ui-quest-tracker__header">
        <span className="game-ui-quest-tracker__copy">
          <strong className="game-ui-quest-tracker__title">{title}</strong>
          {subtitle ? <span className="game-ui-quest-tracker__subtitle">{subtitle}</span> : null}
        </span>
        <span className="game-ui-quest-tracker__count">{countText}</span>
      </header>
      <div className="game-ui-quest-tracker__list">
        {objectives.map(({ id, ...objective }) => (
          <ObjectiveChip key={id} {...objective} />
        ))}
      </div>
    </section>
  );
}
