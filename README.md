# Portfolio Website with AI Chat Assistant

A modern, responsive portfolio website built for product designers featuring an AI-powered chat assistant that can answer questions about your work, experience, and design philosophy.

## 🚀 Features

- **AI Chat Interface**: OpenAI-powered assistant that answers questions about your work
- **Project Showcase**: Left sidebar displaying your featured projects
- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **Dark Mode Support**: Built-in dark/light theme switching
- **Performance Optimized**: Built with Next.js 14 for optimal loading speeds

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Animations**: Framer Motion
- **AI Integration**: OpenAI GPT-3.5-turbo
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- npm or yarn package manager

## 🚀 Quick Start

1. **Clone and Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   Create a `.env.local` file in the root directory:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Customize Your Information**
   
   **Update the AI Assistant Context** (`src/app/api/chat/route.ts`):
   - Replace `[Your Name]` with your actual name
   - Update the `PORTFOLIO_CONTEXT` with your real experience, skills, and projects
   - Modify the design philosophy and career goals sections

   **Update the Frontend** (`src/app/page.tsx`):
   - Replace `[Your Name]` with your actual name
   - Update the projects array with your real projects
   - Add your actual social media links
   - Update the profile description and stats

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Open Your Portfolio**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization Guide

### Adding Your Projects

Update the `projects` array in `src/app/page.tsx`:

```typescript
const projects = [
  {
    id: 1,
    title: "Your Project Name",
    category: "Project Type",
    year: "2024",
    description: "Brief description of the project",
    tags: ["Tag1", "Tag2", "Tag3"],
    link: "https://your-project-link.com"
  },
  // Add more projects...
]
```

### Customizing the AI Assistant

Edit the `PORTFOLIO_CONTEXT` in `src/app/api/chat/route.ts` to include:
- Your actual background and experience
- Real skills and tools you use
- Detailed project descriptions
- Your design philosophy and approach
- Career goals and interests

### Styling and Branding

The design system is built with Tailwind CSS. Key customization points:

- **Colors**: Update the gradient colors in the components
- **Typography**: Modify font choices in `tailwind.config.js`
- **Spacing**: Adjust layouts in the main components
- **Animations**: Customize Framer Motion animations

### Adding More Pages

Create additional pages for detailed project case studies:

```bash
src/app/projects/[slug]/page.tsx
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add your `OPENAI_API_KEY` in Vercel's environment variables
4. Deploy!

### Other Deployment Options

- **Netlify**: Configure build command as `npm run build`
- **Railway**: Add environment variables and deploy
- **Docker**: Use the included Docker configuration

## 📱 Mobile Responsiveness

The portfolio is fully responsive and includes:
- Mobile-optimized chat interface
- Collapsible sidebar for mobile
- Touch-friendly interactions
- Optimized typography scaling

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🎯 SEO and Performance

- Server-side rendering with Next.js
- Optimized images and fonts
- Meta tags for social sharing
- Fast loading times
- Lighthouse-optimized

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Need Help?

- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- Visit [OpenAI API Documentation](https://platform.openai.com/docs)

---

**Happy designing! 🎨** Make this portfolio truly yours by customizing it with your unique projects, personality, and design style.
