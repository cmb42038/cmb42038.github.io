---
title: Multithreaded Diagonal Sums
summary: A C program that searches large grids for diagonal runs that add up to a target, splitting the work across POSIX threads.
context: CSCI 1730 · Systems Programming
code: CSCI 1730
date_label: Spring 2026
team: Course project
category: Systems in C
sort_date: 2026-04-20
tools: C, POSIX threads, Linux
tags: [C, Concurrency, Algorithms]
thumb: /assets/img/thumbs/diagonals.svg
---

## The problem

Given an *n × n* grid of digits (1–9) and a target sum *s*, find every diagonal run of digits that adds up to exactly *s*, and write the matches to an output file.

## How it works

- The search runs on **1 to 3 POSIX threads** (`pthread_create`), each taking a share of the grid.
- The algorithm had to stay within **O(n³) time** and **O(n²) space**, and handle grids up to **3,567 × 3,567**.
- I measured runtimes with 1, 2, and 3 threads to see when adding threads actually pays off.

## What I learned

More threads help only when each one has enough work to cover the cost of starting it and joining it back. On small grids, the overhead can outweigh the gain.

<p class="callout">This is course work, so the code isn't posted, per UGA's academic honesty policy.</p>
