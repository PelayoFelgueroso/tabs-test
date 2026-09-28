import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    label: "Badge",
  },
  argTypes: {
    label: {
      control: "text",
      description: "The text to display inside the badge",
    },
    variant: {
      control: "select",
      options: ["neutral", "positive", "negative"],
      description: "The variant style of the badge",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default",
  },
};

export const Positive: Story = {
  args: {
    label: "Positive",
    variant: "positive",
  },
};

export const Negative: Story = {
  args: {
    label: "Negative",
    variant: "negative",
  },
};

export const AllVariants: Story = {
  render: () => (
    <>
      <Badge label="Default" />
      <Badge label="Positive" variant="positive" />
      <Badge label="Negative" variant="negative" />
    </>
  ),
};

export const Mobile: Story = {
  render: () => (
    <>
      <Badge label="Default" />
      <Badge label="Positive" variant="positive" />
      <Badge label="Negative" variant="negative" />
    </>
  ),
  globals: {
    viewport: { value: "iphonex", isRotated: false },
  },
};
