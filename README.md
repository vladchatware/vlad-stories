# Vlad Stories

`Vlad Stories` is an iOS-first story app built with `Expo`, `expo-router`, `@expo/ui/swift-ui`, and `Chat SDK`.

The app starts as an editorial story library and shifts into a chat-style playthrough once you enter a story. The goal is to make reading feel more atmospheric, more immediate, and more native to iOS than a generic text reader.

## Product

- Curated discovery surfaces for story browsing
- Story detail screens with editorial presentation
- Chat-style narrative playthroughs with branching choices
- Freeform reply input on selected beats
- iOS-first visual language with restrained Liquid Glass chrome
- Local narrative state modeled through chat threads and messages

## Stack

- `Expo`
- `React Native`
- `expo-router`
- `@expo/ui`
- `@expo/ui/swift-ui`
- `chat`
- TypeScript

## Getting Started

1. Install dependencies

```bash
bun install
```

2. Start the dev server

```bash
bunx expo start
```

3. Run iOS locally

```bash
bunx expo run:ios
```

Useful scripts:

```bash
bun run lint
bun run web
bun run android
```

## Project Structure

- [`/Users/mac/Projects/vlad-stories/app`](/Users/mac/Projects/vlad-stories/app) routes and screen composition
- [`/Users/mac/Projects/vlad-stories/components`](/Users/mac/Projects/vlad-stories/components) reusable UI components
- [`/Users/mac/Projects/vlad-stories/constants`](/Users/mac/Projects/vlad-stories/constants) seeded story content, theme, and static product data
- [`/Users/mac/Projects/vlad-stories/lib/chat-sdk`](/Users/mac/Projects/vlad-stories/lib/chat-sdk) `Chat SDK` integration and local state adapter
- [`/Users/mac/Projects/vlad-stories/hooks`](/Users/mac/Projects/vlad-stories/hooks) screen and playthrough hooks

## Interactive Story Architecture

The interactive story flow is intentionally modeled with chat primitives:

- a story session maps to a thread
- story beats map to transcript entries
- suggestions map to authored branch points
- freeform input can unlock on specific beats
- local state and persistence are handled through a custom `Chat SDK` adapter

Key files:

- [`/Users/mac/Projects/vlad-stories/app/chat.tsx`](/Users/mac/Projects/vlad-stories/app/chat.tsx)
- [`/Users/mac/Projects/vlad-stories/hooks/use-story-playthrough-controller.ts`](/Users/mac/Projects/vlad-stories/hooks/use-story-playthrough-controller.ts)
- [`/Users/mac/Projects/vlad-stories/lib/chat-sdk/story-chat-instance.ts`](/Users/mac/Projects/vlad-stories/lib/chat-sdk/story-chat-instance.ts)
- [`/Users/mac/Projects/vlad-stories/lib/chat-sdk/story-playthrough-adapter.ts`](/Users/mac/Projects/vlad-stories/lib/chat-sdk/story-playthrough-adapter.ts)
- [`/Users/mac/Projects/vlad-stories/components/chat/local-story-playthrough-adapter.ts`](/Users/mac/Projects/vlad-stories/components/chat/local-story-playthrough-adapter.ts)

## Notes on Expo UI + SwiftUI

This project leans heavily on `@expo/ui/swift-ui`, which is still beta. The main implementation lesson so far has been that most hard problems are layout ownership problems, not styling problems.

Things that worked better:

- keeping screens inside a coherent SwiftUI-hosted layout tree
- letting SwiftUI own more of the scroll and layout behavior
- fixing safe-area and inset issues at the screen architecture level
- using glass effects for chrome and controls, not to hide layout mistakes

Things that worked worse:

- mixing manual React Native safe-area math into SwiftUI-hosted screens
- compensating for layout issues with extra padding and offset stacking
- treating `NativeTabs` overlap and scroll edge behavior as spacing problems first

## Status

The current implementation is best described as an iOS-first product prototype with a real UI system, seeded content, and a working local interactive story engine.

It is not yet a production backend or publishing platform.

## License

No license is currently defined in this repository. Do not assume commercial reuse rights without explicit permission.
