import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Task } from "@/modules/tasks";
import DataTableRowActions from "@/pages/task/DataTablRowActions";
import { getPriorityColor, getStatusColor } from "@/pages/task/TaskView";

export const columns: ColumnDef<Task>[] = [
  {
    id: "sr",
    header: () => <span className={"max-w-[500px] truncate font-medium"}>SR No.</span>,
    cell: ({ row }) => `${row.index + 1}.`,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div>
          <span className={"max-w-36 truncate font-medium"}>{row.getValue("title")}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={"max-w-96 min-w-40 w-fit line-clamp-1 font-medium"}>{row.getValue("description")}</span>
            </TooltipTrigger>
            <TooltipContent side={"bottom"} className={"max-w-sm"}>
              <span>{row.getValue("description")}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      return (
        <div>
          <Badge variant={"outline"} className={getPriorityColor(row.getValue("priority"))}>
            {row.getValue("priority")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div>
          <Badge variant={"outline"} className={getStatusColor(row.getValue("status"))}>
            {row.getValue("status")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      return (
        <div>
          <Badge variant={"outline"}>{row.getValue("dueDate")}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
