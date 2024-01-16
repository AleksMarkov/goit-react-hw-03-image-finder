import { Component } from 'react';
import { getAllPosts } from 'api/images';

import styles from './posts.module.css';

class Posts extends Component {
  state = {
    posts: [],
    loading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const { data } = await getAllPosts();
      this.setState({
        posts: data?.length ? data : [],
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  //   componentDidMount() {
  //     this.setState({ loading: true });

  //     getAllPosts()
  //       .then(response => {
  //         this.setState({
  //           posts: response.data?.length ? response.data : [],
  //         });
  //       })
  //       .catch(error => {
  //         // error is handled in catch block
  //         this.setState({ error: error.message });
  //         if (error.response) {
  //           // status code out of the range of 2xx
  //           console.log('Status :' + error.response.status);
  //           console.log('Message :', error.message);
  //         } else if (error.request) {
  //           // The request was made but no response was received
  //           console.log(error.request);
  //         } else {
  //           // Error on setting up the request
  //           console.log('Error', error.message);
  //         }
  //       })
  //       .finally(() => {
  //         this.setState({ loading: false });
  //       });
  //   }

  render() {
    const { posts, loading, error } = this.state;
    const elements = posts.map(({ id, title, body }) => (
      <li key={id} className={styles.item}>
        <h3>{title}</h3>
        <p>{body}</p>
      </li>
    ));

    return (
      <>
        {error && <p className={styles.error}>ERROR: {error}</p>}
        {loading && <p>...Loading</p>}
        {Boolean(elements.length) && (
          <ul className={styles.list}>{elements}</ul>
        )}
      </>
    );
  }
}

export default Posts;
