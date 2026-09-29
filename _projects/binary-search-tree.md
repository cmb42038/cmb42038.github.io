---
title: Generic Binary Search Tree
summary: A binary search tree in Java that stores any comparable type, driven interactively from the command line.
context: CSCI 2720 · Data Structures
code: CSCI 2720
team: Course project
category: Algorithms & Java
date_label: Oct – Nov 2025
sort_date: 2025-11-01
tools: Java, generics, Maven
tags: [Java, Trees, Data structures]
thumb: /assets/img/thumbs/data-structures.svg
---

## What I built

A generic **binary search tree** where every node's left subtree holds smaller keys and its right subtree holds larger ones. Like the doubly linked list, it works with `int`, `double`, or `String` values chosen at runtime, and it rejects duplicates.

## Details

- Insert, delete, and search, with the ordering property maintained after every change
- A driver that builds the tree from a file, then lets you modify it interactively

## What I learned

Deleting a node with two children is where a BST gets interesting, and comparing tree operations with the earlier linked lists showed why trees exist.

<p class="callout">This is course work, so the code isn't posted, per UGA's academic honesty policy.</p>
