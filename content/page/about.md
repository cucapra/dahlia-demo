---
title: About
comments: false
---

Dahlia is built and maintained by the [CAPRA][] research group at Cornell University.

[capra]: https://capra.cs.cornell.edu

### Frequently Asked Questions

#### What is Dahlia?

Dahlia is a typed imperative programming language for designing FPGA accelerators.
It targets High-Level Synthesis toolchains such as [Vivado HLS][vivado-hls]
as it compilation target. Dahlia aims to reduce the pitfalls of HLS programming,
from simple interface issues which are not checked by vendor tools to complex
optimization pitfalls.

[vivado-hls]: https://www.xilinx.com/products/design-tools/vivado/integration/esl-design.html

#### What is predictable accelerator design?

High performance HLS designs require parameter tuning such as loop unrolling
and pipelining, memory banking etc. These parameters have subtle interactions
with each and the constraints of FPGA programming.

For example, when a parallel loop tries to read five values from a memory that
can only service two reads per cycle, the HLS compiler will *multiplex* the
reads and spread them across multiple cycles. This will result in a design that
consumes more area for the parallel loop body without improving the performance.

This is unpredictable design--FPGA designs should improve latency when loop
bodies run in parallel. Dahlia statically reasons about memory use and rejects
designs that don't behave predictably.

#### Why design a new language?

Dahlia implements its own language constructs and semantics to cleanly reason
about HLS programs and explore new ideas. Concepts such as logical time steps
and affine reasoning are not commonly supported in modern programming languages.
Implementing our own compiler and type checker simplifies these implementation
challenges.

#### How does Dahlia work?

Hardware resources are reused through *time-multiplexing*---the compiler
separates resource use in time by reasoning about use locations and latencies
and guarantees that they are never used in a conflicting manner. In order
to model this, Dahlia extends [affine types][affine] with a notion of
time-sensitivity.

At a high level, Dahlia guarantees that complex time-multiplexing is represented
in the source program. By default, Dahlia rejects programs with complex memory
access patterns that require extensive compiler transformations to be implemented
as hardware. Instead of relying on the compiler to automatically generate
additional hardware, Dahlia requires the programmer to explicitly choose
complex transformations.

[affine]: https://en.wikipedia.org/wiki/Substructural_type_system#Affine_type_systems

### Research

1. [Predictable Accelerator Design with Time-Sensitive Affine Types][dahlia-paper]
   <br/> Rachit Nigam, Sachille Atapattu, Samuel Thomas, Zhijing Li, Ted Bauer, Yuwei Yi, Apurva Koti, Adrian Sampson, Zhiru Zhang
   <br/> *Conference on Programming Language Design and Implementation 2020*


[dahlia-paper]: https://rachitnigam.com/files/pubs/dahlia.pdf

### Contributors

- [Rachit Nigam](https://rachitnigam.com)
- Samuel Thomas
- [Adrian Sampson](http://adriansampson.net)
- Yuwei Yi
- Zhijing Li
- Kenneth Fang
- Sachille Atapattu

### Alumni

- Ted Bauer
