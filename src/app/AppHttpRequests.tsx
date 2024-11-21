import Checkbox from "@mui/material/Checkbox"
import { AddItemForm, EditableSpan } from "common/components"
import { TaskStatus } from "common/enums"
import React, { ChangeEvent, useEffect, useState } from "react"
import { type DomainTask, tasksApi, type Todolist, todolistsApi } from "../features/todolists/api"
// import { todolistsApi } from "../features/todolists/api/todolistsApi"
// import type { Todolist } from "../features/todolists/api/todolistsApi.types"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)

      todolists.forEach((tl) => {
        tasksApi.getTasks(tl.id).then((res) => {
          setTasks((prevTasks) => ({ ...prevTasks, [tl.id]: res.data.items }))
        })
      })
    })
  }, [])

  const createTodolistHandler = (title: string = "") => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item
      setTodolists((prevTodolists) => [newTodolist, ...prevTodolists])
    })
  }

  const removeTodolistHandler = (id: string) => {
    todolistsApi
      .deleteTodolist(id)
      .then((res) => {
        if (res.data.resultCode === 0) {
          // Удаляем тудулист из состояния
          setTodolists((prevTodolists) => prevTodolists.filter((todolist) => todolist.id !== id))
          //  setTodolist(todolists.filter(tl => tl.id !== id));
        } else {
          // Обработка ошибки, если resultCode не равен 0
          console.error("Error deleting todolist:", res.data.messages)
        }
      })
      .catch((error) => {
        // Обработка ошибки запроса
        console.error("Request failed:", error)
      })
  }

  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi.updateTodolist({ id, title }).then(() => {
      setTodolists((prevTodolists) => prevTodolists.map((tl) => (tl.id === id ? { ...tl, title } : tl)))
    })
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    tasksApi.createTask({ title, todolistId }).then((res) => {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [todolistId]: [res.data.data.item, ...(prevTasks[todolistId] || [])],
      }))
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi.removeTask({ taskId, todolistId }).then((res) => {
      console.log(res)
      setTasks((prevTasks) => ({
        ...prevTasks,
        [todolistId]: prevTasks[todolistId].filter((t) => t.id !== taskId),
      }))
    })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask, todolistId: string) => {
    tasksApi.changeTaskStatus({ e, task, todolistId }).then((res) => {
      const newTask = res.data.data.item
      setTasks((prevTasks) => ({
        ...prevTasks,
        [todolistId]: prevTasks[todolistId].map((t) => (t.id === task.id ? newTask : t)),
      }))
    })
  }

  const changeTaskTitleHandler = (title: string, task: DomainTask, todolistId: string) => {
    tasksApi.changeTaskTitle({ title, task, todolistId }).then(() => {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [todolistId]: prevTasks[todolistId].map((t) => (t.id === task.id ? { ...t, title } : t)),
      }))
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan value={tl.title} onChange={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === TaskStatus.Completed}
                      onChange={(e) => changeTaskStatusHandler(e, task, tl.id)}
                    />
                    <EditableSpan value={task.title} onChange={(title) => changeTaskTitleHandler(title, task, tl.id)} />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

// Styles
const todolist: React.CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
