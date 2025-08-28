## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- MySQL database running
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd tasks-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="mysql://username:password@localhost:3306/tasks_manager"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma db push

   # (Optional) Open Prisma Studio to view your database
   npx prisma studio
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Creating Tasks

1. Fill in the task title (required)
2. Add an optional description
3. Click "Add Task" to create

### Managing Tasks

- **Mark as Complete**: Click the checkbox next to any task
- **Mark as Incomplete**: Click the checkbox on completed tasks
- **Delete Task**: Click the "Delete" button (red)

### Task Organization

- **Pending Tasks**: Shows all incomplete tasks
- **Completed Tasks**: Shows all finished tasks with strikethrough styling

## 🗄️ Database Schema

```prisma
model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open database GUI
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
npx prisma migrate   # Create and run migrations
```

## 🎨 Styling

The application uses Tailwind CSS with custom component classes:

- `.task-card` - Task container styling
- `.task-completed` - Completed task styling
- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling
- `.btn-danger` - Delete button styling
- `.input-field` - Form input styling

## 🔒 Type Safety

This application is fully type-safe:

- **Frontend to Backend**: tRPC ensures type safety across API calls
- **Database**: Prisma provides type-safe database operations
- **Components**: TypeScript interfaces for all props and state

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `DATABASE_URL` environment variable
4. Deploy!

### Other Platforms

1. Build the application: `npm run build`
2. Set up your MySQL database
3. Configure environment variables
4. Run migrations: `npx prisma db push`
5. Start the server: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- [Prisma](https://prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

**Built with ❤️ using modern web technologies**
