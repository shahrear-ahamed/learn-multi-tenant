import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { api } from '@/lib/api'
import { useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface Tenant {
  id: string
  name: string
  slug: string
}

export function TenantSwitcher() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [activeTenant, setActiveTenant] = useState<string>('')
  const [newTenantName, setNewTenantName] = useState('')
  const [newTenantSlug, setNewTenantSlug] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchTenants()
    const stored = localStorage.getItem('activeTenantId')
    if (stored) setActiveTenant(stored)
  }, [])

  const fetchTenants = async () => {
    try {
      const data = await api('http://localhost:3000/tenants', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      setTenants(data)
      if (!localStorage.getItem('activeTenantId') && data.length > 0) {
        handleSwitch(data[0].id)
      }
    } catch (e) {
      console.error('Failed to fetch tenants', e)
    }
  }

  const handleSwitch = (tenantId: string) => {
    localStorage.setItem('activeTenantId', tenantId)
    setActiveTenant(tenantId)
    router.invalidate() // Refresh data
  }

  const handleCreateTenant = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newTenant = await api('http://localhost:3000/tenants', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTenantName, slug: newTenantSlug }),
      })
      setTenants([...tenants, newTenant])
      handleSwitch(newTenant.id)
      setIsOpen(false)
      setNewTenantName('')
      setNewTenantSlug('')
    } catch (e) {
      console.error('Failed to create tenant', e)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={activeTenant} onValueChange={handleSwitch}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Tenant" />
        </SelectTrigger>
        <SelectContent>
          {tenants.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            +
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Tenant</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateTenant} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tenant Name</Label>
              <Input
                id="name"
                value={newTenantName}
                onChange={(e) => setNewTenantName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (ID)</Label>
              <Input
                id="slug"
                value={newTenantSlug}
                onChange={(e) => setNewTenantSlug(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Create</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
