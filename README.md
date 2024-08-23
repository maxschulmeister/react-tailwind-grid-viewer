# react-tailwind-grid-viewer

A React component that provides a visual overlay for displaying and debugging grid layouts in your application, defined by tailwind classes.

## Features

- Visualize grid columns across different breakpoints
- Toggle visibility with `Shift + G` on your keyboard
- Customizable colors and opacity
- Configurable grid settings for different breakpoints

## Installation

```
npm i react-tailwind-grid-viewer
```

or

```
yarn add react-tailwind-grid-viewer
```

## Usage

```tsx
import GridViewer from "react-tailwind-grid-viewer";
<GridViewer color="bg-cyan-500" />;
```

It's a good idea to avoid rendering the component in production, but it's up to you.

```tsx
{
  process.env.NODE_ENV !== "production" && <GridViewer color="bg-cyan-500" />;
}
```

### Keyboard Shortcut

Press `Shift + G` to toggle the grid overlay visibility.

### Custom Grid Config

```ts
const customGrid = [
  {
    breakpoint: "default",
    columnClass: "grid-cols-4",
    gapClass: "gap-4",
    classes: "px-2",
  },
  {
    breakpoint: "md",
    columnClass: "grid-cols-8",
    gapClass: "gap-6",
    classes: "px-4",
  },
  // ... add more breakpoints as needed
];

<GridViewer color="bg-cyan-500" grid={customGrid} />;
```

## Props

| Prop               | Type           | Default           | Description                                                                                                                   |
| ------------------ | -------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `color`            | `string`       | -                 | The background color class for the grid columns. Must be a valid Tailwind CSS background color class (e.g., `"bg-cyan-500"`). |
| `opacity`          | `string`       | `"bg-opacity-20"` | The opacity class for the grid columns. Must be a valid Tailwind CSS background opacity class (e.g., `"bg-opacity-20"`).      |
| `grid`             | `GridConfig[]` | See below\*       | An array of grid configurations for different breakpoints.                                                                    |
| `container`        | `boolean`      | `true`            | Whether to apply the `container` class to the grid wrapper.                                                                   |
| `visibleByDefault` | `boolean`      | `false`           | Whether the grid overlay should be visible by default.                                                                        |

### Default grid configuration:

```ts
[
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
```

## FAQ

### Q: I can only see the column numbers, but not the grid lines.

A: Make sure you set `color` to a existing background color class in from your tailwind config e.g. `bg-gray-500`.

### Q: Can I use GridViewer with other CSS frameworks?

A: While GridViewer is designed to work seamlessly with Tailwind CSS, you could use it with other frameworks by providing appropriate class names in the grid configuration.

### Q: How can I change the keyboard shortcut?

A: Currently, the keyboard shortcut is not customizable.

### Q: Does GridViewer affect my application's performance?

A: GridViewer is designed to have minimal impact on performance. It only renders when visible and uses CSS for most of its functionality. However, it's recommended to remove or disable it in production builds.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
