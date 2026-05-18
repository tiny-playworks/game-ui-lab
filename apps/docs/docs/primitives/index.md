import { DocShell } from '../../components/doc-shell';
import { Localized } from '../../components/locale';

<DocShell
  eyebrowZh="原语"
  eyebrowEn="Primitives"
  titleZh="公开组件一览"
  titleEn="Public primitive inventory"
  summaryZh="这里列的是你真正该 import 的东西，不是内部实现。"
  summaryEn="This page lists the things you should actually import, not the internal implementation."
>
  <section className="docs-section">
    <Localized
      as="h2"
      className="docs-section__title"
      zh="这些组件是干什么的"
      en="What each component is for"
    />
    <div className="docs-card-grid">
      <article className="docs-card"><h3>DamageNumber</h3><p>飘字，伤害、暴击、治疗、miss 都靠它。</p></article>
      <article className="docs-card"><h3>FloatingToast</h3><p>短消息，掉落、提醒、成功提示都能用。</p></article>
      <article className="docs-card"><h3>ComboCounter</h3><p>连击计数，给战斗节奏一点推进感。</p></article>
      <article className="docs-card"><h3>HealthBar / ResourceMeter</h3><p>血条和资源条，HUD 持久状态读数。</p></article>
      <article className="docs-card"><h3>CooldownSlot</h3><p>技能冷却槽，告诉你什么时候能按。</p></article>
      <article className="docs-card"><h3>LootCard / RewardReveal</h3><p>掉落和奖励揭示，把结算做得像结算。</p></article>
    </div>
  </section>

  <section className="docs-section">
    <Localized
      as="h2"
      className="docs-section__title"
      zh="这页最重要的一句话"
      en="The most important rule"
    />
    <Localized
      as="p"
      className="docs-section__text"
      zh="你只需要从 `@tiny-playworks/game-ui` 导入，不要直接碰 `packages/primitives/src/*`。"
      en="Import from `@tiny-playworks/game-ui` only. Do not reach into `packages/primitives/src/*`."
    />
  </section>

  <section className="docs-section">
    <Localized
      as="h2"
      className="docs-section__title"
      zh="直接看实验台"
      en="See the live lab"
    />
    <Localized
      as="p"
      className="docs-section__text"
      zh="如果你想看动效和布局，直接打开 Lab。"
      en="If you want to check motion and layout, go straight to the Lab."
    />
  </section>
</DocShell>
