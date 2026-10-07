---
title: RISC-V Processor (FPGA and ASIC)
summary: A single-cycle RV32I CPU written in Verilog from the ISA specification, verified against a reference simulator, run on a Basys 3 FPGA, and taken from RTL to GDSII on SkyWater 130 nm.
code: RV32I
context: Personal project
date_label: Sep 2026 – Present
sort_date: 2026-09-02
team: Solo project
tools: Verilog, C, Python, Verilator, Vivado, OpenLane
category: Hardware & FPGA
tags: [Verilog, RISC-V, FPGA, ASIC, Verification]
---

## Overview

A 32-bit RISC-V processor that I designed from the instruction set architecture (ISA) specification, then carried through two hardware flows: onto a Basys 3 FPGA board, and through an open-source ASIC (application-specific integrated circuit) flow down to a manufacturable chip layout.

## What I did

- Designed a **single-cycle RV32I CPU in Verilog** from the ISA specification; it executes all 37 base integer instructions.
- Built a **self-checking Python and Verilator test flow** that checks every assembly test against a reference simulator.
- Ran **compiled C programs on a Basys 3 (Artix-7) FPGA** with UART output, meeting timing through the full Vivado flow.
- Took the design from **RTL to GDSII with the OpenLane ASIC flow** (SkyWater 130 nm); closed timing, clean DRC/LVS.
- Submitted a **UART core to Tiny Tapeout** for fabrication on SkyWater 130 nm (silicon expected 2027).

## In progress

- Extending the design to a **5-stage pipeline** with forwarding and hazard detection.

## Terms

- **RV32I** is the base 32-bit integer instruction set of RISC-V, an open processor architecture.
- **RTL** (register-transfer level) is the Verilog description of the design. **GDSII** is the layout file a chip foundry manufactures from.
- **DRC** (design rule check) confirms the layout follows the foundry's manufacturing rules. **LVS** (layout versus schematic) confirms the layout matches the circuit that was designed.
- **UART** (universal asynchronous receiver-transmitter) is the serial link the processor uses to print output.

<p class="callout">The source is on GitHub: <a href="https://github.com/cmb42038/riscv-cpu">github.com/cmb42038/riscv-cpu</a>.</p>
