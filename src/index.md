---
layout: doc
aside: false
title: Sticks Lite
description: Sticks Lite programs are saved as .slite files and run with the sticks command.
---

<div class="lite-home">
  <section class="lite-hero">
    <div>
      <span class="eyebrow">Educational language for classrooms</span>
      <h1>Sticks Lite</h1>
      <p class="tagline">
        Sticks Lite is a small programming language for monitored classroom environments.
        Students write <code>.slite</code> files, run them with the <code>sticks</code> command, and learn
        core programming ideas through readable syntax and friendly errors.
      </p>
      <VersionBadge />
      <div class="hero-actions">
        <a href="/learn/">Start learning</a>
        <a href="/reference/">Open reference</a>
        <a href="/tools/installation">Install Sticks Lite</a>
      </div>
    </div>
    <div class="quick-panel">
      <div class="quick-stack">
        <div>
          <p>Install</p>
          <pre><code>npm install -g sticks-lite</code></pre>
        </div>
        <div>
          <p>Run</p>
          <pre><code>sticks run main.slite</code></pre>
        </div>
        <div>
          <p>main.slite</p>
          <pre><code>DEFINE PASSING_SCORE = 70&#10;&#10;score = 84&#10;&#10;if score &gt;= PASSING_SCORE:&#10;    say &quot;Passing&quot;&#10;otherwise:&#10;    say &quot;Keep practicing&quot;</code></pre>
        </div>
        <div>
          <p>Output</p>
          <pre><code>Passing</code></pre>
        </div>
      </div>
    </div>
  </section>

  <section class="home-band">
    <div class="path-card">
      <h3>Learn</h3>
      <p>A guided beginner path from the first program through variables, decisions, loops, functions, collections, and recoverable errors.</p>
      <a class="section-link primary" href="/learn/">Follow the path</a>
    </div>
    <div class="path-card">
      <h3>Reference</h3>
      <p>Exact syntax, value rules, operators, control flow, built-ins, CLI behavior, and public TypeScript exports.</p>
      <a class="section-link" href="/reference/">Look up a rule</a>
    </div>
    <div class="path-card">
      <h3>Tools</h3>
      <p>Install the package, run single files or folders, embed the runtime, and understand runtime input and output.</p>
      <a class="section-link" href="/tools/">Use the tools</a>
    </div>
    <div class="path-card">
      <h3>Classroom</h3>
      <p>Short guidance for teachers and mentors using Sticks Lite in supervised learning settings.</p>
      <a class="section-link" href="/classroom/">Plan a class</a>
    </div>
  </section>
</div>

## What Sticks Lite Teaches

Sticks Lite focuses on the ideas students usually meet first:

| Area | In Sticks Lite |
| --- | --- |
| Output and input | `say`, `ask` |
| Values | numbers, text, booleans, `null`, lists, tuples, dictionaries |
| Decisions | `if`, `orif`, `otherwise` |
| Loops | `repeat`, `loopif`, `foreach`, `break`, `continue` |
| Functions | `new`, parameters, nested calls, `return` |
| Errors | `attempt` and `when` |

<div class="doc-note">
  <p>Sticks Lite is intentionally small. It is useful for teaching beginner programming concepts, not for production apps or unsupervised execution of untrusted source files.</p>
</div>

## Files and Folders

Sticks Lite programs are saved as `.slite` files.

Run a single file:

```sh
sticks run main.slite
```

Run a folder that contains an entry file named exactly `main.slite`:

```sh
sticks run .
```

The exact lowercase filename keeps classroom projects consistent across Windows, macOS, and Linux.

## Where to Go Next

Start with [Your First Program](/learn/first-program), keep the [Language Reference](/reference/) nearby, and use [Classroom Use](/classroom/) when you are planning a lesson sequence.
