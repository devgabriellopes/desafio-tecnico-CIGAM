import { DragDropContext, type DropResult } from "react-beautiful-dnd"
import Board from "./components/Board"
import AddTask from "./components/AddTask"
import { useTaskStore } from "./store/taskStore"

export default function TaskManager() {
  const { moveTask } = useTaskStore()

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    moveTask(draggableId, destination.droppableId, destination.index)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Gerenciador de Tarefas</h1>
        <div className="mb-8 flex justify-center">
          <AddTask />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Board />
        </DragDropContext>
      </div>
    </div>
  )
}

