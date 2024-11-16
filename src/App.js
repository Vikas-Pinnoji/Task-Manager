import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import Tasks from './components/Tasks'
import {
  MainContainer,
  TaskInputContainer,
  TaskDisplayContainer,
  Heading,
  InputContainer,
  LabelText,
  Input,
  Select,
  AddButton,
  TagsHeading,
  TagsContainer,
  TasksContainer,
  TagsButton,
  TagListItem,
  NoTaskText,
} from './style'

const tagsList = [
  {optionId: 'HEALTH', displayText: 'Health'},
  {optionId: 'EDUCATION', displayText: 'Education'},
  {optionId: 'ENTERTAINMENT', displayText: 'Entertainment'},
  {optionId: 'SPORTS', displayText: 'Sports'},
  {optionId: 'TRAVEL', displayText: 'Travel'},
  {optionId: 'OTHERS', displayText: 'Others'},
]

class App extends Component {
  state = {
    myTaskList: [],
    inputTask: '',
    selectTag: tagsList[0].optionId,
    activeTag: 'INITIAL',
    searchQuery: '',
  }

  componentDidMount() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    this.setState({myTaskList: savedTasks})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.myTaskList !== this.state.myTaskList) {
      localStorage.setItem('tasks', JSON.stringify(this.state.myTaskList))
    }
  }

  onClickAddButton = () => {
    const {inputTask, selectTag} = this.state
    const taskName = inputTask
    const taskCategory = selectTag
    const id = uuid()
    const bgColor = false

    if (taskName.length !== 0) {
      this.setState(prevState => ({
        myTaskList: [
          ...prevState.myTaskList,
          {id, taskName, taskCategory, bgColor},
        ],
        inputTask: '',
        selectTag: tagsList[0].optionId,
      }))
    }
  }

  onChangeInputTask = event => {
    this.setState({inputTask: event.target.value})
  }

  onChangeSelectTag = event => {
    this.setState({selectTag: event.target.value})
  }

  onClickTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  onChangeSearchQuery = event => {
    this.setState({searchQuery: event.target.value})
  }

  deleteTask = id => {
    this.setState(prevState => ({
      myTaskList: prevState.myTaskList.filter(task => task.id !== id),
    }))
  }

  render() {
    const {myTaskList, searchQuery, inputTask, selectTag, activeTag} =
      this.state

    const filterTaskList = myTaskList.filter(task => {
      const isActiveTag =
        activeTag === 'INITIAL' || task.taskCategory === activeTag
      const matchesSearch = task.taskName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      return isActiveTag && matchesSearch
    })

    return (
      <MainContainer>
        <TaskInputContainer>
          <Heading>Create a Task!</Heading>
          <InputContainer>
            <LabelText htmlFor="textInput">Task</LabelText>
            <Input
              id="textInput"
              type="text"
              placeholder="Enter the task here"
              value={inputTask}
              onChange={this.onChangeInputTask}
            />

            <LabelText htmlFor="searchInput">Search Tasks</LabelText>
            <Input
              id="searchInput"
              type="text"
              placeholder="Search tasks"
              value={searchQuery}
              onChange={this.onChangeSearchQuery}
            />

            <LabelText htmlFor="optionInput">Tags</LabelText>
            <Select
              id="optionInput"
              value={selectTag}
              onChange={this.onChangeSelectTag}
            >
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </Select>
          </InputContainer>
          <AddButton type="button" onClick={this.onClickAddButton}>
            Add Task
          </AddButton>
        </TaskInputContainer>
        <TaskDisplayContainer>
          <TagsHeading>Tags</TagsHeading>
          <TagsContainer>
            {tagsList.map(eachTag => {
              const isActive = activeTag === eachTag.optionId
              return (
                <TagListItem key={eachTag.optionId}>
                  <TagsButton
                    type="button"
                    value={eachTag.optionId}
                    onClick={this.onClickTag}
                    isActive={isActive}
                  >
                    {eachTag.displayText}
                  </TagsButton>
                </TagListItem>
              )
            })}
          </TagsContainer>
          <TagsHeading>Tasks</TagsHeading>
          <TasksContainer>
            {filterTaskList.length === 0 ? (
              <NoTaskText>No Tasks Added Yet</NoTaskText>
            ) : (
              filterTaskList.map(eachTask => (
                <Tasks key={eachTask.id} taskDetails={eachTask} />
              ))
            )}
          </TasksContainer>
        </TaskDisplayContainer>
      </MainContainer>
    )
  }
}

export default App
