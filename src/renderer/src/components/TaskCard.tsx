import { JSX, MouseEventHandler, HTMLProps } from 'react'
import styles from './TaskCard.module.css'
import { Task } from '@renderer/App'

type Props = {
  task: Task
  doneTask: () => void
  removeTask: () => void
} & HTMLProps<HTMLDivElement>

export default function TaskCard({
  task,
  doneTask,
  removeTask,
  ...props
}: Props): JSX.Element {
  const onClickCheckbox: MouseEventHandler<HTMLInputElement> = (): void => {
    doneTask()
  }
  return (
    <div {...props} className={styles.container}>
      <input
        disabled={task.done}
        onClick={onClickCheckbox}
        className={styles.checkbox}
        type={'checkbox'}
      />
      <label className={styles.name + ' ' + (task.done ? styles.done : '')}>{task.name}</label>
      <button className={styles.btn} onClick={removeTask}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x-icon lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  )
}
