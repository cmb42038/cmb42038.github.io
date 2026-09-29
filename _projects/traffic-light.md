---
title: Transistor-Logic Traffic Light
summary: A traffic signal designed from a truth table, simulated in Multisim with BJT logic gates, built on a breadboard, and extended in MATLAB to a four-way intersection.
code: ECSE 1100
thumb: /assets/img/thumbs/traffic-light.svg
context: ECSE 1100
date_label: First-year project
sort_date: 2024-11-01
team: Team project
tools: Multisim, BC547 transistors, MATLAB
category: Hardware & FPGA
tags: [Digital logic, BJT circuits, Multisim, MATLAB]
cover: /assets/img/traffic-light/multisim-schematic.png
cover_alt: Multisim schematic of the transistor traffic light circuit with red, yellow, and green LEDs
cover_caption: My Multisim schematic. Three BC547 transistors form the inverters and OR gate that drive the red, yellow, and green LEDs.
---

## The problem

Two inputs, **A** and **B**, have to control a single red-yellow-green traffic signal according to this truth table:

<div class="table-wrap"><table>
<thead><tr><th>Case</th><th>A</th><th>B</th><th>Red</th><th>Yellow</th><th>Green</th></tr></thead>
<tbody>
<tr><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td></tr>
<tr><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>2</td><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td>3</td><td>1</td><td>1</td><td>0</td><td>1</td><td>0</td></tr>
</tbody></table></div>

## Logic design

From the table I derived sum-of-products and product-of-sums expressions for each light. They simplify to:

- **Red** = A′B′ + A′B = **A′**
- **Yellow** = A′B + AB = **B**
- **Green** = **AB′** = (A′ + B)′

So one inverter on A drives red, B drives yellow directly, and an OR gate followed by a second inverter drives green.

## Building it

- **Simulation.** I built the circuit in Multisim from transistor-level gates (BC547 BJTs), reusing the inverter and OR gate designs from earlier labs, and tested each case in the truth table.
- **Alternative design.** I worked out an equivalent gate diagram that uses an AND gate instead of the OR.
- **Physical build.** We built the circuit on a breadboard with LEDs and checked the input cases in the lab.

<figure>
  <img src="{{ '/assets/img/traffic-light/and-gate-alternative.png' | relative_url }}" alt="Logic diagram of the traffic light using an AND gate">
  <figcaption>The AND-gate version of the design. The truth table stays the same.</figcaption>
</figure>

## Programming the intersection in MATLAB

- Designed a flowchart and wrote a MATLAB script that maps a random number from 1 to 300 to a light color, looping until the user says they're done driving.
- Extended the provided `lights.m` function to draw a **2 × 2 grid of lights as a four-way intersection**, with opposite lights kept in sync. The color comes from the sum of two user inputs (1–600).
- For the bonus, updated the flowchart to hold yellow for an extra 5 seconds, giving drivers who are turning right time to clear the intersection safely.

<figure>
  <img src="{{ '/assets/img/traffic-light/flowchart-four-way.png' | relative_url }}" alt="Flowchart for the four-way intersection program" style="max-width: 360px">
  <figcaption>Flowchart for the four-way intersection logic, including the added yellow delay.</figcaption>
</figure>

## What I learned

The hardest part was getting the green light's inverter to switch correctly. It needed a lower supply voltage than we expected. On the physical build, a bad ground connection made a correct circuit look broken until we found it. The project also included an engineering-ethics case study on traffic-light timing, using the NSPE Code of Ethics.
