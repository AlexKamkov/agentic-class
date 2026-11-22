export type Filter = "all" | "open" | "done"

export interface Task {
    id: number
    title: string
    done: boolean
}

export const seedTasks: Task[] = [
    { id: 1, title: "Сдать лабораторную", done: false },
    { id: 2, title: "Купить продукты", done: true },
    { id: 3, title: "   ", done: false },
]

function normalizeTitle(title: string): string {
    return title.replace(/^[\s\u200B]+|[\s\u200B]+$/g, "")
}

export function isBlankTitle(title: string): boolean {
    return normalizeTitle(title).length === 0
}

export function createTask(id: number, title: string): Task | undefined {
    const trimmed = normalizeTitle(title)
    if (trimmed.length === 0) return undefined
    return { id, title: trimmed, done: false }
}

export function renameTask(tasks: Task[], id: number, title: string): Task[] {
    const trimmed = normalizeTitle(title)
    if (trimmed.length === 0) return tasks
    return tasks.map((task) => (task.id === id ? { ...task, title: trimmed } : task))
}

export function visibleTasks(tasks: Task[], filter: Filter): Task[] {
    return tasks.filter((task) => {
        if (isBlankTitle(task.title)) return false
        if (filter === "open") return !task.done
        if (filter === "done") return task.done
        return true
    })
}

export function openCount(tasks: Task[]): number {
    return tasks.filter((task) => !task.done && !isBlankTitle(task.title)).length
}