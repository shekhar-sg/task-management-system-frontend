import type { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/modules/auth";
import type { Task } from "@/modules/tasks";
import { useDeleteTask } from "@/modules/tasks/task.hooks";
import { useTaskStore } from "@/modules/tasks/task.store";
import { useGlobalStore } from "@/stores/global.store";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

const DataTableRowActions = <TData,>({ row }: DataTableRowActionsProps<TData>) => {
  const { original } = row;
  const task = original as Task;
  const userId = useAuthStore((state) => state.userId);
  const setSelectedTask = useTaskStore((state) => state.setSelectedTask);
  const openContextPanel = useGlobalStore((state) => state.openContextPanel);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteTask = useDeleteTask();

  const handleDelete = () => {
    deleteTask.mutate(task.id, {
      onSuccess: () => {
        toast.success("Task deleted", {
          description: `"${task.title}" has been deleted successfully`,
        });
        setDeleteDialogOpen(false);
      },
      onError: (error) => {
        toast.error("Failed to delete task", {
          description: error.message || "An error occurred while deleting the task",
        });
      },
    });
  };

  return (
    <>
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
              openContextPanel("TASK_DETAILS");
            }}
          >
            View Details
          </DropdownMenuItem>
          {(task.creatorId === userId || task.assignedToId === userId) && (
            <>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedTask(task);
                  openContextPanel("TASK_UPDATE");
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={deleteTask.isPending}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteTask.isPending}>
              {deleteTask.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DataTableRowActions;
