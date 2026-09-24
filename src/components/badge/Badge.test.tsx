import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Badge from "./Badge";
import styles from "./Badge.module.scss";

describe("Badge component tests", () => {
  it("renders the label", () => {
    render(<Badge label="Active" />);

    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("always applies the badge class", () => {
    render(<Badge label="Active" />);

    expect(screen.getByText("Active")).toHaveClass(styles.badge);
  });

  it("uses the neutral variant by default", () => {
    render(<Badge label="Active" />);

    expect(screen.getByText("Active")).toHaveClass(styles.neutral);
  });

  it("applies the provided variant", () => {
    render(<Badge label="Success" variant="positive" />);

    expect(screen.getByText("Success")).toHaveClass(styles.positive);
  });
});
