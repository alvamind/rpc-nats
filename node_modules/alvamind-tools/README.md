# Alvamind Tools 🛠️

![npm version](https://img.shields.io/npm/v/alvamind-tools)
![License](https://img.shields.io/npm/l/alvamind-tools)
![Downloads](https://img.shields.io/npm/dm/alvamind-tools)
[![CI](https://github.com/alvamind/alvamind-tools/actions/workflows/ci.yml/badge.svg)](https://github.com/alvamind/alvamind-tools/actions)

A growing collection of developer tools focused on AI context generation, documentation, and workflow automation.

## 🌟 Features

### Current Tools:

#### 1. Source Code Context Generator (`generate-source`)
Perfect for creating AI prompts and documentation:
- 📝 Generates clean, formatted source code documentation
- 🔍 Smart file filtering and organization
- 🧹 Removes unnecessary comments and whitespace
- 📊 Provides code structure overview
- 🎯 Customizable include/exclude patterns
- 🤖 AI-friendly output format

#### 2. Quick Git Tools (`commit`)
Streamlines git workflow:
- 🚀 One-command git add, commit, and push
- ⚡ Automatic status checking
- 🔄 Smart push handling
- 💬 Simple commit message interface

### Coming Soon:
- 🧠 AI Prompt Template Generator
- 📚 Documentation Builder
- 🔗 API Context Generator
- 🎨 UI Component Documenter
- 📊 Project Stats Analyzer
- 🔍 Code Search Tools
- 🛠️ And many more!

## 📦 Installation

```bash
npm install alvamind-tools --save-dev
```

## 🚀 Quick Start

Add to your package.json:
```json
{
  "scripts": {
    "generate-source": "generate-source",
    "commit": "commit"
  }
}
```

### Generate Source Code Context

```bash
# Basic usage
npm run generate-source

# Custom output file
npm run generate-source output=ai-context.md

# Include specific files
npm run generate-source include=src/*.ts,utils/*.ts

# Exclude patterns
npm run generate-source exclude=*.test.ts,*.spec.ts
```

#### Options:
- `output=filename.md` - Set output file name
- `include=pattern1,pattern2` - Files to include (glob patterns)
- `exclude=pattern1,pattern2` - Files to exclude (glob patterns)

### Quick Git Commit

```bash
# Commit and push changes
npm run commit "your commit message"
```

## 🎯 Use Cases

### 1. AI Development Context
Perfect for:
- Creating context for AI pair programming
- Generating documentation prompts
- Building project overviews
- Code review assistance

### 2. Documentation
- Project documentation
- Code walkthroughs
- Architecture overviews
- Team onboarding materials

### 3. Code Reviews
- Pull request descriptions
- Code change summaries
- Review context generation

## 🔧 Configuration

### Default Excludes:
- node_modules
- .git
- build directories
- test files
- and more...

### Custom Configuration
Create `.alvamindrc.json` in your project root:
```json
{
  "generateSource": {
    "excludes": ["*.spec.ts", "*.test.ts"],
    "includes": ["src/**/*.ts"],
    "outputFormat": "markdown",
    "removeComments": true
  }
}
```

## 📚 Examples

### AI Context Generation
```bash
# Generate context for specific feature
npm run generate-source output=auth-feature.md include=src/auth/**/*

# Create documentation context
npm run generate-source output=docs-context.md include=src/docs/**/*
```

### Documentation Generation
```bash
# Generate project overview
npm run generate-source output=project-overview.md

# Create API documentation
npm run generate-source output=api-docs.md include=src/api/**/*
```

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
```bash
# Clone repo
git clone https://github.com/alvamind/alvamind-tools.git

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## 📜 License

MIT © [Alvamind](LICENSE)

## 🔗 Links
- [NPM Package](https://www.npmjs.com/package/alvamind-tools)
- [GitHub Repository](https://github.com/alvamind/alvamind-tools)
- [Documentation](https://github.com/alvamind/alvamind-tools#readme)
- [Issues](https://github.com/alvamind/alvamind-tools/issues)

## 🎉 Support

If you find this tool helpful, please give it a ⭐️ on GitHub!

For issues, feature requests, or support:
- 🐛 [File an issue](https://github.com/alvamind/alvamind-tools/issues)
- 💡 [Feature requests](https://github.com/alvamind/alvamind-tools/issues)
- 📧 [Email support](mailto:support@alvamind.com)

## 🗺️ Roadmap

See our [project roadmap](https://github.com/alvamind/alvamind-tools/projects) for upcoming features and improvements.

---
Made with ❤️ by [Alvamind](https://github.com/alvamind)
