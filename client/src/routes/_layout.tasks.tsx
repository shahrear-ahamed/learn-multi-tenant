import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_layout/tasks')({
  component: Tasks,
})

interface Task {
  id: string
  title: string
  description?: string
  status: string
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetchTasks()
  }, []) // Simplification: Layout Switcher invalidates router, which might re-mount or we rely on router.invalidate()

  const fetchTasks = async () => {
    try {
      // Active tenant ID is handled by api() via localStorage
      const data = await api('http://localhost:3000/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      setTasks(data)
    } catch (e) {
      console.error('Failed to fetch tasks', e)
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button>New Task</Button>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                {task.status}
              </span>
            </CardContent>
          </Card>
        ))}
        {tasks.length === 0 && (
          <p className="text-gray-500">No tasks found for this tenant.</p>
        )}
      </div>
    </div>
  )
}
