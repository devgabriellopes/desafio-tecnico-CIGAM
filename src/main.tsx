import { createRoot } from 'react-dom/client'
import './index.css'
import TaskManager from './TaskManager.tsx'

createRoot(document.getElementById('root')!).render(
  <TaskManager />
)
