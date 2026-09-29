---
# ------------------------------------------------------------------
# NEW PROJECT TEMPLATE
# 1. Copy this file into the _projects folder.
# 2. Rename it with a short name, e.g. _projects/pid-line-follower.md
#    (that name becomes the web address: /projects/pid-line-follower/).
# 3. Fill in every line below, then write the page underneath.
# Lines starting with # are notes to you. You can delete them.
# ------------------------------------------------------------------

title: Project Name Here
summary: One sentence a recruiter can skim. What did you build, and what does it do?

# Small label on the card: the course, team, or "Personal project".
context: CSEE 0000 · Course Name

# Short text shown big on the card when there's no thumbnail image.
code: CSEE 0000

# Optional: a picture for the project card on the home page.
# thumb: /assets/img/project-name/card.jpg

# Shown on the page, written however you like.
date_label: Jan 2027 – May 2027

# Used only to sort projects newest first. Format: YYYY-MM-DD.
sort_date: 2027-01-15

# Optional. Delete any line you don't need.
team: Solo project
tools: STM32, C, Vivado

# Which filter button this project appears under. Pick exactly ONE:
#   Embedded & Robotics | Hardware & FPGA | Systems in C | Algorithms & Java
# (To add a new area, add it to the "categories" list in _config.yml.)
category: Embedded & Robotics

# Skill tags shown on the card and page (any words you like).
tags: [Embedded C, STM32]

# Optional: set to true to show this as the big card at the top.
# Only one project should be featured at a time.
featured: false

# Optional: a main image shown under the title.
# Put your images in assets/img/<project-name>/
# cover: /assets/img/project-name/photo.jpg
# cover_alt: Describe the image for screen readers
# cover_caption: A short caption

# Optional: extra photos at the bottom of the page.
# gallery:
#   - src: /assets/img/project-name/board.jpg
#     caption: What this photo shows
#   - src: /assets/img/project-name/waveform.png
#     caption: What this screenshot shows
---

## Overview

What problem does this project solve? Two or three sentences.

## My role

- What did YOU do? Be specific, especially on team projects.
- Use strong verbs: designed, built, wrote, tested, debugged.

## How it works

Explain the design so an engineer could follow it. Diagrams, photos,
and screenshots of your own work help a lot.

To add an image in the middle of the text:

<figure>
  <img src="{{ '/assets/img/project-name/photo.jpg' | relative_url }}" alt="What the image shows">
  <figcaption>Caption goes here.</figcaption>
</figure>

## Results / what I learned

Numbers if you have them (speed, accuracy, size), plus what you'd do
differently next time.
