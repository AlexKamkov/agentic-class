import { describe, expect, it } from "vitest"
import {
    createTask,
    renameTask,
    visibleTasks,
    openCount,
    seedTasks,
} from "./tasks"

describe("базовая доска", () => {
    it("создаёт задачу и обрезает название", () => {
        const task = createTask(9, "  Купить хлеб  ")
        expect(task?.title).toBe("Купить хлеб")
    })

    it("фильтрует готовые задачи", () => {
        expect(visibleTasks(seedTasks, "done").map((task) => task.id)).toEqual([2])
    })
})

describe("R1 — проверка названия при переименовании", () => {
    it.each(["", "   ", "\t", "\u00A0", "\u200B"])(
        "отклоняет пустое название: %j",
        (title) => {
            const tasks = [{ id: 1, title: "Старая задача", done: false }]
            const result = renameTask(tasks, 1, title)

            expect(result[0].title).toBe("Старая задача")
        },
    )

    it("обрезает пробелы по краям нового названия", () => {
        const tasks = [{ id: 1, title: "Старая задача", done: false }]
        const result = renameTask(tasks, 1, "  Новая задача  ")

        expect(result[0].title).toBe("Новая задача")
    })

    it("обрезает U+200B по краям нового названия", () => {
        const tasks = [{ id: 1, title: "Старая задача", done: false }]
        const result = renameTask(tasks, 1, "\u200BНовая задача\u200B")

        expect(result[0].title).toBe("Новая задача")
    })
})

describe("R2 — скрытие пустых задач", () => {
    it("не показывает унаследованные пустые задачи", () => {
        const result = visibleTasks(seedTasks, "all")

        expect(result.map((task) => task.id)).toEqual([1, 2])
    })

    it("не показывает пустые задачи среди открытых", () => {
        const result = visibleTasks(seedTasks, "open")

        expect(result.map((task) => task.id)).toEqual([1])
    })
})

describe("R3 — правильный счётчик открытых задач", () => {
    it("не считает пустые задачи", () => {
        expect(openCount(seedTasks)).toBe(1)
    })
})