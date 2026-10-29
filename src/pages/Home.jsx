import { Link, useSearchParams } from 'react-router-dom';
import Cover from '../components/Cover';
import SaveButton from '../components/SaveButton';
import StoryCard from '../components/StoryCard';
import { allStories, categories, filterStories, formatDate, getFeaturedStory } from '../utils/stories';

export default function Home() {
  // Search and category live in the URL (?q=...&category=...), so a filtered
  // view can be shared as a link and survives a refresh or the back button.
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = params.get('category') ?? 'All';

  const updateParam = (key, value, emptyValue = '') => {
    const next = new URLSearchParams(params);
    if (value === emptyValue) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const featured = getFeaturedStory();
  const isFiltering = query.trim() !== '' || category !== 'All';

  // Hide the featured story from the grid on the default view so it isn't shown twice.
  const results = filterStories(allStories, { query, category }).filter(
    (s) => isFiltering || s.id !== featured.id
  );

  return (
    <main className="container">
      {!isFiltering && (
        <section className="featured" aria-labelledby="featured-title">
          <Link to={`/story/${featured.slug}`} className="featured__media">
            <Cover id={featured.id} category={featured.category} />
          </Link>
          <div className="featured__body">
            <span className="kicker">Front Page Exclusive</span>
            <h1 id="featured-title" className="featured__title">
              <Link to={`/story/${featured.slug}`}>{featured.title}</Link>
            </h1>
            <p className="featured__excerpt">{featured.excerpt}</p>
            <div className="featured__meta">
              <span>
                By <strong>{featured.author}</strong> · <time dateTime={featured.date}>{formatDate(featured.date)}</time>
              </span>
              <SaveButton storyId={featured.id} variant="full" />
            </div>
          </div>
        </section>
      )}

      <section className="controls" aria-label="Search and filter stories">
        <div className="search">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search headlines, stories or reporters…"
            value={query}
            onChange={(e) => updateParam('q', e.target.value)}
            aria-label="Search stories"
          />
        </div>
        <div className="chips" role="group" aria-label="Filter by category">
          {['All', ...categories].map((c) => (
            <button
              key={c}
              type="button"
              className={`chip ${category === c ? 'is-active' : ''}`}
              aria-pressed={category === c}
              onClick={() => updateParam('category', c, 'All')}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section aria-live="polite">
        <div className="section-head">
          <h2>{isFiltering ? 'Search results' : 'Latest stories'}</h2>
          <span className="muted">
            {results.length} {results.length === 1 ? 'story' : 'stories'}
          </span>
        </div>

        {results.length > 0 ? (
          <div className="grid">
            {results.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>No stories match "{query}"{category !== 'All' && ` in ${category}`}.</p>
            <button type="button" className="btn" onClick={() => setParams({}, { replace: true })}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
