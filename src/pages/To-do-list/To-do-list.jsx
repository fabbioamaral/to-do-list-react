import styles from './To-do-list.module.css';
import Input from '../../components/Input/Input';
import SimpleButton from '../../components/Simple-Button/Simple-Button';
import Task from '../../components/Task/Task';
import { database } from '../../utils/firebase';
import { ref, set, get, child } from 'firebase/database';
import { useState } from 'react';
import { useEffect } from 'react';

function ToDoList() {
  const [toDoList, setToDoList] = useState();
  const [inputText, setInputText] = useState();

  useEffect(() => {
    getToDoList();
  }, []);

  const getToDoList = async () => {
    try {
      const result = await get(child(ref(database), 'todolist'));
      if (result.exists()) {
        const tasks = result.val();
        setToDoList(tasks);
      } else {
        console.log('No data available');
        setToDoList([]);
      }
    } catch (err) {
      console.error('Error trying to get tasks');
      console.error(err);
    }
  };

  const pushTask = async () => {
    try {
      const tasks = toDoList;
      tasks.push(inputText);
      const result = await set(ref(database, 'todolist'), tasks);
      setToDoList(tasks);
      setInputText('');
    } catch (err) {
      console.error('Error trying to save task');
      console.error(err);
    }
  };

  const deleteTask = async (task) => {
    const newToDoList = toDoList.filter((t) => t !== task);
    setToDoList(newToDoList);
    try {
      const result = await set(ref(database, 'todolist'), toDoList);
    } catch (err) {
      console.error('Error trying to save task after deleting a task');
      console.error(err);
    }
  };

  const handleIputText = (taskText) => {
    setInputText(taskText);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>To-Do List</h1>
      <div className={styles.card}>
        <div>
          <Input handleIputText={handleIputText} value={inputText} />
          <SimpleButton
            text="Add"
            color="white"
            backgroundColor="rgb(18, 33, 129)"
            handleClick={pushTask}
          />
        </div>
        <div>
          {!!toDoList
            ? toDoList.map((t) => (
                <div key={t} onClick={() => deleteTask(t)}>
                  <Task text={t} key={t} />
                </div>
              ))
            : ''}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
