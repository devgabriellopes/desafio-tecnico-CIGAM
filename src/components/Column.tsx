import { Droppable } from "react-beautiful-dnd";
import type { Task } from "../types";
import TaskItem from "./TaskItem";

interface ColumnProps {
  title: string;
  tasks: Task[];
}

export default function Column({ title, tasks }: ColumnProps) {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full md:w-64 flex-shrink-0">
      <h2 className="font-bold mb-4">{title}</h2>
      <Droppable droppableId={title} key={title}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 min-h-[100px]">
            {tasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}