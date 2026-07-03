<div align="center">

# CipherKey 🔐  
**Multi‑Platform Password Manager** – Secure, fast, and customizable.  

[![Version](https://img.shields.io/badge/version-0.0.0-blue) ![License](https://img.shields.io/badge/License-Unlicensed-lightgrey) ![Stars](https://img.shields.io/github/stars/dharunkumar-sh/password-gen?style=flat) ![Forks](https://img.shields.io/github/forks/dharunkumar-sh/password-gen?style=flat) ![Tech](https://img.shields.io/badge/tech-React%20%26%20Tailwind-blue)  

</div>

<Description>  
CipherKey is a modern, open‑source password manager built with **React**, **TypeScript**, **ShadCN‑UI**, and **TailwindCSS**. It offers both automatic and manual password generation, batch creation of passphrases, real‑time strength indicators, and a history of generated credentials—all stored locally via `localStorage`. The UI is fully responsive and follows accessible design principles, making it ideal for individuals and teams seeking a self‑hosted, privacy‑first solution.  

<InteractiveTOC>  

[## Hero](#hero)  
[## Description](#description)  
[## Features](#features)  
[## TechStack](#techstack)  
[## GettingStarted](#gettingstarted)  
[## Usage](#usage)  
[## FolderStructure](#folderstructure)  
[## Contributing](#contributing)  
[## License](#license)  
[## Acknowledgements](#acknowledgements)  
[## ArchitectureDiagram](#architecturediagram)  

<Features>  

- 🔐 **Automatic & Manual Modes** – One‑click generation or fine‑grained manual control.  
- 📦 **Batch Generation** – Produce multiple passwords/passphrases in a single operation.  
- 📊 **Password Strength Indicator** – Visual entropy gauge for instant feedback.  
- 📁 **Password History & Templates** – Save, retrieve, and reuse credentials or predefined patterns.  
- 🎨 **ShadCN‑UI + TailwindCSS** – Modern, accessible, and fully responsive UI components.  
- 🪝 **Reusable Hooks & Utilities** – `src/lib/passwordUtils.ts` and `src/lib/utils.ts` provide entropy calculation, storage helpers, and validation logic.  

<TechStack>  

- **Language:** TypeScript  
- **Framework:** React 18  
- **UI Library:** ShadCN‑UI (built on Radix UI)  
- **Styling:** TailwindCSS 3  
- **Build Tool:** Vite  
- **State Management:** React Context (via Radix components)  
- **Testing:** Not configured (future‑ready)  

<GettingStarted>  

**Prerequisites**  
- Node.js ≥ 18.x  
- npm ≥ 9.x  

**Installation**  

```bash
git clone https://github.com/dharunkumar-sh/password-gen.git
cd password-gen
npm install
```

**Quick Start**  

```bash
npm run dev   # starts the dev server (http://localhost:5173)
```

Open the app in your browser and begin generating passwords instantly.  

<Usage>  

```tsx
import { PasswordGenerator } from "@/components/PasswordGenerator";

export default function App() {
  return (
    <div class
