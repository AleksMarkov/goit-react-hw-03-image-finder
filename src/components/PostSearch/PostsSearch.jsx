import { Component } from 'react';
import { searchPosts } from 'api/posts';
import PostSearchForm from './PostsSearchForm/PostSearchForm';
import PostSearchList from './PostSearchList/PostSearchList';
import Button from 'components/Button/Button';

import styles from './posts-search.module.css';

class PostsSearch extends Component {
  state = {
    search: '',
    posts: [],
    loading: false,
    error: null,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (search && (search !== prevState.search || page !== prevState.page)) {
      this.setState({ loading: true });
      try {
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

  render() {
    const { handleSearch, loadMore } = this;
    const { posts, loading, error } = this.state;

    const isPosts = Boolean(posts.length);

    return (
      <>
        <PostSearchForm onSubmit={handleSearch} />
        {error && <p className={styles.error}>ERROR: {error}</p>}
        {loading && <p>...Loading</p>}
        {isPosts && <PostSearchList items={posts} />}
        {isPosts && (
          <div className={styles.loadMoreWrapper}>
            <Button type="button" onClick={loadMore}>
              Load more
            </Button>
          </div>
        )}
      </>
    );
  }
}

export default PostsSearch;
