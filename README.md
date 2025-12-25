# Py5Script IDE

A web-based IDE for running [p5.js](https://p5js.org/) sketches using Python, powered by [PyScript](https://pyscript.net/). This project allows you to write standard Python code that interacts with the p5.js library, with automatic handling of the p5 instance context.

## Interface Overview

The IDE provides a clean interface for coding, managing files, and running sketches.

### Toolbar Controls
- **▶ Run**: Executes the current sketch in the preview panel.
- **■ Stop**: Stops the running sketch and resets the preview.
- **💾 Save**: Downloads your entire project (all scripts and assets) as `project.zip` and marks changes as saved.
- **📂 Load**: Opens a file picker to load a `project.zip` or a single `.py` file.
    > **Warning**: Loading a project will **replace** your current workspace. Any unsaved changes will be lost.
- **🔗 Share**: Generates a shareable URL containing your code (compressed) to send to others. Note that this will **_not_** include assets or other python files.
- **⚙️ Settings**: Customizes the editor experience (Theme, Font Size, Tabs, whitespace).

### File Management & Assets
The sidebar on the left displays all files in your project (Python scripts, images, data files).
- **Files**: Listing of all logic and asset files.
- **sketch.py**: The main entry point.
- **Add File (+)**: Create new python modules.
- **Upload File (⬆)**: Upload images, CSVs, JSONs, or other assets directly into your project.
- **Viewing**: Click a file to view/edit it. (Binary files like images are currently read-only placeholders).

## How It Works

### Python & p5.js Integration
This IDE simplifies writing p5.js sketches in Python by abstracting away the global vs. instance mode distinction.

1.  **P5 Instance**: When you run a sketch, the system instantiates p5.js in "instance mode".
2.  **AST Analysis**: Before execution, your Python code is analyzed using Python's `ast` (Abstract Syntax Tree) module.
3.  **Auto-Prefixing**: The analyzer identifies calls to p5 functions (like `rect`, `fill`, `stroke`)  and variables (like `width`, `height`, `mouseX`, `mouseY`). It compares them against the properties of the p5 instance.
    - If a name matches a p5 property and is **not** defined by you (the user) in the script, it automatically prefixes it with `p5.`.
    - Example: `rect(10, 10, 50, 50)` becomes `p5.rect(10, 10, 50, 50)` internally.
    - Example: `print("Hello")` remains `print("Hello")` (uses Python's standard print).

### Limitations
- **Eval/Dynamic Access**: The auto-prefixing is a **static analysis**. It cannot detect usage inside `eval()` strings or dynamic attribute access. 
    - *Workaround*: You can always manually verify the prefix yourself. Passing `p5` explicitly or using `p5.func()` is always valid.
- **Variable Shadowing**: If you define a variable with the same name as a p5 function (e.g. `def rect(): ...`), the auto-prefixer will respect your definition and will **not** prefix usages of `rect`.

### Unified Storage & Projects
The IDE uses a unified storage system for everything.

- **Storage**: All files are stored in your browser's `localStorage` under a single project key.
- **Assets**: Images and data files are converted to Data URLs and stored alongside your code. They are automatically available to your sketch via standard file functions (`open()`, `loadImage()`, etc.).
- **Persistence**: Your workspace is auto-saved locally. However, to permanently save a specific version or share it, use the **Save** button to download a Zip.
- **Zip Files**: A `project.zip` contains every file in your file panel. Loading it restores the exact state of your workspace.

