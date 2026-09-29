---
title: Sorted Linked List
summary: A singly linked list in Java that stays sorted, rejects duplicates, and supports merge and intersection, with a command-line interface.
context: CSCI 2720 · Data Structures
code: CSCI 2720
team: Course project
category: Algorithms & Java
date_label: Sep 2025
sort_date: 2025-09-15
tools: Java, Maven
tags: [Java, Data structures]
thumb: /assets/img/thumbs/linked-list.svg
---

## What I built

A **sorted singly linked list** that keeps its values in ascending order and never allows duplicates. A command-line driver loads integers from a file, then lets you insert, delete, and search interactively.

## Beyond the basics

- **Merge:** combine two sorted lists into one, keeping a single copy of any duplicates.
- **Intersection:** build a list of only the values two lists share.
- For both operations, I wrote out the steps as pseudocode and analyzed their **Big-O complexity**.

## What I learned

Keeping a list sorted as you insert makes merge and intersection simple, single-pass walks.

<p class="callout">This is course work, so the code isn't posted, per UGA's academic honesty policy.</p>
