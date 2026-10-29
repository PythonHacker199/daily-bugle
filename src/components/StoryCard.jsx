import { Link } from 'react-router-dom';
import Cover from './Cover';
import SaveButton from './SaveButton';
import { formatDate } from '../utils/stories';

export default function StoryCard({ story }) {
  return (
    <article className="card">
      <Link to={`/story/${story.slug}`} className="card__link">
        <div className="card__media">
          <Cover id={story.id} category={story.category} />
          <span className={`tag tag--${story.category.toLowerCase()}`}>{story.category}</span>
        </div>
        <div className="card__body">
          <h3 className="card__title">{story.title}</h3>
          <p className="card__excerpt">{story.excerpt}</p>
          <div className="card__meta">
            <time dateTime={story.date}>{formatDate(story.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{story.readTime} min read</span>
          </div>
        </div>
      </Link>
      <div className="card__save">
        <SaveButton storyId={story.id} />
      </div>
    </article>
  );
}
