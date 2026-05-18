import { DocShell } from '../../components/doc-shell';
import { Localized } from '../../components/locale';
import { LabPreview } from '../../components/lab-preview';

<DocShell
  eyebrowZh="实验台"
  eyebrowEn="Live Lab"
  titleZh="直接看效果"
  titleEn="See it live"
  summaryZh="这里不放占位字。你看到的就是正在跑的实验台。"
  summaryEn="No placeholder here. What you see is the live lab."
>
  <section className="docs-section">
    <Localized
      as="p"
      className="docs-section__text"
      zh="这个页面是给你快速判断组件长什么样、怎么动、怎么拼在一起的。"
      en="This page is for quickly checking what the components look like, how they move, and how they fit together."
    />
  </section>

  <LabPreview />
</DocShell>
