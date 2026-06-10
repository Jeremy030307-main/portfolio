export const projectSlug = (title) =>
  String(title).replace(/\s+/g, '').toLowerCase();

// Prefer the explicit slug from the project index; fall back to deriving it
// from the title (keeps older data without a slug field working).
export const slugOf = (project) =>
  project?.slug || projectSlug(project?.title);
