import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="container">
      <div className="empty empty--page">
        <h1>Story not found</h1>
        <p>Either this page never existed, or the masked menace swung off with it.</p>
        <Link to="/" className="btn">
          Back to the front page
        </Link>
      </div>
    </main>
  );
}
