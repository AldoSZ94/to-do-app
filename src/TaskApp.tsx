import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Check, Plus, Trash2 } from 'lucide-react';
import { useEffect, useReducer, useState } from 'react';
import { getTasksInitialState, taskReducer } from './reducer/taskReducer';

export const TasksApp = () => {
  // Estado local que controla el valor del input.
  const [inputValue, setInputValue] = useState('');

  // useReducer administra el estado completo de las tareas.
  const [state, dispatch] = useReducer(taskReducer, getTasksInitialState());

  // Guarda el estado actualizado en localStorage cada vez que cambia.
  useEffect(() => {
    localStorage.setItem('tasks-state', JSON.stringify(state));
  }, [state]);

  // Agrega una nueva tarea.
  const addTodo = () => {
    // Evita agregar tareas vacías o con solo espacios.
    if (inputValue.trim().length === 0) return;

    // Envía una acción al reducer con el texto de la nueva tarea.
    dispatch({ type: 'ADD_TODO', payload: inputValue });

    // Limpia el input después de agregar la tarea.
    setInputValue('');
  };

  // Cambia una tarea entre completada y pendiente.
  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  // Elimina una tarea usando su id.
  const deleteTodo = (id: number) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  // Permite agregar una tarea presionando Enter.
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Extrae del estado los datos necesarios para renderizar.
  const { todos, completed: completedCount, length: totalCount } = state;

  return (
    <div className="p-4 min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-2xl">
        {/* Encabezado de la aplicación. */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-slate-800">
            Lista de Tareas
          </h1>

          <p className="text-slate-600">
            Mantén tus tareas organizadas y consigue hacerlas
          </p>
        </div>

        {/* Formulario para agregar nuevas tareas. */}
        <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="gap-2 flex">
              <Input
                placeholder="Añade una nueva tarea..."
                value={inputValue}
                // Actualiza el estado cada vez que cambia el input.
                onChange={(e) => setInputValue(e.target.value)}
                // Permite agregar la tarea presionando Enter.
                onKeyDown={handleKeyPress}
                className="flex-1 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
              />

              <Button
                onClick={addTodo}
                className="px-4 bg-slate-800 text-white hover:bg-slate-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Solo muestra el progreso si existe al menos una tarea. */}
        {totalCount > 0 && (
          <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-slate-700">
                Progreso
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="mb-2 justify-between text-sm text-slate-600 flex items-center">
                <span>
                  {completedCount} de {totalCount} completadas
                </span>

                {/* Calcula y muestra el porcentaje de tareas completadas. */}
                <span>{Math.round((completedCount / totalCount) * 100)}%</span>
              </div>

              {/* Barra que representa visualmente el progreso. */}
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-linear-to-r h-2 rounded-full from-green-400 to-green-500 transition-all duration-300 ease-out"
                  style={{
                    width: `${(completedCount / totalCount) * 100}%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sección que muestra la lista de tareas. */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-700">
              Tareas
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* Si no existen tareas, muestra un mensaje. */}
            {todos.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mb-4 w-16 h-16 mx-auto bg-slate-100 rounded-full justify-center flex items-center">
                  <Check className="w-8 h-8 text-slate-400" />
                </div>

                <p className="mb-2 text-slate-500 text-lg">No hay tareas</p>

                <p className="text-slate-400 text-sm">
                  Añade una tarea arriba para empezar
                </p>
              </div>
            ) : (
              // Si existen tareas, recorre el arreglo y muestra cada una.
              <div className="space-y-2">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                      todo.completed
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}>
                    {/* Checkbox que permite completar o descompletar la tarea. */}
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />

                    {/* Muestra el texto de la tarea. */}
                    <span
                      className={`flex-1 transition-all duration-200 ${
                        todo.completed
                          ? 'text-slate-500 line-through'
                          : 'text-slate-800'
                      }`}>
                      {todo.text}
                    </span>

                    {/* Botón para eliminar la tarea. */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                      className="p-0 text-slate-400 h-8 w-8 hover:text-red-500 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
