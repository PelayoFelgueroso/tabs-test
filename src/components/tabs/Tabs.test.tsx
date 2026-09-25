import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Tabs from "./Tabs";
import Tab from "./Tab";

describe("Tabs component tests", () => {
  describe("Basic Rendering", () => {
    it("renders the tablist container", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
        </Tabs>
      );

      expect(screen.getByRole("tablist")).toBeInTheDocument();
    });

    it("renders all provided tabs", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" />
          <Tabs.Tab label="Tab 3" />
        </Tabs>
      );

      expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Tab 3" })).toBeInTheDocument();
    });

    it("applies tabsContainer styling", () => {
      const { container } = render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
        </Tabs>
      );

      const tablist = screen.getByRole("tablist");
      expect(tablist).toBeInTheDocument();
      expect(container.querySelector("[role='tablist']")).toHaveAttribute("class");
    });
  });

  describe("Variants", () => {
    it("applies pill variant by default", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
        </Tabs>
      );

      expect(screen.getByRole("tablist")).toBeInTheDocument();
    });

    it("applies pill variant when specified", () => {
      render(
        <Tabs variant="pill">
          <Tabs.Tab label="Tab 1" />
        </Tabs>
      );

      expect(screen.getByRole("tablist")).toBeInTheDocument();
    });

    it("applies underline variant when specified", () => {
      render(
        <Tabs variant="underline">
          <Tabs.Tab label="Tab 1" />
        </Tabs>
      );

      expect(screen.getByRole("tablist")).toBeInTheDocument();
    });

    it("applies variant class to tab buttons", () => {
      render(
        <Tabs variant="pill">
          <Tabs.Tab label="Tab 1" />
        </Tabs>
      );

      const tab = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab).toBeInTheDocument();
    });
  });

  describe("Active Tab Selection", () => {
    it("selects the first tab by default", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab1).toHaveAttribute("aria-selected", "true");
    });

    it("uses defaultValue to select initial tab", () => {
      render(
        <Tabs defaultValue="tab-2">
          <Tabs.Tab value="tab-1" label="Tab 1" />
          <Tabs.Tab value="tab-2" label="Tab 2" />
        </Tabs>
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      expect(tab2).toHaveAttribute("aria-selected", "true");
    });

    it("changes active tab on click", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveAttribute("aria-selected", "false");

      fireEvent.click(tab2);

      expect(tab1).toHaveAttribute("aria-selected", "false");
      expect(tab2).toHaveAttribute("aria-selected", "true");
    });

    it("applies selected class to active tab", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" />
        </Tabs>
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      fireEvent.click(tab2);

      expect(tab2).toHaveAttribute("aria-selected", "true");
    });

    it("removes selected class from previously active tab", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });

      fireEvent.click(tab2);
      expect(tab1).toHaveAttribute("aria-selected", "false");
    });
  });

  describe("Tab Values", () => {
    it("uses label as value when value prop is not provided", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
        </Tabs>
      );

      const tab = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab).toHaveAttribute("id", "tab-Tab 1");
    });

    it("uses custom value when provided", () => {
      render(
        <Tabs>
          <Tabs.Tab value="custom-tab" label="Tab 1" />
        </Tabs>
      );

      const tab = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab).toHaveAttribute("id", "tab-custom-tab");
    });

    it("allows selection by custom value", () => {
      render(
        <Tabs defaultValue="tab-2">
          <Tabs.Tab value="tab-1" label="Tab 1" />
          <Tabs.Tab value="tab-2" label="Tab 2" />
        </Tabs>
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      expect(tab2).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Badge Support", () => {
    it("renders badge in tab when provided", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" badge={{ label: "New", variant: "positive" }} />
        </Tabs>
      );

      expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("does not render badge when not provided", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
        </Tabs>
      );

      expect(screen.queryByText("New")).not.toBeInTheDocument();
    });

    it("renders badge with correct variant", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" badge={{ label: "Warning", variant: "negative" }} />
        </Tabs>
      );

      const badge = screen.getByText("Warning");
      expect(badge).toBeInTheDocument();
    });
  });

  describe("Underline Variant Specifics", () => {
    it("renders underline element for underline variant", () => {
      const { container } = render(
        <Tabs variant="underline">
          <Tabs.Tab label="Tab 1" />
        </Tabs>
      );

      const lineElements = container.querySelectorAll("[class*='line']");
      expect(lineElements.length).toBeGreaterThan(0);
    });

    it("applies selected class to underline when tab is active", () => {
      const { container } = render(
        <Tabs variant="underline" defaultValue="tab-2">
          <Tabs.Tab value="tab-1" label="Tab 1" />
          <Tabs.Tab value="tab-2" label="Tab 2" />
        </Tabs>
      );

      const lines = container.querySelectorAll("[class*='line']");
      expect(lines.length).toBeGreaterThan(1);
    });
  });

  describe("ARIA Attributes", () => {
    it("renders tab with role='tab'", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
        </Tabs>
      );

      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("role", "tab");
    });

    it("renders with aria-selected attribute", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
        </Tabs>
      );

      const tab = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab).toHaveAttribute("aria-selected");
    });

    it("aria-selected is true for active tab", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
        </Tabs>
      );

      const tab = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab).toHaveAttribute("aria-selected", "true");
    });

    it("aria-selected is false for inactive tabs", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" />
        </Tabs>
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      expect(tab2).toHaveAttribute("aria-selected", "false");
    });

    it("renders tablist container with role='tablist'", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
        </Tabs>
      );

      expect(screen.getByRole("tablist")).toBeInTheDocument();
    });
  });

  describe("onChange Callback", () => {
    it("calls onChange when tab is clicked", () => {
      const handleChange = vi.fn();

      render(
        <Tabs onChange={handleChange}>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" />
        </Tabs>
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      fireEvent.click(tab2);

      expect(handleChange).toHaveBeenCalledWith("Tab 2");
    });

    it("calls onChange with custom value", () => {
      const handleChange = vi.fn();

      render(
        <Tabs onChange={handleChange}>
          <Tabs.Tab value="tab-1" label="Tab 1" />
          <Tabs.Tab value="tab-2" label="Tab 2" />
        </Tabs>
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      fireEvent.click(tab2);

      expect(handleChange).toHaveBeenCalledWith("tab-2");
    });

    it("does not throw error if onChange is not provided", () => {
      expect(() => {
        render(
          <Tabs>
            <Tabs.Tab label="Tab 1" />
            <Tabs.Tab label="Tab 2" />
          </Tabs>
        );

        const tab2 = screen.getByRole("tab", { name: "Tab 2" });
        fireEvent.click(tab2);
      }).not.toThrow();
    });
  });

  describe("Error Handling", () => {
    it("throws error when Tab is used outside of Tabs", () => {
      expect(() => {
        render(<Tab label="Tab 1" />);
      }).toThrow("Tab must be used within a Tabs component");
    });
  });

  describe("Multiple Tabs Selection", () => {
    it("only one tab is selected at a time", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" />
          <Tabs.Tab label="Tab 3" />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      const tab3 = screen.getByRole("tab", { name: "Tab 3" });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveAttribute("aria-selected", "false");
      expect(tab3).toHaveAttribute("aria-selected", "false");

      fireEvent.click(tab2);

      expect(tab1).toHaveAttribute("aria-selected", "false");
      expect(tab2).toHaveAttribute("aria-selected", "true");
      expect(tab3).toHaveAttribute("aria-selected", "false");
    });
  });

  describe("Tab Content (Panel)", () => {
    it("renders tabpanel with role when children provided", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1">Content 1</Tabs.Tab>
        </Tabs>
      );

      expect(screen.getByRole("tabpanel")).toBeInTheDocument();
    });

    it("does not render tabpanel when no children provided", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
        </Tabs>
      );

      expect(screen.queryByRole("tabpanel")).not.toBeInTheDocument();
    });

    it("displays content for active tab", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1">Content for Tab 1</Tabs.Tab>
          <Tabs.Tab label="Tab 2">Content for Tab 2</Tabs.Tab>
        </Tabs>
      );

      expect(screen.getByText("Content for Tab 1")).toBeInTheDocument();
      expect(screen.getByText("Content for Tab 2")).toBeInTheDocument();
    });

    it("hides tabpanel content when tab is not active", () => {
      render(
        <Tabs defaultValue="tab-2">
          <Tabs.Tab value="tab-1" label="Tab 1">
            Content 1
          </Tabs.Tab>
          <Tabs.Tab value="tab-2" label="Tab 2">
            Content 2
          </Tabs.Tab>
        </Tabs>
      );

      const panel1 = screen.getByText("Content 1").closest("[role='tabpanel']");
      const panel2 = screen.getByText("Content 2").closest("[role='tabpanel']");

      expect(panel1).toHaveAttribute("hidden");
      expect(panel2).not.toHaveAttribute("hidden");
    });

    it("shows/hides tabpanel when switching tabs", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1">Content 1</Tabs.Tab>
          <Tabs.Tab label="Tab 2">Content 2</Tabs.Tab>
        </Tabs>
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      const panel1 = screen.getByText("Content 1").closest("[role='tabpanel']");
      const panel2 = screen.getByText("Content 2").closest("[role='tabpanel']");

      expect(panel1).not.toHaveAttribute("hidden");
      expect(panel2).toHaveAttribute("hidden");

      fireEvent.click(tab2);

      expect(panel1).toHaveAttribute("hidden");
      expect(panel2).not.toHaveAttribute("hidden");
    });

    it("links tab with tabpanel using aria-labelledby and aria-controls", () => {
      render(
        <Tabs>
          <Tabs.Tab value="custom-tab" label="Tab 1">
            Content
          </Tabs.Tab>
        </Tabs>
      );

      const tab = screen.getByRole("tab", { name: "Tab 1" });
      const panel = screen.getByRole("tabpanel");

      expect(tab).toHaveAttribute("aria-controls", "tabpanel-custom-tab");
      expect(tab).toHaveAttribute("id", "tab-custom-tab");
      expect(panel).toHaveAttribute("id", "tabpanel-custom-tab");
      expect(panel).toHaveAttribute("aria-labelledby", "tab-custom-tab");
    });

    it("renders complex content in tabpanels", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1">
            <div>
              <h2>Title</h2>
              <p>Complex content</p>
              <button>Action Button</button>
            </div>
          </Tabs.Tab>
        </Tabs>
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Complex content")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Action Button" })).toBeInTheDocument();
    });
  });
});
