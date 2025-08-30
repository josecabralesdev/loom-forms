# Loom Forms 🧵

Craft perfect forms in an instant. Loom Forms is an intelligent form builder that uses AI to transform your simple descriptions into fully functional, customizable forms. Stop building from scratch—start weaving your ideas into reality.

![Loom Forms Logo Concept](https://via.placeholder.com/800x400.png?text=Clean+Modern+Logo+Showing+a+Form+Woven+with+Thread)

## ✨ Features

### 🤖 AI-Powered Form Generation
Describe your need in 1-2 sentences (e.g., "Collect customer feedback for a restaurant"). Our AI, powered by Gemini, instantly generates a draft form structure with appropriate fields (name, rating, comments, etc.), so you don't have to start from a blank slate.

### 🖱️ Drag-and-Drop Customization
The AI draft is just the beginning. Intuitively rearrange fields, add new questions, remove unnecessary ones, or adjust labels and placeholders with a simple, powerful drag-and-drop interface.

### ✅ Smart Validation Rules
Focus on the questions, not the rules. Loom Forms automatically suggests intelligent validation rules (like email format, required fields, number ranges, etc.) based on the field type and the form's overall purpose.

### 📤 Export & seamless Integration
Your form is ready. Now deploy it anywhere.
- **Export as HTML/JSON:** Get clean, standard code to use in your own projects.
- **Embed via iFrame:** Copy a single snippet of code to embed your form directly into any website or CMS like WordPress, Webflow, or Squarespace.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A Google Cloud Project with the Gemini API enabled

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/loom-forms.git
    cd loom-forms
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory and add your API key:
    ```env
    VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
5.  **Open your browser:**
    Navigate to `http://localhost:5173` (or the port indicated in your terminal).

## 📖 How to Use

1.  **Describe:** On the homepage, type what you need into the prompt box (e.g., "Create a volunteer sign-up form for a beach cleanup").
2.  **Generate:** Click "Generate" and let the AI craft your initial form draft.
3.  **Customize:** Use the drag-and-drop editor to perfect your form. Add sections, change field types, and apply custom validation.
4.  **Publish:** Click "Export" to choose your method—download the code or copy the embed link.

## 🛠️ Tech Stack

- **Frontend Framework:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **AI API:** [Google Gemini](https://deepmind.google/technologies/gemini/)
- **Drag & Drop:** [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) or [Dnd Kit](https://dndkit.com/)
- **UI Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Build Tool:** Vite

## 🤝 Contributing

We love contributions! Whether you're fixing a bug, improving documentation, or proposing a new feature, your help is welcome.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🆘 Support

If you have any questions or run into problems, please:
1. Check the [existing issues](https://github.com/josecabralesdev/loom-forms/issues) to see if it's already been addressed.
2. Open a new issue for a bug or feature request.

You can also reach out to us directly at `josecabralesdev@gmail.com`.

---

<p align="center">
<sub>Built with ❤️ and the magic of AI.</sub>
</p>
