import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    type CreateTaskInput,
    createTaskSchema,
    type Task,
    type UpdateTaskInput,
    updateTaskSchema,
    useCreateTask,
    useTaskStore,
    useUpdateTask,
} from "@/modules/tasks";
import { useGetAllUsers } from "@/modules/users/user.hook";
import { useGlobalStore } from "@/stores/global.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface TaskFormProps {
  mode: "create" | "update";
}

const TaskForm = ({ mode }: TaskFormProps) => {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const { selectedTask: task, setSelectedTask } = useTaskStore();
  const { closeContextPanel, openContextPanel } = useGlobalStore();
  const { data } = useGetAllUsers();

  const form = useForm<CreateTaskInput | UpdateTaskInput>({
    resolver: zodResolver(mode === "create" ? createTaskSchema : updateTaskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : "",
      priority: task?.priority,
      assignedToId: task?.assignedToId || "",
      ...(mode === "update" && { status: task?.status || "TODO" }),
    },
  });

  const handleSuccess = useCallback(
    (task: Task) => {
      setSelectedTask(task);
      openContextPanel("TASK_DETAILS");
    },
    [openContextPanel, setSelectedTask]
  );

  function onSubmit(data: CreateTaskInput | UpdateTaskInput) {
    const payload = {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
    };

    if (mode === "create") {
      createTask.mutate(payload as CreateTaskInput, {
        onSuccess: (task) => {
          toast.success("Task created successfully!");
          form.reset();
          handleSuccess(task);
        },
        onError: (error) => {
          toast.error(`Failed to create task: ${error.message}`);
        },
      });
    } else if (task) {
      updateTask.mutate(
        { id: task.id, payload: payload as UpdateTaskInput },
        {
          onSuccess: (task) => {
            toast.success("Task updated successfully!");
            console.log({ task });
            handleSuccess(task);
          },
          onError: (error) => {
            toast.error(`Failed to update task: ${error.message}`);
          },
        }
      );
    }
  }

  const isSubmitting = mode === "create" ? createTask.isPending : updateTask.isPending;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{mode === "create" ? "Create New Task" : "Update Task"}</CardTitle>
        <CardDescription>
          {mode === "create" ? "Fill in the details to create a new task." : "Update the task details below."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="task-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="task-title">Title *</FieldLabel>
                  <Input
                    {...field}
                    id="task-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter task title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="task-description">Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="task-description"
                      placeholder="Enter task description (optional)"
                      rows={4}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">{field.value?.length || 0} characters</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>Provide additional details about the task.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="priority"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="task-priority">Priority *</FieldLabel>
                  <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]" id="task-priority" aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="URGENT">Urgent</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            {mode === "update" && (
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="task-status">Status</FieldLabel>
                    <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]" id="task-priority" aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem className={"bg-card"} value="TODO">
                            To Do
                          </SelectItem>
                          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                          <SelectItem value="REVIEW">Review</SelectItem>
                          <SelectItem value="COMPLETED">Completed</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            )}
            <Controller
              name="dueDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="task-dueDate">Due Date</FieldLabel>
                  <Input type="datetime-local" {...field} id="task-dueDate" aria-invalid={fieldState.invalid} />
                  <FieldDescription>Set a deadline for this task (optional).</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="assignedToId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="task-assignedTo">Assigned To (User ID)</FieldLabel>
                  <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[220px]" id="task-assignedTo" aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select a user" />
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Users</SelectLabel>
                          <ScrollArea className={"h-full max-h-48"}>
                            <div>
                              {data?.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                  {user.name}
                                </SelectItem>
                              ))}
                              <ScrollBar orientation={"vertical"}></ScrollBar>
                            </div>
                          </ScrollArea>
                        </SelectGroup>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                  <FieldDescription>Enter the ID of the user to assign this task to.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button type="button" variant="outline" onClick={closeContextPanel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isSubmitting}>
          Reset
        </Button>
        <Button type="submit" form="task-form" disabled={isSubmitting} className={"flex-1"}>
          {isSubmitting ? "Submitting..." : mode === "create" ? "Create Task" : "Update Task"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskForm;
