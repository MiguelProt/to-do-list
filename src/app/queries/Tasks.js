import axios from 'axios';

const uri = 'http://localhost:3001';

export const getTasks = async () => {
    try {
        const response = await axios.get(uri + '/getAllTasks');
        return response;
    } catch (error) {
        console.error('Error al obtener los registros: ', error);
    }
}

export const deleteTask = async (taskId) => {
    console.log('fuera del try', uri + '/deleteTask/' + taskId);
    const response = await axios.delete(uri + '/deleteTask/' + taskId);
    try {
        console.log('llega al querie file');
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el registro: ', error);
        throw error;
    }
}

export const addTask = async (title, description) => {
    try {
      const response = await axios.post(`${uri}/tasks`, { title, description });
      return response.data;
    } catch (error) {
      console.error('Error al agregar el registro: ', error);
      throw error;
    }
  };