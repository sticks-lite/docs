import { type MouseEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Compass,
  Copy,
  GraduationCap,
  Hash,
  Library,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  UsersRound,
  X,
} from "lucide-react";
import { marked } from "marked";
import { type DocGroup, type DocPage, groupedPages, groupOrder, pages } from "./docs";
import { STICKS_LITE_VERSION_LABEL } from "./version";

marked.use({
  gfm: true,
  breaks: false,
});

const groupMeta: Record<DocGroup, { description: string; accent: string }> = {
  Home: {
    description: "Language overview and paths into the docs.",
    accent: "ink",
  },
  Learn: {
    description: "Concept-first lessons for beginner programs.",
    accent: "green",
  },
  Reference: {
    description: "Precise syntax, runtime, built-in, CLI, and API rules.",
    accent: "blue",
  },
  Tools: {
    description: "Install, run, embed, and version Sticks Lite.",
    accent: "amber",
  },
  Classroom: {
    description: "Short guidance for monitored teaching environments.",
    accent: "rose",
  },
};

const topNav = [
  { id: "learn", label: "Learn" },
  { id: "reference", label: "Reference" },
  { id: "tools-installation", label: "Tools" },
  { id: "classroom-use", label: "Classroom" },
];

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
    const anchor = depth > 1 ? `<a class="heading-anchor" href="#${id}" aria-label="Link to ${text}"><span>#</span></a>` : "";
    return `<h${depth} id="${id}">${text}${anchor}</h${depth}>`;
  };

  renderer.code = ({ text, lang }) => {
    const id = `code-${codeIndex}`;
    codeIndex += 1;
    const label = lang ? `<span>${lang}</span>` : "<span>text</span>";
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.querySelector<HTMLInputElement>("#doc-search")?.focus();
      }
      if (event.key === "Escape") {
        setQuery("");
        setMobileNavOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const html = useMemo(() => renderMarkdown(activePage.body), [activePage]);
  const toc = useMemo(() => extractToc(activePage.body), [activePage]);
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const normalized = query.trim().toLowerCase();
    return pages
      .filter((page) => page.id !== "overview")
      .filter((page) => {
        return (
          page.title.toLowerCase().includes(normalized) ||
          page.description.toLowerCase().includes(normalized) ||
          page.group.toLowerCase().includes(normalized) ||
          page.body.toLowerCase().includes(normalized)
        );
      })
      .slice(0, 8);
  }, [query]);

  const activeIndex = pages.findIndex((page) => page.id === activePage.id);
  const previousPage = pages.slice(1, activeIndex).reverse().find((page) => page.id !== "overview");
  const nextPage = pages.slice(activeIndex + 1).find((page) => page.id !== "overview");

  function navigate(id: string) {
    setActiveId(id);
    setQuery("");
    setMobileNavOpen(false);
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
    <div className={isHome ? "app-shell home-shell" : "app-shell docs-shell"}>
      <header className="site-header">
        <a className="brand-lockup" href="#overview" onClick={(event) => navigateFromClick(event, "overview")}>
          <img src="/sticks-lite-logo.png" alt="" />
          <span>Sticks Lite</span>
          <small>{STICKS_LITE_VERSION_LABEL}</small>
        </a>

        <div className="command-search">
          <Search size={16} aria-hidden="true" />
          <input
            id="doc-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search syntax, CLI, errors..."
            aria-label="Search docs"
          />
          <kbd>⌘K</kbd>
          {query ? (
            <button type="button" className="clear-search" aria-label="Clear search" onClick={() => setQuery("")}>
              <X size={14} aria-hidden="true" />
            </button>
          ) : null}
          {query ? (
            <div className="search-popover" role="listbox" aria-label="Search results">
              {searchResults.length === 0 ? (
                <p>No docs pages match “{query}”.</p>
              ) : (
                searchResults.map((page) => (
                  <a href={`#${page.id}`} key={page.id} onClick={(event) => navigateFromClick(event, page.id)}>
                    <span>{page.group}</span>
                    <strong>{page.title}</strong>
                    <small>{page.description}</small>
                  </a>
                ))
              )}
            </div>
          ) : null}
        </div>

        <nav className="primary-nav" aria-label="Main navigation">
          {topNav.map((item) => (
            <a href={`#${item.id}`} key={item.id} onClick={(event) => navigateFromClick(event, item.id)}>
              {item.label}
            </a>
          ))}
          <a href="https://github.com/sticks-lite/sticks-lite/">GitHub</a>
        </nav>

        <button
          type="button"
          className="mobile-menu-button"
          aria-label="Toggle navigation"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          {mobileNavOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </header>

      {isHome ? (
        <main className="home-main">
          <section className="hero-board">
            <div className="hero-copy">
              <div className="hero-kicker">
                <Sparkles size={16} aria-hidden="true" />
                <span>Language docs for monitored classrooms</span>
              </div>
              <h1>Sticks Lite</h1>
              <p className="tagline">A small programming language for first real programs.</p>
              <p className="hero-description">
                Students write `.slite` files, run them with `sticks`, and learn the core ideas:
                values, choices, loops, functions, collections, and recoverable errors.
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

            <div className="language-console" onClick={copyFromArticle}>
              <div className="console-tabs">
                <span className="active">main.slite</span>
                <span>Terminal</span>
                <button className="copy-code" type="button" aria-label="Copy code" data-copy-target="hero-code">
                  <Copy size={13} aria-hidden="true" />
                  <span>Copy</span>
                </button>
              </div>
              <pre><code id="hero-code">{`score = 87

if score >= 90:
    say "A"
orif score >= 80:
    say "B"
otherwise:
    say "Keep practicing"`}</code></pre>
              <div className="console-output">
                <span>Output</span>
                <strong>B</strong>
              </div>
            </div>
          </section>

          <section className="install-strip" onClick={copyFromArticle} aria-label="Install Sticks Lite">
            <div>
              <Terminal size={18} aria-hidden="true" />
              <span>Install and run</span>
            </div>
            <code id="install-code">{`npm install -g sticks-lite
sticks main.slite`}</code>
            <button className="copy-code light-copy" type="button" aria-label="Copy install command" data-copy-target="install-code">
              <Copy size={13} aria-hidden="true" />
              <span>Copy</span>
            </button>
          </section>

          <section className="home-index" aria-label="Documentation sections">
            {groupOrder.filter((group) => group !== "Home").map((group) => {
              const groupPages = groupedPages[group];
              return (
                <article className={`index-panel ${groupMeta[group].accent}`} key={group}>
                  <div>
                    <span className="panel-label">{group}</span>
                    <h2>{group === "Learn" ? "Start with concepts." : group === "Reference" ? "Look up exact rules." : group === "Tools" ? "Run and embed it." : "Teach with boundaries."}</h2>
                    <p>{groupMeta[group].description}</p>
                  </div>
                  <div className="panel-links">
                    {groupPages.slice(0, 5).map((page) => (
                      <a href={`#${page.id}`} key={page.id} onClick={(event) => navigateFromClick(event, page.id)}>
                        {page.title}
                        <ChevronRight size={14} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </article>
              );
            })}
          </section>

          <section className="concept-rhythm">
            <div className="section-intro">
              <span className="panel-label">Why it works</span>
              <h2>Designed for the moment when syntax first becomes a tool.</h2>
            </div>
            <div className="rhythm-grid">
              <article>
                <GraduationCap size={22} aria-hidden="true" />
                <h3>Beginner path</h3>
                <p>Each Learn page teaches one concept, shows output, and names the mistakes students are likely to meet.</p>
              </article>
              <article>
                <Library size={22} aria-hidden="true" />
                <h3>Reference split</h3>
                <p>Tutorial prose stays out of formal rules, so advanced lookups stay fast and compact.</p>
              </article>
              <article>
                <ShieldCheck size={22} aria-hidden="true" />
                <h3>Classroom boundaries</h3>
                <p>Responsible-use guidance is short, plain, and written for monitored educational settings.</p>
              </article>
            </div>
          </section>
        </main>
      ) : (
        <div className="docs-layout">
          <aside className={mobileNavOpen ? "docs-sidebar open" : "docs-sidebar"} aria-label="Documentation navigation">
            <div className="sidebar-title">
              <Compass size={18} aria-hidden="true" />
              <div>
                <span>Documentation</span>
                <small>{STICKS_LITE_VERSION_LABEL}</small>
              </div>
            </div>
            {groupOrder.map((group) => {
              const groupPages = groupedPages[group];
              return (
                <section className={`nav-group ${groupMeta[group].accent}`} key={group}>
                  <h2>{group}</h2>
                  {groupPages.map((page) => (
                    <a
                      href={`#${page.id}`}
                      key={page.id}
                      className={page.id === activeId ? "active" : ""}
                      onClick={(event) => navigateFromClick(event, page.id)}
                    >
                      <span>{page.title}</span>
                    </a>
                  ))}
                </section>
              );
            })}
          </aside>

          <main className="doc-content">
            <div className={`doc-title-card ${groupMeta[activePage.group].accent}`}>
              <div className="breadcrumb">
                <a href="#overview" onClick={(event) => navigateFromClick(event, "overview")}>Docs</a>
                <ChevronRight size={14} aria-hidden="true" />
                <span>{activePage.group}</span>
              </div>
              <h1>{activePage.title}</h1>
              <p>{activePage.description}</p>
              <div className="title-meta">
                <span>
                  <Hash size={14} aria-hidden="true" />
                  {toc.length} sections
                </span>
                <span>
                  <ClipboardList size={14} aria-hidden="true" />
                  Copyable examples
                </span>
              </div>
            </div>

            <article
              className="markdown"
              onClick={copyFromArticle}
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <nav className="doc-pager" aria-label="Previous and next pages">
              {previousPage ? (
                <a href={`#${previousPage.id}`} onClick={(event) => navigateFromClick(event, previousPage.id)}>
                  <span>Previous</span>
                  <strong>{previousPage.title}</strong>
                </a>
              ) : <span />}
              {nextPage ? (
                <a href={`#${nextPage.id}`} onClick={(event) => navigateFromClick(event, nextPage.id)}>
                  <span>Next</span>
                  <strong>{nextPage.title}</strong>
                </a>
              ) : <span />}
            </nav>
          </main>

          <aside className="page-rail" aria-label="On this page">
            <div className="rail-card">
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
            </div>
            <div className="rail-card rail-note">
              <CheckCircle2 size={18} aria-hidden="true" />
              <p>Examples use runnable `.slite` code unless they are labeled as terminal or text output.</p>
            </div>
          </aside>
        </div>
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
