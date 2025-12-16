import type { ColumnDef } from '@tanstack/react-table';
import type { Task } from '@/modules/tasks';

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      return (
        <div>
          <span>{row.getValue('title')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      return (
        <div>
          <span>{row.getValue('description')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      return (
        <div>
          <span>{row.getValue('priority')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div>
          <span>{row.getValue('status')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => {
      return (
        <div>
          <span>{row.getValue('dueDate')}</span>
        </div>
      );
    },
  },
];
