import React from 'react';
import Lists from './Lists';
import CreateList from './CreateList';
import './App.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/posts';
const emptyBook = { title: '', author: '' };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, alldata: [], singledata: { ...emptyBook },
      error: '', loaded: false, saving: false, formLoading: false, formError: '',
    };
    this.controller = new AbortController();
  }

  request = async (url, options = {}) => {
    const response = await fetch(url, { ...options, signal: this.controller.signal });
    if (!response.ok) throw new Error(`Request failed (${response.status}).`);
    return response.status === 204 ? null : response.json();
  };

  getLists = async () => {
    this.setState({ loading: true, error: '' });
    try {
      const data = await this.request(apiUrl);
      if (!Array.isArray(data)) throw new Error('Unexpected book data.');
      this.setState({ alldata: data, loading: false, loaded: true });
      return true;
    } catch (error) {
      if (error.name !== 'AbortError') {
        this.setState({ loading: false, error: 'Unable to load books. Check that JSON Server is running on port 5000, then click Get Lists.' });
      }
      return false;
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(previous => ({ singledata: { ...previous.singledata, [name]: value } }));
  };

  resetForm = () => {
    this.setState({ singledata: { ...emptyBook }, formError: '', formLoading: false });
  };

  getList = async (event, id) => {
    this.setState({ singledata: { ...emptyBook }, formLoading: true, formError: '' });
    try {
      const data = await this.request(`${apiUrl}/${encodeURIComponent(id)}`);
      this.setState({ singledata: { title: data.title, author: data.author }, formLoading: false });
      return true;
    } catch (error) {
      if (error.name !== 'AbortError') this.setState({ formLoading: false, formError: 'Unable to load this book. Close the dialog and try again.' });
      return false;
    }
  };

  saveBook = async (method, id) => {
    if (this.state.saving || this.state.formLoading) return false;
    const book = { title: this.state.singledata.title.trim(), author: this.state.singledata.author.trim() };
    if (method !== 'DELETE' && (!book.title || !book.author)) {
      this.setState({ formError: 'Enter both a title and an author.' });
      return false;
    }
    this.setState({ saving: true, formError: '' });
    try {
      const url = method === 'POST' ? apiUrl : `${apiUrl}/${encodeURIComponent(id)}`;
      await this.request(url, {
        method,
        ...(method !== 'DELETE' && {
          headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(book),
        }),
      });
      // Always read the database again after POST, PUT or DELETE.
      await this.getLists();
      this.setState({ saving: false, singledata: { ...emptyBook } });
      return true;
    } catch (error) {
      if (error.name !== 'AbortError') this.setState({ saving: false, formError: 'The change could not be saved. Check the local server and try again.' });
      return false;
    }
  };

  createList = event => { event.preventDefault(); return this.saveBook('POST'); };
  updateList = (event, id) => { event.preventDefault(); return this.saveBook('PUT', id); };
  deleteList = (event, id) => { event.preventDefault(); return this.saveBook('DELETE', id); };

  componentWillUnmount() { this.controller.abort(); }

  render() {
    const { loading, alldata, error, loaded, ...formState } = this.state;
    const formProps = { ...formState, handleChange: this.handleChange, getList: this.getList };
    return (
      <main className="container demo-container">
        <header className="demo-header">
          <p className="eyebrow">WEB 403 · Week 3 Day 2 Homework</p>
          <h1>Book List</h1>
          <p className="intro">Create, read, update and delete books with a local REST API.</p>
        </header>
        <div className="toolbar">
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={this.getLists} disabled={loading || formState.saving}>Get Lists</button>
            <CreateList {...formProps} createList={this.createList} resetForm={this.resetForm} />
          </div>
          <span>GET · POST · PUT · DELETE</span>
        </div>
        {loading && <p className="status" role="status">Loading books…</p>}
        {error && <p className="alert alert-danger" role="alert">{error}</p>}
        {!loading && loaded && <Lists alldata={alldata} {...formProps}
          updateList={this.updateList} deleteList={this.deleteList} />}
        {!loading && !loaded && !error && <p className="status">Click Get Lists to load books, or Create to add a book.</p>}
        <footer>Declan Wilde · React + JSON Server</footer>
      </main>
    );
  }
}

export default App;
