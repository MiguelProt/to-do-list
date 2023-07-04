const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3001;

// Conectarse a la base de datos
const uri = 'mongodb://localhost:27017/todoList';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
}));

// Ruta para guardar un nuevo documento en la base de datos
app.post('/tasks', async (req, res) => {
    try {
        await client.connect();

        const database = client.db();
        const collection = database.collection('tasks');

        const { title, description } = req.body;

        // Insertar el documento en la colección
        const result = await collection.insertOne({ title, description });
        console.log('Documento insertado:', result.insertedId);

        res.status(200).json({ message: 'Documento guardado correctamente' });
    } catch (error) {
        console.error('Error al guardar el documento:', error);
        res.status(500).json({ error: 'Error al guardar el documento' });
    } finally {
        // Cerrar la conexión
        await client.close();
    }
});

// Ruta para obtener todas los registros
app.get('/getAllTasks', async (req, res) => {
    try {
        await client.connect();

        const database = client.db();
        const collection = database.collection('tasks');

        // Obtener todos los documentos de la colección
        const tasks = await collection.find().toArray();

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error al obtener los registros:', error);
        res.status(500).json({ error: 'Error al obtener los registros' });
    } finally {
        // Cerrar la conexión
        await client.close();
    }
});

//Ruta para eliminar un registro o documento
app.delete('/deleteTask/:id', async (req, res) => {
    const taskId = req.params.id;
    // Convertir el ID a un objeto ObjectId
    const objectId = new ObjectId(taskId);

    console.log('DELETE METHOD ID: ' + req.params.id);
    console.log('DELETE METHOD ID: ' + objectId);
    try {
      await client.connect();
  
      const database = client.db();
      const collection = database.collection('tasks');
  
      // Eliminar el documento de la colección
      const result = await collection.deleteOne({ _id: objectId });
  
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Documento eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'No se encontró el documento' });
      }
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
      res.status(500).json({ error: 'Error al eliminar el documento' });
    } finally {
      // Cerrar la conexión
      await client.close();
    }
  });

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});