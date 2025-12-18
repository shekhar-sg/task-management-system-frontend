import {useState} from "react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import type {Task} from "@/modules/tasks";
import TaskForm from "./TaskForm";

interface TaskViewProps {
  task: Task;
  onClose?: () => void;
}

export const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "URGENT":
      return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
    case "HIGH":
      return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20";
    case "MEDIUM":
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
    case "LOW":
      return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
    default:
      return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
  }
};

export const getStatusColor = (status: Task["status"]) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
    case "IN_PROGRESS":
      return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
    case "REVIEW":
      return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20";
    case "TODO":
      return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
    default:
      return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
  }
};

const TaskView = ({ task, onClose }: TaskViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    return (
      <TaskForm
        mode="update"
        task={task}
        onSuccess={() => {
          setIsEditing(false);
        }}
        onCancel={() => {
          setIsEditing(false);
        }}
      />
    );
  }
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "Not set";
    const d = new Date(date);
    return d.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl">{task.title}</CardTitle>
            <CardDescription className="mt-2">
              Created {formatDate(task.createdAt)}
              {task.updatedAt && task.updatedAt !== task.createdAt && <> • Updated {formatDate(task.updatedAt)}</>}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status and Priority Badges */}
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className={getStatusColor(task.status)}>
            {task.status.replace("_", " ")}
          </Badge>
          <Badge variant="outline" className={getPriorityColor(task.priority)}>
            {task.priority} Priority
          </Badge>
        </div>
        <Separator />
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Description</h3>
          <p className="text-sm leading-relaxed">
            {task.description || <span className="text-muted-foreground italic">No description provided</span>}
          </p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">Due Date</h3>
            <p className="text-sm">{formatDate(task.dueDate)}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">Assigned To</h3>
            <p className="text-sm">
              {task.assignedTo ? (
                <>
                  <span className="font-medium">{task.assignedTo.name}</span>
                  <br />
                  <span className="text-muted-foreground">{task.assignedTo.email}</span>
                </>
              ) : task.assignedToId ? (
                <span className="text-muted-foreground">User ID: {task.assignedToId}</span>
              ) : (
                <span className="text-muted-foreground italic">Unassigned</span>
              )}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">Created By</h3>
            <p className="text-sm text-muted-foreground">User ID: {task.creatorId}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">Task ID</h3>
            <p className="text-sm font-mono text-muted-foreground">{task.id}</p>
          </div>
        </div>
      </CardContent>
      {onClose && (
        <CardFooter>
          <Button variant="outline" onClick={onClose} className="w-full">
            Close
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default TaskView;
