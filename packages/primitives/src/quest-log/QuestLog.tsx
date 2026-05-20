import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { QuestTracker } from '../quest-tracker';
import type { QuestTrackerObjective } from '../quest-tracker';
import {
  mergeClass,
  questLogActiveClass,
  questLogClass,
  questLogHeaderClass,
  questLogListClass,
  questLogQuestClass,
} from '../styles';
import type { GameUiCollectionRenderer } from '../types';

export interface QuestLogQuest {
  id: string;
  title: string;
  subtitle?: string;
  objectives: QuestTrackerObjective[];
  className?: string;
}

export interface QuestLogProps {
  title?: string;
  quests: QuestLogQuest[];
  activeId?: string;
  onActiveChange?: (id: string, quest: QuestLogQuest) => void;
  renderQuest?: GameUiCollectionRenderer<QuestLogQuest>;
  questCountLabel?: (count: number) => ReactNode;
  activeLabel?: (id: string) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function QuestLog({
  title = 'Quest log',
  quests,
  activeId,
  onActiveChange,
  renderQuest,
  questCountLabel,
  activeLabel,
  className,
  style,
}: QuestLogProps) {
  return (
    <section className={mergeClass(questLogClass, className)} aria-label={title} style={style}>
      <header className={questLogHeaderClass}>
        <strong>{title}</strong>
        <span>{questCountLabel ? questCountLabel(quests.length) : `${quests.length} quests`}</span>
      </header>
      <div className={questLogListClass}>
        {quests.map((quest, index) => {
          const selected = activeId === quest.id;
          const defaultNode = (
            <button
              className={mergeClass(questLogQuestClass, quest.className)}
              type="button"
              data-active={selected}
              onClick={onActiveChange ? () => onActiveChange(quest.id, quest) : undefined}
            >
              <QuestTracker
                title={quest.title}
                subtitle={quest.subtitle}
                objectives={quest.objectives}
              />
            </button>
          );

          return (
            <React.Fragment key={quest.id}>
              {renderQuest ? renderQuest(quest, { index, selected, disabled: false }, defaultNode) : defaultNode}
            </React.Fragment>
          );
        })}
      </div>
      {activeId ? <span className={questLogActiveClass}>{activeLabel ? activeLabel(activeId) : `Tracking ${activeId}`}</span> : null}
    </section>
  );
}
