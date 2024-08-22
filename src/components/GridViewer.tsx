import { useEffect, useState } from "react";

interface GridViewerConfig {
  color?: string;
  grid: GridConfig[];
}

interface GridConfig {
  breakpoint: string;
  columnClass: string;
  gapClass: string;
  defaultClasses: string;
}

interface BuildClasses {
  visibility: string;
  grid: string;
}

const defaultConfig: GridViewerConfig = {
  color: "bg-[#38BDF8]",
  grid: [
    {
      breakpoint: "default",
      columnClass: "grid-cols-2",
      gapClass: "gap-8",
      defaultClasses: "px-4",
    },
    {
      breakpoint: "md",
      columnClass: "grid-cols-6",
      gapClass: "gap-8",
      defaultClasses: "px-8",
    },
    {
      breakpoint: "lg",
      columnClass: "grid-cols-12",
      gapClass: "gap-16",
      defaultClasses: "px-16",
    },
    {
      breakpoint: "xl",
      columnClass: "grid-cols-12",
      gapClass: "gap-16",
      defaultClasses: "px-16",
    },
    {
      breakpoint: "2xl",
      columnClass: "grid-cols-12",
      gapClass: "gap-16",
      defaultClasses: "px-16",
    },
  ],
};

function buildClasses(
  grid: GridConfig,
  config: GridConfig[],
  index: number
): BuildClasses {
  const nextBreakpoint = config?.at(index + 1)?.breakpoint;
  const visibleClass =
    grid.breakpoint === `default` ? `flex` : `hidden ${grid.breakpoint}:flex`;
  const hiddenClass = nextBreakpoint ? `${nextBreakpoint}:hidden` : `hidden`;
  const defaultClasses = grid.defaultClasses;
  const columnClass = grid.columnClass;
  const gapClass = grid.gapClass;

  const visibilityClasses = [visibleClass, hiddenClass].join(" ").trim();
  const gridClasses = [columnClass, gapClass, defaultClasses].join(" ").trim();
  return {
    visibility: visibilityClasses,
    grid: gridClasses,
  };
}

interface GridViewerProps {
  config?: GridViewerConfig;
  visibleByDefault?: boolean;
}

export function GridViewer({
  config,
  visibleByDefault = false,
}: GridViewerProps) {
  config = config ? { ...defaultConfig, ...config } : defaultConfig;
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
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 999 }}
    >
      {/* dummy div to include tailwind classes instead of safelist */}
      <div
        className={`bg-[#38BDF8] 4xl:flex 4xl:hidden 3xl:flex 3xl:hidden sm:flex sm:hidden md:flex md:hidden lg:flex lg:hidden xl:flex xl:hidden 2xl:flex 2xl:hidden`}
      />
      {/* Loop through breakpoints */}
      {config.grid.map((grid, index) => (
        <div
          key={grid.breakpoint}
          className={buildClasses(grid, config.grid, index).visibility}
        >
          {/* Show current breakpoint */}
          <div className="fixed inset-x-0 bottom-0 flex justify-end">
            <h1
              className={`${config.color} flex px-4 py-2 text-xs font-bold text-white`}
            >
              breakpoint: {grid.breakpoint}
            </h1>
          </div>

          {/* Show current grid */}
          <div className="w-full mx-auto">
            <div
              className={`container grid ${
                buildClasses(grid, config.grid, index).grid
              }`}
            >
              {[
                ...Array(parseInt(grid.columnClass.split("-").slice(-1)[0])),
              ].map((_, index) => (
                <div
                  key={index}
                  className={`${config.color} flex h-screen items-center justify-center bg-opacity-20 text-neutral-11`}
                >
                  <span className="opacity-50">{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
