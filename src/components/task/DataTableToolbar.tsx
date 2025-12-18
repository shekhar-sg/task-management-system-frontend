import type {Table} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {useTaskStore} from "@/modules/tasks/task.store";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const DataTableToolbar = <TData,>(props: DataTableToolbarProps<TData>) => {
  const { table } = props;
  const { setIsTaskDetailPanelOpen, setIsEditing, setSelectedTask } = useTaskStore();
  return (
    <div className={"flex items-center justify-between p-4"}>
      <div className="text-sm text-muted-foreground">
        {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} results
      </div>
      <Button
        variant={"default"}
        onClick={() => {
          setSelectedTask(null);
          setIsEditing(false);
          setIsTaskDetailPanelOpen(true);
        }}
      >
        Create Task
      </Button>
    </div>
  );
};

export default DataTableToolbar;
