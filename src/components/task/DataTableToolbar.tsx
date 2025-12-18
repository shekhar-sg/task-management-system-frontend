import type {Table} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {useTaskStore} from "@/modules/tasks/task.store";
import {useGlobalStore} from "@/stores/global.store";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const DataTableToolbar = <TData,>(props: DataTableToolbarProps<TData>) => {
  const { table } = props;
  const { setSelectedTask } = useTaskStore();
  const { openContextPanel } = useGlobalStore();
  return (
    <div className={"flex items-center justify-between p-4"}>
      <div className="text-sm text-muted-foreground">
        {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} results
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
