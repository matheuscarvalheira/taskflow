import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../types';
import AddTaskForm from '../AddTaskForm/AddTaskForm';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #010300;
`;

const TaskListContainer = styled.div`
  padding: 2em;
  color: #000000;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  flex: 1;
  background-color: #010300;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 0.8em;
`;

const TaskItem = styled.div`
  background-color: #010300;
  border: 1px solid #ccc;
  padding: 1em; 
  margin-bottom: 1em;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: background-color 0.3s, box-shadow 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #26262c;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const TaskTitle = styled.div`
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5em;
`;

const CompleteButton = styled.button`
  background-color: #6A5ACD;
  color: white;
  border: none;
  padding: 0.5em 1em;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #7B68EE;
  }
`;

const RemoveButton = styled.button`
  background-color: #8B0000;
  color: white;
  border: none;
  padding: 0.5em 1em;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #FF4500;
  }
`;

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/tasks?_limit=10')
      .then(response => {
        console.log('Response:', response);
        if (response.headers['content-type']?.includes('application/json')) {
          setTasks(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleTaskClick = (id: number) => {
    navigate(`/task/${id}`);
  };

  const handleCompleteTask = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    const taskToUpdate = tasks.find(task => task.id === id);
    if (taskToUpdate) {
      axios.patch(`http://localhost:3001/tasks/${id}`, { completed: !taskToUpdate.completed })
        .then(response => {
          setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task =>
              task.id === id ? { ...task, completed: !task.completed } : task
            );
            return updatedTasks;
          });
        })
        .catch(error => {
          console.error('Error updating task:', error);
        });
    }
  };

  const handleRemoveTask = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(response => {
        setTasks(prevTasks => {
          const updatedTasks = prevTasks.filter(task => task.id !== id);
          return updatedTasks;
        });
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const handleTaskAdded = (newTask: Task) => {
    if (!tasks.some(task => task.id === newTask.id)) {
      setTasks([...tasks, newTask]);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <TaskListContainer>Loading...</TaskListContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <TaskListContainer>Error: {error}</TaskListContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <TaskListContainer>
        <AddTaskForm onTaskAdded={handleTaskAdded} />
        {tasks.slice(0, 7).map(task => (
          <TaskItem key={task.id} onClick={() => handleTaskClick(task.id)}>
            <TaskTitle>
              <h2>{task.title}</h2>
              <p>{task.completed ? 'Completado' : 'Incompleto'}</p>
            </TaskTitle>
            <ButtonContainer>
              <CompleteButton onClick={(event) => handleCompleteTask(event, task.id)}>
                {task.completed ? 'Desfazer' : 'Completado'}
              </CompleteButton>
              <RemoveButton onClick={(event) => handleRemoveTask(event, task.id)}>Remove</RemoveButton>
            </ButtonContainer>
          </TaskItem>
        ))}
      </TaskListContainer>
    </PageContainer>
  );
};

export default TaskList;