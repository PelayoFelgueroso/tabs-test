import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge from "./Badge";
import ExampleContainer from "../../../.storybook/components/example-container/ExampleContainer";

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
    <ExampleContainer>
      <Badge label="Default" />
      <Badge label="Positive" variant="positive" />
      <Badge label="Negative" variant="negative" />
    </ExampleContainer>
  ),
};

export const Mobile: Story = {
  render: () => (
    <ExampleContainer>
      <Badge label="Default" />
      <Badge label="Positive" variant="positive" />
      <Badge label="Negative" variant="negative" />
    </ExampleContainer>
  ),
  globals: {
    viewport: { value: "iphonex", isRotated: false },
  },
};
