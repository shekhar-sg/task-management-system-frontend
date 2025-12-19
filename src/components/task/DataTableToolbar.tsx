import type {Table} from "@tanstack/react-table";
import {RotateCcw} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useTaskStore} from "@/modules/tasks/task.store";
import {useGlobalStore} from "@/stores/global.store";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const DataTableToolbar = <TData,>(props: DataTableToolbarProps<TData>) => {
  const { table } = props;
  const { setSelectedTask, filters } = useTaskStore();
  const { openContextPanel } = useGlobalStore();
  return (
    <div className={"flex items-center justify-between p-4"}>
      <div
        className="text-sm flex
       text-muted-foreground"
      >
        {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} results
        {Object.keys(filters ?? {}).map((filterName) => {
          const filterValue = (filters as any)[filterName];
          if (!filterValue) return null;
          return (
            <h2 key={filterName} className={"ml-4"}>
              {` ${filterName.charAt(0).toUpperCase() + filterName.slice(1)}: ${filterValue}`}
            </h2>
          );
        })}
        {filters?.view && (
          <Button>
            <RotateCcw />
            Reset
          </Button>
        )}
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
