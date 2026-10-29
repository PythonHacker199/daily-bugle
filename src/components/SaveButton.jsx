import { useSaved } from '../context/SavedContext';

export default function SaveButton({ storyId, variant = 'icon' }) {
  const { isSaved, toggleSave } = useSaved();
  const saved = isSaved(storyId);

  const handleClick = (e) => {
    // The button sits inside a clickable card link; stop the click from opening the article.
    e.preventDefault();
    e.stopPropagation();
    toggleSave(storyId);
  };

  return (
    <button
      type="button"
      className={`save-btn save-btn--${variant} ${saved ? 'is-saved' : ''}`}
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from saved stories' : 'Save for later'}
      title={saved ? 'Remove from saved' : 'Save for later'}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.5L5 21V4a1 1 0 0 1 1-1z"
          fill={saved ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      {variant === 'full' && <span>{saved ? 'Saved' : 'Save for later'}</span>}
    </button>
  );
}
