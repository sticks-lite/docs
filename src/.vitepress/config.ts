import { defineConfig } from "vitepress";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(readFileSync(resolve(here, "../../package.json"), "utf8")) as { version: string };

export default defineConfig({
  title: "Sticks Lite",
  description: "Documentation for the Sticks Lite educational programming language.",
  lang: "en-US",
  cleanUrls: true,
  outDir: "../dist",
  lastUpdated: true,
  metaChunk: true,
  head: [
    ["meta", { name: "theme-color", content: "#f7f3e8" }],
    ["link", { rel: "icon", href: "/sticks-lite-logo.png" }]
  ],
  markdown: {
    languages: [
      {
        name: "slite",
        scopeName: "source.slite",
        patterns: [
          { include: "#comments" },
          { include: "#strings" },
          { include: "#numbers" },
          { include: "#keywords" },
          { include: "#constants" },
          { include: "#operators" }
        ],
        repository: {
          comments: {
            patterns: [
              { name: "comment.line.number-sign.slite", match: "#.*$" },
              { name: "comment.block.slite", begin: "/\\*", end: "\\*/" }
            ]
          },
          strings: {
            patterns: [
              { name: "string.quoted.double.slite", begin: "\"", end: "\"", patterns: [{ name: "constant.character.escape.slite", match: "\\\\." }] },
              { name: "string.quoted.single.slite", begin: "'", end: "'", patterns: [{ name: "constant.character.escape.slite", match: "\\\\." }] }
            ]
          },
          numbers: {
            patterns: [{ name: "constant.numeric.slite", match: "\\b\\d+(?:\\.\\d+)?\\b" }]
          },
          keywords: {
            patterns: [
              {
                name: "keyword.control.slite",
                match: "\\b(?:DEFINE|if|orif|otherwise|repeat|times|loopif|foreach|in|break|continue|new|return|attempt|when|error|and|or|not|div|say|ask)\\b"
              }
            ]
          },
          constants: {
            patterns: [{ name: "constant.language.slite", match: "\\b(?:True|False|null)\\b" }]
          },
          operators: {
            patterns: [{ name: "keyword.operator.slite", match: "==|!=|<=|>=|\\+=|-=|\\*=|/=|%=|\\+\\+|--|[+\\-*/%=<>:]" }]
          }
        }
      }
    ]
  },
  vite: {
    cacheDir: "../node_modules/.vitepress-cache"
  },
  themeConfig: {
    logo: "/sticks-lite-logo.png",
    search: {
      provider: "local"
    },
    nav: [
      { text: "Learn", link: "/learn/" },
      { text: "Reference", link: "/reference/" },
      { text: "Tools", link: "/tools/" },
      { text: "Classroom", link: "/classroom/" },
      { text: `Version ${packageJson.version}`, link: "/tools/versioning" }
    ],
    sidebar: {
      "/learn/": [
        {
          text: "Learn",
          items: [
            { text: "Learn Sticks Lite", link: "/learn/" },
            { text: "Your First Program", link: "/learn/first-program" },
            { text: "Variables and Values", link: "/learn/variables-values" },
            { text: "Decisions", link: "/learn/decisions" },
            { text: "Loops", link: "/learn/loops" },
            { text: "Functions", link: "/learn/functions" },
            { text: "Collections", link: "/learn/collections" },
            { text: "Handling Errors", link: "/learn/errors" },
            { text: "Practice Programs", link: "/learn/practice" }
          ]
        }
      ],
      "/reference/": [
        {
          text: "Language Reference",
          items: [
            { text: "Overview", link: "/reference/" },
            { text: "Syntax", link: "/reference/syntax" },
            { text: "Grammar", link: "/reference/grammar" },
            { text: "Values and Types", link: "/reference/values-types" },
            { text: "Variables and DEFINE", link: "/reference/variables-define" },
            { text: "Operators", link: "/reference/operators" },
            { text: "Conditionals", link: "/reference/conditionals" },
            { text: "Loops", link: "/reference/loops" },
            { text: "Functions", link: "/reference/functions" },
            { text: "Collections", link: "/reference/collections" },
            { text: "Errors", link: "/reference/errors" },
            { text: "Built-ins", link: "/reference/built-ins" },
            { text: "CLI Reference", link: "/reference/cli" },
            { text: "TypeScript API", link: "/reference/typescript-api" }
          ]
        }
      ],
      "/tools/": [
        {
          text: "Tools",
          items: [
            { text: "Overview", link: "/tools/" },
            { text: "Installation", link: "/tools/installation" },
            { text: "CLI", link: "/tools/cli" },
            { text: "Running Files", link: "/tools/running-files" },
            { text: "Using TypeScript", link: "/tools/typescript" },
            { text: "Runtime I/O", link: "/tools/runtime-io" },
            { text: "Versioning", link: "/tools/versioning" }
          ]
        }
      ],
      "/classroom/": [
        {
          text: "Classroom",
          items: [
            { text: "Classroom Use", link: "/classroom/" },
            { text: "Responsible Use", link: "/classroom/responsible-use" },
            { text: "Teaching Sequence", link: "/classroom/teaching-sequence" },
            { text: "Debugging With Students", link: "/classroom/debugging" }
          ]
        }
      ]
    },
    socialLinks: [{ icon: "github", link: "https://github.com/sticks-lite/sticks-lite" }],
    outline: {
      level: [2, 3]
    },
    editLink: {
      pattern: "https://github.com/sticks-lite/docs/edit/main/src/:path",
      text: "Edit this page"
    },
    footer: {
      message: "Sticks Lite is intended for monitored educational environments.",
      copyright: "Released under the MIT License."
    }
  }
});
