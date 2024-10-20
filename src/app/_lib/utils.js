// import { tasks } from "@/db/schema"
import { faker } from "@faker-js/faker"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import { customAlphabet } from "nanoid"
import { generateId } from "@/lib/id"

// Generate random task
export const generateRandomTask = () => {
  return {
    id: generateId("task"),
    code: `TASK-${customAlphabet("0123456789", 4)()}`,
    title: faker.hacker
      .phrase()
      .replace(/^./, (letter) => letter.toUpperCase()),
    status: faker.helpers.shuffle() ?? "todo",
    label: faker.helpers.shuffle() ?? "bug",
    priority: faker.helpers.shuffle() ?? "low",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

// Returns the appropriate status icon based on the provided status.
export const getStatusIcon = (status) => {
  const statusIcons = {
    canceled: CrossCircledIcon,
    done: CheckCircledIcon,
    "in-progress": StopwatchIcon,
    todo: QuestionMarkCircledIcon,
  }

  const Icon = statusIcons[status] || CircleIcon
  return <Icon />
}

// Returns the appropriate priority icon based on the provided priority.
export const getPriorityIcon = (priority) => {
  const priorityIcons = {
    high: ArrowUpIcon,
    low: ArrowDownIcon,
    medium: ArrowRightIcon,
  }

  const Icon = priorityIcons[priority] || CircleIcon
  return <Icon />
}
