# Full-Stack Habit Tracker

A modern, high-performance habit tracking application built with a focus on type-safety and the latest React 19 patterns.

## 🎨 Design Credit
The UI/UX design for this project was inspired by the tutorial: [Build a Full-Stack AI-Powered Habit Tracker App](https://www.youtube.com/watch?v=PO-UZsQnkNU&list=PLbRpkalMD_hxM8lBsTiRetKkrd-QyDxEQ&index=1) (MERN Stack).

> **Note:** While the visual design is inspired by the tutorial above, the **entire technical implementation is original**. This project moves away from the traditional MERN stack in favor of a modern Next.js architecture.

## 🚀 Tech Stack & Implementation
This version was built from the ground up using a different and more modern stack:

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Authentication:** [Clerk](https://clerk.com/)
* **Language:** [TypeScript](https://www.typescriptlang.org/) for full-stack type safety.
* **Form Handling:** [React Hook Form](https://react-hook-form.com/)
* **State Management:** Built using React 19's new `useActionState` hook for seamless Server Action integration.
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)

## 🛠️ Key Features
* **Zero-Config Styling:** Utilizing Tailwind v4's CSS-first configuration.
* **Server Actions:** Direct database mutations with optimistic UI updates.
* **Dynamic Weekly Grid:** Automated date calculation for a rolling 7-day tracking view.
* **Scalable SVG Components:** Custom-built circular progress bars and habit icons.