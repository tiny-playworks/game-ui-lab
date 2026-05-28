import React from 'react';
import { ObjectiveChip } from '../objective-chip/ObjectiveChip';
import type { ObjectiveChipProps } from '../objective-chip/ObjectiveChip';
import {
  mergeClass,
  questTrackerClass,
  questTrackerCopyClass,
  questTrackerCountClass,
  questTrackerHeaderClass,
  questTrackerListClass,
  questTrackerSubtitleClass,
  questTrackerTitleClass,
} from '../styles';

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
      className={mergeClass(questTrackerClass, className)}
      aria-label={`${title} ${completeCount} of ${objectives.length} complete`}
    >
      <header className={questTrackerHeaderClass}>
        <span className={questTrackerCopyClass}>
          <strong className={questTrackerTitleClass}>{title}</strong>
          {subtitle ? <span className={questTrackerSubtitleClass}>{subtitle}</span> : null}
        </span>
        <span className={questTrackerCountClass}>{countText}</span>
      </header>
      <div className={questTrackerListClass}>
        {objectives.map(({ id, ...objective }) => (
          <ObjectiveChip key={id} {...objective} />
        ))}
      </div>
    </section>
  );
}
