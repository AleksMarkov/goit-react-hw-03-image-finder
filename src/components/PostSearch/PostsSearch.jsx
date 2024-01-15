import { Component } from 'react';
import { searchPosts } from 'api/posts';
import PostSearchForm from './PostsSearchForm/PostSearchForm';
import PostSearchList from './PostSearchList/PostSearchList';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import styles from './posts-search.module.css';

class PostsSearch extends Component {
  state = {
    search: '',
    posts: [],
    loading: false,
    error: null,
    page: 1,
    modalOpen: false,
    postDetails: {},
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (search && (search !== prevState.search || page !== prevState.page)) {
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    const { search, page } = this.state;
    try {
      this.setState({ loading: true });
      const { data } = await searchPosts(search, page);
      this.setState(({ posts }) => ({
        posts: data?.length ? [...posts, ...data] : posts,
      }));
      // this.setState({ posts: data?.length ? data : [] });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleSearch = ({ search }) => {
    this.setState({ search, posts: [], page: 1 });
  };

  // loadMore = () => {
  //   this.setState(({ page }) => {
  //     return { page: page + 1 };
  //   });
  // };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showModal = ({ title, body }) => {
    this.setState({
      modalOpen: true,
      postDetails: {
        title,
        body,
      },
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      postDetails: {},
    });
  };

  render() {
    const { handleSearch, loadMore, showModal, closeModal } = this;
    const { posts, loading, error, modalOpen, postDetails } = this.state;

    const isPosts = Boolean(posts.length);

    return (
      <>
        <PostSearchForm onSubmit={handleSearch} />
        {error && <p className={styles.error}>ERROR: {error}</p>}
        {loading && <p>...Loading</p>}
        {isPosts && <PostSearchList showModal={showModal} items={posts} />}
        {isPosts && (
          <div className={styles.loadMoreWrapper}>
            <Button type="button" onClick={loadMore}>
              Load more
            </Button>
          </div>
        )}
        {modalOpen && (
          <Modal close={closeModal}>
            <h2>{postDetails.title}</h2>
            <p>{postDetails.body}</p>
          </Modal>
        )}
      </>
    );
  }
}

export default PostsSearch;
