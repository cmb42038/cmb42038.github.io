---
title: Generic Doubly Linked List
summary: A sorted doubly linked list built with Java generics, so one implementation works for integers, decimals, or strings.
context: CSCI 2720 · Data Structures
code: CSCI 2720
team: Course project
category: Algorithms & Java
date_label: Oct 2025
sort_date: 2025-10-05
tools: Java, generics, Maven
tags: [Java, Generics, Data structures]
thumb: /assets/img/thumbs/doubly-linked.svg
---

## What I built

A **sorted doubly linked list**, where each node links to both its neighbors, written once with **Java generics** (`T extends Comparable<T>`). At startup the user picks `int`, `double`, or `String`, and the same code handles all three.

## Details

- Insert, delete, and search on any comparable type, with the list kept in order
- File input, plus error checking on file I/O
- Command-line interface that matches a required spec exactly

## What I learned

Generics push type decisions to the edges of a program. The list logic doesn't care what it stores, as long as the items can be compared.

<p class="callout">This is course work, so the code isn't posted, per UGA's academic honesty policy.</p>
