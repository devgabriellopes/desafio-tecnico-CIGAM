import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Task } from "./types"

interface TaskStore {
  tasks: Task[]
  categories: string[]
  addTask: (title: string, description: string, category: string) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  moveTask: (taskId: string, newCategory: string, newIndex: number) => void
  addCategory: (category: string) => void
  deleteTask: (id: string) => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [] as Task[],
      categories: ["Backlog", "A Fazer", "Em Andamento", "Fase de Testes", "Concluido"] as string[],
      addTask: (title, description, category) =>
        set((state) => ({
          tasks: [...state.tasks, { id: Date.now().toString(), title, description, status: category }],
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
        })),
      moveTask: (taskId, newCategory, newIndex) =>
        set((state) => {
          const taskIndex = state.tasks.findIndex(task => task.id === taskId);
          const [movedTask] = state.tasks.splice(taskIndex, 1);
          movedTask.status = newCategory;
          state.tasks.splice(newIndex, 0, movedTask);
          return { tasks: state.tasks };
        }),
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),
      deleteTask: ((id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      })))
    }),
    {
      name: "task-storage",
    },
  ),
);