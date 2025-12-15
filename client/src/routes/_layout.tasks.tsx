import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api, taskApi } from '@/lib/api'

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
  const [tasks, setTasks] = useState<Array<Task>>([])

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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return
    try {
      await taskApi.delete(id)
      fetchTasks()
    } catch (e) {
      console.error('Failed to delete task', e)
    }
  }

  const handleUpdate = async (id: string, data: Partial<Task>) => {
    try {
      await taskApi.update(id, data)
      fetchTasks()
    } catch (e) {
      console.error('Failed to update task', e)
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        {/* New Task Dialog would go here, omitting for brevity as requested focus is CRUD */}
        <Button
          onClick={() =>
            taskApi
              .create({ title: 'New Task', description: 'Created via App' })
              .then(fetchTasks)
          }
        >
          Quick Add Task
        </Button>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {task.title}
              </CardTitle>
              <div className="flex gap-2">
                <EditTaskDialog task={task} onUpdate={handleUpdate} />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">
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

function EditTaskDialog({
  task,
  onUpdate,
}: {
  task: Task
  onUpdate: (id: string, data: Partial<Task>) => void
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [status, setStatus] = useState(task.status)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(task.id, { title, description, status })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label>Status</Label>
            <select
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
