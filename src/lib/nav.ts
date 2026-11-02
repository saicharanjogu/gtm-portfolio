import { Folder, House, ListChecks, Receipt, Send, Workflow } from 'lucide-react'

export const NAV = [
  { id: 'top', name: 'Home', icon: House },
  { id: 'funnel', name: 'Funnel', icon: Workflow },
  { id: 'receipts', name: 'Receipts', icon: Receipt },
  { id: 'cases', name: 'Case files', icon: Folder },
  { id: 'playbook', name: 'Playbook', icon: ListChecks },
  { id: 'contact', name: 'Contact', icon: Send },
]
