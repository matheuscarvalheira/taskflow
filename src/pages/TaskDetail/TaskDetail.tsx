import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Task } from '../../types';

const TaskDetailContainer = styled.div`
  background-color: #2E2E2E;
  border: 1px solid #ccc;
  padding: 1em;
  margin: 1em;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;

  &:hover {
    background-color: #26262c;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const TaskTitle = styled.h1`
  margin: 0;
  font-size: 1.5em;
  color: white;
`;

const TaskDescription = styled.p`
  margin: 0.5em 0;
  color: white;
`;

const TaskDueDate = styled.p`
  margin: 0.5em 0;
  font-weight: bold;
  color: white;
`;

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/tasks/${id}`)
      .then(response => {
        if (response.headers['content-type']?.includes('application/json')) {
          setTask(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching task:', error);
        setError('Failed to fetch task');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <TaskDetailContainer>
      <TaskTitle>{task.title}</TaskTitle>
      <TaskDescription>{task.description || 'No description available'}</TaskDescription>
      <TaskDueDate>Due Date: {task.dueDate || 'No due date'}</TaskDueDate>
    </TaskDetailContainer>
  );
};

export default TaskDetail;