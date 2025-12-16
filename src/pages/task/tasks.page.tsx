import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type CreateTaskInput, createTaskSchema, useCreateTask, useTasks } from '@/modules/tasks';

const TasksPage = () => {
  const { data: tasks, isLoading } = useTasks();
  const createTask = useCreateTask();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
  });

  const onSubmit = (values: CreateTaskInput) => {
    const payload = {
      ...values,
      dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : undefined,
    };

    createTask.mutate(payload, {
      onSuccess: () => {
        reset();
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4 bg-white p-4 rounded-lg shadow">
        <div>
          <input placeholder="Task Title" {...register('title')} className="w-full px-3 py-2 border rounded" />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <textarea
            placeholder="Description (optional)"
            {...register('description')}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <input type="datetime-local" {...register('dueDate')} className="w-full px-3 py-2 border rounded" />
          {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
        </div>

        <div>
          <select {...register('priority')} className="w-full px-3 py-2 border rounded">
            <option value="">Select Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
          {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>}
        </div>

        <button
          type="submit"
          disabled={createTask.isPending}
          className="bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 text-white disabled:opacity-50"
        >
          {createTask.isPending ? 'Adding...' : 'Add Task'}
        </button>
      </form>

      <div className="p-4 bg-amber-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Total Tasks: {tasks?.length ?? 0}</h2>
        <ol className="list-disc mt-2 p-2 space-y-2">
          {tasks?.map((task) => (
            <li key={task.id} className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold">{task.title}</h3>
              {task.description && <p className="text-gray-600 text-sm">{task.description}</p>}
              <div className="flex gap-4 mt-2 text-sm">
                <span className="text-blue-600">Priority: {task.priority}</span>
                <span className="text-green-600">Status: {task.status}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TasksPage;
