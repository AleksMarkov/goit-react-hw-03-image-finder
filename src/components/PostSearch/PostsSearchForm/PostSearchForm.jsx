import { Component } from 'react';

import styles from './post-search-form.module.css';

class PostSearchForm extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    //   this.props.onSubmit({ ...this.state });
    this.props.onSubmit({ search: this.state.search });
    this.setState({ search: '' });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;
    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label>Enter search phrase</label>
          <input
            value={search}
            onChange={handleChange}
            type="text"
            name="search"
            required
            placeholder="Enter search phrase"
          />
        </div>
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default PostSearchForm;
