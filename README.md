# Astro App Shell ✨🐚

Extensible app shell built using Astro, Lit, and xState. The project is meant to explore how these three technologies can work together to provide a reliable, performant, and enjoyable foundation for building applications. It will be built in public, with the intention of allowing anyone to build their own applications on top. This repo will be the initial use case: a bike shop that hosts cycling tournaments and sells merch. Can we provide a best in class experience for events and stores?

## What's inside?

Astro and Turborepo serve as the core, providing robust primitives that unlock many useful patterns. [Turborepo](https://turbo.build/repo) provides the best way to manage dependencies across multiple projects I've used so far and Astro as an (app framework?) has served me extremely well, with consistent and predictable behavior that I had come to miss. Support for Lit is a welcome plus, extremely grateful for all the work that has gone into all the [UI integrations](https://docs.astro.build/en/guides/integrations-guide/).

### Stack

- `Astro`
- `Lit`
- `xState`
- `Turborepo`
- `Typescript`

In addition, novel (for me) techniques for managing state are being used. Xstate is the key, providing critical guardrails for modeling events and state. It currently lives under `components/state`, completely outside `apps/bike-shop`. It makes more sense if you see the repo as representing the umbrella project that contains any relevant subprojects and dependencies for the implementor - in this case the bike shop.

### Component libraries

This project takes advantage of open source component libraries. Current integrations are:

- [Material Web](https://github.com/material-components/material-web)
- [Material Theme Builder](https://m3.material.io/theme-builder#/custom)
- [Shoelace](https://shoelace.style/)
