// In your Tasks component
const Tasks = ({taskDetails, deleteTask}) => {
  const {id, taskName, taskCategory} = taskDetails

  const handleDelete = () => {
    deleteTask(id) // Call the deleteTask function passed as a prop
  }

  return (
    <div>
      <h3>{taskName}</h3>
      <p>{taskCategory}</p>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  )
}

export default Tasks
