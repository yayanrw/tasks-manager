'use client'

import { useState } from 'react'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleTaskCreated = () => {
    // Trigger a refresh of the task list
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Tasks Manager
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Organize your tasks efficiently
        </p>
      </div>

      {/* Task Form */}
      <TaskForm onTaskCreated={handleTaskCreated} />

      {/* Task List */}
      <TaskList refreshTrigger={refreshTrigger} />

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Built with Next.js, tRPC, Prisma, and Tailwind CSS</p>
      </div>
    </div>
  )
}
