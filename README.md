<div align="center">

# CipherKey 🔐  
**Multi‑Platform Password Manager** – Secure, fast, and customizable.  

[![Version](https://img.shields.io/badge/version-0.0.0-blue) ![License](https://img.shields.io/badge/License-Unlicensed-lightgrey) ![Stars](https://img.shields.io/github/stars/dharunkumar-sh/password-gen?style=flat) ![Forks](https://img.shields.io/github/forks/dharunkumar-sh/password-gen?style=flat) ![Tech](https://img.shields.io/badge/tech-React%20%26%20Tailwind-blue)  

</div>

## Description
CipherKey is a lightweight, open‑source password manager built with **React**, **TypeScript**, and **Tailwind CSS**. It stores credentials locally using the Web Storage API, offers both manual and automatic generation modes, and provides a modern, accessible UI powered by **ShadCN UI** components. Ideal for individuals and teams who want full control over their password data without relying on cloud services.

## Table of Contents
<details><summary>Click to expand Table of Contents</summary>

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

</details>

## Features
- **🔐 Automatic Mode** – Auto‑generate strong passwords using built‑in algorithms.  
- **🛠️ Manual Mode** – Create custom passwords with full control over length, character sets, and patterns.  
- **📦 Batch Generation** – Generate multiple passwords at once for bulk operations.  
- **🗣️ Passphrase Support** – Generate memorable passphrases with custom word lists.  
- **📊 Strength Indicator** – Real‑time visual feedback on password strength.  
- **📜 Password History** – View, edit, and delete saved credentials securely.  
- **🎨 Templates** – Pre‑defined patterns for common services (e.g., email, social media).  
- **📱 Responsive UI** – Fully responsive design using ShadCN UI components and Tailwind CSS.  

## Tech Stack
- **Language:** TypeScript  
- **Framework:** React 18 + Vite  
- **UI Library:** ShadCN UI components (built on Radix UI)  
- **Styling:** Tailwind CSS 3.x  
- **State Management:** React Context (lightweight)  
- **Storage:** Browser localStorage (client‑side)  
- **Dependencies:** @radix-ui/react-* components, @hookform/resolvers, etc.  

## Getting Started
### Prerequisites
- Node.js >= 18.x  
- npm or yarn  

### Installation
```bash
git clone https://github.com/dharunkumar-sh/password-gen.git
cd password-gen
npm install   # or `yarn install`
```

### Quick Start
```bash
npm run dev   # starts the development server (http://localhost:5173)
```

## Usage
### Generating a Password (client‑side example)
```tsx
import { PasswordGenerator } from '@/components/PasswordGenerator';

function App() {
  return (
    <div className="p-6">
      <PasswordGenerator
        length={16}
        includeNumbers={true}
        includeSymbols={true}
        onGenerate={(pwd) => console.log('Generated password:', pwd)}
      />
    </div>
  );
}
```

### Manual Mode
```tsx
import { ManualMode } from '@/components/ManualMode';

function App() {
  return <ManualMode onSubmit={(data) => alert('Saved!')} />;
}
```

## Folder Structure
```tree
src/
├─ components/          # Reusable UI components
│   ├─ AutomaticMode.tsx
│   ├─ BatchGenerator.tsx
│   ├─ ManualMode.tsx
│   └─ ... (other components)
├─ hooks/               # Custom React hooks
│   └─ use-mobile.tsx
├─ lib/                 # Utility functions
│   ├─ passwordUtils.ts
│   └─ utils.ts
├─ pages/               # Page-level components
│   ├─ Index.tsx
│   └─ NotFound.tsx
├─ App.tsx
├─ main.tsx
└─ ... (config files)
```

## Contributing
1. Fork the repository.  
2. Create a new branch for your feature/`fix`.  
3. Install dependencies and run `npm run dev` to verify locally.  
4. Write clear, typed code and add tests where applicable.  
5. Submit a Pull Request with a descriptive title and summary.  

Please follow the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md) and ensure all PRs pass linting (`npm run lint`) and type checking (`npm run type-check`).

## License
This project is provided **as‑is** without an explicit license. All rights reserved by the author.

## Acknowledgements
- **React** and **Vite** for a fast development experience.  
- **ShadCN UI** for beautiful, accessible components.  
- **Tailwind CSS** for utility‑first styling.  
- **Radix UI** for low‑level, composable primitives.  

---  

*Built with ❤️ by the CipherKey community.*
