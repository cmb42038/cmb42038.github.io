---
title: Sorting Algorithms, Measured
summary: Five sorting algorithms implemented in Java and instrumented to count comparisons, then tested against theory in a written report.
context: CSCI 2720 · Data Structures
code: CSCI 2720
team: Course project
category: Algorithms & Java
date_label: Nov 2025
sort_date: 2025-11-20
tools: Java, experiments, plotting
tags: [Java, Algorithms, Analysis]
thumb: /assets/img/thumbs/sorting.svg
---

## What I built

Implementations of **selection sort, merge sort, heap sort, and quicksort**, with quicksort in two versions: a last-element pivot and a random pivot. Each one counts every comparison between data elements.

## The experiments

1. **Input order:** comparison counts for 10,000 integers in ascending, random, and reversed order
2. **Input size vs. comparisons:** plotted for each algorithm and checked against its theoretical complexity

I wrote the results up in a report with the plots and discussion.

## What I learned

Big-O stops being a formula once you count comparisons yourself. A last-element pivot on already-sorted input is where quicksort's worst case shows up in real numbers.

<p class="callout">This is course work, so the code isn't posted, per UGA's academic honesty policy.</p>
