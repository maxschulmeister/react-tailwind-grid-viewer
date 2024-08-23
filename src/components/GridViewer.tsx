import clsx from "clsx";
import { useEffect, useState } from "react";

interface GridConfig {
  breakpoint: string;
  columnClass: string;
  gapClass: string;
  classes?: string;
}

interface BuildClasses {
  visibility: string;
  grid: string;
}

interface GridViewerProps {
  color: string;
  opacity?: string;
  grid?: GridConfig[];
  container?: boolean;
  visibleByDefault?: boolean;
}

const defaultGrid: GridConfig[] = [
  {
    breakpoint: "default",
    columnClass: "grid-cols-2",
    gapClass: "gap-8",
    classes: "px-4",
  },
  {
    breakpoint: "md",
    columnClass: "grid-cols-6",
    gapClass: "gap-8",
    classes: "px-8",
  },
  {
    breakpoint: "lg",
    columnClass: "grid-cols-12",
    gapClass: "gap-16",
    classes: "px-16",
  },
  {
    breakpoint: "xl",
    columnClass: "grid-cols-12",
    gapClass: "gap-16",
    classes: "px-16",
  },
  {
    breakpoint: "2xl",
    columnClass: "grid-cols-12",
    gapClass: "gap-16",
    classes: "px-16",
  },
];

function buildClasses(
  grid: GridConfig,
  config: GridConfig[],
  index: number
): BuildClasses {
  const nextBreakpoint = config?.at(index + 1)?.breakpoint;
  const visibleClass =
    grid.breakpoint === "default" ? "flex" : `hidden ${grid.breakpoint}:flex`;
  const hiddenClass = nextBreakpoint ? `${nextBreakpoint}:hidden` : "hidden";

  return {
    visibility: clsx(visibleClass, hiddenClass),
    grid: clsx(grid.columnClass, grid.gapClass, grid.classes),
  };
}

export default function GridViewer({
  color,
  opacity = "bg-opacity-20",
  grid = defaultGrid,
  container = true,
  visibleByDefault = false,
}: GridViewerProps) {
  const [show, setShow] = useState(visibleByDefault);

  const keyPressHandler = (e: KeyboardEvent): void => {
    if (e.shiftKey && e.key.toLowerCase() === "g") {
      setShow((s) => !s);
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", keyPressHandler);
    return () => {
      document.removeEventListener("keypress", keyPressHandler);
    };
  }, []);

  if (!show) return null;

  return (
    <section
      className={clsx("fixed inset-0 pointer-events-none")}
      style={{ zIndex: 999 }}
    >
      {/* dummy div to include tailwind classes instead of safelist */}
      <div
        className={clsx(
          "4xl:flex 4xl:hidden",
          "3xl:flex 3xl:hidden",
          "sm:flex sm:hidden",
          "md:flex md:hidden",
          "lg:flex lg:hidden",
          "xl:flex xl:hidden",
          "2xl:flex 2xl:hidden"
        )}
      />
      {/* Loop through breakpoints */}
      {grid.map((gridConfig, index) => (
        <div
          key={gridConfig.breakpoint}
          className={buildClasses(gridConfig, grid, index).visibility}
        >
          {/* Show current breakpoint */}
          <div className={clsx("fixed inset-x-0 bottom-0 flex justify-end")}>
            <h1
              className={clsx(
                color,
                opacity,
                "flex px-4 py-2 text-xs font-bold text-white"
              )}
            >
              breakpoint: {gridConfig.breakpoint}
            </h1>
          </div>

          {/* Show current grid */}
          <div className={clsx("w-full mx-auto")}>
            <div
              className={clsx(
                { container: container },
                "grid",
                buildClasses(gridConfig, grid, index).grid
              )}
            >
              {[
                ...Array(
                  parseInt(gridConfig.columnClass.split("-").slice(-1)[0])
                ),
              ].map((_, index) => (
                <div
                  key={index}
                  className={clsx(
                    color,
                    opacity,
                    "flex h-screen items-center justify-center text-neutral-11"
                  )}
                >
                  <span>{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
