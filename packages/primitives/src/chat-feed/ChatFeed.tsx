import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { chatFeedClass, chatFeedItemRecipe, chatFeedListClass, chatFeedOverflowClass, mergeClass } from '../styles';
import type { GameUiCollectionRenderer } from '../types';

export type ChatFeedTone = 'info' | 'system' | 'party' | 'combat' | 'loot';

export interface ChatFeedMessage {
  id: string;
  author: string;
  text: string;
  tone?: ChatFeedTone;
  timestamp?: ReactNode;
  channel?: ReactNode;
  highlighted?: boolean;
  className?: string;
}

export interface ChatFeedProps {
  messages: ChatFeedMessage[];
  limit?: number;
  renderMessage?: GameUiCollectionRenderer<ChatFeedMessage>;
  overflowLabel?: (count: number) => ReactNode;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function ChatFeed({
  messages,
  limit = 8,
  renderMessage,
  overflowLabel,
  label = 'Chat feed',
  className,
  style,
}: ChatFeedProps) {
  const visibleLimit = Math.max(0, Math.floor(limit));
  const overflow = Math.max(0, messages.length - visibleLimit);
  const visibleMessages = messages.slice(-visibleLimit);

  return (
    <section className={mergeClass(chatFeedClass, className)} style={style} aria-label={label} aria-live="polite" data-overflow={overflow}>
      <ul className={chatFeedListClass}>
        {overflow > 0 ? (
          <li className={chatFeedOverflowClass}>
            <span>{overflowLabel ? overflowLabel(overflow) : `+${overflow} earlier`}</span>
          </li>
        ) : null}
        {visibleMessages.map((message, index) => {
          const defaultNode = (
            <li
              className={mergeClass(chatFeedItemRecipe({ tone: message.tone ?? 'info' }), message.className)}
              data-highlighted={message.highlighted ?? false}
              data-tone={message.tone ?? 'info'}
            >
              {message.timestamp ? <span>{message.timestamp}</span> : null}
              {message.channel ? <span>{message.channel}</span> : null}
              <strong>{message.author}</strong>
              <span>{message.text}</span>
            </li>
          );

          return (
            <React.Fragment key={message.id}>
              {renderMessage ? renderMessage(message, { index, selected: false, disabled: false }, defaultNode) : defaultNode}
            </React.Fragment>
          );
        })}
      </ul>
    </section>
  );
}
