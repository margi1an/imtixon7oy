import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
const initialState = {
  todos: [],
  status: 'idle',
  error: null
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const querySnapshot = await getDocs(collection(db, 'todos'));
  let todos = [];
  querySnapshot.forEach((doc) => {
    todos.push({ id: doc.id, ...doc.data() });
  });
  return todos;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
  const docRef = await addDoc(collection(db, 'todos'), newTodo);
  return { id: docRef.id, ...newTodo };
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      });
  }
});

export default todosSlice.reducer;
