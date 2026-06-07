export function createSlug(name: string, volume?: string) {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces -> hyphens
    .replace(/-+/g, "-"); // collapse multiple hyphens

  return volume ? `${base}-${volume.toLowerCase()}` : base;
}
