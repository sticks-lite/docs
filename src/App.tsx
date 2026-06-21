import { type MouseEvent, useMemo, useState } from "react";
import { BookOpen, ChevronRight, Code2, Search } from "lucide-react";
import { marked } from "marked";
import { groupedPages, pages } from "./docs";
import { STICKS_LITE_VERSION_LABEL } from "./version";

marked.use({
  gfm: true,
  breaks: false,
});

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractToc(markdown: string) {
  return markdown
    .split("\n")
    .filter((line) => /^#{2,3}\s/.test(line))
    .map((line) => {
      const depth = line.startsWith("###") ? 3 : 2;
      const title = line.replace(/^#{2,3}\s+/, "").trim();
      return { id: slugify(title), title, depth };
    });
}

function renderMarkdown(markdown: string): string {
  const renderer = new marked.Renderer();
  let codeIndex = 0;
  renderer.heading = ({ text, depth }) => {
    const id = slugify(text);
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  };
  renderer.code = ({ text, lang }) => {
    const id = `code-${codeIndex}`;
    codeIndex += 1;
    const label = lang ? `<span>${lang}</span>` : "";
    return `<div class="code-frame"><div class="code-toolbar">${label}<button class="copy-code" type="button" data-copy-target="${id}">Copy</button></div><pre><code id="${id}" class="language-${lang ?? "text"}">${text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")}</code></pre></div>`;
  };
  return marked.parse(markdown, { renderer }) as string;
}

export default function App() {
  const [activeId, setActiveId] = useState("overview");
  const [query, setQuery] = useState("");
  const activePage = pages.find((page) => page.id === activeId) ?? pages[0];

  const html = useMemo(() => renderMarkdown(activePage.body), [activePage]);
  const toc = useMemo(() => extractToc(activePage.body), [activePage]);
  const filteredGroups = useMemo(() => {
    if (!query.trim()) return groupedPages;
    const normalized = query.trim().toLowerCase();
    return pages
      .filter((page) => {
        return (
          page.title.toLowerCase().includes(normalized) ||
          page.description.toLowerCase().includes(normalized) ||
          page.body.toLowerCase().includes(normalized)
        );
      })
      .reduce<Record<string, typeof pages>>((acc, page) => {
        acc[page.group] ??= [];
        acc[page.group].push(page);
        return acc;
      }, {});
  }, [query]);

  async function copyFromArticle(event: MouseEvent<HTMLElement>) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest<HTMLButtonElement>(".copy-code");
    if (!button) return;

    const codeId = button.dataset.copyTarget;
    const code = codeId ? document.getElementById(codeId)?.textContent : null;
    if (!code) return;

    const copied = await writeClipboardText(code);
    const previous = button.textContent;
    button.textContent = copied ? "Copied" : "Select";
    window.setTimeout(() => {
      button.textContent = previous ?? "Copy";
    }, 1200);
  }

  return (
    <div className="docs-shell">
      <header className="topbar">
        <a className="brand" href="#overview" onClick={() => setActiveId("overview")}>
          <img src="/sticks-lite-logo.png" alt="Sticks Lite" />
          <span>Sticks Lite</span>
          <strong>{STICKS_LITE_VERSION_LABEL}</strong>
        </a>
        <div className="search">
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search docs"
          />
        </div>
        <nav className="toplinks" aria-label="External links">
          <a href="https://github.com/sticks-lite/sticks-lite/">GitHub</a>
          <a href="https://www.npmjs.com/package/sticks-lite">npm</a>
        </nav>
      </header>

      <aside className="sidebar">
        <div className="side-intro">
          <BookOpen size={18} />
          <div>
            <span>Documentation</span>
            <small>Educational language reference</small>
          </div>
        </div>
        {Object.entries(filteredGroups).map(([group, groupPages]) => (
          <section className="nav-group" key={group}>
            <h2>{group}</h2>
            {groupPages.map((page) => (
              <button
                key={page.id}
                className={page.id === activeId ? "active" : ""}
                onClick={() => setActiveId(page.id)}
              >
                <span>{page.title}</span>
                <ChevronRight size={15} />
              </button>
            ))}
          </section>
        ))}
      </aside>

      <main className="content">
        <div className="doc-hero">
          <div>
            <span className="eyebrow">{activePage.group}</span>
            <h1>{activePage.title}</h1>
            <p>{activePage.description}</p>
            <div className="hero-badges" aria-label="Documentation status">
              <span>{STICKS_LITE_VERSION_LABEL}</span>
              <span>MDX docs</span>
              <span>Classroom-safe guidance</span>
            </div>
          </div>
          <div className="install-card">
            <Code2 size={17} />
            <div>
              <code>npm install -g sticks-lite</code>
              <code>sticks --version</code>
              <code>sticks main.slite</code>
            </div>
          </div>
        </div>
        <article
          className="markdown"
          onClick={copyFromArticle}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>

      <aside className="toc" aria-label="On this page">
        <h2>On this page</h2>
        {toc.length === 0 ? (
          <p>No sections</p>
        ) : (
          toc.map((item) => (
            <a className={item.depth === 3 ? "indent" : ""} href={`#${item.id}`} key={item.id}>
              {item.title}
            </a>
          ))
        )}
      </aside>
    </div>
  );
}

async function writeClipboardText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
}
