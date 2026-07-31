// Blog posts are authored here as Markdown strings and rendered client-side
// with react-markdown — no CMS, no external API, full control over layout.
// To publish a new post: add an entry to this array (newest first).

export const blogPosts = [
  {
    slug: 'hello-world',
    title: 'Hello, world',
    excerpt:
      "Starting a place to write about what I'm building, what I'm learning, and the occasional debugging war story.",
    date: '2026-08-01',
    readTime: '2 min read',
    tags: ['Meta'],
    content: `I've wanted a place to write for a while — somewhere to think out loud about the systems I'm building, the mistakes I make along the way, and the small things I learn that don't fit neatly into a resume bullet.

This is that place.

**What to expect here**

- Notes from building production systems — the kind of detail that gets cut from a project README: why an approach was chosen, what broke, what I'd do differently.
- Write-ups on debugging sessions that taught me something non-obvious.
- Occasional deep dives into tools and patterns I'm actively using — currently a lot of Node.js backend work, AWS, and increasingly AI-assisted tooling.

No fixed schedule. I'll post when I have something worth saying rather than to fill a calendar.

If you want to follow along, the [GitHub](https://github.com/sidgureja7803) is usually a good leading indicator of what I'm about to write about next.`,
  },
];

export const getPostBySlug = (slug) => blogPosts.find((post) => post.slug === slug);
