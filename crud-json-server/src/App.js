import React from 'react';
import Lists from './Lists';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      singledata: { title: '', author: '' },
      error: '',
      loaded: false,
    };
    this.controller = null;
  }

  getLists = () => {
    this.controller = new AbortController();
    this.setState({ loading: true, error: '' });
    fetch('http://127.0.0.1:5000/posts', { signal: this.controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('The server could not return the book list.');
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error('Unexpected book data.');
        this.setState({ alldata: data, loading: false, loaded: true });
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          this.setState({ loading: false, error: 'Unable to load books. Make sure JSON Server is running on port 5000, then try again.' });
        }
      });
  };

  componentWillUnmount() {
    if (this.controller) this.controller.abort();
  }

  render() {
    const { loading, alldata, error, loaded } = this.state;
    const content = loading ? <p className="status" role="status">Loading books…</p>
      : error ? <p className="alert alert-danger" role="alert">{error}</p>
      : loaded ? <Lists alldata={alldata} />
      : <p className="status">Click Get Lists to load the books from your local API.</p>;

    return (
      <main className="container demo-container">
        <header className="demo-header">
          <p className="eyebrow">WEB 403 · Week 3 Day 2 Demo</p>
          <h1>Book List</h1>
          <p className="intro">Read book records from a local REST API.</p>
        </header>
        <div className="toolbar">
          <button className="btn btn-primary" onClick={this.getLists} disabled={loading}>
            {loading ? 'Loading…' : 'Get Lists'}
          </button>
          <span>GET /posts · JSON Server</span>
        </div>
        {content}
        <footer>Declan Wilde · React class component + fetch()</footer>
      </main>
    );
  }
}

export default App;
