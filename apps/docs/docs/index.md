import { DocShell } from '../components/doc-shell';
import { Localized } from '../components/locale';
import { LabPreview } from '../components/lab-preview';

<DocShell
  eyebrowZh="Tiny Playworks"
  eyebrowEn="Tiny Playworks"
  titleZh="游戏 UI 组件库"
  titleEn="Game UI primitives"
  summaryZh="中文优先的公开文档，先把怎么用说清楚，再给你看动效和实验台。"
  summaryEn="Chinese-first public docs: show usage first, then motion and the live lab."
>
  <section className="docs-section">
    <Localized
      as="h2"
      className="docs-section__title"
      zh="先看怎么用"
      en="Start with usage"
    />
    <Localized
      as="p"
      className="docs-section__text"
      zh="这个库不是传统业务组件库，所以文档也不会用传统业务组件库的写法。你先学会安装、导入和怎么在游戏界面里摆它。"
      en="This is not a traditional business UI kit, so the docs should not read like one. Start with install, import, and how to place the pieces inside a game UI."
    />
  </section>

  <div className="docs-card-grid">
    <article className="docs-card">
      <h3>安装和导入</h3>
      <p>先把 `@tiny-playworks/game-ui` 装进项目，再直接 import 组件。样式会跟着包一起进来，不需要你额外单独引 CSS。</p>
    </article>
    <article className="docs-card">
      <h3>原语和令牌</h3>
      <p>`game-ui` 负责组件，`tokens` 负责变量基础层。你如果单独玩 token，再去引 `@tiny-playworks/tokens/css` 就行。</p>
    </article>
  </div>

  <LabPreview />
</DocShell>
