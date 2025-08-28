'use client'

import { useState } from 'react'
import { api } from '../utils/api'

interface Task {
  id: number
  title: string
  description: string | null
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

interface TaskItemProps {
  task: Task
  onTaskUpdated?: () => void
}

export function TaskItem({ task, onTaskUpdated }: TaskItemProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const toggleComplete = api.tasks.toggleComplete.useMutation({
    onSuccess: () => {
      setIsUpdating(false)
      onTaskUpdated?.()
    },
    onError: (error) => {
      console.error('Error updating task:', error)
      setIsUpdating(false)
    }
  })

  const deleteTask = api.tasks.delete.useMutation({
    onSuccess: () => {
      setIsDeleting(false)
      onTaskUpdated?.()
    },
    onError: (error) => {
      console.error('Error deleting task:', error)
      setIsDeleting(false)
    }
  })

  const handleToggleComplete = () => {
    setIsUpdating(true)
    toggleComplete.mutate({ id: task.id })
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true)
      deleteTask.mutate({ id: task.id })
    }
  }

  return (
    <div className={`task-card ${task.completed ? 'task-completed' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleToggleComplete}
              disabled={isUpdating}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                task.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-500'
              } disabled:opacity-50`}
            >
              {task.completed && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            <div className="flex-1">
              <h3 className={`font-medium text-gray-900 dark:text-white ${
                task.completed ? 'line-through' : ''
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`text-sm text-gray-600 dark:text-gray-400 mt-1 ${
                  task.completed ? 'line-through' : ''
                }`}>
                  {task.description}
                </p>
              )}
              
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="ml-4 text-red-600 hover:text-red-800 disabled:opacity-50 p-1"
          title="Delete task"
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5l1.5 1.5a1 1 0 01-1.414 1.414L15 14.914V17a2 2 0 01-2 2H7a2 2 0 01-2-2v-2.086l-1.586 1.586A1 1 0 012 15.5V5z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}