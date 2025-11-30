# OH PASRR Dashboard - Interactive Prototype

An interactive prototype for an Ohio PASRR (Preadmission Screening and Resident Review) compliance tracking dashboard.

## Features

- **Resident Management Dashboard**: Track PASRR compliance across multiple residents
- **Form Association**: Link PAS and 7000 forms to resident records
- **Compliance Tracking**: Monitor multiple compliance areas:
  - PASRR Compliance
  - 7000/PAS Form Compliance
  - AI Scan Compliance (for 7000 forms)
  - RR (Resident Review) Compliance
- **Interactive AI Scan Modal**: View detailed validation results for 7000 forms
- **Form Viewer**: Preview PAS and 7000 forms with browser-like interface
- **Filtering**: Apply and save custom filters

## Tech Stack

- React 18
- Vite (build tool)
- Tailwind CSS (styling)
- Lucide React (icons)

## Live Demo

The prototype is automatically deployed to GitHub Pages via GitHub Actions.

🌐 **Live URL**: `https://pmintzer.github.io/ClaudeTest/`

The deployment happens automatically when changes are pushed to the `claude/oh-pasrr-prototype-01UAHYMkBAdTMvmiQ9GVx5aJ` branch.

## Deployment Setup

### GitHub Pages Configuration

This project is configured to deploy automatically to GitHub Pages using GitHub Actions:

1. **GitHub Actions Workflow**: `.github/workflows/deploy.yml` handles the build and deployment
2. **Automatic Deployment**: Pushes to the branch trigger automatic deployment
3. **No Manual Steps**: Everything is automated!

### First-Time Setup (Repository Owner)

To enable GitHub Pages for this repository:

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**
4. The next push will trigger deployment automatically

### Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab in GitHub
2. Click on "Deploy to GitHub Pages" workflow
3. Click **Run workflow** → **Run workflow**

## Local Development

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The application will open automatically in your browser at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Associating Forms with Residents

1. Click **"Select a Form"** in the Document Type column for any resident
2. Choose from available forms in the dropdown
3. Click **"View"** to preview the form before associating it
4. Click **"Save"** to associate the selected form

### Toggling Document Types

For residents with forms already associated:
- Click the document type badge (7000 or PAS) to cycle through options
- The cycle is: No Form → 7000 → PAS → No Form

### Viewing AI Scan Results

For residents with 7000 forms:
- Click on the **AI Scan Compliance** status badge
- Review:
  - Overall risk score
  - Verified requirements
  - Specific page references
  - Compliance violations

### Compliance Status Colors

- 🟢 **Green**: Compliant
- 🔴 **Red**: Not Compliant / Requires Review
- 🟡 **Yellow**: Awaiting Form Association / Pending Review
- 🟠 **Orange**: RR Pending

## Project Structure

```
oh-pasrr-dashboard/
├── src/
│   ├── App.jsx          # Main dashboard component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── postcss.config.js    # PostCSS configuration
```

## License

This is a prototype project for demonstration purposes.
