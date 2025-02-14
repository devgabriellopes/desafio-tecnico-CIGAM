import { DragDropContext } from "react-beautiful-dnd";
import { useTaskStore } from "../context/store";
import Column from "./Column";
import { DropResult } from "react-beautiful-dnd";

export default function Board() {
  const { categories, tasks, moveTask } = useTaskStore();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    moveTask(draggableId, destination.droppableId, destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <Column key={category} title={category} tasks={tasks.filter((task) => task.status === category)} />
        ))}
      </div>
    </DragDropContext>
  );
}