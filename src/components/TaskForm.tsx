'use client'

import { useState } from 'react'
import { api } from '../utils/api'

interface TaskFormProps {
  onTaskCreated?: () => void
}

export function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createTask = api.tasks.create.useMutation({
    onSuccess: () => {
      setTitle('')
      setDescription('')
      setIsSubmitting(false)
      onTaskCreated?.()
    },
    onError: (error) => {
      console.error('Error creating task:', error)
      setIsSubmitting(false)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    
    setIsSubmitting(true)
    createTask.mutate({
      title: title.trim(),
      description: description.trim() || undefined
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Add New Task
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="Enter task title..."
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field resize-none"
            rows={3}
            placeholder="Enter task description (optional)..."
            disabled={isSubmitting}
          />
        </div>
        
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  )
}