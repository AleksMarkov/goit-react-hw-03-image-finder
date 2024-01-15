import styles from './post-search-list.module.css';

const PostSearchList = ({ items }) => {
  const elements = items.map(({ id, title, body }) => (
    <li key={id} className={styles.item}>
      <h3>{title}</h3>
      <p>{body}</p>
    </li>
  ));
  return <ul className={styles.list}>{elements}</ul>;
};

export default PostSearchList;
