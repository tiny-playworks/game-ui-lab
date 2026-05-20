import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { HealthBar } from '../health-bar';
import { StatusBadge } from '../status-badge';
import type { StatusBadgeProps } from '../status-badge';
import {
  mergeClass,
  partyFrameClass,
  partyFrameListClass,
  partyFrameMemberRecipe,
  partyFrameMetaClass,
  partyFrameNameClass,
  partyFrameStatusesClass,
} from '../styles';
import type { GameUiCollectionRenderer } from '../types';

export interface PartyFrameMember {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  shield?: number;
  status?: StatusBadgeProps;
  offline?: boolean;
  className?: string;
}

export interface PartyFrameProps {
  members: PartyFrameMember[];
  selectedId?: string;
  onMemberSelect?: (id: string, member: PartyFrameMember) => void;
  renderMember?: GameUiCollectionRenderer<PartyFrameMember>;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function PartyFrame({
  members,
  selectedId,
  onMemberSelect,
  renderMember,
  label = 'Party',
  className,
  style,
}: PartyFrameProps) {
  const ariaLabel = label;

  return (
    <section className={mergeClass(partyFrameClass, className)} style={style}>
      <ul className={partyFrameListClass} role="list" aria-label={ariaLabel}>
        {members.map((member, index) => {
          const selected = selectedId === member.id;
          const disabled = Boolean(member.offline);
          const content = <PartyMemberContent member={member} />;
          const defaultNode = (
            <li className={partyFrameMemberRecipe({ selected, offline: member.offline })} data-selected={selected} data-offline={member.offline ?? false}>
              {onMemberSelect ? (
                <button
                  type="button"
                  className={partyFrameMemberRecipe({ selected, offline: member.offline })}
                  aria-pressed={selected}
                  aria-label={`${member.name} party member`}
                  disabled={disabled}
                  onClick={() => onMemberSelect(member.id, member)}
                >
                  {content}
                </button>
              ) : (
                content
              )}
            </li>
          );

          return (
            <React.Fragment key={member.id}>
              {renderMember ? renderMember(member, { index, selected, disabled }, defaultNode) : defaultNode}
            </React.Fragment>
          );
        })}
      </ul>
    </section>
  );
}

function PartyMemberContent({ member }: { member: PartyFrameMember }) {
  return (
    <>
      <div className={partyFrameNameClass}>
        <strong>{member.name}</strong>
        {member.offline ? <span className={partyFrameMetaClass}>offline</span> : null}
      </div>
      <HealthBar value={member.health} max={member.maxHealth} shield={member.shield} label={`${member.name} HP`} showValue />
      {member.status ? (
        <div className={partyFrameStatusesClass}>
          <StatusBadge {...member.status} />
        </div>
      ) : null}
    </>
  );
}
