---
title: Hex-to-7-Segment Decoder on an FPGA
summary: A Verilog decoder that turns 4-bit binary into hex digits on a seven-segment display, tested exhaustively in simulation and run on a Basys 3.
code: CSEE 4270
thumb: /assets/img/thumbs/fpga.svg
context: CSEE 4270 · Design of Digital Systems
date_label: Aug 2026 – Present
sort_date: 2026-08-20
team: Two-person lab team
tools: Verilog, Xilinx Vivado, Basys 3 (Artix-7)
category: Hardware & FPGA
tags: [Verilog, FPGA, Vivado, Testbenches]
---

## Overview

A lab project from Design of Digital Systems: a combinational decoder that takes a 4-bit binary value and lights the right segments to show 0–F on a seven-segment LED display. I took it from specification to a working circuit on a Basys 3 board, which uses a Xilinx Artix-7 FPGA.

## Design flow

<figure class="diagram">
{% include diagrams/fpga-flow.svg %}
</figure>

1. **Specify** the behavior: inputs, outputs, and what should happen for every input.
2. **Write the RTL** as Verilog modules.
3. **Simulate** with a Vivado testbench that drives every input combination, and check the waveforms before anything goes near the board.
4. **Synthesize and implement**, using an XDC constraints file to map each module port to a physical switch, LED, display segment, or Pmod pin.
5. **Verify on the board.**

## Highlights

- **Exhaustive testbench.** With only 16 possible inputs, the testbench drives every one of them, so a passing simulation means the design is actually correct.
- **Pin constraints.** I wrote the XDC mapping that connects the module's inputs and outputs to the board's switches and Pmod ports.

## What I learned

Hardware description isn't programming. Every line describes circuitry that exists at the same time. Simulating first and treating the testbench as part of the design saves hours of guessing once the bitstream is on the board.
