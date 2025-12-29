# Py5Script IDE

A web-based IDE for running [p5.js](https://p5js.org/) sketches using Python, powered by [PyScript](https://pyscript.net/). This project allows you to write standard Python code that interacts with the p5.js library, with automatic handling of the p5 instance context.

## Interface Overview

The IDE provides a clean interface for coding, managing files, and running sketches.

## Interface Overview

The IDE provides a clean interface for coding, managing files, and running sketches.

### Toolbar Controls
- **▶ Run**: Executes the current sketch in the preview panel.
- **■ Stop**: Stops the running sketch and resets the preview.
- **📄 New**: Creates a fresh, empty project with a unique ID.
- **📂 Open**: Opens a modal list of all your locally saved projects to switch between.
- **💾 Download**: Exports the project to your computer.
    - **Single File (`.py`)**: If the project (text-only) contains only `sketch.py`, it downloads as `[ProjectName].py`.
    - **Full Project (`.zip`)**: If you have multiple files or binary assets, it downloads `[ProjectName].zip`.
- **⬆ Upload (Header)**: Imports a `.zip` or `.py` file as a **NEW** project, redirecting you to it.
- **🔗 Share**: Generates a shareable URL.
    - **Single File**: Uses `?code=` with LZString compression (short and clean).
    - **Multi-File**: Uses `?zip=` with Base64+LZString compression (supports images, shaders, etc.).
- **⚙️ Settings**: Customizes the editor experience (Theme, Font Size, Tabs, whitespace).

### File Management & Assets
The sidebar on the left displays all files in your current project.
- **Files**: Listing of all code and asset files.
- **sketch.py**: The main entry point.
- **Add File (+)**: Create new python modules or shader files (`.vert`, `.frag`, `.glsl`).
- **Upload File (Sidebar ⬆)**: Upload images, data, or scripts **into the current project**.
- **Viewing**: Click a file to view/edit it. (Binary files like images are read-only placeholders).

## How It Works

### Python & p5.js Integration
This IDE simplifies writing p5.js sketches in Python by abstracting away the global vs. instance mode distinction.

1.  **P5 Instance**: The system instantiates p5.js in "instance mode".
2.  **Instance Naming**: The instance is named `P5` to avoid conflicting with the global `p5` object.
3.  **Global p5**: The standard `p5` object is used for static classes (e.g., `p5.Vector`, `p5.Image`, `p5.TWO_PI`).
4.  **Automatic Hydration**: Your project files (code and assets) are automatically made available to the Python environment via a virtual file system. 
    - You can use python's `open("data.txt")` or p5's `P5.loadImage("img.png")` directly.
5.  **AST Analysis**: Python code is analyzed to auto-prefix p5 functions.
    - `rect(10, 10, 50, 50)` -> `P5.rect(10, 10, 50, 50)`
    - `print("Hello")` -> `print("Hello")` (Python built-in)

### Snake Case Support
You can optionally write p5.js code using `snake_case`. The IDE automatically converts it to `camelCase`.
- `create_canvas(400, 400)` -> `P5.createCanvas(400, 400)`
- `def mouse_pressed():` -> registers `mousePressed`

### Project Management & Storage
- **Local Storage**: All projects are stored in your browser's `localStorage` using unique IDs (e.g., `project_my-cool-sketch_files`).
- **Persistence**: Changes are auto-saved to local storage as you type (debounced).
- **Listing**: The "Open" button reads the registry of all saved projects.

### Modes: IDE vs Viewer
1.  **IDE Mode (`ide.html`)**: The full integrated development environment.
2.  **Viewer Mode (`view.html`)**: A minimal, full-screen runner.
    - Can load shared projects via `?zip=` or `?code=`.
    - Useful for sharing finished work.

### URL Parameters
- `?id=<project-id>`: Loads a locally saved project by its ID.
- `?sketch=<url>`: Imports a project from an external URL (zip or py).
- `?code=<lz_string>`: Loads a single-file sketch from the URL hash.
- `?zip=<base64_lz_string>`: Loads a multi-file project from the URL hash.
- `?case=<mode>`: Configures snake_case converter (`both`, `snake`, `camel`).

## Deployment & Hosting

### GitHub Pages
This project is ready to be hosted on GitHub Pages. The `index.html` redirects to `ide.html`.

### Local Hosting
Due to CORS/Module security, you must use a local web server:

**Using Python**:
```bash
python3 -m http.server 8000
```
**Using Node.js**:
```bash
npx http-server .
```

## Asset Management
You can upload assets (images, fonts, shaders, CSVs) via the sidebar. These are stored as Base64 Data URLs within your project data.
- **Python**: `open("data.txt")` works as expected.
- **p5.js**: `P5.loadImage("cat.png")` works as expected (the system intercepts the call and provides the stored data).
- **Shaders**: You can create `.vert` and `.frag` files and load them using `P5.loadShader("shader.vert", "shader.frag")`.

## License
MIT
