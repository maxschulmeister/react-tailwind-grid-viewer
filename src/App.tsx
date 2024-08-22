import { GridViewer } from "./components";

function App() {
  return (
    <>
      <GridViewer />
      <div className="space-y-4 text-center">
        <h1 className="text-xl">react-tailwind-grid-viewer</h1>
        <div className="px-2 py-0 border rounded border-gray-400 inline-block [&>*]:font-sans">
          <kbd>⇧</kbd> <kbd>G</kbd>
        </div>
      </div>
    </>
  );
}

export default App;
