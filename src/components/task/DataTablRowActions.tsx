import type {Row} from "@tanstack/react-table";
import {MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type {Task} from "@/modules/tasks";
import {useTaskStore} from "@/modules/tasks/task.store";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

const DataTableRowActions = <TData,>({ row }: DataTableRowActionsProps<TData>) => {
  const { original } = row;
  const task = original as Task;
  const { setSelectedTask, setIsTaskDetailPanelOpen, setIsEditing } = useTaskStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="data-[state=open]:bg-muted size-8">
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side={"bottom"} className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            setSelectedTask(task);
            setIsEditing(false);
            setIsTaskDetailPanelOpen(true);
          }}
        >
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setSelectedTask(task);
            setIsEditing(true);
            setIsTaskDetailPanelOpen(true);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowActions;
