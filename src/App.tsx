import { type MouseEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Code2,
  FileCode2,
  GraduationCap,
  Library,
  Search,
  ShieldCheck,
  Terminal,
  UsersRound,
} from "lucide-react";
import { marked } from "marked";
import { type DocGroup, type DocPage, groupedPages, groupOrder, pages } from "./docs";
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

function pageFromHash(): string {
  const id = window.location.hash.replace(/^#/, "");
  return pages.some((page) => page.id === id) ? id : "overview";
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
  const [activeId, setActiveId] = useState(() => pageFromHash());
  const [query, setQuery] = useState("");
  const activePage = pages.find((page) => page.id === activeId) ?? pages[0];
  const isHome = activePage.id === "overview";

  useEffect(() => {
    const onHashChange = () => setActiveId(pageFromHash());
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, []);

  const html = useMemo(() => renderMarkdown(activePage.body), [activePage]);
  const toc = useMemo(() => extractToc(activePage.body), [activePage]);
  const filteredGroups = useMemo(() => {
    if (!query.trim()) return groupedPages;

    const normalized = query.trim().toLowerCase();
    const matches = pages.filter((page) => {
      return (
        page.title.toLowerCase().includes(normalized) ||
        page.description.toLowerCase().includes(normalized) ||
        page.body.toLowerCase().includes(normalized)
      );
    });

    return groupOrder.reduce<Record<DocGroup, DocPage[]>>((acc, group) => {
      acc[group] = matches.filter((page) => page.group === group);
      return acc;
    }, {} as Record<DocGroup, DocPage[]>);
  }, [query]);

  function navigate(id: string) {
    setActiveId(id);
    setQuery("");
    window.history.pushState(null, "", `#${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navigateFromClick(event: MouseEvent<HTMLElement>, id: string) {
    event.preventDefault();
    navigate(id);
  }

  function scrollToHeading(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function copyFromArticle(event: MouseEvent<HTMLElement>) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest<HTMLButtonElement>(".copy-code");
    if (!button) return;

    const codeId = button.dataset.copyTarget;
    const codeElement = codeId ? document.getElementById(codeId) : null;
    const code = codeElement?.textContent ?? null;
    if (!code) return;

    const copied = await writeClipboardText(code, codeElement);
    const previous = button.textContent;
    button.textContent = copied ? "Copied" : "Selected";
    window.setTimeout(() => {
      button.textContent = previous ?? "Copy";
    }, 1200);
  }

  return (
    <div className={isHome ? "site-shell home-mode" : "site-shell docs-mode"}>
      <header className="topbar">
        <a className="brand" href="#overview" onClick={(event) => navigateFromClick(event, "overview")}>
          <img src="/sticks-lite-logo.png" alt="Sticks Lite" />
          <span>Sticks Lite</span>
          <strong>{STICKS_LITE_VERSION_LABEL}</strong>
        </a>

        <label className="search">
          <Search size={16} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search docs"
            aria-label="Search docs"
          />
        </label>

        <nav className="toplinks" aria-label="Main navigation">
          <a href="#learn" onClick={(event) => navigateFromClick(event, "learn")}>Learn</a>
          <a href="#reference" onClick={(event) => navigateFromClick(event, "reference")}>Reference</a>
          <a href="#tools-installation" onClick={(event) => navigateFromClick(event, "tools-installation")}>Tools</a>
          <a href="#classroom-use" onClick={(event) => navigateFromClick(event, "classroom-use")}>Classroom</a>
          <a href="https://github.com/sticks-lite/sticks-lite/">GitHub</a>
        </nav>
      </header>

      {isHome ? (
        <main className="language-home">
          <section className="language-hero">
            <div className="hero-copy">
              <div className="language-mark">
                <img src="/sticks-lite-logo.png" alt="" />
                <span>Documentation for {STICKS_LITE_VERSION_LABEL}</span>
              </div>
              <h1>Sticks Lite</h1>
              <p className="tagline">A classroom programming language for first programs.</p>
              <p className="hero-description">
                Sticks Lite teaches variables, decisions, loops, functions, collections,
                and recoverable errors with readable `.slite` files and the `sticks` CLI.
              </p>
              <div className="hero-actions">
                <a className="primary-action" href="#learn" onClick={(event) => navigateFromClick(event, "learn")}>
                  Start learning
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a className="secondary-action" href="#reference" onClick={(event) => navigateFromClick(event, "reference")}>
                  Read the reference
                </a>
              </div>
            </div>

            <div className="hero-stack">
              <div className="install-card" onClick={copyFromArticle}>
                <div className="terminal-header">
                  <span>Install</span>
                  <button className="copy-code" type="button" aria-label="Copy code" data-copy-target="install-code">
                    <span>Copy</span>
                  </button>
                </div>
                <pre><code id="install-code">{`npm install -g sticks-lite
sticks main.slite`}</code></pre>
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
    say "Keep practicing"`}</code></pre>
              </div>
            </div>
          </section>

          <section className="home-section first-steps">
            <div>
              <p className="section-kicker">Quick start</p>
              <h2>Run one file or a folder with `main.slite`.</h2>
              <p>
                Sticks Lite projects can be a single source file. A folder project
                runs from an exactly named `main.slite` entry file.
              </p>
            </div>
            <div className="quick-links">
              <a href="#learn-first-program" onClick={(event) => navigateFromClick(event, "learn-first-program")}>
                <FileCode2 size={18} aria-hidden="true" />
                Your first program
              </a>
              <a href="#tools-cli" onClick={(event) => navigateFromClick(event, "tools-cli")}>
                <Terminal size={18} aria-hidden="true" />
                CLI guide
              </a>
              <a href="#reference-typescript-api" onClick={(event) => navigateFromClick(event, "reference-typescript-api")}>
                <Code2 size={18} aria-hidden="true" />
                TypeScript API
              </a>
            </div>
          </section>

          <section className="home-section">
            <div className="section-heading">
              <h2>Small language, clear concepts.</h2>
              <p>Enough structure to teach real programming ideas without turning the first lesson into tool setup.</p>
            </div>
            <div className="feature-grid">
              <article>
                <GraduationCap size={22} aria-hidden="true" />
                <h3>Built for learning</h3>
                <p>Students work with output, input, values, branches, loops, functions, and collections directly.</p>
              </article>
              <article>
                <Terminal size={22} aria-hidden="true" />
                <h3>Runs from the terminal</h3>
                <p>Install with npm, run `.slite` files, or run folders that contain `main.slite`.</p>
              </article>
              <article>
                <ShieldCheck size={22} aria-hidden="true" />
                <h3>Friendly errors</h3>
                <p>Errors include line, column, message, and a hint that helps students make the next edit.</p>
              </article>
            </div>
          </section>

          <section className="home-section classroom-note">
            <div>
              <p className="section-kicker">Classroom note</p>
              <h2>Use Sticks Lite in monitored learning settings.</h2>
            </div>
            <p>
              Sticks Lite is intended for classrooms, clubs, camps, tutoring, and
              other guided environments. Run programs you understand in an
              environment you supervise.
            </p>
          </section>

          <section className="home-section split-section">
            <div>
              <h2>Choose a path.</h2>
              <p>Follow lessons, look up exact rules, install tools, or plan classroom use.</p>
            </div>
            <div className="path-list">
              <a href="#learn" onClick={(event) => navigateFromClick(event, "learn")}>
                <BookOpen size={18} aria-hidden="true" />
                <span>
                  <strong>Learn</strong>
                  Beginner concepts in teaching order.
                </span>
                <ChevronRight size={17} aria-hidden="true" />
              </a>
              <a href="#reference" onClick={(event) => navigateFromClick(event, "reference")}>
                <Library size={18} aria-hidden="true" />
                <span>
                  <strong>Reference</strong>
                  Syntax, values, built-ins, CLI, and API.
                </span>
                <ChevronRight size={17} aria-hidden="true" />
              </a>
              <a href="#classroom-use" onClick={(event) => navigateFromClick(event, "classroom-use")}>
                <UsersRound size={18} aria-hidden="true" />
                <span>
                  <strong>Classroom</strong>
                  Responsible use, teaching sequence, and debugging.
                </span>
                <ChevronRight size={17} aria-hidden="true" />
              </a>
            </div>
          </section>
        </main>
      ) : (
        <>
          <aside className="sidebar">
            <div className="side-intro">
              <BookOpen size={18} aria-hidden="true" />
              <div>
                <span>Sticks Lite Docs</span>
                <small>Learn, reference, tools, classroom</small>
              </div>
            </div>

            {groupOrder.map((group) => {
              const groupPages = filteredGroups[group];
              if (groupPages.length === 0) return null;
              return (
                <section className="nav-group" key={group}>
                  <h2>{group}</h2>
                  {groupPages.map((page) => (
                    <a
                      href={`#${page.id}`}
                      key={page.id}
                      className={page.id === activeId ? "active" : ""}
                      onClick={(event) => navigateFromClick(event, page.id)}
                    >
                      <span>{page.title}</span>
                      <ChevronRight size={15} aria-hidden="true" />
                    </a>
                  ))}
                </section>
              );
            })}
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
                <a
                  className={item.depth === 3 ? "indent" : ""}
                  href={`#${item.id}`}
                  key={item.id}
                  onClick={(event) => scrollToHeading(event, item.id)}
                >
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

async function writeClipboardText(text: string, visibleCode?: HTMLElement | null): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Try the event-based fallback below.
  }

  if (copyWithEvent(text)) return true;

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied && visibleCode) selectElementText(visibleCode);
  return copied;
}

function copyWithEvent(text: string): boolean {
  let copied = false;
  const onCopy = (event: ClipboardEvent) => {
    event.clipboardData?.setData("text/plain", text);
    event.preventDefault();
    copied = true;
  };

  document.addEventListener("copy", onCopy, { once: true });
  const commandSucceeded = document.execCommand("copy");
  document.removeEventListener("copy", onCopy);
  return copied && commandSucceeded;
}

function selectElementText(element: HTMLElement): void {
  const selection = window.getSelection();
  if (!selection) return;
  const range = document.createRange();
  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);
}
