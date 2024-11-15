# Inline Python Package Installer for VS Code

A Visual Studio Code extension that automatically detects missing Python imports and offers to install them using pip.

This extension streamlines Python development by providing inline installation suggestions for missing packages.

## Features

- 🔍 Automatically detects missing Python module imports
- 💡 Provides quick-fix actions to install missing packages
- ⚙️ Configurable pip command for custom package installation
- 🤖 Optional auto-install mode for seamless development
- 📝 Detailed logging in the output channel

## Installation

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P`
3. Type `ext install inline-python-package-installer`
4. Press Enter

## Requirements

- Visual Studio Code ^1.80.0
- Python and pip installed and accessible from the terminal
- A workspace with Python files

## Extension Settings

This extension contributes the following settings:

- `inlinePythonPackageInstaller.autoInstallModules`: Enable/disable automatic installation of missing modules without prompting

- `inlinePythonPackageInstaller.customPipCommand`: Customize the pip command used for installing modules (default: "pip install")

## Usage

1. Open a Python file in VS Code
2. Type an import statement for a package that isn't installed
3. The extension will detect the missing import and offer to install it
4. Click the lightbulb icon or use Quick Fix (`Ctrl+.` / `Cmd+.`)
5. Select "Install missing module [module-name]"

## Development

### Prerequisites

- Node.js and npm/yarn
- Visual Studio Code
- Recommended VS Code extensions:
  - amodio.tsl-problem-matcher
  - ms-vscode.extension-test-runner
  - dbaeumer.vscode-eslint

### Setup

1. Clone the repository:

```bash
git clone [repository-url]
cd inline-python-package-installer
```

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Open in VS Code:

```bash
code .
```

### Development Workflow

1. Make changes to the source code in `src/`
2. Press `F5` to launch the extension in debug mode
3. Use `npm run watch` or `yarn watch` for automatic compilation
4. Run tests using the Test Runner in VS Code

### Building

```bash
npm run package
# or
yarn package
```

### Testing

1. Install the Extension Test Runner
2. Run the watch task:

```bash
npm run watch-tests
# or
yarn watch-tests
```

3. Open the Testing view and run tests

## Publishing

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Package the extension:

```bash
vsce package
```

4. Publish to marketplace:

```bash
vsce publish
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[MIT License](LICENSE)

## Release Notes

### 0.0.3 - 0.0.x

See [CHANGELOG.md](CHANGELOG.md) for detailed release notes.

### 0.0.2

- Initial release with basic functionality
- Support for automatic package detection
- Configurable pip command
- Quick fix actions for missing imports

## Support

For bugs, feature requests, and questions, please [create an issue](https://github.com/riordanmb/inline-python-package-installer/issues).