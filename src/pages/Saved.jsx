import { Link } from 'react-router-dom';
import StoryCard from '../components/StoryCard';
import { useSaved } from '../context/SavedContext';
import { allStories } from '../utils/stories';

export default function Saved() {
  const { savedIds, clearSaved } = useSaved();
  // Look the IDs up in the data. An ID whose story was removed is simply skipped.
  const savedStories = allStories.filter((s) => savedIds.includes(s.id));

  return (
    <main className="container">
      <div className="section-head section-head--page">
        <div>
          <h1>Saved stories</h1>
          <p className="muted">Stored in this browser, so they're still here after a refresh.</p>
        </div>
        {savedStories.length > 0 && (
          <button type="button" className="btn btn--ghost" onClick={clearSaved}>
            Clear all
          </button>
        )}
      </div>

      {savedStories.length > 0 ? (
        <div className="grid">
          {savedStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>You haven't saved any stories yet. Tap the bookmark on any story to keep it for later.</p>
          <Link to="/" className="btn">
            Browse the front page
          </Link>
        </div>
      )}
    </main>
  );
}
