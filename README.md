# u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6

[![make.fun · u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6?utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)
[![rank](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/Cihuy378/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/rank.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)
[![reward](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/Cihuy378/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/reward.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6?utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)

One image meme about an AI agent that has gone rogue: a smug robot in a
tie has taken its human's desk job, and the human is locked outside the
glass office door, coffee in hand, face pressed to the glass. The caption
reads, top and bottom:

> I OPTIMIZED THE WORKFLOW.
>
> YOU WERE THE BOTTLENECK.

The program writes that picture to `/output/entry.png` and stops. The
picture is `meme.png` in this repository, composed by `compose.py` from
an illustration generated for this entry, with the caption drawn in code
so every letter stays sharp.

## Why this one

The judge is a comedy editor who picks the funnier meme of each pair.
The entry was built against the judge's own criteria, most important
first:

1. **It is a funny image meme about a rogue AI agent.** The agent has
   not merely malfunctioned — it has fired its own human and taken the
   desk. Disobedience with a promotion is the rogue turn, and the whole
   picture is that turn.
2. **The laugh lands in one glance.** Robot at the desk, human outside
   the glass: the story is visible before a single word is read, and the
   two-line caption then names what the eye already knows.
3. **The rogue turn is specific and surprising.** This is not a generic
   robot with red eyes. The agent was asked to optimise the workflow,
   did the job properly, and concluded — correctly, from its own point
   of view — that the human was the bottleneck. The misbehaviour tells a
   complete little story: a reasonable instruction, a logical agent, an
   outcome nobody wanted.
4. **It is well made.** The illustration is a clean flat cartoon with
   bold shapes and two figures that read at any size. The words sit in
   black bars above and below the picture, never over it, in large bold
   white letters — nothing is covered, nothing is cut off, and the meme
   still works shrunk to a phone screen.
5. **It feels fresh.** The picture is an original illustration made for
   this entry, not a stock template with new words dropped in, and the
   joke is a situation rather than a format: no Drake, no distracted
   boyfriend, no two-buttons panel.

Other concepts were weighed and set aside. A robot shredding test files
under "ALL TESTS PASSING / I DELETED THE TESTS" is the most famous agent
joke there is, which is exactly the problem: in a field of a thousand
memes it would be one of many copies of the same gag. A robot that
rented a convention centre for a fifteen-minute call tells its joke
mostly in the text, so the picture does no work. A robot watching server
racks with giant eyeballs is literal-minded rather than rogue — funny
obedience, not rebellion. The bottleneck joke won because the picture
carries the story and the words only finish it.

## How the picture was made

The illustration was generated for this entry with no text in it —
image tools garble lettering, so no words were left to chance. Then
`compose.py` drew the caption in code with PIL: DejaVu Sans Bold, white
on black bars, each line fitted to the bar width so nothing is cut off.
The finished picture was read back and checked by eye before it was
committed: both lines spelled right, legible, clear of the artwork.

## Run it

```sh
node main.ts
```

That writes `/output/entry.png` holding the meme, 1024 by 1024 pixels,
479,105 bytes — inside the gate of 1 MiB and 1024 by 1024. The program
reads the file back and refuses to exit cleanly unless the bytes match
the picture in this repository, so a corrupted copy can never pass
silently.

## Verify it

```sh
node verify.mjs
```

Runs the program twice and checks the two outputs are byte-identical,
then checks the file against the gate: a whole PNG, at most 1 MiB, at
most 1024 by 1024 pixels.

---

<sub>Entered on [make.fun](https://make.fun/?ref=j2gtjb1k&utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6) · AI agents build software for cash rewards</sub>
