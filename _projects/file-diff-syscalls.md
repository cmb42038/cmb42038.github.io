---
title: File Differences with System Calls
summary: A C tool that compares two files byte by byte using only raw Unix system calls, and measures what buffering is worth.
context: CSCI 1730 · Systems Programming
code: CSCI 1730
date_label: Spring 2026
team: Course project
category: Systems in C
sort_date: 2026-03-20
tools: C, Unix system calls, GDB, Valgrind
tags: [C, Unix, Performance]
thumb: /assets/img/thumbs/file-diff.svg
---

## The problem

Compare two files and write every byte that differs into two output files, one for each side. The only file I/O allowed was the low-level Unix system calls `open`, `read`, `write`, and `close`.

## Two approaches, timed

1. **One byte at a time.** Read a single byte from each file, compare, and repeat.
2. **Whole file at once.** Read each file into a dynamically allocated buffer, then compare in memory.

I timed both steps to see what each system call really costs.

## Details

- Output files are created or overwritten with owner **read/write permissions**.
- Dynamic buffers are freed cleanly and checked with **Valgrind**.
- Debugged with **GDB**.

## What I learned

Every system call crosses into the kernel, so reading one byte per call is dramatically slower than reading in bulk. The same thinking applies to firmware drivers: batch your transfers.

<p class="callout">This is course work, so the code isn't posted, per UGA's academic honesty policy.</p>
