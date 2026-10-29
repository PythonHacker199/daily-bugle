import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cover from '../components/Cover';
import SaveButton from '../components/SaveButton';
import StoryCard from '../components/StoryCard';
import NotFound from './NotFound';
import { formatDate, getRelatedStories, getStoryBySlug } from '../utils/stories';

export default function Article() {
  const { slug } = useParams();
  const story = getStoryBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (story) document.title = `${story.title} | The Daily Bugle`;
    return () => {
      document.title = 'The Daily Bugle';
    };
  }, [story]);

  if (!story) return <NotFound />;

  const related = getRelatedStories(story);

  return (
    <main className="container">
      <article className="article">
        <Link to="/" className="back-link">
          ← Back to front page
        </Link>
        <span className={`tag tag--${story.category.toLowerCase()} tag--inline`}>{story.category}</span>
        <h1 className="article__title">{story.title}</h1>
        <p className="article__dek">{story.excerpt}</p>
        <div className="article__meta">
          <span>
            By <strong>{story.author}</strong> · <time dateTime={story.date}>{formatDate(story.date)}</time> ·{' '}
            {story.readTime} min read
          </span>
          <SaveButton storyId={story.id} variant="full" />
        </div>
        <figure className="article__figure">
          <Cover id={story.id} category={story.category} />
          <figcaption>Illustration: Daily Bugle graphics desk</figcaption>
        </figure>
        <div className="article__body">
          {story.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="related">
          <div className="section-head">
            <h2>More in {story.category}</h2>
          </div>
          <div className="grid">
            {related.map((s) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
