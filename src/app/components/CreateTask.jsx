"use client";
import React, { useState, useEffect } from "react";
import { addTask, getTasks } from "../queries/Tasks";
import "./Tasks.css";

export default function CrateTask({reloadTask}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const validateInputs = () => {
    document.querySelectorAll('input[type="text"]').forEach(input => {
        if(input.value == ''){
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    validateInputs();
  };

  const addTaskHandler = async () => {
    validateInputs();
    try {
        event.preventDefault();
        if(form.title.length > 0 && form.description.length > 0) {
            const addResponse = await addTask(form.title, form.description);
            console.log('Agregado:', addResponse);
            setForm({title: '', description: ''});
            const response = await getTasks();
            reloadTask(response.data);
        }
      // Realizar alguna acción adicional después de agregar el registro
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

  return (
    <form onSubmit={addTaskHandler}>
      <input
        type="text"
        placeholder="Agregar titulo"
        id="title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Agregar descripción"
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit" className="btn">
        Crear
      </button>
    </form>
  );
}
