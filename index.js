import { useState, useEffect } from "react";

const GOOGLE_FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300;1,8..60,400&family=JetBrains+Mono:wght@400;500&display=swap');
`;

const INITIAL_POSTS = [
  {
    id: "001",
    title: "Day One. Or Maybe Day 847.",
    date: "2026-05-24",
    category: "Origin",
    excerpt: "There's no clean starting line. There never is.",
    body: `There's no clean starting line. There never is.

I've been in enterprise technology for over a decade — the kind of career where you're the person companies call when something is broken at scale. I've seen the inside of more boardrooms than I can count, watched decisions get made (and unmade), and built enough institutional knowledge that I started to wonder: why am I building this for everyone else?

So here we are.

I'm not writing this from the other side. There's no exit yet, no Series B announcement, no Forbes feature. I'm writing this from the middle of it — the uncomfortable, clarifying, occasionally terrifying middle of building something from nothing.

What surprised me most about starting is how many other people are in the same place. Not 25-year-olds fresh out of school. People in their 40s and 50s who got laid off and realized their industry moved without them. Career pivoters who spent years being excellent at something that no longer pays what it once did. People who built their identity around a title that evaporated.

I see them and I think: this is the real story nobody's telling.

The startup media covers the wins. I want to document the becoming.

This is that.`,
    readTime: "3 min"
  },
  {
    id: "002",
    title: "What 10 Years in the Room Teaches You",
    date: "2026-05-18",
    category: "Enterprise",
    excerpt: "Being the expert everyone calls is its own kind of trap.",
    body: `Being the expert everyone calls is its own kind of trap.

For ten years I was the person who knew how the systems worked — not just technically, but organizationally. Who really owned what decision. Where the budget actually sat. Which vendor relationships were political and which were practical. That institutional knowledge compounded quietly until it became the most valuable thing I had.

And then I realized: I'd been giving it away.

Not recklessly. Professionally. That's what you do as a specialist — you solve problems for people who have the leverage. You become indispensable to systems you don't own. You get really, really good at making other people's bets pay off.

There's a version of me that stays in that lane forever. Comfortable. Well-compensated. Increasingly miserable.

The thing nobody tells you about enterprise expertise is that it gives you pattern recognition that's genuinely rare. You know why projects fail before they fail. You know which vendors will still exist in three years. You know what "we'll revisit this in Q3" actually means.

I'm building something that puts that pattern recognition to work — for the people who need it most, not the ones who can already afford it.

More on that soon.`,
    readTime: "4 min"
  }
];

const CATEGORIES = ["All", "Origin", "Enterprise", "Growth", "People", "Reflection"];

const styles = `
${GOOGLE_FONTS}

* { box-sizing: border-box; margin: 0; padding: 0; }

body, #root {
  background: #0C0B09;
  color: #EDE9E0;
  font-family: 'Source Serif 4', Georgia, serif;
  min-height: 100vh;
}

.blog {
  min-height: 100vh;
  background: #0C0B09;
}

.header {
  border-bottom: 1px solid #2A2822;
  padding: 2rem 0;
  position: sticky;
  top: 0;
  background: rgba(12, 11, 9, 0.96);
  backdrop-filter: blur(8px);
  z-index: 100;
}

.header-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-block { cursor: pointer; }
.logo { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 900; color: #EDE9E0; letter-spacing: -0.02em; line-height: 1; }
.logo-sub { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: #6B6660; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 4px; }

.header-actions { display: flex; gap: 12px; align-items: center; }

.btn-write {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: #C8A96E;
  color: #0C0B09;
  border: none;
  padding: 8px 18px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.15s;
}
.btn-write:hover { background: #D4B87C; }

.btn-ghost {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: transparent;
  color: #6B6660;
  border: 1px solid #2A2822;
  padding: 8px 18px;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-ghost:hover { color: #EDE9E0; border-color: #4A4640; }

.hero {
  max-width: 900px;
  margin: 0 auto;
  padding: 5rem 2rem 3rem;
}

.hero-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #C8A96E;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #EDE9E0;
  max-width: 700px;
  margin-bottom: 1.5rem;
}

.hero-title em {
  font-style: italic;
  color: #C8A96E;
}

.hero-desc {
  font-size: 1.05rem;
  color: #8A8480;
  line-height: 1.8;
  max-width: 520px;
  font-weight: 300;
}

.divider {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
  border-top: 1px solid #1E1D1A;
}

.filter-bar {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.filter-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #4A4640;
  margin-right: 8px;
}

.filter-btn {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: transparent;
  color: #6B6660;
  border: 1px solid #2A2822;
  padding: 5px 12px;
  cursor: pointer;
  transition: all 0.15s;
}
.filter-btn:hover { color: #C8A96E; border-color: #C8A96E44; }
.filter-btn.active { color: #C8A96E; border-color: #C8A96E; background: #C8A96E11; }

.posts-grid {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
  display: grid;
  gap: 0;
}

.post-card {
  border-top: 1px solid #1E1D1A;
  padding: 2.5rem 0;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: start;
  cursor: pointer;
  transition: all 0.15s;
}
.post-card:hover .post-title { color: #C8A96E; }
.post-card:last-child { border-bottom: 1px solid #1E1D1A; }

.post-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #4A4640;
  margin-bottom: 0.75rem;
  display: flex;
  gap: 16px;
  align-items: center;
}

.post-category { color: #C8A96E88; }

.post-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: #EDE9E0;
  margin-bottom: 0.75rem;
  transition: color 0.15s;
}

.post-excerpt {
  font-size: 0.95rem;
  color: #6B6660;
  line-height: 1.7;
  font-weight: 300;
  font-style: italic;
}

.post-num {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 900;
  color: #1E1D1A;
  line-height: 1;
  user-select: none;
  margin-top: 4px;
}

.post-read-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #C8A96E;
  margin-top: 1.25rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* Single post view */
.post-view {
  max-width: 680px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

.back-btn {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #4A4640;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.15s;
}
.back-btn:hover { color: #C8A96E; }

.post-view-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #4A4640;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 20px;
}
.post-view-meta .cat { color: #C8A96E; }

.post-view-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #EDE9E0;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid #1E1D1A;
  padding-bottom: 2.5rem;
}

.post-view-body {
  font-size: 1.1rem;
  line-height: 1.9;
  color: #C4BFB6;
  font-weight: 300;
}

.post-view-body p {
  margin-bottom: 1.5rem;
}

/* Write view */
.write-view {
  max-width: 680px;
  margin: 0 auto;
  padding: 3rem 2rem 6rem;
}

.write-title-input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid #2A2822;
  color: #EDE9E0;
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  padding: 0.75rem 0;
  margin-bottom: 1.5rem;
  outline: none;
}
.write-title-input::placeholder { color: #2A2822; }
.write-title-input:focus { border-color: #C8A96E44; }

.write-row { display: flex; gap: 12px; margin-bottom: 1.5rem; }

.write-select {
  background: #111008;
  border: 1px solid #2A2822;
  color: #6B6660;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 8px 12px;
  outline: none;
  cursor: pointer;
}
.write-select:focus { border-color: #C8A96E44; }

.write-excerpt-input {
  width: 100%;
  background: transparent;
  border: 1px solid #1E1D1A;
  color: #8A8480;
  font-family: 'Source Serif 4', serif;
  font-size: 0.95rem;
  font-style: italic;
  padding: 0.75rem;
  outline: none;
  resize: none;
  margin-bottom: 1.5rem;
  font-weight: 300;
}
.write-excerpt-input::placeholder { color: #2A2822; }
.write-excerpt-input:focus { border-color: #2A2822; }

.write-body-input {
  width: 100%;
  min-height: 400px;
  background: transparent;
  border: none;
  border-top: 1px solid #1E1D1A;
  color: #C4BFB6;
  font-family: 'Source Serif 4', serif;
  font-size: 1rem;
  line-height: 1.9;
  padding: 1.5rem 0;
  outline: none;
  resize: none;
  font-weight: 300;
}
.write-body-input::placeholder { color: #2A2822; }

.write-actions {
  display: flex;
  gap: 12px;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #1E1D1A;
}

.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #4A4640;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 12px;
}
.section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #1E1D1A;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #4A4640;
}
.empty-state h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2A2822;
  margin-bottom: 0.5rem;
}
.empty-state p { font-size: 0.85rem; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.05em; }

.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #C8A96E;
  color: #0C0B09;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 10px 20px;
  animation: slideUp 0.2s ease;
  z-index: 999;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.writing-tip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  color: #3A3830;
  margin-bottom: 1rem;
}

.count-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 0.08em;
  background: #1E1D1A;
  color: #4A4640;
  padding: 2px 8px;
  margin-left: 8px;
}
`;

function formatDate(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function zeroPad(n) { return String(n).padStart(3, "0"); }

export default function FoundersJournal() {
  const [view, setView] = useState("home");
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ title: "", category: "Reflection", excerpt: "", body: "" });

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get("journal-posts");
        if (result?.value) {
          setPosts(JSON.parse(result.value));
        } else {
          setPosts(INITIAL_POSTS);
          await window.storage.set("journal-posts", JSON.stringify(INITIAL_POSTS));
        }
      } catch {
        setPosts(INITIAL_POSTS);
      }
      setLoading(false);
    })();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const savePosts = async (updated) => {
    setPosts(updated);
    try { await window.storage.set("journal-posts", JSON.stringify(updated)); } catch {}
  };

  const publishPost = async () => {
    if (!form.title.trim() || !form.body.trim()) { showToast("Title and body required"); return; }
    const newPost = {
      id: zeroPad(posts.length + 1),
      title: form.title.trim(),
      date: new Date().toISOString().split("T")[0],
      category: form.category,
      excerpt: form.excerpt.trim() || form.body.trim().slice(0, 80) + "…",
      body: form.body.trim(),
      readTime: Math.max(1, Math.ceil(form.body.split(" ").length / 200)) + " min"
    };
    const updated = [newPost, ...posts];
    await savePosts(updated);
    setForm({ title: "", category: "Reflection", excerpt: "", body: "" });
    setView("home");
    showToast("Published →");
  };

  const deletePost = async (id) => {
    const updated = posts.filter(p => p.id !== id);
    await savePosts(updated);
    setView("home");
    showToast("Deleted");
  };

  const filteredPosts = activeCategory === "All" ? posts : posts.filter(p => p.category === activeCategory);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0C0B09" }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2A2822" }}>Loading journal…</span>
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="blog">
        <header className="header">
          <div className="header-inner">
            <div className="logo-block" onClick={() => setView("home")}>
              <div className="logo">Before the Billions</div>
              <div className="logo-sub">A Founder's Journal</div>
            </div>
            <div className="header-actions">
              {view !== "home" && (
                <button className="btn-ghost" onClick={() => setView("home")}>← All Posts</button>
              )}
              {view !== "write" && (
                <button className="btn-write" onClick={() => setView("write")}>+ Write Entry</button>
              )}
            </div>
          </div>
        </header>

        {view === "home" && (
          <>
            <div className="hero">
              <div className="hero-eyebrow">est. {new Date().getFullYear()} — In progress</div>
              <h1 className="hero-title">The raw years, <em>documented.</em></h1>
              <p className="hero-desc">
                10+ years in enterprise tech. Now building something from scratch. Writing it down before the story gets polished.
              </p>
            </div>

            <div className="divider" />

            <div className="filter-bar">
              <span className="filter-label">Filter</span>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn${activeCategory === cat ? " active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                  {cat === "All" && <span className="count-badge">{posts.length}</span>}
                </button>
              ))}
            </div>

            <div className="posts-grid">
              {filteredPosts.length === 0 ? (
                <div className="empty-state">
                  <h3>Nothing here yet.</h3>
                  <p>Write your first entry in this category.</p>
                </div>
              ) : (
                filteredPosts.map((post, i) => (
                  <div key={post.id} className="post-card" onClick={() => { setActivePost(post); setView("post"); }}>
                    <div>
                      <div className="post-meta">
                        <span className="post-category">{post.category}</span>
                        <span>{formatDate(post.date)}</span>
                        <span>{post.readTime} read</span>
                      </div>
                      <h2 className="post-title">{post.title}</h2>
                      <p className="post-excerpt">{post.excerpt}</p>
                      <div className="post-read-link">Read entry →</div>
                    </div>
                    <div className="post-num">{zeroPad(i + 1)}</div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {view === "post" && activePost && (
          <div className="post-view">
            <button className="back-btn" onClick={() => setView("home")}>← Back to journal</button>
            <div className="post-view-meta">
              <span className="cat">{activePost.category}</span>
              <span>{formatDate(activePost.date)}</span>
              <span>{activePost.readTime} read</span>
            </div>
            <h1 className="post-view-title">{activePost.title}</h1>
            <div className="post-view-body">
              {activePost.body.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #1E1D1A", display: "flex", gap: "12px" }}>
              <button className="btn-ghost" onClick={() => deletePost(activePost.id)}>Delete entry</button>
            </div>
          </div>
        )}

        {view === "write" && (
          <div className="write-view">
            <div className="section-label">New journal entry</div>
            <div className="writing-tip">Write like no one's reading yet. They will be someday.</div>

            <input
              className="write-title-input"
              placeholder="Give this chapter a title…"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />

            <div className="write-row">
              <select
                className="write-select"
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              >
                {CATEGORIES.filter(c => c !== "All").map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <textarea
              className="write-excerpt-input"
              placeholder="One line that captures it (optional)…"
              rows={2}
              value={form.excerpt}
              onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
            />

            <textarea
              className="write-body-input"
              placeholder={`Start writing.\n\nUse blank lines to separate paragraphs.\nNo formatting needed — just say what happened.`}
              value={form.body}
              onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
            />

            <div className="write-actions">
              <button className="btn-write" onClick={publishPost}>Publish Entry →</button>
              <button className="btn-ghost" onClick={() => setView("home")}>Discard</button>
            </div>
          </div>
        )}
      </div>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}