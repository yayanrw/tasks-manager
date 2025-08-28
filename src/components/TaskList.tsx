'use client';

import React, { useEffect } from 'react';
import { api } from '../utils/api';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  refreshTrigger?: number;
}

export function TaskList({ refreshTrigger }: TaskListProps) {
  const {
    data: tasks,
    isLoading,
    error,
    refetch,
  } = api.tasks.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  // Refetch when refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger) {
      refetch();
    }
  }, [refreshTrigger, refetch]);

  const handleTaskUpdated = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-800 dark:text-red-200">
          Error loading tasks: {error.message}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-2 btn-secondary text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 dark:text-gray-400">
          <svg
            className="w-16 h-16 mx-auto mb-4 opacity-50"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-lg font-medium">No tasks yet</p>
          <p className="text-sm">Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="space-y-6">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Pending Tasks ({pendingTasks.length})
          </h3>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={{
                  ...task,
                  createdAt: new Date(task.createdAt),
                  updatedAt: new Date(task.updatedAt)
                }}
                onTaskUpdated={handleTaskUpdated}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Completed Tasks ({completedTasks.length})
          </h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={{
                  ...task,
                  createdAt: new Date(task.createdAt),
                  updatedAt: new Date(task.updatedAt)
                }}
                onTaskUpdated={handleTaskUpdated}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
