import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/modules/tasks/task.store";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const DataTableToolbar = <TData,>(props: DataTableToolbarProps<TData>) => {
  const { table } = props;
  const { isTaskDetailPanelOpen, setIsTaskDetailPanelOpen } = useTaskStore();
  return (
    <div className={"flex items-center justify-between p-4"}>
      <div className="text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length} of {table.getRowModel().rows.length} results
      </div>
      {/* Additional toolbar actions can be added here */}
      <Button variant={"default"} onClick={() => setIsTaskDetailPanelOpen(!isTaskDetailPanelOpen)}>
        Create Task
      </Button>
    </div>
  );
};

export default DataTableToolbar;
