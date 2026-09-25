import type { Meta, StoryObj } from "@storybook/react-vite";
import Tabs from "./Tabs";
import TabsProps from "./types";

type TabsComponent = typeof Tabs;

const meta: Meta<TabsComponent> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      layout: "padded",
      description: {
        component:
          "A flexible tabs component with support for multiple variants and configurations. Tabs provide a clean way to organize and switch between different content sections.",
      },
    },
  },
  argTypes: {
    variant: {
      description: "The visual style of the tabs",
      options: ["pill", "underline"],
      control: { type: "radio" },
      table: {
        type: { summary: '"pill" | "underline"' },
        defaultValue: { summary: '"pill"' },
      },
    },
    defaultSelectedTab: {
      description: "The tab that should be selected by default (uncontrolled)",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
    selectedTab: {
      description: "The currently selected tab (controlled)",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<TabsComponent>;

export const Pill: Story = {
  args: {
    variant: "pill",
    defaultSelectedTab: "Overview",
  },
  render: (args: TabsProps) => (
    <Tabs {...args}>
      <Tabs.Tab label="Overview">
        <div style={{ padding: "24px" }}>
          <h3>Overview Content</h3>
          <p>
            This is the overview tab content. You can add any React content
            here.
          </p>
        </div>
      </Tabs.Tab>
      <Tabs.Tab label="Details">
        <div style={{ padding: "24px" }}>
          <h3>Details Content</h3>
          <p>Detailed information about the component goes here.</p>
        </div>
      </Tabs.Tab>
      <Tabs.Tab label="Settings">
        <div style={{ padding: "24px" }}>
          <h3>Settings Content</h3>
          <p>Configuration options and settings are displayed here.</p>
        </div>
      </Tabs.Tab>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The default pill variant provides a modern, rounded appearance with subtle background styling.",
      },
    },
  },
};

export const Underline: Story = {
  args: {
    variant: "underline",
    defaultSelectedTab: "Tab 1",
  },
  render: (args: TabsProps) => (
    <Tabs {...args}>
      <Tabs.Tab label="Tab 1">
        <div style={{ padding: "24px" }}>
          <h3>Tab 1 Content</h3>
          <p>The underline variant is minimal and elegant.</p>
        </div>
      </Tabs.Tab>
      <Tabs.Tab label="Tab 2">
        <div style={{ padding: "24px" }}>
          <h3>Tab 2 Content</h3>
          <p>Perfect for documentation sites and clean designs.</p>
        </div>
      </Tabs.Tab>
      <Tabs.Tab label="Tab 3">
        <div style={{ padding: "24px" }}>
          <h3>Tab 3 Content</h3>
          <p>Emphasizes the content over the navigation style.</p>
        </div>
      </Tabs.Tab>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The underline variant features a clean, minimal design with an animated underline indicator.",
      },
    },
  },
};

export const WithBadges: Story = {
  args: {
    variant: "pill",
    defaultSelectedTab: "Messages",
  },
  render: (args: TabsProps) => (
    <Tabs {...args}>
      <Tabs.Tab label="Messages" badge={{ label: "3", variant: "positive" }}>
        <div style={{ padding: "24px" }}>
          <h3>Messages (3 new)</h3>
          <p>You have 3 new messages waiting for you.</p>
        </div>
      </Tabs.Tab>
      <Tabs.Tab
        label="Notifications"
        badge={{ label: "12", variant: "neutral" }}
      >
        <div style={{ padding: "24px" }}>
          <h3>Notifications (12 new)</h3>
          <p>You have 12 new notifications.</p>
        </div>
      </Tabs.Tab>
      <Tabs.Tab label="Archive">
        <div style={{ padding: "24px" }}>
          <h3>Archived Items</h3>
          <p>Your archived items are stored here.</p>
        </div>
      </Tabs.Tab>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tabs can display badges to highlight counts, statuses, or other important information.",
      },
    },
  },
};

export const WithDisabledTabs: Story = {
  args: {
    variant: "pill",
    defaultSelectedTab: "Available",
  },
  render: (args: TabsProps) => (
    <Tabs {...args}>
      <Tabs.Tab label="Available">
        <div style={{ padding: "24px" }}>
          <h3>Available Content</h3>
          <p>This tab is accessible and can be selected.</p>
        </div>
      </Tabs.Tab>
      <Tabs.Tab label="Coming Soon" disabled>
        <div style={{ padding: "24px" }}>
          <h3>This tab is disabled</h3>
          <p>Users cannot interact with this tab.</p>
        </div>
      </Tabs.Tab>
      <Tabs.Tab label="Also Available">
        <div style={{ padding: "24px" }}>
          <h3>Another Available Tab</h3>
          <p>This tab is also enabled.</p>
        </div>
      </Tabs.Tab>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use the disabled state to prevent interaction with tabs that are not yet available or applicable.",
      },
    },
  },
};

export const ManyTabs: Story = {
  args: {
    variant: "pill",
    defaultSelectedTab: "Tab 1",
  },
  render: (args: TabsProps) => (
    <Tabs {...args}>
      <Tabs.Tab label="Tab 1">
        <div style={{ padding: "24px" }}>Tab 1 content</div>
      </Tabs.Tab>
      <Tabs.Tab label="Tab 2">
        <div style={{ padding: "24px" }}>Tab 2 content</div>
      </Tabs.Tab>
      <Tabs.Tab label="Tab 3">
        <div style={{ padding: "24px" }}>Tab 3 content</div>
      </Tabs.Tab>
      <Tabs.Tab label="Tab 4">
        <div style={{ padding: "24px" }}>Tab 4 content</div>
      </Tabs.Tab>
      <Tabs.Tab label="Tab 5">
        <div style={{ padding: "24px" }}>Tab 5 content</div>
      </Tabs.Tab>
      <Tabs.Tab label="Tab 6">
        <div style={{ padding: "24px" }}>Tab 6 content</div>
      </Tabs.Tab>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The tabs component handles multiple tabs gracefully and can scale to accommodate many options.",
      },
    },
  },
};

export const ComplexContent: Story = {
  args: {
    variant: "underline",
    defaultSelectedTab: "Profile",
  },
  render: (args: TabsProps) => (
    <Tabs {...args}>
      <Tabs.Tab label="Profile" badge={{ label: "1", variant: "negative" }}>
        <div style={{ padding: "24px" }}>
          <h3>User Profile</h3>
          <p style={{ marginBottom: "12px" }}>
            Display complex content with multiple elements.
          </p>
          <ul style={{ paddingLeft: "20px" }}>
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Profile Picture</li>
            <li>Bio</li>
          </ul>
        </div>
      </Tabs.Tab>
      <Tabs.Tab label="Preferences">
        <div style={{ padding: "24px" }}>
          <h3>User Preferences</h3>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <label>
              <input type="checkbox" defaultChecked /> Email notifications
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Push notifications
            </label>
            <label>
              <input type="checkbox" /> SMS alerts
            </label>
          </form>
        </div>
      </Tabs.Tab>
      <Tabs.Tab label="Activity">
        <div style={{ padding: "24px" }}>
          <h3>Recent Activity</h3>
          <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
            <li>Logged in on Sep 24, 2026</li>
            <li>Updated profile on Sep 23, 2026</li>
            <li>Changed password on Sep 20, 2026</li>
            <li>Added new email on Sep 15, 2026</li>
          </ul>
        </div>
      </Tabs.Tab>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tabs can contain complex, interactive content including forms, lists, and nested components.",
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    variant: "pill",
    defaultSelectedTab: "Home",
  },
  render: (args: TabsProps) => (
    <Tabs {...args}>
      <Tabs.Tab label="Home">
        <div style={{ padding: "24px" }}>
          <h3>Welcome Home</h3>
          <p>
            This is the home tab. Try clicking on other tabs to switch content.
          </p>
        </div>
      </Tabs.Tab>
      <Tabs.Tab label="Examples" badge={{ label: "NEW", variant: "positive" }}>
        <div style={{ padding: "24px" }}>
          <h3>Examples & Use Cases</h3>
          <p>Explore different ways to use this component effectively.</p>
        </div>
      </Tabs.Tab>
      <Tabs.Tab label="Documentation">
        <div style={{ padding: "24px" }}>
          <h3>API Documentation</h3>
          <p>
            Comprehensive documentation for all tabs component props and
            methods.
          </p>
        </div>
      </Tabs.Tab>
      <Tabs.Tab label="Support" disabled>
        <div style={{ padding: "24px" }}>Support tab</div>
      </Tabs.Tab>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "An interactive example combining pills variant, badges, and disabled states. Use the controls to experiment with different configurations.",
      },
    },
  },
};
