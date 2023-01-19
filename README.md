# Astro App Shell ✨🐚

Extensible app shell built using Astro, Lit, and xState. The project is meant to explore how these three technologies can work together to provide a reliable, performant, and enjoyable foundation for building applications. It will be built in public, with the intention of allowing anyone to build their own applications on top. This repo will be the initial use case: a bike shop that hosts cycling tournaments and sells merch. Can we provide a best in class experience for events and stores?

## What's inside?

Astro and Turborepo serve as the core, providing robust primitives which unlock a wide range of useful patterns. Astro serves as the app framework, enhancing our apps with file-based routing, multiple rendering options, and an approachable `integrations` system with support for a large number of popular tools and libraries. One additional benefit is Astro's support for Lit; extremely grateful for the work that has gone into all the [UI integrations](https://docs.astro.build/en/guides/integrations-guide/). Turborepo closes this out with the best way to manage dependencies across multiple projects I've used so far.

### Stack

- [`Astro`](https://astro.build)
- [`Lit`](https://lit.dev)
- [`xState`](https://xstate.js.org/docs/)
- [`Turborepo`](https://turbo.build/repo)
- `Typescript`

## Why state machines?

Managing state is something every service needs to handle. Different techniques are valid at any given time, so tradeoffs need to be considered. This project uses xState, a continued exploration on how to take full advantage of state machines. It served me well in a previous project, providing critical guardrails for modelling state and allowing it to be decoupled from the UI. It currently lives under `components/state`, completely outside `apps/bike-shop`. It makes more sense if you see the repo as representing the umbrella project that contains all relevant subprojects and dependencies for the implementor - in this case the bike shop. In addition, the idea of serializing app state is extremely compelling and is going to be explored more in depth.

### Component libraries

This project takes advantage of open source component libraries. Current integrations are:

- [Material Web](https://github.com/material-components/material-web)
- [Material Theme Builder](https://m3.material.io/theme-builder#/custom)
- [Shoelace](https://shoelace.style/)
