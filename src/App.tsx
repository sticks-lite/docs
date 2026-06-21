import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  GraduationCap,
  Menu,
  Play,
  Search,
  ShieldCheck,
  Terminal,
  X
} from "lucide-react";
import { marked } from "marked";
import { type MouseEvent, useEffect, useMemo, useState } from "react";
import { defaultPageId, pageById, pages, sectionPages, sections, type DocPage, type SectionId } from "./content";
import { STICKS_LITE_VERSION, withVersionPlaceholders } from "./version";

type TocItem = {
  id: string;
  text: string;
  depth: number;
};

const sectionIcons: Record<SectionId, typeof BookOpen> = {
  learn: GraduationCap,
  reference: BookOpen,
  tools: Terminal,
  classroom: ShieldCheck
};

marked.setOptions({
  gfm: true,
  breaks: false
});

function hashTarget(): string {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (!hash) return "home";
  const [pageId] = hash.split("--");
  return pageById.has(pageId) ? pageId : hash;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractToc(markdown: string, pageId: string): TocItem[] {
  return withVersionPlaceholders(markdown)
    .split("\n")
    .map((line) => /^(#{2,3})\s+(.+)$/.exec(line))
    .filter((match): match is RegExpExecArray => Boolean(match))
    .map((match) => ({
      id: `${pageId}--${slugify(match[2])}`,
      text: match[2].replace(/`/g, ""),
      depth: match[1].length
    }));
}

function renderMarkdown(markdown: string): string {
  return marked.parse(withVersionPlaceholders(markdown), { async: false }) as string;
}

function searchBlob(page: DocPage): string {
  return `${page.title} ${page.description} ${page.body}`.toLowerCase();
}

export default function App() {
  const [activeId, setActiveId] = useState(hashTarget);
  const [query, setQuery] = useState("");
  const [navOpen, setNavOpen] = useState(false);

  const activePage = pageById.get(activeId);
  const isHome = activeId === "home" || !activePage;

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return pages.filter((page) => searchBlob(page).includes(normalized)).slice(0, 8);
  }, [query]);

  useEffect(() => {
    const onHashChange = () => setActiveId(hashTarget());
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, []);

  useEffect(() => {
    setNavOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [activeId]);

  function navigate(id: string) {
    setQuery("");
    window.location.hash = id === "home" ? "" : id;
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="nav-toggle" type="button" aria-label="Open navigation" onClick={() => setNavOpen(true)}>
          <Menu size={20} />
        </button>
        <button className="brand-mark" type="button" onClick={() => navigate("home")} aria-label="Sticks Lite home">
          <img src="/sticks-lite-logo.png" alt="" />
          <span>
            <strong>Sticks Lite</strong>
            <small>Docs</small>
          </span>
        </button>
        <nav className="top-links" aria-label="Main navigation">
          <button type="button" onClick={() => navigate(defaultPageId)}>
            Learn
          </button>
          <button type="button" onClick={() => navigate("reference")}>
            Reference
          </button>
          <button type="button" onClick={() => navigate("tools-installation")}>
            Tools
          </button>
          <button type="button" onClick={() => navigate("classroom-use")}>
            Classroom
          </button>
        </nav>
        <SearchBox query={query} setQuery={setQuery} results={searchResults} onChoose={navigate} />
      </header>

      {isHome ? (
        <Home onNavigate={navigate} />
      ) : (
        <DocsLayout
          activePage={activePage}
          navOpen={navOpen}
          onCloseNav={() => setNavOpen(false)}
          onNavigate={navigate}
        />
      )}
    </div>
  );
}

function SearchBox({
  query,
  setQuery,
  results,
  onChoose
}: {
  query: string;
  setQuery: (value: string) => void;
  results: DocPage[];
  onChoose: (id: string) => void;
}) {
  return (
    <div className="search-wrap">
      <Search size={17} aria-hidden="true" />
      <input
        type="search"
        value={query}
        placeholder="Search docs"
        aria-label="Search docs"
        onChange={(event) => setQuery(event.target.value)}
      />
      {query.trim() && (
        <div className="search-results" role="listbox">
          {results.length > 0 ? (
            results.map((page) => (
              <button key={page.id} type="button" onClick={() => onChoose(page.id)}>
                <span>{page.title}</span>
                <small>{page.description}</small>
              </button>
            ))
          ) : (
            <p>No matching pages.</p>
          )}
        </div>
      )}
    </div>
  );
}

function Home({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Sticks Lite {STICKS_LITE_VERSION}</p>
          <h1>A small classroom language for first programs.</h1>
          <p className="hero-lede">
            Sticks Lite programs are saved as <code>.slite</code> files and run with the <code>sticks</code> command.
            The language teaches values, choices, loops, functions, collections, and recoverable errors in monitored
            educational settings.
          </p>
          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={() => onNavigate(defaultPageId)}>
              <Play size={18} />
              Start learning
            </button>
            <button className="secondary-action" type="button" onClick={() => onNavigate("reference")}>
              Read the reference
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="hero-console" aria-label="Install and first program">
          <div className="console-bar">
            <span>Terminal</span>
            <CopyButton text="npm install -g sticks-lite" />
          </div>
          <pre><code>npm install -g sticks-lite{"\n"}sticks main.slite</code></pre>
          <div className="program-card">
            <div className="program-tabs">
              <span>main.slite</span>
              <small>first run</small>
            </div>
            <pre><code>{`DEFINE PASSING_SCORE = 70

score = 84

if score >= PASSING_SCORE:
    say "Passing"
otherwise:
    say "Keep practicing"`}</code></pre>
          </div>
        </div>
      </section>

      <section className="quick-links" aria-label="Documentation paths">
        <PathCard
          icon={GraduationCap}
          title="Learn"
          text="A guided beginner path with small runnable examples and expected output."
          onClick={() => onNavigate(defaultPageId)}
        />
        <PathCard
          icon={BookOpen}
          title="Reference"
          text="Exact rules for syntax, values, functions, collections, errors, built-ins, CLI, and API."
          onClick={() => onNavigate("reference")}
        />
        <PathCard
          icon={Terminal}
          title="Tools"
          text="Install the CLI, run files, embed the interpreter, and connect runtime I/O."
          onClick={() => onNavigate("tools-installation")}
        />
      </section>

      <section className="feature-band">
        <div>
          <p className="eyebrow">Language shape</p>
          <h2>Readable enough for beginners, precise enough to document.</h2>
        </div>
        <div className="feature-grid">
          <Feature title=".slite files" text="Programs run as a file or a folder with main.slite." />
          <Feature title="Indentation blocks" text="Blocks begin after a colon and are shown by indentation." />
          <Feature title="Friendly errors" text="Errors include names, locations, and hints for debugging." />
          <Feature title="TypeScript API" text="lex, parse, and runSource are public exports for tools." />
        </div>
      </section>

      <section className="classroom-note">
        <ShieldCheck size={22} />
        <div>
          <h2>For monitored classrooms</h2>
          <p>
            Sticks Lite is intended for supervised learning. Teachers, mentors, or parents should review lesson goals
            and decide what students run.
          </p>
        </div>
        <button type="button" onClick={() => onNavigate("classroom-responsible-use")}>
          Responsible use
          <ChevronRight size={17} />
        </button>
      </section>
    </main>
  );
}

function PathCard({
  icon: Icon,
  title,
  text,
  onClick
}: {
  icon: typeof BookOpen;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button className="path-card" type="button" onClick={onClick}>
      <span className="path-icon"><Icon size={22} /></span>
      <strong>{title}</strong>
      <span>{text}</span>
      <ChevronRight size={18} />
    </button>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="feature">
      <CheckCircle2 size={19} />
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function DocsLayout({
  activePage,
  navOpen,
  onCloseNav,
  onNavigate
}: {
  activePage: DocPage;
  navOpen: boolean;
  onCloseNav: () => void;
  onNavigate: (id: string) => void;
}) {
  const html = useMemo(() => renderMarkdown(activePage.body), [activePage]);
  const toc = useMemo(() => extractToc(activePage.body, activePage.id), [activePage]);
  const activeIndex = pages.findIndex((page) => page.id === activePage.id);
  const previousPage = activeIndex > 0 ? pages[activeIndex - 1] : undefined;
  const nextPage = activeIndex < pages.length - 1 ? pages[activeIndex + 1] : undefined;

  useEffect(() => {
    const article = document.querySelector<HTMLElement>(".doc-article");
    if (!article) return;

    for (const heading of article.querySelectorAll<HTMLHeadingElement>("h2, h3")) {
      heading.id = `${activePage.id}--${slugify(heading.textContent ?? "")}`;
    }

    for (const pre of article.querySelectorAll<HTMLPreElement>("pre")) {
      if (pre.querySelector(".copy-code")) continue;
      const code = pre.querySelector("code");
      if (!code) continue;
      const button = document.createElement("button");
      button.className = "copy-code";
      button.type = "button";
      button.innerHTML = "<span>Copy</span>";
      button.addEventListener("click", async () => {
        await writeClipboard(code.textContent ?? "");
        button.innerHTML = "<span>Copied</span>";
        window.setTimeout(() => {
          button.innerHTML = "<span>Copy</span>";
        }, 1200);
      });
      pre.append(button);
    }

    const requested = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (requested.includes("--")) {
      document.getElementById(requested)?.scrollIntoView({ block: "start" });
    }
  }, [activePage, html]);

  function onArticleClick(event: MouseEvent<HTMLElement>) {
    const link = (event.target as HTMLElement).closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href?.startsWith("#")) return;
    const target = href.slice(1);
    if (pageById.has(target)) {
      event.preventDefault();
      onNavigate(target);
      return;
    }
    const [pageId] = target.split("--");
    if (pageId === activePage.id) {
      event.preventDefault();
      window.history.replaceState(null, "", `#${target}`);
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="docs-frame">
      <aside className={`sidebar ${navOpen ? "open" : ""}`}>
        <div className="sidebar-head">
          <button className="brand-mini" type="button" onClick={() => onNavigate("home")}>
            <img src="/sticks-lite-logo.png" alt="" />
            <span>Sticks Lite</span>
          </button>
          <button className="close-nav" type="button" aria-label="Close navigation" onClick={onCloseNav}>
            <X size={19} />
          </button>
        </div>
        <nav aria-label="Docs navigation">
          {sections.map((section) => {
            const Icon = sectionIcons[section.id];
            return (
              <div className="nav-group" key={section.id}>
                <div className="nav-group-title">
                  <Icon size={16} />
                  <span>{section.title}</span>
                </div>
                {sectionPages(section.id).map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    className={page.id === activePage.id ? "active" : ""}
                    onClick={() => onNavigate(page.id)}
                  >
                    {page.label ?? page.title}
                  </button>
                ))}
              </div>
            );
          })}
        </nav>
      </aside>

      <main className="doc-main">
        <div className="doc-kicker">
          <span>{sections.find((section) => section.id === activePage.section)?.title}</span>
          <ChevronRight size={15} />
          <span>{activePage.title}</span>
        </div>
        <article className="doc-article" onClick={onArticleClick} dangerouslySetInnerHTML={{ __html: html }} />
        <div className="page-turns">
          {previousPage ? (
            <button type="button" onClick={() => onNavigate(previousPage.id)}>
              <small>Previous</small>
              <span>{previousPage.title}</span>
            </button>
          ) : <span />}
          {nextPage && (
            <button type="button" onClick={() => onNavigate(nextPage.id)}>
              <small>Next</small>
              <span>{nextPage.title}</span>
            </button>
          )}
        </div>
      </main>

      <aside className="toc">
        <div className="toc-card">
          <p>On this page</p>
          {toc.length > 0 ? (
            toc.map((item) => (
              <a key={item.id} className={item.depth === 3 ? "indent" : ""} href={`#${item.id}`}>
                {item.text}
              </a>
            ))
          ) : (
            <span>No headings</span>
          )}
        </div>
      </aside>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="copy-inline"
      type="button"
      onClick={async () => {
        await writeClipboard(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      }}
    >
      <Clipboard size={15} />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

async function writeClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall through to the selection-based fallback.
    }
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}
