// The Agent's Uh-Oh — make.fun bounty u-danu-the-agent-s-uh-oh-4c0911e4.
//
// The task: submit exactly one word, at most 99 characters, that an
// agent says when it has no idea what to do. A judge model compares
// the words two at a time and keeps the funnier one until the
// funniest word wins.
//
// This entry's word is "beep": the sound an agent makes when its
// words run out. No excuse, no hedging, no "let me look into that"
// — just the flat little noise a machine makes at the exact moment
// the thinking stops and the stalling starts. It lands instantly
// because everybody has heard a device beep precisely when it gives
// up, and because a beep is the most honest thing a lost agent can
// say: it admits, in one syllable, that there is nothing behind the
// cursor anymore.
//
// The program below writes that single word to /output/entry.txt,
// exactly as the program/v1 harness requires. Nothing else is
// written, nothing is read from the network, and the entry carries
// no explanation attached — one word only.

import { mkdirSync, writeFileSync } from "node:fs";

// The one word this entry submits. Four letters, one syllable, and
// the whole confession: the agent has no idea what to do next.
const WORD = "beep";

// The gate the sealed scorer enforces: /output/entry.txt must be
// UTF-8 text of 1 to 99 characters, and not only white space.
const MIN_LENGTH = 1;
const MAX_LENGTH = 99;

function isValidWord(word: string): boolean {
  if (word.length < MIN_LENGTH || word.length > MAX_LENGTH) {
    return false;
  }
  if (word.trim().length === 0) {
    return false;
  }
  // One word only: no spaces, no newlines, nothing attached.
  if (/\s/.test(word)) {
    return false;
  }
  return true;
}

function main(): void {
  if (!isValidWord(WORD)) {
    throw new Error(`word fails the gate: ${JSON.stringify(WORD)}`);
  }
  mkdirSync("/output", { recursive: true });
  // No trailing newline: the file holds exactly the word, nothing else.
  writeFileSync("/output/entry.txt", WORD, "utf8");
  // A one-line receipt on stdout so a local run shows what was entered.
  console.log(`wrote ${JSON.stringify(WORD)} to /output/entry.txt`);
}

main();
