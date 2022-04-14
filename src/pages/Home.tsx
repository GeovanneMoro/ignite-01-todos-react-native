import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface handleEditTask {
  id: number;
  newTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find((task) => task.title === newTaskTitle);
    if (taskAlreadyExists) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
      );
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const taskExists = tasks.find((task) => task.id === id);

    if (!taskExists) {
      return;
    }

    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }

      return task;
    });

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const taskExists = tasks.find((task) => task.id === id);

    if (!taskExists) {
      return;
    }

    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => setTasks(tasks.filter((task) => task.id !== id)),
        },
      ],
      {
        cancelable: true,
      },
    );
  }

  function handleEditTask({ id, newTitle }: handleEditTask) {
    const taskExists = tasks.find((task) => task.id === id);

    if (!taskExists) {
      return;
    }

    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title: newTitle };
      }

      return task;
    });

    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
