# Agent Instructions

## Package Management
- **NEVER** use `npm` or `npx` commands
- **ALWAYS** use `bun` for package management and `bunx` for running executables
- Example: `bun install` instead of `npm install`, `bunx expo` instead of `npx expo`

## Code Organization
- **ALWAYS** extract reusable components to the `components/` directory
- Keep screen files focused on layout and composition only
- Maintain clean separation of concerns between UI components and screens

## UI Components
- **ALWAYS** use `@expo/ui` for UI elements (Button, Text, VStack, HStack, etc.)
- Import from `@expo/ui/swift-ui` for iOS components
- Wrap SwiftUI components with `<Host>` component
- **DO NOT** mix custom React Native text/layout primitives with SwiftUI-hosted screen content unless there is a verified platform limitation
- For iOS screens, prefer a consistent SwiftUI-hosted layout tree over hybrid React Native + SwiftUI composition
- If a screen starts with `@expo/ui/swift-ui`, keep the screen and its reusable components in that system unless explicitly instructed otherwise
- For SwiftUI screens, **fix layout bugs at the root cause**: hosting boundaries, safe-area handling, scroll/inset behavior, or intrinsic sizing. **Do not** patch SwiftUI layout issues with arbitrary padding, spacer hacks, or hardcoded offsets unless the user explicitly asks for a temporary workaround.
- When working inside `NativeTabs`, assume scroll insets and tab bar overlap issues are architecture problems first, not spacing problems. Verify how the screen is hosted and how safe area / scroll adjustment is applied before changing visual spacing.
- If a screen is implemented in SwiftUI, keep the screen SwiftUI-first. Do not fall back to React Native layout primitives just to make the layout "look right" unless there is a confirmed platform limitation and that limitation is documented in code comments or the task handoff.

## Visual Language
- For Apple-style Liquid Glass work, follow **Apple-faithful hierarchy**, not generic glassmorphism.
- Use glass primarily for **chrome, controls, overlays, and transient emphasis**. Do **not** default to putting core content such as titles, authors, descriptions, or list rows inside isolated floating glass bubbles.
- Keep **content hierarchy stronger than material styling**. Artwork, titles, and editorial content should read as the primary object; glass should support that hierarchy, not compete with it.
- Avoid **nested bubble logic** such as a small pill floating inside another visually dominant pill/card unless that relationship is clearly intentional and improves hierarchy.
- Avoid decorative circles, orbs, or highlights that do not reinforce depth, focus, or grouping. If a shape reads as accidental ornament, remove it.
- Typography should stay **calm, legible, and slightly restrained** when paired with Liquid Glass. Prefer fewer weights, slightly smaller titles, and clearer whitespace over oversized bold text trapped inside translucent containers.
- Treat metadata such as views, likes, badges, and secondary actions as **compact supporting elements**. They should not visually overpower the title or become the dominant shapes in a card.
- Prefer **one coherent surface strategy per component**. Do not stack multiple unrelated translucent shells just because the technology allows it.
- When spacing feels wrong, fix **container geometry first**: safe area, scroll content insets, card width, intrinsic sizing, and alignment. Do not use extra material containers to hide layout mistakes.
- If unsure whether a treatment matches Apple’s visual language, prefer **less glass, fewer floating surfaces, and clearer content structure**.
