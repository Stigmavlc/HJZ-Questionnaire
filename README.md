# HJZ Plumbing Questionnaire Web Application

A modern, responsive questionnaire web application for Henry (HJZ Plumbing) to provide comprehensive business information to the automated booking system.

## Features

- 🔐 **Password Protected** - Secure access with password: `HenryHJZAutomation`
- 📱 **Fully Responsive** - Works seamlessly on PC, tablet, and mobile devices
- 💾 **Auto-Save Progress** - Answers saved automatically to browser local storage
- 📊 **Visual Progress Tracking** - Progress bar and question counter
- ✉️ **Email Integration** - Automatically formats and sends responses via email
- 🎨 **Beautiful UI** - Built with ShadCN UI components and Tailwind CSS
- ⚡ **Fast & Modern** - Powered by React, TypeScript, and Vite

## Question Structure

The questionnaire contains **95 questions** organized into 19 sections:

1. Services Offered
2. Gas Safety & Qualifications
3. Service Areas
4. Operating Hours
5. Job Duration & Scheduling
6. Pricing & Deposits
7. Payment Methods & Deposit Collection
8. Appointments & Scheduling
9. Emergency & Same-Day Work
10. Assessments & Installations
11. Materials & Parts
12. Access & Property Requirements
13. Policies & Legal
14. Common Customer Questions
15. Special Situations
16. Follow-Up & Communication
17. System Failure & Backup Plans
18. Booking Confirmation Details
19. Business Positioning

## How to Use

### For Henry:

1. Visit the deployed GitHub Pages URL
2. Enter password: `HenryHJZAutomation`
3. Answer questions one at a time
4. Use "Save Progress" button to save your work (saved to your browser)
5. Navigate using "Previous" and "Next" buttons
6. When all questions are answered, click "Send to Ivan"
7. Your default email client will open with all responses formatted
8. Send the email to complete the questionnaire

## Local Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

### Step-by-Step Instructions

1. **Create a new GitHub repository** named `henry-questionnaire-webapp`

2. **Initialize Git and push:**
   ```bash
   cd henry-questionnaire-webapp
   git init
   git add .
   git commit -m "Initial commit: HJZ Plumbing Questionnaire"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/henry-questionnaire-webapp.git
   git push -u origin main
   ```

3. **Create GitHub Actions workflow:**

   Create `.github/workflows/deploy.yml` with this content:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: ['main']
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4

         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: 'npm'

         - name: Install dependencies
           run: npm ci

         - name: Build
           run: npm run build

         - name: Setup Pages
           uses: actions/configure-pages@v4

         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: './dist'

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

4. **Push the workflow:**
   ```bash
   mkdir -p .github/workflows
   # (Create deploy.yml file with content above)
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions deployment workflow"
   git push
   ```

5. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - The site will be deployed automatically!

6. **Access your site:**
   - URL: `https://YOUR_USERNAME.github.io/henry-questionnaire-webapp/`

## Project Structure

```
henry-questionnaire-webapp/
├── src/
│   ├── components/
│   │   ├── ui/                  # ShadCN UI components
│   │   ├── PasswordGate.tsx     # Password authentication
│   │   └── Questionnaire.tsx    # Main questionnaire component
│   ├── data/
│   │   └── questions.ts         # All 95 questions data
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── README.md
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - Beautiful component library
- **Lucide React** - Icon library

## Configuration

### Password

The password is hardcoded in `src/components/PasswordGate.tsx`:
```typescript
const CORRECT_PASSWORD = 'HenryHJZAutomation'
```

### Email Recipient

The email recipient is set in `src/components/Questionnaire.tsx`:
```typescript
const mailto = `mailto:ivanaguilarmari@gmail.com?subject=${subject}&body=${body}`
```

### Base Path

The base path is configured in `vite.config.ts`:
```typescript
base: '/henry-questionnaire-webapp/'
```

**Important:** Change this to match your repository name if different.

## Troubleshooting

### Issue: Blank page after deployment

**Solution:** Check that the `base` path in `vite.config.ts` matches your repository name.

### Issue: Email button not working

**Solution:** Ensure the device has a default email client configured (Gmail, Outlook, etc.).

### Issue: Progress not saving

**Solution:** Check browser's local storage is enabled. Private/Incognito mode may prevent storage.

## Support

For issues or questions, contact: ivanaguilarmari@gmail.com

---

**Built with ❤️ for HJZ Plumbing Automation**
