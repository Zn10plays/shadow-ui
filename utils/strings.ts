
function formatTitle(title: string, removeKorean: boolean=true): string {
  const minor_words = [
    "a", "an", "the",
    "and", "but", "or", "nor", "for", "yet", "so",
    "at", "by", "for", "in", "of", "on", "to", "with", "from",
    "into", "over", "under", "through"
  ];


  if (removeKorean) {
    // Remove Korean characters from the title
    title = title.replace(/[\u3131-\uD79D]/g, '').trim();
  }

  const titleParts = title.split(' ');

  const formattedTitle = titleParts.map((word, index) => {
    // Capitalize the first word and any word not in minor_words
    if (index === 0 || !minor_words.includes(word.toLowerCase())) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word.toLowerCase();
  }).join(' ');

  return formattedTitle;
}

export { formatTitle }