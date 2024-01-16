import ImageSearch from './components/ImageSearch/ImageSearch';

import styles from './app.module.css';
// import Posts from 'components/Posts/Posts';

export const App = () => {
  return (
    <div className={styles.app}>
      {/* <Posts /> */}
      <ImageSearch />
    </div>
  );
};
