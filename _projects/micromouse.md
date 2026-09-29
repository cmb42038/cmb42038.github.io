---
title: Autonomous Maze-Solving Robot
summary: Firmware and maze-solving algorithms for UGA IEEE's Micromouse, a small robot that explores an unknown maze, maps it, and races the fastest route to the center.
code: Micromouse
thumb: /assets/img/thumbs/micromouse.svg
context: IEEE UGA · Micromouse team
date_label: Sep 2026 – Present
sort_date: 2026-09-01
featured: true
team: IEEE UGA competition team
tools: STM32, C/C++, ARM assembly, ST-Link
category: Embedded & Robotics
tags: [Embedded C/C++, STM32, Robotics, Path planning, PID]
---

## The challenge

A Micromouse is a small autonomous robot that starts in the corner of an unfamiliar maze. It has to explore, build a map of the walls as it goes, work out the fastest route to the center, and then run that route as quickly as it can. Everything happens on one microcontroller, in real time, with no outside help.

## My role

- I work on the **flood-fill maze-solving algorithm**, which keeps a distance-to-goal value for every cell and updates it each time the robot discovers a new wall.
- I implement **weighted Dijkstra path planning** so the fast run favors long straightaways over routes with many turns, not just the fewest cells.
- I write **bare-metal and RTOS-based C/C++ firmware** (with some ARM assembly) for the robot's STM32 microcontroller.
- I configure the STM32's peripherals: **PWM timers** for motor drive, the **ADC** for the IR distance sensors, **I2C/SPI** for the IMU, **UART** for telemetry, and **timer interrupts** for encoder counting and control-loop timing.
- I implement **PID motor control** and combine wheel-encoder odometry with IMU heading data to detect walls and correct drift.
- I flash and debug firmware over **SWD with an ST-Link** and check sensor and PWM signals on an **oscilloscope**.

## How it works

<figure class="diagram">
{% include diagrams/micromouse.svg %}
</figure>

**Sense.** IR distance sensors tell the robot whether there's a wall to the front and sides. The IMU tracks heading, and the wheel encoders measure how far each wheel has turned.

**Map and plan.** As the robot discovers walls, flood fill updates each cell's distance to the goal, so the map stays correct as it fills in. Once the maze is explored, weighted Dijkstra picks the route that should be fastest to drive, not just the one with the fewest cells.

**Move.** PID loops turn the planned moves into motor commands, using encoder and IMU feedback to hold speed, drive straight, and turn accurately.

## What I learned

The hard part is getting sensing, control, and planning to share one microcontroller in real time. A lot of the debugging lives between the code and the hardware: a timing problem looks like a bad sensor until you put the signal on a scope.

<p class="callout">The Micromouse code lives in the team's private repository, so it isn't posted here. I'm happy to walk through the design in an interview.</p>
