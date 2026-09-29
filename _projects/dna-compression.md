---
title: DNA Compression with Bitwise Operators
summary: A command-line tool in C that packs DNA strings into 2 bits per base, cutting storage by about 75% versus plain text.
context: CSCI 1730 · Systems Programming
code: CSCI 1730
date_label: Spring 2026
team: Course project
category: Systems in C
sort_date: 2026-01-20
tools: C, Make, GCC, Linux
tags: [C, Bit manipulation, Makefiles]
thumb: /assets/img/thumbs/dna.svg
---

## The idea

DNA only uses four letters (A, T, C, and G), so storing each one as an 8-bit ASCII character wastes 6 of every 8 bits. This tool gives each base a 2-bit code and packs them tightly into unsigned integers.

<div class="table-wrap"><table>
<thead><tr><th>Base</th><th>A</th><th>T</th><th>C</th><th>G</th></tr></thead>
<tbody><tr><td>Code</td><td>00</td><td>01</td><td>10</td><td>11</td></tr></tbody>
</table></div>

## What I built

- A **compressor** that shifts each base's 2-bit code into place with bitwise operators, and a **decompressor** that masks the codes back out with no loss
- A multi-file C program with header files and preprocessor directives, built with a **Makefile**
- Input from command-line arguments

## Result

About **75% less storage** than plain ASCII, and it's lossless. The project made binary representation concrete for me: shifts and masks are exactly the tools I now use to set register bits in firmware.

<p class="callout">This is course work, so the code isn't posted, per UGA's academic honesty policy.</p>
