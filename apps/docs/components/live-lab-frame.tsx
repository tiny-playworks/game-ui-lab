const localGalleryUrl = "http://localhost:4300/";

export function LiveLabFrame() {
  return (
    <section className="docs-live-lab">
      <a className="docs-component-link" href={localGalleryUrl}>
        <span className="docs-component-link__meta">Local Gallery</span>
        <strong>打开独立实验台</strong>
        <span>开发态下嵌入同一个 gallery；需要全屏查看时点这里。</span>
      </a>
      <iframe
        className="docs-live-lab__frame"
        title="Game UI Lab gallery"
        src={localGalleryUrl}
      />
    </section>
  );
}
