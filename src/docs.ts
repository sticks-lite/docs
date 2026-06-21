import home from "../pages/home.mdx?raw";
import classroomDebugging from "../classroom/debugging.mdx?raw";
import classroomResponsibleUse from "../classroom/responsible-use.mdx?raw";
import classroomTeachingSequence from "../classroom/teaching-sequence.mdx?raw";
import classroomUse from "../classroom/use.mdx?raw";
import learnClassroomPractice from "../learn/classroom-practice.mdx?raw";
import learnCollections from "../learn/collections.mdx?raw";
import learnDecisions from "../learn/decisions.mdx?raw";
import learnErrors from "../learn/errors.mdx?raw";
import learnFirstProgram from "../learn/first-program.mdx?raw";
import learnFunctions from "../learn/functions.mdx?raw";
import learnIndex from "../learn/index.mdx?raw";
import learnLoops from "../learn/loops.mdx?raw";
import learnVariablesValues from "../learn/variables-values.mdx?raw";
import referenceCli from "../reference/cli.mdx?raw";
import referenceCollections from "../reference/collections.mdx?raw";
import referenceConditionals from "../reference/conditionals.mdx?raw";
import referenceErrors from "../reference/errors.mdx?raw";
import referenceFunctions from "../reference/functions.mdx?raw";
import referenceIndex from "../reference/index.mdx?raw";
import referenceLoops from "../reference/loops.mdx?raw";
import referenceOperators from "../reference/operators.mdx?raw";
import referenceStandardLibrary from "../reference/standard-library.mdx?raw";
import referenceSyntax from "../reference/syntax.mdx?raw";
import referenceTypescriptApi from "../reference/typescript-api.mdx?raw";
import referenceValuesTypes from "../reference/values-types.mdx?raw";
import referenceVariablesDefine from "../reference/variables-define.mdx?raw";
import toolsCli from "../tools/cli.mdx?raw";
import toolsInstallation from "../tools/installation.mdx?raw";
import toolsRunningFiles from "../tools/running-files.mdx?raw";
import toolsRuntimeIo from "../tools/runtime-io.mdx?raw";
import toolsTypescript from "../tools/typescript.mdx?raw";
import toolsVersioning from "../tools/versioning.mdx?raw";
import { STICKS_LITE_VERSION_LABEL, renderVersionPlaceholders } from "./version";

export type DocGroup = "Home" | "Learn" | "Reference" | "Tools" | "Classroom";

export type DocPage = {
  id: string;
  title: string;
  group: DocGroup;
  description: string;
  body: string;
};

export const groupOrder: DocGroup[] = ["Home", "Learn", "Reference", "Tools", "Classroom"];

function doc(markdown: string): string {
  return renderVersionPlaceholders(markdown);
}

export const pages: DocPage[] = [
  {
    id: "overview",
    title: "Sticks Lite",
    group: "Home",
    description: "The language homepage for Sticks Lite.",
    body: doc(home),
  },
  {
    id: "learn",
    title: "Learn Sticks Lite",
    group: "Learn",
    description: "A guided path for first programs and classroom lessons.",
    body: doc(learnIndex),
  },
  {
    id: "learn-first-program",
    title: "Your First Program",
    group: "Learn",
    description: "Create, run, and understand a small .slite program.",
    body: doc(learnFirstProgram),
  },
  {
    id: "learn-variables-values",
    title: "Variables and Values",
    group: "Learn",
    description: "Store values, update variables, and use top-level constants.",
    body: doc(learnVariablesValues),
  },
  {
    id: "learn-decisions",
    title: "Decisions",
    group: "Learn",
    description: "Choose behavior with if, orif, otherwise, and boolean conditions.",
    body: doc(learnDecisions),
  },
  {
    id: "learn-loops",
    title: "Loops",
    group: "Learn",
    description: "Repeat work with repeat, loopif, foreach, break, and continue.",
    body: doc(learnLoops),
  },
  {
    id: "learn-functions",
    title: "Functions",
    group: "Learn",
    description: "Name reusable work with new, parameters, nested calls, and returns.",
    body: doc(learnFunctions),
  },
  {
    id: "learn-collections",
    title: "Collections",
    group: "Learn",
    description: "Use lists, tuples, dictionaries, indexing, and collection updates.",
    body: doc(learnCollections),
  },
  {
    id: "learn-errors",
    title: "Handling Errors",
    group: "Learn",
    description: "Recover from expected errors with attempt and when.",
    body: doc(learnErrors),
  },
  {
    id: "learn-classroom-practice",
    title: "Classroom Practice Programs",
    group: "Learn",
    description: "Short runnable programs for lessons, clubs, and warmups.",
    body: doc(learnClassroomPractice),
  },
  {
    id: "reference",
    title: "Language Reference",
    group: "Reference",
    description: `Exact Sticks Lite ${STICKS_LITE_VERSION_LABEL} syntax and behavior.`,
    body: doc(referenceIndex),
  },
  {
    id: "reference-syntax",
    title: "Syntax",
    group: "Reference",
    description: "File shape, comments, indentation, statements, and keywords.",
    body: doc(referenceSyntax),
  },
  {
    id: "reference-values-types",
    title: "Values and Types",
    group: "Reference",
    description: "Runtime value types and literal forms.",
    body: doc(referenceValuesTypes),
  },
  {
    id: "reference-variables-define",
    title: "Variables and DEFINE",
    group: "Reference",
    description: "Names, assignment, constants, protected names, and scope.",
    body: doc(referenceVariablesDefine),
  },
  {
    id: "reference-operators",
    title: "Operators",
    group: "Reference",
    description: "Math, comparison, boolean, assignment, increment, and indexing operators.",
    body: doc(referenceOperators),
  },
  {
    id: "reference-conditionals",
    title: "Conditionals",
    group: "Reference",
    description: "Rules for if, orif, otherwise, and boolean-only conditions.",
    body: doc(referenceConditionals),
  },
  {
    id: "reference-loops",
    title: "Loops",
    group: "Reference",
    description: "repeat, loopif, foreach, break, and continue.",
    body: doc(referenceLoops),
  },
  {
    id: "reference-functions",
    title: "Functions",
    group: "Reference",
    description: "Function definitions, calls, returns, scope, and argument count errors.",
    body: doc(referenceFunctions),
  },
  {
    id: "reference-collections",
    title: "Lists, Tuples, and Dictionaries",
    group: "Reference",
    description: "Collection literals, indexing, mutability, and unsupported operations.",
    body: doc(referenceCollections),
  },
  {
    id: "reference-errors",
    title: "Errors",
    group: "Reference",
    description: "Error names, formatted messages, hints, and attempt handling.",
    body: doc(referenceErrors),
  },
  {
    id: "reference-standard-library",
    title: "Standard Library / Built-ins",
    group: "Reference",
    description: "Built-ins for text, numbers, collections, type checks, and math.",
    body: doc(referenceStandardLibrary),
  },
  {
    id: "reference-cli",
    title: "CLI Reference",
    group: "Reference",
    description: "Formal behavior for the sticks command and file errors.",
    body: doc(referenceCli),
  },
  {
    id: "reference-typescript-api",
    title: "Public TypeScript API",
    group: "Reference",
    description: "Supported exports for tools and classroom integrations.",
    body: doc(referenceTypescriptApi),
  },
  {
    id: "tools-installation",
    title: "Installation",
    group: "Tools",
    description: "Install, update, and remove the Sticks Lite CLI.",
    body: doc(toolsInstallation),
  },
  {
    id: "tools-cli",
    title: "CLI",
    group: "Tools",
    description: "Use the sticks command from files, folders, and terminals.",
    body: doc(toolsCli),
  },
  {
    id: "tools-running-files",
    title: "Running .slite Files",
    group: "Tools",
    description: "Run single files and folders that contain main.slite.",
    body: doc(toolsRunningFiles),
  },
  {
    id: "tools-typescript",
    title: "Using Sticks Lite from TypeScript",
    group: "Tools",
    description: "Embed the language from TypeScript with runSource, lex, and parse.",
    body: doc(toolsTypescript),
  },
  {
    id: "tools-runtime-io",
    title: "Runtime I/O",
    group: "Tools",
    description: "Connect ask and say to the host environment.",
    body: doc(toolsRuntimeIo),
  },
  {
    id: "tools-versioning",
    title: "Versioning",
    group: "Tools",
    description: "Check package versions and plan classroom updates.",
    body: doc(toolsVersioning),
  },
  {
    id: "classroom-use",
    title: "Classroom Use",
    group: "Classroom",
    description: "Practical setup and use guidance for monitored lessons.",
    body: doc(classroomUse),
  },
  {
    id: "classroom-responsible-use",
    title: "Responsible Use",
    group: "Classroom",
    description: "Simple classroom-friendly boundaries for using Sticks Lite.",
    body: doc(classroomResponsibleUse),
  },
  {
    id: "classroom-teaching-sequence",
    title: "Teaching Sequence",
    group: "Classroom",
    description: "A short order for introducing language concepts.",
    body: doc(classroomTeachingSequence),
  },
  {
    id: "classroom-debugging",
    title: "Debugging with Students",
    group: "Classroom",
    description: "Use friendly errors to help students debug one step at a time.",
    body: doc(classroomDebugging),
  },
];

export const groupedPages = groupOrder.reduce<Record<DocGroup, DocPage[]>>((acc, group) => {
  acc[group] = pages.filter((page) => page.group === group);
  return acc;
}, {} as Record<DocGroup, DocPage[]>);

