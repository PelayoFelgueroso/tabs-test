import { ReactNode } from "react";
import styles from "./ExampleContainer.module.scss";

export type PseudoState =
  | "pseudo-active"
  | "pseudo-focus"
  | "pseudo-focus-visible"
  | "pseudo-focus-within"
  | "pseudo-hover";

type Props = {
  children?: ReactNode;
  pseudoState?: PseudoState | PseudoState[];
};

function ExampleContainer({ children, pseudoState }: Props) {
  return (
    <div
      className={`${styles.exampleContainer} ${Array.isArray(pseudoState) ? pseudoState.map((state) => `${state}-all`).join(" ") : `${pseudoState}-all`}`}
    >
      {children}
    </div>
  );
}

export default ExampleContainer;
