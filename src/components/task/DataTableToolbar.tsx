import { DataTableFacetedFilter } from "@/components/task/DataTableFilter";
import { Badge } from "@/components/ui/badge";
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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Priority, TaskStatus } from "@/modules/tasks";
import { useDeleteMultipleTasks } from "@/modules/tasks/task.hooks";
import { useTaskStore } from "@/modules/tasks/task.store";
import { useGlobalStore } from "@/stores/global.store";
import type { Table } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Clock, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner"; // ...existing options code...

// ...existing options code...

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export const priorityOptions: { label: string; value: Priority }[] = [
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
  { label: "Urgent", value: "URGENT" },
];

export const statusOptions: { label: string; value: TaskStatus }[] = [
  { label: "To Do", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Review", value: "REVIEW" },
  { label: "Completed", value: "COMPLETED" },
];

export const viewOptions: { label: string; value: string }[] = [
  { label: "Created by Me", value: "CREATED" },
  { label: "Assigned to Me", value: "ASSIGNED" },
];

export const sortOptions: { label: string; value: "asc" | "desc" }[] = [
  { label: "Due Date: Earliest First", value: "asc" },
  { label: "Due Date: Latest First", value: "desc" },
];

const DataTableToolbar = <TData,>(props: DataTableToolbarProps<TData>) => {
  const { table } = props;
  const { setSelectedTask } = useTaskStore();
  const { openContextPanel } = useGlobalStore();
  const [params, setSearchParams] = useSearchParams();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteMultipleTasks = useDeleteMultipleTasks();

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;
  const selectedTaskIds = useMemo(() => selectedRows.map((r) => r.id), [selectedRows.map]);

  const statusValues = params.get("status")?.split(",") || [];
  const priorityValues = params.get("priority")?.split(",") || [];
  const viewValues = params.get("view")?.split(",") || [];
  const sortByDueDate = params.get("sortByDueDate") as "asc" | "desc" | null;
  const overdue = params.get("overdue") === "true";

  const hasFilters =
    statusValues.length > 0 || priorityValues.length > 0 || viewValues.length > 0 || sortByDueDate || overdue;

  const handleBulkDelete = () => {
    deleteMultipleTasks.mutate(selectedTaskIds, {
      onSuccess: () => {
        toast.success("Tasks deleted", {
          description: `Successfully deleted ${selectedCount} task(s)`,
        });
        table.resetRowSelection();
        setDeleteDialogOpen(false);
      },
      onError: (error) => {
        toast.error("Failed to delete tasks", {
          description: error.message || "An error occurred while deleting tasks",
        });
      },
    });
  };

  const removeFilter = (paramKey: string, value: string) => {
    const current = params.get(paramKey)?.split(",") || [];
    const updated = current.filter((v) => v !== value);
    if (updated.length === 0) {
      params.delete(paramKey);
    } else {
      params.set(paramKey, updated.join(","));
    }
    setSearchParams(params);
  };

  const removeSingleFilter = (paramKey: string) => {
    params.delete(paramKey);
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    params.delete("status");
    params.delete("priority");
    params.delete("view");
    params.delete("sortByDueDate");
    params.delete("overdue");
    setSearchParams(params);
  };

  const setSortByDueDate = (sort: "asc" | "desc") => {
    params.set("sortByDueDate", sort);
    setSearchParams(params);
  };

  const toggleOverdue = () => {
    if (overdue) {
      params.delete("overdue");
    } else {
      params.set("overdue", "true");
    }
    setSearchParams(params);
  };

  const getFilterLabel = (type: "status" | "priority" | "view" | "sort", value: string) => {
    let options: { label: string; value: string }[];
    switch (type) {
      case "status":
        options = statusOptions;
        break;
      case "priority":
        options = priorityOptions;
        break;
      case "view":
        options = viewOptions;
        break;
      case "sort":
        options = sortOptions;
        break;
      default:
        return value;
    }
    return options.find((opt) => opt.value === value)?.label || value;
  };

  return (
    <div className="sticky top-0 flex flex-col gap-2 p-2 sm:p-4 bg-white dark:bg-background z-40 border-b">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
        <div className="text-xs sm:text-sm flex flex-wrap items-center gap-2 sm:gap-3 text-muted-foreground w-full sm:w-auto">
          {selectedCount > 0 ? (
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{selectedCount} row(s) selected</span>
              <Button variant="destructive" size="sm" className="h-8" onClick={() => setDeleteDialogOpen(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected
              </Button>
              <Button variant="outline" size="sm" className="h-8" onClick={() => table.resetRowSelection()}>
                Clear Selection
              </Button>
            </div>
          ) : (
            <>
              <span className="whitespace-nowrap">{table.getFilteredRowModel().rows.length} results</span>
              <DataTableFacetedFilter title="View" paramKey="view" options={viewOptions} />
              <DataTableFacetedFilter title="Status" paramKey="status" options={statusOptions} />
              <DataTableFacetedFilter title="Priority" paramKey="priority" options={priorityOptions} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="default" className="h-8">
                    {sortByDueDate === "asc" ? (
                      <ArrowUp className="mr-2 h-4 w-4" />
                    ) : sortByDueDate === "desc" ? (
                      <ArrowDown className="mr-2 h-4 w-4" />
                    ) : (
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                    )}
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => setSortByDueDate("asc")}>
                    <ArrowUp className="mr-2 h-4 w-4" />
                    Due Date: Earliest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortByDueDate("desc")}>
                    <ArrowDown className="mr-2 h-4 w-4" />
                    Due Date: Latest First
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant={overdue ? "default" : "outline"} size="default" className="h-8" onClick={toggleOverdue}>
                <Clock className="mr-2 h-4 w-4" />
                Overdue
              </Button>
            </>
          )}
        </div>
        {selectedCount === 0 && (
          <Button
            variant="default"
            size="sm"
            className="w-full sm:w-auto text-xs sm:text-sm shrink-0"
            onClick={() => {
              setSelectedTask(null);
              openContextPanel("TASK_CREATE");
            }}
          >
            Create Task
          </Button>
        )}
      </div>

      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {viewValues.map((value) => (
            <Badge key={`view-${value}`} variant="secondary" className="text-xs pl-2 pr-1 py-1 gap-1 rounded-md">
              <span className="font-medium">View:</span>
              <span>{getFilterLabel("view", value)}</span>
              <button
                type="button"
                onClick={() => removeFilter("view", value)}
                className="ml-1 hover:bg-muted rounded-sm p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {statusValues.map((value) => (
            <Badge key={`status-${value}`} variant="secondary" className="text-xs pl-2 pr-1 py-1 gap-1 rounded-md">
              <span className="font-medium">Status:</span>
              <span>{getFilterLabel("status", value)}</span>
              <button
                type="button"
                onClick={() => removeFilter("status", value)}
                className="ml-1 hover:bg-muted rounded-sm p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {priorityValues.map((value) => (
            <Badge key={`priority-${value}`} variant="secondary" className="text-xs pl-2 pr-1 py-1 gap-1 rounded-md">
              <span className="font-medium">Priority:</span>
              <span>{getFilterLabel("priority", value)}</span>
              <button
                type="button"
                onClick={() => removeFilter("priority", value)}
                className="ml-1 hover:bg-muted rounded-sm p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {sortByDueDate && (
            <Badge key="sort-duedate" variant="secondary" className="text-xs pl-2 pr-1 py-1 gap-1 rounded-md">
              <span>{getFilterLabel("sort", sortByDueDate)}</span>
              <button
                type="button"
                onClick={() => removeSingleFilter("sortByDueDate")}
                className="ml-1 hover:bg-muted rounded-sm p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {overdue && (
            <Badge key="overdue" variant="secondary" className="text-xs pl-2 pr-1 py-1 gap-1 rounded-md">
              <span>Overdue Tasks</span>
              <button
                type="button"
                onClick={() => removeSingleFilter("overdue")}
                className="ml-1 hover:bg-muted rounded-sm p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Bulk Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Tasks</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedCount} task(s)? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteMultipleTasks.isPending}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBulkDelete} disabled={deleteMultipleTasks.isPending}>
              {deleteMultipleTasks.isPending ? "Deleting..." : `Delete ${selectedCount} Task(s)`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataTableToolbar;
