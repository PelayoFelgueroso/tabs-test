import type { Meta, StoryObj } from "@storybook/react-vite";
import Tabs from "./Tabs";

const meta: Meta = {
  title: "Components/Tabs/Tab",
  component: Tabs.Tab as any,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      layout: "padded",
      description: {
        component: `The Tab component represents an individual tab button within a Tabs component. It's a semantic button element with ARIA attributes and support for badges and disabled states.

## Key Features

- **Semantic HTML**: Renders as a proper \`<button>\` with ARIA attributes
- **Badge Integration**: Display counts, status, or metadata alongside the label
- **Disabled State**: Support for disabled tabs that prevent interaction
- **Custom Value**: Separate display text (label) from unique identifier (value)
- **Type-Safe Props**: Full TypeScript support

## API Overview

Each Tab accepts:
- \`label\` (required): Display text shown in the tab button
- \`value\` (optional): Unique identifier for selection (defaults to label)
- \`badge\` (optional): Badge configuration with label and variant
- \`disabled\` (optional): Disable this tab
- \`children\` (optional): Content that becomes a tabpanel (renders below tabs)

## Usage

\`\`\`tsx
<Tabs variant="pill">
  <Tabs.Tab label="Home" />
  <Tabs.Tab value="settings" label="⚙️ Settings" />
  <Tabs.Tab label="Inbox" badge={{ label: "5", variant: "positive" }} />
  <Tabs.Tab label="Locked" disabled />
</Tabs>
\`\`\``,
      },
    },
  },
  argTypes: {
    label: {
      description:
        "Display text shown in the tab button. Required. Also used as the tab value/identifier if 'value' is not provided.",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        category: "Core Props",
      },
    },
    value: {
      description:
        "Unique identifier for this tab. Optional. Defaults to label. Used for controlled components and identifying which tab is active. Should be URL-safe and stable (doesn't change on translations).",
      control: { type: "text" },
      table: {
        type: { summary: "string | undefined" },
        category: "Core Props",
      },
    },
    badge: {
      description:
        "Badge configuration to display alongside the label. Optional. Supports 'neutral', 'positive', 'negative' variants for different semantic meanings (counts, alerts, etc).",
      table: {
        type: {
          summary: "BadgeProps | undefined",
          detail:
            "{ label: string; variant: 'neutral' | 'positive' | 'negative' }",
        },
        category: "UI Props",
      },
    },
    disabled: {
      description:
        "Disables this tab. Disabled tabs cannot be clicked, cannot receive focus during keyboard navigation, and are visually de-emphasized. Default: false",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean | undefined" },
        defaultValue: { summary: "false" },
        category: "State Props",
      },
    },
    children: {
      description:
        "Optional content that becomes the tab panel. When provided, renders as a <div role='tabpanel'> that is shown/hidden based on tab active state.",
      table: {
        type: { summary: "ReactNode" },
        category: "Content",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Basic tab with just a label.
 * The simplest use case: just a button without badges or custom value.
 */
export const BasicLabel: Story = {
  render: () => (
    <Tabs defaultValue="Home">
      <Tabs.Tab label="Home" />
      <Tabs.Tab label="About" />
      <Tabs.Tab label="Contact" />
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tab with just a label. Simple button component showing the most basic usage.",
      },
    },
  },
};

/**
 * Tab with custom value separate from label.
 * Useful for i18n, URL routing, and semantic clarity.
 */
export const CustomValue: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <Tabs.Tab value="home" label="🏠 Home" />
      <Tabs.Tab value="settings" label="⚙️ Settings" />
      <Tabs.Tab value="help" label="❓ Help" />
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Custom value prop: Separates unique identifier (value) from display text (label). Essential for URL routing and i18n where display text changes but identifiers remain stable.",
      },
    },
  },
};

/**
 * Tab with badge showing additional information.
 * Badges support 'positive', 'neutral', 'negative' variants.
 */
export const WithBadge: Story = {
  render: () => (
    <Tabs defaultValue="inbox">
      <Tabs.Tab
        value="inbox"
        label="Inbox"
        badge={{ label: "5", variant: "positive" }}
      />
      <Tabs.Tab
        value="alerts"
        label="Alerts"
        badge={{ label: "2", variant: "negative" }}
      />
      <Tabs.Tab
        value="archive"
        label="Archive"
        badge={{ label: "12", variant: "neutral" }}
      />
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tab with badge: Display counts, status, or other metadata. Variants: 'positive' (green), 'negative' (red), 'neutral' (gray).",
      },
    },
  },
};

/**
 * Different badge variants showing semantic colors.
 * positive: Success/new items (green)
 * negative: Errors/alerts (red)
 * neutral: Informational counts (gray)
 */
export const BadgeVariants: Story = {
  render: () => (
    <Tabs defaultValue="good">
      <Tabs.Tab
        value="good"
        label="Success"
        badge={{ label: "NEW", variant: "positive" }}
      />
      <Tabs.Tab
        value="bad"
        label="Error"
        badge={{ label: "3", variant: "negative" }}
      />
      <Tabs.Tab
        value="info"
        label="Info"
        badge={{ label: "24", variant: "neutral" }}
      />
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badge variants show semantic intent: positive (success), negative (error/alert), neutral (information). Use the appropriate variant to communicate meaning.",
      },
    },
  },
};

/**
 * Disabled tab: Cannot be clicked, skipped in keyboard nav.
 * Visual indicators show the disabled state.
 */
export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="available">
      <Tabs.Tab value="available" label="Available" />
      <Tabs.Tab value="coming" label="Coming Soon" disabled />
      <Tabs.Tab value="available2" label="Also Available" />
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Disabled tab: Cannot be clicked, skipped in keyboard navigation, visually de-emphasized. Use for locked features or coming-soon sections.",
      },
    },
  },
};

/**
 * Tab with icon-only label.
 * Useful for compact UIs or icon-based navigation.
 */
export const IconLabel: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <Tabs.Tab value="home" label="🏠" />
      <Tabs.Tab value="search" label="🔍" />
      <Tabs.Tab value="settings" label="⚙️" />
      <Tabs.Tab value="user" label="👤" />
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only labels: Compact navigation using emoji or Unicode symbols. Great for mobile or minimalist designs.",
      },
    },
  },
};

/**
 * All tab props combined together.
 * Shows custom value, emoji label, badge, and disabled state.
 */
export const AllProps: Story = {
  render: () => (
    <Tabs defaultValue="dashboard">
      <Tabs.Tab
        value="dashboard"
        label="📊 Dashboard"
        badge={{ label: "3", variant: "neutral" }}
      />
      <Tabs.Tab
        value="analytics"
        label="📈 Analytics"
        badge={{ label: "NEW", variant: "positive" }}
      />
      <Tabs.Tab
        value="reports"
        label="Reports"
        badge={{ label: "2", variant: "negative" }}
      />
      <Tabs.Tab value="archived" label="Archive" disabled />
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All props combined: custom values, emoji labels, badges with variants, and disabled state. Shows the full API of Tabs.Tab.",
      },
    },
  },
};
