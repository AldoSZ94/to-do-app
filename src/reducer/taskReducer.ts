import * as z from 'zod';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

// Define las acciones que puede recibir el reducer.
export type TaskAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number };

// Valida la estructura de cada tarea.
const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

// Valida la estructura completa del estado.
const TaskStateSchema = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

// Obtiene el estado inicial desde localStorage.
export const getTasksInitialState = (): TaskState => {
  const localStorageState = localStorage.getItem('tasks-state');
  // Si no hay datos guardados, devuelve un estado vacío.
  if (!localStorageState) {
    return {
      todos: [],
      completed: 0,
      pending: 0,
      length: 0,
    };
  }

  // Convierte y valida los datos guardados.
  const result = TaskStateSchema.safeParse(JSON.parse(localStorageState));
  // Si los datos no son válidos, devuelve un estado vacío.
  if (result.error) {
    console.log(result.error);
    return {
      todos: [],
      completed: 0,
      pending: 0,
      length: 0,
    };
  }
  // Si la validación es correcta, devuelve los datos recuperados.
  return result.data;
};

// Recibe el estado actual y una acción.
// Devuelve el nuevo estado según la acción recibida.
export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    // Agrega una nueva tarea al estado.
    case 'ADD_TODO':
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.todos.length + 1,
        pending: state.pending + 1,
      };
    // Elimina una tarea del estado.
    case 'DELETE_TODO': {
      // Crea un nuevo arreglo excluyendo la tarea seleccionada.
      const currentTodos = state.todos.filter(
        (todo) => todo.id !== action.payload,
      );
      return {
        ...state,
        todos: currentTodos,
        length: currentTodos.length,
        // Actualiza el número de tareas completadas.
        completed: currentTodos.filter((todo) => todo.completed).length,
        // Actualiza el número de tareas pendientes.
        pending: currentTodos.filter((todo) => !todo.completed).length,
      };
    }
    // Cambia una tarea entre completada y pendiente.
    case 'TOGGLE_TODO':
      const updatedTodos = state.todos.map((todo) => {
        // Busca la tarea cuyo id coincide con el payload.
        if (todo.id === action.payload) {
          // Invierte el valor de completed:
          // true pasa a false y false pasa a true.
          return { ...todo, completed: !todo.completed };
        }
        // Las demás tareas permanecen sin cambios.
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
        // Recalcula las tareas completadas.
        completed: updatedTodos.filter((todo) => todo.completed).length,
        // Recalcula las tareas pendientes.
        pending: updatedTodos.filter((todo) => !todo.completed).length,
      };
    // Si la acción no coincide con ningún caso,
    // mantiene el estado actual sin cambios.
    default:
      return state;
  }
};
