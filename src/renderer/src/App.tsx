import styles from './assets/App.module.css'
import { useEffect, useRef, useState, JSX, Ref, MouseEventHandler } from 'react'
import TaskCard from '@renderer/components/TaskCard'

export type Task = {
  name: string
  done: boolean
  id: string
}

export type DB = Task[]

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [DB, setDB] = useState<DB>(JSON.parse(localStorage.getItem('TODO_TASKS') ?? '[]'))

  useEffect(() => {
    if (!localStorage.getItem('TODO_TASKS')) {
      localStorage.setItem('TODO_TASKS', JSON.stringify([]))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('TODO_TASKS', JSON.stringify(DB))
  }, [DB])

  const inputRef: Ref<HTMLInputElement> = useRef(null!)
  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    const value = inputRef.current?.value
    if (value) {
      setDB([...DB, { name: value, done: false, id: self.crypto.randomUUID() }])
      inputRef.current!.value = ''
    }
  }

  const removeTask = (task: Task) => () => {
    setDB(DB.filter((x) => x.name != task.name))
  }

  const doneTask = (task: Task) => () => {
    setDB(
      DB.map((x) => {
        if (x.id == task.id) {
          return {
            ...task,
            done: true
          }
        }
        return x
      })
    )
  }

  return (
    <div className={styles.pageContainer}>
      <h1>Your To Do</h1>
      <div className={styles.inputContainer}>
        <input ref={inputRef} placeholder={'Add new task'} className={styles.input} />
        <button onClick={onClick} className={styles.addBtn}>
          +
        </button>
      </div>
      <div className={styles.taskContainer}>
        {DB.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            removeTask={removeTask(task)}
            doneTask={doneTask(task)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
