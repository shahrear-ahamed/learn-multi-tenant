import { Link, Outlet } from '@tanstack/react-router'
import { TenantSwitcher } from './TenantSwitcher'

export function LayoutWrapper() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4 space-y-4">
        <div className="font-bold text-xl mb-6">MultiTenantApp</div>
        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="block p-2 rounded hover:bg-gray-100 [&.active]:bg-gray-100 font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/tasks"
            className="block p-2 rounded hover:bg-gray-100 [&.active]:bg-gray-100 font-medium"
          >
            Tasks
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h2 className="font-semibold">Workspace</h2>
          <div className="flex items-center gap-4">
            <TenantSwitcher />
            <Link
              to="/login"
              className="text-sm text-red-500"
              onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem('activeTenantId')
              }}
            >
              Logout
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
