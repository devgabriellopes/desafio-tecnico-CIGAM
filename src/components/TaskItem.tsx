import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import type { Task } from "../store/types";
import TaskModal from "./TaskModal";
import { useTaskStore } from "../store/taskStore";
import { Trash } from "lucide-react";

interface TaskItemProps {
  task: Task;
  index: number;
}

export default function TaskItem({ task, index }: TaskItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteTask } = useTaskStore();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white p-3 rounded shadow cursor-pointer flex justify-between items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <p className="font-semibold">{task.title}</p>
            <button onClick={handleDelete}>
              <Trash width={16} height={16} />
            </button>
          </div>
        )}
      </Draggable>
      <TaskModal task={task} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}