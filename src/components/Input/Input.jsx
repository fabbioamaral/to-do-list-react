import styles from './Input.module.css';

function Input({ handleIputText, value }) {
  return (
    <input
      className={styles.input}
      placeholder="Add a new task"
      onChange={(event) => handleIputText(event.target.value)}
      value={value}
    ></input>
  );
}

export default Input;
