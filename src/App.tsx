import { type MouseEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code2,
  GraduationCap,
  Play,
  Search,
  ShieldCheck,
  Terminal,
} from "lucide-react";
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
    const code = text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
    return `<div class="code-frame"><div class="code-toolbar">${label}<button class="copy-code" type="button" aria-label="Copy code" data-copy-target="${id}"><span>Copy</span></button></div><pre><code id="${id}" class="language-${lang ?? "text"}">${code}</code></pre></div>`;
  };
  return marked.parse(markdown, { renderer }) as string;
}

export default function App() {
  const [activeId, setActiveId] = useState("overview");
  const [query, setQuery] = useState("");
  const activePage = pages.find((page) => page.id === activeId) ?? pages[0];
  const isHome = activePage.id === "overview";

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
    <div className={isHome ? "site-shell home-mode" : "site-shell docs-mode"}>
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
            placeholder="Search"
          />
        </div>
        <nav className="toplinks" aria-label="Main navigation">
          <button type="button" onClick={() => setActiveId("learn-basics")}>Learn</button>
          <button type="button" onClick={() => setActiveId("language-reference")}>Reference</button>
          <button type="button" onClick={() => setActiveId("installing")}>Install</button>
          <a href="https://github.com/sticks-lite/sticks-lite/">GitHub</a>
        </nav>
      </header>

      {isHome ? (
        <main className="language-home">
          <section className="language-hero">
            <div className="hero-copy">
              <div className="language-mark">
                <img src="/sticks-lite-logo.png" alt="" />
                <span>{STICKS_LITE_VERSION_LABEL}</span>
              </div>
              <h1>Sticks Lite</h1>
              <p className="tagline">A small classroom language for first programs.</p>
              <p className="hero-description">
                Sticks Lite helps students learn variables, decisions, loops, functions,
                collections, and errors with readable syntax and teacher-friendly messages.
              </p>
              <div className="hero-actions">
                <button type="button" className="primary-action" onClick={() => setActiveId("learn-basics")}>
                  Start learning
                  <ArrowRight size={17} />
                </button>
                <button type="button" className="secondary-action" onClick={() => setActiveId("installing")}>
                  Install the CLI
                </button>
              </div>
            </div>
            <div className="hero-preview" onClick={copyFromArticle}>
              <div className="preview-header">
                <span>main.slite</span>
                <button className="copy-code" type="button" aria-label="Copy code" data-copy-target="home-code">
                  <span>Copy</span>
                </button>
              </div>
              <pre><code id="home-code">{`score = 87

if score >= 90:
    say "A"
orif score >= 80:
    say "B"
otherwise:
    say "Keep practicing"

say "Done"`}</code></pre>
            </div>
          </section>

          <section className="quickstart-section">
            <div>
              <p className="section-kicker">Quick Start</p>
              <h2>Install the CLI and run one file.</h2>
              <p>
                Sticks Lite projects can be as small as a single `main.slite`
                source file. No project generator is required.
              </p>
            </div>
            <div className="terminal-card" onClick={copyFromArticle}>
              <div className="terminal-header">
                <span>Terminal</span>
                <button className="copy-code" type="button" aria-label="Copy code" data-copy-target="quickstart-code">
                  <span>Copy</span>
                </button>
              </div>
              <pre><code id="quickstart-code">{`npm install -g sticks-lite
sticks --version
sticks main.slite`}</code></pre>
            </div>
          </section>

          <section className="home-section">
            <div className="section-heading">
              <h2>Learn programming fundamentals directly.</h2>
              <p>Small syntax, predictable rules, and errors written for beginners.</p>
            </div>
            <div className="feature-grid">
              <article>
                <GraduationCap size={22} />
                <h3>Built for teaching</h3>
                <p>Designed for monitored classrooms, clubs, camps, and first computer-science lessons.</p>
              </article>
              <article>
                <Terminal size={22} />
                <h3>Runs from the terminal</h3>
                <p>Install globally with npm and run a source file with <code>sticks main.slite</code>.</p>
              </article>
              <article>
                <Code2 size={22} />
                <h3>Readable language core</h3>
                <p>Indentation blocks, command-style statements, lists, dictionaries, functions, and friendly errors.</p>
              </article>
              <article>
                <ShieldCheck size={22} />
                <h3>Clear boundaries</h3>
                <p>The interpreter has no direct file-system or network APIs and is documented for responsible classroom use.</p>
              </article>
            </div>
          </section>

          <section className="home-section split-section">
            <div>
              <h2>Choose a path.</h2>
              <p>Start with lessons, jump into exact language rules, or install the command-line tool.</p>
            </div>
            <div className="path-list">
              <button type="button" onClick={() => setActiveId("learn-basics")}>
                <BookOpen size={18} />
                <span>
                  <strong>Learn</strong>
                  Beginner concepts in teaching order.
                </span>
                <ChevronRight size={17} />
              </button>
              <button type="button" onClick={() => setActiveId("language-reference")}>
                <CheckCircle2 size={18} />
                <span>
                  <strong>Reference</strong>
                  Syntax, semantics, standard library, and errors.
                </span>
                <ChevronRight size={17} />
              </button>
              <button type="button" onClick={() => setActiveId("installing")}>
                <Play size={18} />
                <span>
                  <strong>Install</strong>
                  Global CLI setup and first run.
                </span>
                <ChevronRight size={17} />
              </button>
            </div>
          </section>
        </main>
      ) : (
        <>
          <aside className="sidebar">
            <div className="side-intro">
              <BookOpen size={18} />
              <div>
                <span>Sticks Lite</span>
                <small>Learn, reference, and tools</small>
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
        </>
      )}
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
