'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import List from './components/List';
import Task from './components/Task';
import CreateTask from './components/CreateTask';
import { getTasks, deleteTask } from './queries/Tasks';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error('Error al obtener los resgistros: ' + error);
      }
    }

    fetchData();
  }, []);

  const reloadTask = (data) => {
    setTasks(data);
  };

  const deleteHandler = async (event) => {
    try {
      const taskId = event.target.closest('.task').id;
      const deleteResponse = await deleteTask(taskId);
      console.log('Eliminado:', deleteResponse);

      // Actualizar la lista de tareas después de eliminar
      const updatedTasks = tasks.filter(task => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>NoteApp</h1>
        <p>Creado por Miguel Prot</p>
      </div>

      <div>
        <p className={styles.center}><i>para agregar una nueva nota, haz click en Enter</i></p>
        <CreateTask reloadTask={reloadTask}/>
        <List>
          {tasks.map(task => (
            <Task
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              action={deleteHandler}
            />
          ))}
        </List>
      </div>
    </main>
  );
}
