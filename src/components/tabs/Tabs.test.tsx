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

  });

  describe("Variants", () => {
    it("renders with pill variant (default)", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1">Content</Tabs.Tab>
        </Tabs>
      );

      const tablist = screen.getByRole("tablist");
      expect(tablist).toBeInTheDocument();
      expect(tablist.className).toContain("pill");
    });

    it("renders with underline variant", () => {
      render(
        <Tabs variant="underline">
          <Tabs.Tab label="Tab 1">Content</Tabs.Tab>
        </Tabs>
      );

      const tablist = screen.getByRole("tablist");
      expect(tablist).toBeInTheDocument();
      expect(tablist.className).toContain("underline");
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
    it("aria-selected is true for active tab", () => {
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
      expect(screen.queryByText("Content for Tab 2")).not.toBeInTheDocument();
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

      expect(screen.getByText("Content 2")).toBeInTheDocument();
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });

    it("shows/hides tabpanel when switching tabs", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1">Content 1</Tabs.Tab>
          <Tabs.Tab label="Tab 2">Content 2</Tabs.Tab>
        </Tabs>
      );

      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.queryByText("Content 2")).not.toBeInTheDocument();

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      fireEvent.click(tab2);

      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
      expect(screen.getByText("Content 2")).toBeInTheDocument();
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

  describe("Disabled State", () => {
    it("disabled tab does not change active tab on click", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" disabled />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      fireEvent.click(tab2);
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveAttribute("aria-selected", "false");
    });

    it("disabled tabs have disabled attribute", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" disabled />
        </Tabs>
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      expect(tab2).toHaveAttribute("disabled");
    });

    it("disabled tabs have aria-disabled attribute", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" disabled />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      expect(tab2).toHaveAttribute("aria-disabled", "true");
      expect(tab1).not.toHaveAttribute("aria-disabled");
    });
  });

  describe("Keyboard Navigation", () => {
    it("ArrowRight moves focus to next tab (roving tabindex)", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" />
          <Tabs.Tab label="Tab 3" />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      tab1.focus();

      fireEvent.keyDown(tab1, { key: "ArrowRight" });

      expect(tab2).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveAttribute("aria-selected", "false");
    });

    it("ArrowLeft moves focus to previous tab (roving tabindex)", () => {
      render(
        <Tabs defaultValue="Tab 2">
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab value="Tab 2" label="Tab 2" />
          <Tabs.Tab label="Tab 3" />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });

      expect(tab2).toHaveAttribute("aria-selected", "true");
      tab2.focus();

      fireEvent.keyDown(tab2, { key: "ArrowLeft" });

      expect(tab1).toHaveFocus();
      expect(tab2).toHaveAttribute("aria-selected", "true");
      expect(tab1).toHaveAttribute("aria-selected", "false");
    });

    it("Home moves focus to first tab (roving tabindex)", () => {
      render(
        <Tabs defaultValue="Tab 2">
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab value="Tab 2" label="Tab 2" />
          <Tabs.Tab label="Tab 3" />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });

      expect(tab2).toHaveAttribute("aria-selected", "true");
      tab2.focus();

      fireEvent.keyDown(tab2, { key: "Home" });

      expect(tab1).toHaveFocus();
      expect(tab2).toHaveAttribute("aria-selected", "true");
      expect(tab1).toHaveAttribute("aria-selected", "false");
    });

    it("End moves focus to last tab (roving tabindex)", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" />
          <Tabs.Tab label="Tab 3" />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab3 = screen.getByRole("tab", { name: "Tab 3" });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      tab1.focus();

      fireEvent.keyDown(tab1, { key: "End" });

      expect(tab3).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab3).toHaveAttribute("aria-selected", "false");
    });

    it("disabled tabs are skipped in keyboard navigation", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" disabled />
          <Tabs.Tab label="Tab 3" />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab3 = screen.getByRole("tab", { name: "Tab 3" });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      tab1.focus();

      fireEvent.keyDown(tab1, { key: "ArrowRight" });

      expect(tab3).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab3).toHaveAttribute("aria-selected", "false");
    });

    it("ArrowRight wraps focus around to first tab", () => {
      render(
        <Tabs defaultValue="Tab 3">
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" />
          <Tabs.Tab value="Tab 3" label="Tab 3" />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab3 = screen.getByRole("tab", { name: "Tab 3" });

      expect(tab3).toHaveAttribute("aria-selected", "true");
      tab3.focus();

      fireEvent.keyDown(tab3, { key: "ArrowRight" });

      expect(tab1).toHaveFocus();
      expect(tab3).toHaveAttribute("aria-selected", "true");
      expect(tab1).toHaveAttribute("aria-selected", "false");
    });

    it("ArrowLeft wraps focus around to last tab", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" />
          <Tabs.Tab label="Tab 3" />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab3 = screen.getByRole("tab", { name: "Tab 3" });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      tab1.focus();

      fireEvent.keyDown(tab1, { key: "ArrowLeft" });

      expect(tab3).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab3).toHaveAttribute("aria-selected", "false");
    });

    it("Enter activates focused tab", () => {
      render(
        <Tabs defaultValue="Tab 1">
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" />
          <Tabs.Tab label="Tab 3" />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      tab2.focus();

      fireEvent.keyDown(tab2, { key: "Enter" });

      expect(tab2).toHaveAttribute("aria-selected", "true");
      expect(tab1).toHaveAttribute("aria-selected", "false");
    });

    it("Space activates focused tab", () => {
      render(
        <Tabs defaultValue="Tab 1">
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" />
          <Tabs.Tab label="Tab 3" />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      tab2.focus();

      fireEvent.keyDown(tab2, { key: " " });

      expect(tab2).toHaveAttribute("aria-selected", "true");
      expect(tab1).toHaveAttribute("aria-selected", "false");
    });

    it("Enter is ignored on disabled tabs", () => {
      render(
        <Tabs defaultValue="Tab 1">
          <Tabs.Tab label="Tab 1" />
          <Tabs.Tab label="Tab 2" disabled />
        </Tabs>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      tab2.focus();

      fireEvent.keyDown(tab2, { key: "Enter" });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveAttribute("aria-selected", "false");
    });
  });

  describe("Edge Cases", () => {
    it("single tab component renders and works", () => {
      render(
        <Tabs>
          <Tabs.Tab label="Only Tab">Content</Tabs.Tab>
        </Tabs>
      );

      const tab = screen.getByRole("tab", { name: "Only Tab" });
      expect(tab).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });
});
