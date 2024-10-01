import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography as Text,
  FormControlLabel,
  Switch,
} from '@mui/material'
import Column from './components/layouting/Column'
import './App.css'
import GridContainer from './components/layouting/GridContainer'
import Row from './components/layouting/Row'
import GridItem from './components/layouting/GridItem'
import axios from 'axios'

type Todo = {
  id?: string
  description: string
  completed?: boolean
  created_at?: string
}

export default function App() {
  const [todos, setTodos] = useState([] as Todo[])
  const [description, setDescription] = useState('')
  const [change, setChange] = useState(false)

  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/todos')
      const { todos } = response.data
      console.log(todos)
      setTodos(todos as Todo[])
    } catch (err) {
      console.error((err as Error).message)
    }
  }

  useEffect(() => {
    getTodos()
  }, [change])

  const handleAddTodo = async () => {
    if (description.trim() === '') {
      return
    }
    try {
      await axios.post('http://localhost:8000/todos', {
        description,
      })
      setChange(!change)
      setDescription('')
    } catch (err) {
      console.error((err as Error).message)
    }
  }

  const handleToggleDone = async (todo: Todo) => {
    try {
      todo.completed = !todo.completed
      console.log(todo)
      await axios.put(`http://localhost:8000/todos/${todo.id}`, {
        completed: todo.completed,
      })
      setChange(!change)
    } catch (err) {
      console.error((err as Error).message)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${id}`)
      setChange(!change)
    } catch (err) {
      console.error((err as Error).message)
    }
  }

  const handleDeleteDoneTodos = async () => {
    try {
      await axios.post(`http://localhost:8000/todos/delete`, {
        completed: true,
      })
      setChange(!change)
    } catch (err) {
      console.error((err as Error).message)
    }
  }

  return (
    <Column
      justifyContent='center'
      alignItems='center'
      height='88vh'
      spacing={2}
    >
      <Text
        variant='h6'
        align='center'
        gutterBottom
      >
        Todo List Board
      </Text>
      <GridContainer
        // justifyContent={todos.length > 0 ? 'start' : 'center'}
        // alignItems='center'
        // spacing={1}
        sx={{
          //   flex: 1,
          overflowY: 'auto',
          maxHeight: '65vh',
          height: '60vh',
          width: '98%',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: 'primary.light',
        }}
        spacing={2}
      >
        {todos.length > 0 ? (
          todos.map((item) => (
            <GridItem>
              <Card
                key={item.id}
                sx={{
                  width: 'auto',
                  height: 'auto',
                }}
              >
                <CardContent>
                  <Column
                    justifyContent='space-around'
                    alignItems='start'
                  >
                    <Text
                      variant='h5'
                      fontWeight={100}
                      sx={{
                        textDecoration: item.completed
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      {item.description}
                    </Text>
                    <Text
                      variant='body1'
                      fontWeight={100}
                      sx={{
                        textDecoration: item.completed
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      ID: {item.id}
                    </Text>
                    <Text
                      variant='body1'
                      fontWeight={100}
                      sx={{
                        textDecoration: item.completed
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      Created at: {item.created_at}
                    </Text>
                  </Column>
                </CardContent>
                <CardActions>
                  <Row
                    flex={1}
                    justifyContent='space-between'
                    alignItems='center'
                    spacing={2}
                  >
                    <FormControlLabel
                      value='start'
                      control={
                        <Switch
                          color='primary'
                          checked={item.completed}
                          onChange={() => handleToggleDone(item as Todo)}
                        />
                      }
                      label='Done'
                      labelPlacement='start'
                    />
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={() => handleDeleteTodo(item.id as string)}
                    >
                      Del
                    </Button>
                  </Row>
                </CardActions>
              </Card>
            </GridItem>
          ))
        ) : (
          <GridItem>
            <Text
              variant='h6'
              align='center'
              color='secondary'
              fontWeight='100'
            >
              - no todos left -
            </Text>
          </GridItem>
        )}
      </GridContainer>
      <Column
        justifyContent='center'
        alignItems='center'
        spacing={1}
        width='100%'
      >
        <TextField
          label='Add Todo'
          variant='outlined'
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={handleAddTodo}
        >
          Add Todo
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          fullWidth
          onClick={handleDeleteDoneTodos}
        >
          Delete Done Todos
        </Button>
      </Column>
    </Column>
  )
}
