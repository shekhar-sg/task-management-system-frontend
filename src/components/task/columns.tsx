import DataTableRowActions from "@/components/task/DataTablRowActions";
import {getPriorityColor, getStatusColor} from "@/components/task/TaskView";
import {Badge} from "@/components/ui/badge";
import {Checkbox} from "@/components/ui/checkbox";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import type {Task} from "@/modules/tasks";
import type {ColumnDef} from "@tanstack/react-table";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
      const date = new Date(row.getValue("dueDate")).toLocaleDateString();
      return (
        <div>
          <Badge variant={"outline"}>{date}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "creator",
    header: "Creator",
    cell: ({ row }) => {
      return (
        <div>
          <Badge variant={"outline"} className={"text-nowrap"}>{row.original.creator.name}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      return (
        <div>
          <Badge variant={"outline"} className={"text-nowrap"}>{row.original.assignedTo?.name ?? "Unassigned"}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
