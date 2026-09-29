---
title: Mapping the Heap
summary: A C program that stores an unknown amount of data on the heap and prints a live memory map as it grows, with zero leaks.
context: CSCI 1730 · Systems Programming
code: CSCI 1730
date_label: Spring 2026
team: Course project
category: Systems in C
sort_date: 2026-02-20
tools: C, Valgrind, Linux
tags: [C, Memory management, Valgrind]
thumb: /assets/img/thumbs/heap.svg
---

## The problem

Read grades until a negative sentinel value, without knowing ahead of time how many there will be. Store them all on the heap, compute the average, and report which grades are above or below it. Along the way, print a **memory map** showing exactly what's happening in the heap.

## How it works

- Grades go into a block of heap memory. When the block fills up, the program allocates a bigger one, copies everything over, and frees the old block.
- The memory map prints addresses as the program runs, so you can watch consecutive values sit 8 bytes apart and see blocks being allocated and freed.

## The constraints

- Only `printf`, `scanf`, `malloc`, and `free` were allowed. Everything else had to be written by hand.
- No square brackets anywhere: every array access used **pointer arithmetic**.
- The program's own count of allocations and frees had to match **Valgrind's** report, with **no memory leaks**.

## What I learned

Growing a buffer by hand shows why dynamic arrays work the way they do, and matching Valgrind's numbers exactly left no room for a stray allocation.

<p class="callout">This is course work, so the code isn't posted, per UGA's academic honesty policy.</p>
