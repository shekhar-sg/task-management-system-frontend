import type { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "@/components/task/DataTableFilter";
import { Button } from "@/components/ui/button";
import type { Priority, TaskStatus } from "@/modules/tasks";
import { useTaskStore } from "@/modules/tasks/task.store";
import { useGlobalStore } from "@/stores/global.store";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export const priorityOptions: { label: string; value: Priority }[] = [
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
  { label: "urgent", value: "URGENT" },
];

export const statusOptions: { label: string; value: TaskStatus }[] = [
  { label: "To Do", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Done", value: "REVIEW" },
  { label: "Completed", value: "COMPLETED" },
];

const DataTableToolbar = <TData,>(props: DataTableToolbarProps<TData>) => {
  const { table } = props;
  const { setSelectedTask } = useTaskStore();
  const { openContextPanel } = useGlobalStore();
  return (
    <div className={"flex items-center justify-between p-4"}>
      <div className="text-sm flex items-center gap-3 text-muted-foreground">
        {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} results
        <DataTableFacetedFilter title="Status" paramKey="status" options={statusOptions} />
        <DataTableFacetedFilter title="Priority" paramKey="priority" options={priorityOptions} />
      </div>
      <Button
        variant={"default"}
        onClick={() => {
          setSelectedTask(null);
          openContextPanel("TASK_CREATE");
        }}
      >
        Create Task
      </Button>
    </div>
  );
};

export default DataTableToolbar;
