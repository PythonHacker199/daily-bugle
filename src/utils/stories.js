import stories from '../data/stories.json';

// Newest first. We copy the array before sorting so the imported JSON is never mutated.
export const allStories = [...stories].sort((a, b) => b.date.localeCompare(a.date));

// Unique category names, built from the data so a new category never needs a code change.
export const categories = [...new Set(allStories.map((s) => s.category))].sort();

export function getStoryBySlug(slug) {
  return allStories.find((s) => s.slug === slug);
}

export function getFeaturedStory() {
  return allStories.find((s) => s.featured) ?? allStories[0];
}

// Case-insensitive search across title, excerpt and author, plus an optional category filter.
export function filterStories(list, { query = '', category = 'All' } = {}) {
  const q = query.trim().toLowerCase();
  return list.filter((s) => {
    const matchesCategory = category === 'All' || s.category === category;
    const matchesQuery =
      q === '' ||
      s.title.toLowerCase().includes(q) ||
      s.excerpt.toLowerCase().includes(q) ||
      s.author.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}

export function getRelatedStories(story, count = 3) {
  return allStories.filter((s) => s.category === story.category && s.id !== story.id).slice(0, count);
}

export function formatDate(iso) {
  // Parse as a local date (not UTC) so the day never shifts in Indian time.
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
