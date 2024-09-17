import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Task } from '../../types';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
`;

const FormContainer = styled.div`
  margin: 1em 0;
  padding: 1em; 
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: #000000;
  font-size: 1.5em;
  width: 700px;
`;

const Input = styled.input`
  margin: 0.5em 0; 
  padding: 1em;
  width: 100%; 
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background-color: #000000; 
  color: #ffffff;
  outline: none;
`;

const TextArea = styled.textarea`
  margin: 0.5em 0; 
  padding: 0.5em;
  width: 100%; 
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background-color: #000000; 
  color: #ffffff;
  outline: none;
  resize: none;
`;

const Button = styled.button`
  padding: 1em 1em;
  background-color: #6A0DAD;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-left: 0.5em;

  &:hover {
    background-color: #7B1FA2;
  }
`;

const FormRow = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 1em;
`;

const CompletedButton = styled.button<{ completed: boolean }>`
  padding: 1em 1em;
  background-color: ${({ completed }) => (completed ? '#3d8d40' : '#b83329')};
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ completed }) => (completed ? '#007006' : '#9e0a07')};
  }
`;

interface AddTaskFormProps {
  onTaskAdded: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post('http://localhost:3001/tasks', {
      title,
      description,
      dueDate,
      completed,
    })
      .then(response => {
        console.log('Task added:', response.data);
        setTitle('');
        setDescription('');
        setDueDate('');
        setCompleted(false);
        onTaskAdded(response.data);
      })
      .catch(error => {
        console.error('Error adding task:', error);
        setError('Failed to add task');
      });
  };

  return (
    <PageContainer>
      <FormContainer>
        <h3>Adicione uma nova tarefa!</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextArea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
          <Input
            type="date"
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <FormRow>
            <CompletedButton
              type="button"
              completed={completed}
              onClick={() => setCompleted(!completed)}
            >
              {completed ? 'Completed' : 'Not Completed'}
            </CompletedButton>
            <Button type="submit">Add Task</Button>
          </FormRow>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default AddTaskForm;