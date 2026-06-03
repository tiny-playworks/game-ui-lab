import { Localized } from "./locale";

function EventTable({ rows }: { rows: Array<{ event: string; zh: string; en: string }> }) {
  return (
    <div className="docs-api-table">
      <table>
        <thead>
          <tr>
            <Localized as="th" zh="事件" en="Event" />
            <Localized as="th" zh="说明" en="Description" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.event}>
              <td>
                <code>{row.event}</code>
              </td>
              <Localized as="td" zh={row.zh} en={row.en} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MethodTable({ rows }: { rows: Array<{ method: string; zh: string; en: string }> }) {
  return (
    <div className="docs-api-table">
      <table>
        <thead>
          <tr>
            <Localized as="th" zh="方法" en="Method" />
            <Localized as="th" zh="说明" en="Description" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.method}>
              <td>
                <code>{row.method}</code>
              </td>
              <Localized as="td" zh={row.zh} en={row.en} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LayerTable() {
  const rows = [
    {
      layer: "hud",
      zh: "combo, target, quest, map, buffs, party, cooldowns",
      en: "combo, target, quest, map, buffs, party, cooldowns",
      renderZh: "ComboCounter, TargetFrame, QuestTracker, MiniMap, BuffBar, PartyFrame, AbilityBar",
      renderEn: "ComboCounter, TargetFrame, QuestTracker, MiniMap, BuffBar, PartyFrame, AbilityBar",
    },
    {
      layer: "feedback",
      zh: "damage[]",
      en: "damage[]",
      renderZh: "DamageNumber（锚点 CSS 变量）",
      renderEn: "DamageNumber (anchor CSS variables)",
    },
    {
      layer: "notification",
      zh: "toasts[]",
      en: "toasts[]",
      renderZh: "FloatingToast",
      renderEn: "FloatingToast",
    },
    {
      layer: "narrative",
      zh: "dialogueQueue[], choices?",
      en: "dialogueQueue[], choices?",
      renderZh: "DialogueBox + Continue；ChoicePrompt",
      renderEn: "DialogueBox + Continue; ChoicePrompt",
    },
    {
      layer: "modal",
      zh: "reward?, shop?, questLog?（互斥）",
      en: "reward?, shop?, questLog? (mutually exclusive)",
      renderZh: "RewardReveal, ShopPanel, QuestLog",
      renderEn: "RewardReveal, ShopPanel, QuestLog",
    },
  ];

  return (
    <div className="docs-api-table">
      <table>
        <thead>
          <tr>
            <Localized as="th" zh="层" en="Layer" />
            <Localized as="th" zh="状态字段" en="State fields" />
            <Localized as="th" zh="LayerHost 渲染" en="LayerHost renders" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.layer}>
              <td>
                <code>{row.layer}</code>
              </td>
              <Localized as="td" zh={row.zh} en={row.en} />
              <Localized as="td" zh={row.renderZh} en={row.renderEn} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const combatEvents = [
  { event: "damage:emit", zh: "追加飘字（FIFO，受 damageLimit 限制）", en: "Append floating text (FIFO, damageLimit)" },
  { event: "damage:complete", zh: "动画结束后移除", en: "Remove after animation completes" },
  { event: "toast:notify", zh: "追加通知", en: "Append toast" },
  { event: "toast:dismiss", zh: "关闭一条通知", en: "Dismiss one toast" },
];

const hudEvents = [
  { event: "cooldown:update", zh: "技能冷却槽（驱动 AbilityBar）", en: "Ability cooldown slot (drives AbilityBar)" },
  { event: "target-health:update", zh: "目标生命条", en: "Target health bar" },
  { event: "combo:set / combo:increment / combo:reset", zh: "连击计数", en: "Combo counter" },
  { event: "quest:track / quest:objective:update / quest:clear", zh: "任务追踪", en: "Quest tracking" },
  { event: "map:set / map:marker:update / map:select / map:clear", zh: "小地图", en: "Mini map" },
  { event: "buff:upsert / buff:remove / buff:clear", zh: "Buff 条", en: "Buff bar" },
  { event: "party:set / party:member:update / party:select / party:clear", zh: "小队框", en: "Party frame" },
];

const narrativeEvents = [
  { event: "dialogue:show", zh: "清空队列并显示一条", en: "Replace queue with one line" },
  { event: "dialogue:enqueue", zh: "对话入队", en: "Enqueue dialogue" },
  { event: "dialogue:advance", zh: "出队当前句", en: "Advance queue" },
  { event: "dialogue:dismiss", zh: "清空对话队列", en: "Clear dialogue queue" },
  { event: "choice:show / choice:select / choice:clear", zh: "分支选项", en: "Branching choices" },
];

const modalEvents = [
  { event: "reward-reveal:show / update / clear", zh: "奖励揭示", en: "Reward reveal" },
  { event: "shop:open / shop:close", zh: "商店", en: "Shop" },
  { event: "quest-log:open / close / activate", zh: "任务日志模态", en: "Quest log modal" },
];

const methods = [
  { method: "emitDamage(input)", zh: "浮动伤害/治疗/暴击/未命中", en: "Floating damage/heal/critical/miss" },
  { method: "notify(input) / dismiss(id)", zh: "Toast 通知", en: "Toast notifications" },
  { method: "setCombo / incrementCombo / resetCombo", zh: "连击", en: "Combo" },
  { method: "trackQuest(quest)", zh: "HUD 任务追踪", en: "HUD quest tracker" },
  { method: "setMapMarkers(map)", zh: "小地图标记", en: "Mini map markers" },
  { method: "upsertBuff(buff)", zh: "Buff（按 id 合并）", en: "Buff (merge by id)" },
  { method: "setParty(party)", zh: "小队", en: "Party" },
  { method: "showDialogue / enqueueDialogue / advanceDialogue", zh: "对话队列", en: "Dialogue queue" },
  { method: "showChoices(choices)", zh: "分支选项", en: "Choices" },
  { method: "openQuestLog(questLog)", zh: "模态任务日志", en: "Modal quest log" },
  { method: "clearLayer(layer)", zh: "清空指定层", en: "Clear one layer" },
  { method: "dispatch(event)", zh: "底层事件", en: "Low-level events" },
];

export function RuntimeApiContent() {
  return (
    <>
      <section className="docs-section">
        <Localized as="h2" className="docs-section__title" zh="安装" en="Install" />
        <pre className="docs-card">
          <code>pnpm add @tiny-playworks/game-ui-runtime @tiny-playworks/game-ui</code>
        </pre>
        <Localized
          as="p"
          className="docs-section__text"
          zh="React 应用仍需 `@tiny-playworks/game-ui/styles.css` 与 `GameUiProvider`。"
          en="React apps still need `@tiny-playworks/game-ui/styles.css` and `GameUiProvider`."
        />
      </section>

      <section className="docs-section">
        <Localized as="h2" className="docs-section__title" zh="React 接线" en="React wiring" />
        <pre className="docs-demo-block__code">
          <code>{`import { createGameUiRuntime } from '@tiny-playworks/game-ui-runtime';
import { GameUiProvider, GameUiRuntimeProvider, GameUiLayerHost } from '@tiny-playworks/game-ui';

const runtime = createGameUiRuntime({ damageLimit: 12, toastLimit: 4 });

export function App() {
  return (
    <GameUiProvider>
      <GameUiRuntimeProvider runtime={runtime}>
        <GameUiLayerHost />
      </GameUiRuntimeProvider>
    </GameUiProvider>
  );
}`}</code>
        </pre>
        <Localized as="p" className="docs-section__text" zh="Hooks：" en="Hooks:" />
        <ul className="docs-section__text">
          <Localized as="li" zh="`useGameUiRuntime()` — 须在 Provider 内" en="`useGameUiRuntime()` — inside Provider" />
          <Localized
            as="li"
            zh="`useGameUiLayer(layer)` — 订阅单层状态"
            en="`useGameUiLayer(layer)` — subscribe to one layer"
          />
        </ul>
        <Localized as="h3" className="docs-product-heading" zh="GameUiLayerHost" en="GameUiLayerHost" />
        <div className="docs-api-table">
          <table>
            <thead>
              <tr>
                <Localized as="th" zh="属性" en="Property" />
                <Localized as="th" zh="说明" en="Description" />
                <Localized as="th" zh="类型" en="Type" />
                <Localized as="th" zh="默认值" en="Default" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>className</code>
                </td>
                <Localized as="td" zh="根容器类名。" en="Root container class name." />
                <td>
                  <code>string</code>
                </td>
                <td>
                  <code>-</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Localized
          as="p"
          className="docs-section__text"
          zh="LayerHost 根据 runtime 各层状态渲染对应 primitive（见下表 LayerHost 列）。无其它公开 props。"
          en="LayerHost renders primitives from runtime layer state (see LayerHost column below). No other public props."
        />
      </section>

      <section className="docs-section">
        <Localized as="h2" className="docs-section__title" zh="分层模型" en="Layer model" />
        <LayerTable />
        <Localized
          as="p"
          className="docs-section__text"
          zh="`layer:clear('hud')` 重置为 `{ cooldowns: {} }` 的空 HUD 壳。"
          en="`layer:clear('hud')` resets to an empty HUD shell with `{ cooldowns: {} }`."
        />
      </section>

      <section className="docs-section">
        <Localized as="h2" className="docs-section__title" zh="便捷方法" en="Convenience methods" />
        <MethodTable rows={methods} />
      </section>

      <section className="docs-section">
        <Localized as="h2" className="docs-section__title" zh="事件表" en="Event table" />
        <Localized as="h3" className="docs-product-heading" zh="战斗反馈" en="Combat feedback" />
        <EventTable rows={combatEvents} />
        <Localized as="h3" className="docs-product-heading" zh="HUD" en="HUD" />
        <EventTable rows={hudEvents} />
        <Localized as="h3" className="docs-product-heading" zh="叙事" en="Narrative" />
        <EventTable rows={narrativeEvents} />
        <Localized as="h3" className="docs-product-heading" zh="模态（互斥）" en="Modal (exclusive)" />
        <EventTable rows={modalEvents} />
        <Localized
          as="p"
          className="docs-section__text"
          zh="打开 shop 或 quest-log 会清除 reward；打开 reward-reveal 会清除 shop 与 questLog。"
          en="Opening shop or quest-log clears reward; opening reward-reveal clears shop and questLog."
        />
      </section>

      <section className="docs-section">
        <Localized as="h2" className="docs-section__title" zh="0.4 → 0.5 迁移" en="Migration 0.4 → 0.5" />
        <Localized
          as="p"
          className="docs-section__text"
          zh="叙事层使用 `dialogueQueue` 数组，不再使用单独的 `narrative.dialogue` 字段。"
          en="The narrative layer uses a `dialogueQueue` array instead of a single `narrative.dialogue` field."
        />
      </section>

      <section className="docs-section">
        <Localized as="h2" className="docs-section__title" zh="相关文档" en="See also" />
        <ul className="docs-section__text">
          <li>
            <a href="/game-ui-lab/runtime/encounter-demo">
              <Localized as="span" zh="Encounter Demo" en="Encounter Demo" />
            </a>
            <Localized as="span" zh=" — 纵向战斗切片" en=" — vertical combat slice" />
          </li>
          <li>
            <a href="/game-ui-lab/integrations/pixi">
              <Localized as="span" zh="Pixi 桥接" en="Pixi bridge" />
            </a>
            <Localized as="span" zh=" — Canvas 反馈层" en=" — canvas feedback layer" />
          </li>
        </ul>
      </section>
    </>
  );
}
