# Frontend Interview - Design System: Tabs Component

A production-grade, accessible Tabs component with full WCAG 2.1 Level AA compliance, keyboard navigation, and flexible state management.

## 🎯 Features

- **Accessibility First**: WCAG 2.1 Level AA compliant
- **Keyboard Navigation**: Arrow keys, Home, End support
- **Flexible State**: Controlled and uncontrolled modes
- **Two Variants**: Pill and Underline styles
- **Badge Integration**: Semantic badge support
- **Disabled State**: Built-in disabled tab handling
- **TypeScript**: Full type safety and autocomplete
- **54 Tests**: Comprehensive test coverage
- **Dark Mode**: Design token-based theming

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Run Storybook (recommended)
pnpm storybook

# Run tests
pnpm test
```

## 📖 API Reference

### `<Tabs />`

Main container component for tab navigation.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | One or more `<Tabs.Tab>` components |
| `variant` | `"pill" \| "underline"` | `"pill"` | Visual style of tabs |
| `value` | `string` | — | Current active tab (controlled mode) |
| `defaultValue` | `string` | — | Initial active tab (uncontrolled mode) |
| `onChange` | `(value: string) => void` | — | Callback when tab changes |

#### Examples

**Uncontrolled Mode** (simple):
```tsx
<Tabs defaultValue="home">
  <Tabs.Tab value="home" label="Home">
    <p>Home content</p>
  </Tabs.Tab>
  <Tabs.Tab value="about" label="About">
    <p>About content</p>
  </Tabs.Tab>
</Tabs>
```

**Controlled Mode** (advanced):
```tsx
const [activeTab, setActiveTab] = useState("home");

<Tabs value={activeTab} onChange={setActiveTab}>
  <Tabs.Tab value="home" label="Home">
    <p>Home content</p>
  </Tabs.Tab>
  <Tabs.Tab value="about" label="About">
    <p>About content</p>
  </Tabs.Tab>
</Tabs>
```

### `<Tabs.Tab />`

Individual tab button component.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Display text for the tab |
| `value` | `string` | `label` | Unique identifier (defaults to label) |
| `disabled` | `boolean` | `false` | Whether tab is disabled |
| `badge` | `BadgeProps` | — | Optional badge to display |
| `children` | `ReactNode` | — | Panel content (hidden when tab inactive) |

#### Badge Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Badge text content |
| `variant` | `"neutral" \| "positive" \| "negative"` | `"neutral"` | Badge style |

## 🎹 Keyboard Navigation

- **Arrow Right / Down**: Move to next enabled tab
- **Arrow Left / Up**: Move to previous enabled tab
- **Home**: Jump to first enabled tab
- **End**: Jump to last enabled tab
- **Tab**: Focus into tablist (native)
- **Disabled tabs**: Automatically skipped in navigation

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Tests include:
# - 41 core tests (rendering, state, accessibility)
# - 13 new tests (keyboard nav, disabled state, edge cases)
# Total: 54 tests, 100% pass rate
```

## 📚 Storybook

See interactive examples and patterns:

```bash
pnpm storybook
```

Stories include:
- **Pill Variant**: Default rounded button style
- **Underline Variant**: Minimal with underline indicator
- **With Badges**: Counting and status badges
- **With Disabled Tabs**: Disabled state handling
- **Controlled Mode**: Parent-managed state with callbacks
- **Uncontrolled Mode**: Component-managed state
- **Keyboard Navigation**: Demo of keyboard support
- **Complex Content**: Forms, lists, rich content

## 🎨 Design Tokens

The component uses SCSS variables for theming:

```scss
--color-primary: #1b2134
--color-accent: #6366f1
--color-positive: #b1ffc7
--color-negative: #ffbfb1
--spacing-*: 2px, 4px, 8px, 12px, 16px, 24px, 32px, 48px
--border-radius-*: 4px, 8px, 12px, 100px
--height-*: 42px (mobile), 50px (desktop)
```

## 🔄 Controlled vs Uncontrolled

| Aspect | Uncontrolled | Controlled |
|--------|--------------|-----------|
| State Management | Component owns state | Parent owns state |
| Default | `defaultValue` prop | `value` prop |
| Change Callback | Optional `onChange` | Required `onChange` |
| Best For | Simple cases, isolated tabs | Complex apps, URL sync, undo/redo |
| Performance | Simpler re-render logic | More control, predictable |
| Code Complexity | Less boilerplate | More setup, more flexibility |

## 🔍 Figma Design

The design specifications are available in [Figma](https://www.figma.com/design/OclakAGLSXDoMKLFvwLNMP/%F0%9F%92%BB-Design-System-Home-Test---Tabs-Component?node-id=0-1&t=4pG7NN6HKxgxroDz-1).

## 📋 Project Structure

```
src/
├── components/
│   ├── tabs/
│   │   ├── Tabs.tsx          # Main container
│   │   ├── Tab.tsx           # Individual tab button
│   │   ├── Tabs.context.tsx  # State context
│   │   ├── types.ts          # TypeScript definitions
│   │   ├── Tabs.module.scss  # Styling
│   │   ├── Tabs.stories.tsx  # Storybook stories
│   │   └── Tabs.test.tsx     # Unit tests (54 tests)
│   └── badge/
│       ├── Badge.tsx         # Badge component
│       ├── types.ts
│       └── Badge.module.scss
└── styles/
    ├── _tokens.scss          # Design tokens
    └── index.scss
```

## 🏗️ Architecture

- **Context API**: Shared state (activeTab, variant)
- **Compound Components**: `Tabs` and `Tabs.Tab` pattern
- **Type-Safe**: Full TypeScript with proper contracts
- **Semantic HTML**: Proper ARIA roles and relationships
- **CSS Modules**: Scoped styling with design tokens

## 📈 Accessibility Compliance

✅ **WCAG 2.1 Level AA**:
- 2.1.1 Keyboard: Full keyboard support
- 2.4.3 Focus Order: Proper tab order and focus management
- 2.4.7 Focus Visible: Clear focus indicators
- 4.1.2 Name Role Value: Complete ARIA implementation
- 1.3.1 Info and Relationships: Semantic HTML structure
- 1.4.11 Non-text Contrast: Visual state indicators

## 💡 Design Decisions

See [CLAUDE.md](./CLAUDE.md) for comprehensive architecture documentation, including:
- Design principles
- Architectural patterns
- Type system details
- State management strategy
- Testing approach
- Accessibility rationale

---

**Built with accessibility, testing, and real-world patterns in mind.**
