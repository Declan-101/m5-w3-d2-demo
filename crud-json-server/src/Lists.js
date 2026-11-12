import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Lists = ({ alldata }) => {
  const listrows = [];
  alldata.forEach(book => {
    listrows.push(
      <tr key={book.id}>
        <td>{book.id}</td>
        <td className="book-title">{book.title}</td>
        <td>{book.author}</td>
      </tr>
    );
  });

  return (
    <section aria-label="Book list">
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <caption>{alldata.length} books loaded from the local database.</caption>
          <thead><tr><th scope="col">ID</th><th scope="col">Title</th><th scope="col">Author</th></tr></thead>
          <tbody>{listrows}</tbody>
        </table>
      </div>
      {alldata.length === 0 && <p className="status">No books found.</p>}
    </section>
  );
};

export default Lists;
