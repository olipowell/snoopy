import { useEffect, useRef, useState } from "react"
import {
  liveArticle,
  type InlineComment,
  type LiveUpdate,
} from "./content/liveArticle"

const A = `${import.meta.env.BASE_URL}assets`

const navigation = [
  ["nav-latest.svg", "Latest"],
  ["nav-video.svg", "Video"],
  ["nav-in-depth.svg", "In Depth"],
  ["nav-verify.svg", "Verify"],
  ["nav-sounds.svg", "Sounds"],
  ["nav-your-voice.svg", "Your Voice"],
]

const stories = [
  {
    image: "feeaf.png",
    name: "BBC News",
    title: "Storm Boelo batters Cumbrian coastal communities",
  },
  {
    image: "f2dfd.png",
    name: "BBC Wales",
    title: "Flooding disrupts train services around Cardiff",
  },
  {
    image: "ade29.png",
    name: "Sally Bundock",
    title: "The latest Storm Boelo update from the newsroom",
  },
  {
    image: "ad18a.png",
    name: "BBC Weather",
    title: "When will the strongest winds begin to ease?",
  },
  {
    image: "5716f.png",
    name: "BBC Scotland",
    title: "Power cuts and flooding reported across Scotland",
  },
  {
    image: "3cc5a.png",
    name: "Joshua Nevett",
    title: "What the weather warning colours mean",
  },
]

const soundStations = [
  { image: "feeaf.png", name: "BBC World Service", show: "Japan Live" },
  {
    image: "f2dfd.png",
    name: "The Global News Podcast",
    show: "Latest bulletin",
  },
  {
    image: "ade29.png",
    name: "The Briefing Room",
    show: "After the earthquake",
  },
  { image: "ad18a.png", name: "BBC Africa", show: "Focus on the world" },
  {
    image: "5716f.png",
    name: "Verified Live",
    show: "Checking the latest claims",
  },
  { image: "3cc5a.png", name: "The Newsroom", show: "Headlines and analysis" },
]

const podcasts = [
  {
    image: "podcasts/tell-me-im-wrong.jpg",
    name: "Tell Me I'm Wrong",
    show: "The home of pop-culture opinions that probably should've stayed in the group chat.",
  },
  {
    image: "podcasts/traitors-uncloaked.jpg",
    name: "The Traitors: Uncloaked",
    show: "Ed Gamble hosts the official Traitors visualised podcast with unseen bonus content.",
  },
  {
    image: "podcasts/curious-cases.jpg",
    name: "Curious Cases",
    show: "Hannah Fry and Dara Ó Briain tackle listeners' conundrums with the power of science!",
  },
  {
    image: "podcasts/please-dont.jpg",
    name: "Please Don't",
    show: "Chronically online, annoyingly right - Raven Smith and Joel Golby are kings of the hot take.",
  },
  {
    image: "podcasts/football-daily.jpg",
    name: "Football Daily",
    show: "The latest news and analysis from the Premier League, Football League and more.",
  },
  {
    image: "podcasts/fame-under-fire.jpg",
    name: "Fame Under Fire",
    show: "Inside the trial of comedian and broadcaster Russell Brand.",
  },
]

const audioItems = [...soundStations, ...podcasts]

const videoItems = [
  {
    poster: "a4e74.png",
    title: "Watch: The latest from northern Japan",
    duration: "00:42",
  },
  {
    poster: "ade29.png",
    title: "BBC analysis: What happens after a major earthquake",
    duration: "01:18",
  },
  {
    poster: "ad18a.png",
    title: "Explained: How tsunami warning systems work",
    duration: "02:04",
  },
  {
    poster: "feeaf.png",
    title: "A guide to the emergency response",
    duration: "01:35",
  },
]

const comments = [
  {
    author: "Hannah M.",
    avatar: "49a3a.png",
    date: "Today at 10:42",
    text: "Thinking of everyone along the coast. The warning systems and quick response appear to have made a real difference.",
    likes: 42,
    dislikes: 3,
  },
  {
    author: "Daniel K.",
    avatar: "3cc5a.png",
    date: "Today at 10:31",
    text: "The explainer on aftershocks was very useful. It would be good to see a map showing the areas that remain under advisory.",
    likes: 28,
    dislikes: 2,
  },
  {
    author: "Amina R.",
    avatar: "ad18a.png",
    date: "Today at 10:18",
    text: "Glad to hear there have been no reports of major damage. Hoping residents can return home safely soon.",
    likes: 61,
    dislikes: 4,
  },
  {
    author: "Tom W.",
    avatar: "f2dfd.png",
    date: "Today at 09:56",
    text: "Clear and measured reporting. Please keep the live updates and local guidance easy to find.",
    likes: 19,
    dislikes: 1,
  },
]

type StoryViewerProps = {
  index: number
  onChange: (index: number) => void
  onClose: () => void
}

function StoryViewer({ index, onChange, onClose }: StoryViewerProps) {
  const next = () => {
    if (index === stories.length - 1) onClose()
    else onChange(index + 1)
  }
  const previous = () => onChange(Math.max(0, index - 1))

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowRight") next()
      if (event.key === "ArrowLeft") previous()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  })

  return (
    <div
      className="story-viewer"
      role="dialog"
      aria-modal="true"
      aria-label="BBC story video"
    >
      <div className="story-progress" aria-hidden="true">
        {stories.map((story, itemIndex) => (
          <span
            key={story.title}
            className={
              itemIndex < index
                ? "watched"
                : itemIndex === index
                  ? "playing"
                  : ""
            }
          />
        ))}
      </div>
      <div className="story-topbar">
        <div className="story-person">
          <img
            className="story-current-avatar"
            src={`${A}/${stories[index].image}`}
            alt=""
          />
          <span>{stories[index].name}</span>
        </div>
        <button
          className="close-story"
          type="button"
          onClick={onClose}
          aria-label="Close stories"
        >
          ×
        </button>
      </div>

      <div className="story-video-shell">
        <video
          key={index}
          autoPlay
          muted
          playsInline
          onEnded={next}
          poster={`${A}/${stories[index].image}`}
          aria-label={stories[index].title}
        >
          <source src={`${A}/story-video.mp4`} type="video/mp4" />
        </video>
        <div className="story-shade" />
        <p>{stories[index].title}</p>
      </div>

      <button
        className="story-zone story-zone-left"
        type="button"
        onClick={previous}
        aria-label="Previous story"
      />
      <button
        className="story-zone story-zone-right"
        type="button"
        onClick={next}
        aria-label="Next story"
      />
      <div className="story-hint">Tap right for the next story</div>
    </div>
  )
}

function LiveVideoViewer({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      className="live-viewer"
      role="dialog"
      aria-modal="true"
      aria-label="Live broadcast"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        controls
        poster={`${A}/a4e74.png`}
        aria-label="Live video from Japan"
      >
        <source src={`${A}/lead-video.mp4`} type="video/mp4" />
        <source src={`${A}/lead-video.mov`} />
      </video>
      <div className="live-viewer-shade" />
      <div className="live-viewer-topbar">
        <div className="live-viewer-badge">
          <span className="live-dot" aria-hidden="true" />
          <span>Live</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close live broadcast"
        >
          ×
        </button>
      </div>
      <h2>Live: Japan earthquake updates</h2>
    </div>
  )
}

function LightbulbIcon() {
  return (
    <svg
      className="lightbulb-icon"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <g className="lightbulb-rays">
        <line x1="12" y1="0.75" x2="12" y2="2.75" />
        <line x1="4.3" y1="2.8" x2="5.8" y2="4.3" />
        <line x1="19.7" y1="2.8" x2="18.2" y2="4.3" />
        <line x1="1.25" y1="9" x2="3.25" y2="9" />
        <line x1="22.75" y1="9" x2="20.75" y2="9" />
      </g>
      <circle className="lightbulb-fill" cx="12" cy="9" r="4.85" />
      <path
        className="lightbulb-outline"
        d="M9 22h6v-2H9v2Zm3-20a7 7 0 0 0-4 12.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26A7 7 0 0 0 12 2Zm2.85 11.1-.85.6V17h-4v-3.3l-.85-.6A5 5 0 1 1 17 9c0 1.63-.8 3.16-2.15 4.1Z"
      />
    </svg>
  )
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v7.5a2.25 2.25 0 0 1-2.25 2.25H11l-4.75 3v-3h-1A2.25 2.25 0 0 1 3 14.25v-7.5A2.25 2.25 0 0 1 5.25 4.5Z" />
    </svg>
  )
}

function Reaction({
  dark = false,
  initialCount,
}: {
  dark?: boolean
  initialCount: number
}) {
  const [useful, setUseful] = useState(false)

  return (
    <button
      type="button"
      className={`reaction ${dark ? "reaction-dark" : ""} ${
        useful ? "selected" : ""
      }`}
      onClick={() => setUseful((current) => !current)}
      aria-pressed={useful}
      aria-label={useful ? "Remove useful vote" : "Mark as useful"}
      title="Useful?"
    >
      <LightbulbIcon />
      <span>{initialCount + (useful ? 1 : 0)}</span>
    </button>
  )
}

function Meta({
  dark = false,
  usefulCount,
  timestamp = "3 mins ago",
  showComments = false,
  commentCount = 0,
  commentsOpen = false,
  commentsId,
  onCommentsClick,
}: {
  dark?: boolean
  usefulCount: number
  timestamp?: string | null
  showComments?: boolean
  commentCount?: number
  commentsOpen?: boolean
  commentsId?: string
  onCommentsClick?: () => void
}) {
  return (
    <div className={`meta ${dark ? "meta-dark" : ""}`}>
      {timestamp && <span>{timestamp}</span>}
      <div className="meta-actions">
        {showComments && (
          <button
            type="button"
            className="comment-trigger"
            onClick={onCommentsClick}
            disabled={!onCommentsClick}
            aria-label={
              commentCount
                ? `${commentsOpen ? "Close" : "Open"} ${commentCount} comments`
                : `${
                    commentsOpen ? "Close" : "Open"
                  } comments and add the first response`
            }
            aria-controls={commentsId}
            aria-expanded={commentsOpen}
          >
            <CommentIcon />
            {commentCount > 0 && <span>{commentCount}</span>}
          </button>
        )}
        <Reaction dark={dark} initialCount={usefulCount} />
      </div>
    </div>
  )
}

function Author({ image, name }: { image: string name: string }) {
  return (
    <div className="author-row">
      <div className="author">
        <img src={`${A}/${image}`} alt="" />
        <span>{name}</span>
      </div>
      <img className="more-icon" src={`${A}/b460c.svg`} alt="More options" />
    </div>
  )
}

function HeadingCard({
  image,
  name,
  title,
  usefulCount,
  timestamp,
}: {
  image?: string
  name?: string
  title: string
  usefulCount: number
  timestamp?: string
}) {
  return (
    <section className="card heading-card">
      {image && name && <Author image={image} name={name} />}
      <h2>{title}</h2>
      <Meta usefulCount={usefulCount} timestamp={timestamp} />
    </section>
  )
}

function TextCard({ children }: { children: React.ReactNode }) {
  return <section className="card text-card">{children}</section>
}

function UpdateActions({ update }: { update: LiveUpdate }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [reported, setReported] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("pointerdown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [open])

  const updateUrl = () =>
    new URL(`#${update.id}`, window.location.href).toString()

  const copyLink = async () => {
    await navigator.clipboard.writeText(updateUrl())
    setCopied(true)
  }

  const shareUpdate = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: update.headline,
          url: updateUrl(),
        })
        setOpen(false)
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return
        await copyLink()
      }
      return
    }
    await copyLink()
  }

  return (
    <div className="update-actions" ref={menuRef}>
      <button
        type="button"
        className="update-actions-trigger"
        aria-label={`More options for ${update.headline}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          setCopied(false)
          setReported(false)
          setOpen((current) => !current)
        }}
      >
        <img src={`${A}/b460c.svg`} alt="" />
      </button>
      {open && (
        <div className="update-actions-menu" role="menu">
          <button type="button" role="menuitem" onClick={shareUpdate}>
            Share update
          </button>
          <button type="button" role="menuitem" onClick={copyLink}>
            {copied ? "Link copied" : "Copy link"}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => setReported(true)}
          >
            {reported ? "Issue reported" : "Report an issue"}
          </button>
        </div>
      )}
    </div>
  )
}

function InlineComments({
  comments,
  threadId,
  canComment = false,
  onSubmitComment,
}: {
  comments: InlineComment[]
  threadId: string
  canComment?: boolean
  onSubmitComment?: (text: string) => void
}) {
  const [commentText, setCommentText] = useState("")

  const submitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = commentText.trim()
    if (!text || !onSubmitComment) return

    onSubmitComment(text)
    setCommentText("")
  }

  return (
    <section
      className="inline-comments"
      id={threadId}
      aria-label={`Comments on this update (${comments.length})`}
    >
      <div className="inline-comments-header">
        <div>
          <h3>Comments</h3>
          {(comments.length > 0 ||
            threadId !== "storm-boelo-latest-comments") && (
            <span>
              {comments.length
                ? `${comments.length} ${
                    comments.length === 1 ? "response" : "responses"
                  }`
                : "No responses yet"}
            </span>
          )}
        </div>
        {canComment ? (
          <span className="comments-open">
            {threadId === "storm-boelo-latest-comments"
              ? "No comments yet"
              : "Join the conversation"}
          </span>
        ) : (
          <span className="comments-closed">Comments closed</span>
        )}
      </div>
      {canComment && (
        <form className="comment-composer" onSubmit={submitComment}>
          <label htmlFor={`${threadId}-input`}>Add a comment</label>
          <textarea
            id={`${threadId}-input`}
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Share your thoughts"
            rows={3}
            autoFocus
          />
          <div className="comment-composer-actions">
            <span>Your comment will appear publicly.</span>
            <button type="submit" disabled={!commentText.trim()}>
              Post comment
            </button>
          </div>
        </form>
      )}
      {comments.length > 0 && (
        <ol className="inline-comments-list">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className={[
                comment.author === "You" ? "current-user-comment" : "",
                comment.text === "hello" ? "selected-comment-no-divider" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <img src={`${A}/${comment.avatar}`} alt="" />
              <div>
                <div className="inline-comment-meta">
                  <span>{comment.author}</span>
                  <time>{comment.timestamp}</time>
                </div>
                <p
                  className={
                    comment.text === "is it moi you're looking for"
                      ? "selected-comment-text"
                      : undefined
                  }
                >
                  {comment.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

function LiveUpdateCard({
  update,
  isLast,
}: {
  update: LiveUpdate
  isLast: boolean
}) {
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [comments, setComments] = useState<InlineComment[]>(
    () => update.comments ?? [],
  )
  const canComment = !update.comments?.length
  const latestComment = comments[0]
  const isLatestCommentByCurrentUser = latestComment?.author === "You"
  const threadId = `${update.id}-comments`

  const addComment = (text: string) => {
    setComments((current) => [
      {
        id: `${update.id}-user-comment-${Date.now()}`,
        author: "You",
        avatar: "profile-avatar.png",
        timestamp: "Just now",
        text,
      },
      ...current,
    ])
  }

  return (
    <section
      className={`card live-update-card ${isLast ? "final-card" : ""}`}
      id={update.id}
    >
      <div className="live-update-toolbar">
        {update.author && (
          <div className="live-update-author">
            {update.author.image ? (
              <img
                className="live-update-author-avatar"
                src={`${A}/${update.author.image}`}
                alt=""
              />
            ) : (
              <span
                className="live-update-author-avatar live-update-author-placeholder"
                aria-hidden="true"
              >
                {update.author.name.trim().charAt(0).toUpperCase()}
              </span>
            )}
            <span className="live-update-author-name">
              {update.author.name}
            </span>
          </div>
        )}
        <UpdateActions update={update} />
      </div>
      <h2>{update.headline}</h2>
      {update.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {update.bullets && (
        <ul>
          {update.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
      <div className="live-update-footer">
        <time
          className={
            update.id === "more-rain-and-strong-winds"
              ? "selected-update-time"
              : undefined
          }
        >
          {update.time}
        </time>
        <Meta
          timestamp={null}
          usefulCount={update.usefulCount}
          showComments
          commentCount={comments.length}
          commentsOpen={commentsOpen}
          commentsId={threadId}
          onCommentsClick={() => setCommentsOpen((current) => !current)}
        />
      </div>
      {latestComment && (
        <div className="latest-comment-container">
          <button
            type="button"
            className={`latest-comment ${
              isLatestCommentByCurrentUser ? "current-user-comment" : ""
            }`}
            onClick={() => setCommentsOpen((current) => !current)}
            aria-controls={threadId}
            aria-expanded={commentsOpen}
          >
            <img src={`${A}/${latestComment.avatar}`} alt="" />
            <span>
              <time className="latest-comment-time">19:58</time>
              <span className="latest-comment-text">{latestComment.text}</span>
            </span>
          </button>
        </div>
      )}
      {commentsOpen && (
        <InlineComments
          comments={comments}
          threadId={threadId}
          canComment={canComment}
          onSubmitComment={addComment}
        />
      )}
    </section>
  )
}

function VideosPage() {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  const toggleVideo = (index: number) => {
    const selectedVideo = videoRefs.current[index]
    if (!selectedVideo) return

    const shouldPlay = selectedVideo.paused
    videoRefs.current.forEach((video) => video?.pause())
    if (shouldPlay) {
      void selectedVideo.play()
      setPlayingIndex(index)
    } else {
      setPlayingIndex(null)
    }
  }

  return (
    <section
      className="section-page videos-page"
      aria-labelledby="videos-title"
    >
      <h2 id="videos-title">Videos</h2>
      <div className="video-carousel">
        {videoItems.map((video, index) => (
          <article className="video-carousel-card" key={video.title}>
            <button
              type="button"
              className="video-player"
              onClick={() => toggleVideo(index)}
              aria-label={`Play ${video.title}`}
            >
              <video
                ref={(element) => {
                  videoRefs.current[index] = element
                }}
                preload="metadata"
                playsInline
                poster={`${A}/${video.poster}`}
                onEnded={() => setPlayingIndex(null)}
              >
                <source src={`${A}/story-video.mp4`} type="video/mp4" />
              </video>
              <span
                className={`video-play-icon ${
                  playingIndex === index ? "is-playing" : ""
                }`}
              >
                <img src={`${A}/322f3.svg`} alt="" />
              </span>
              <span className="video-duration">{video.duration}</span>
            </button>
            <h3>{video.title}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}

function EditorialPlaceholder({ type }: { type: "In Depth" | "Verify" }) {
  const content =
    type === "In Depth"
      ? [
          "A closer look at the science behind Japan's earthquake and tsunami warning systems.",
          "Expert analysis will explore what the latest seismic activity could mean for communities across the region.",
          "More context, maps and first-hand reporting will appear here as the story develops.",
        ]
      : [
          "BBC Verify is reviewing footage and claims emerging from the affected region.",
          "Our journalists will use open-source evidence to establish what happened and where.",
          "Verified imagery, maps and methodology notes will be added to this page.",
        ]

  return (
    <section
      className="section-page editorial-page"
      aria-labelledby={`${type}-title`}
    >
      <h2 id={`${type}-title`}>{type}</h2>
      <div className="placeholder-card">
        <p>{content[0]}</p>
      </div>
      <img
        src={`${A}/a4e74.png`}
        alt="Emergency information displayed above a road in Japan"
      />
      <div className="placeholder-card">
        <p>{content[1]}</p>
      </div>
      <img
        src={`${A}/ade29.png`}
        alt="A BBC journalist reporting on the developing story"
      />
      <div className="placeholder-card">
        <p>{content[2]}</p>
      </div>
    </section>
  )
}

function SoundsPage({
  onSelectStation,
  activeStation,
}: {
  onSelectStation: (index: number) => void
  activeStation: number | null
}) {
  const progress = [15, 22, 29, 37, 45, 33]

  return (
    <section
      className="section-page sounds-page"
      aria-labelledby="sounds-title"
    >
      <h2 id="sounds-title">Sounds</h2>
      <div className="sound-stories" aria-label="Audio stories">
        {soundStations.map((station, index) => (
          <button
            type="button"
            key={station.name}
            className={activeStation === index ? "active" : ""}
            onClick={() => onSelectStation(index)}
            aria-label={`Listen to ${station.name}: ${station.show}`}
          >
            <span className="sound-avatar-ring">
              <svg
                className="sound-progress-ring"
                viewBox="0 0 122 122"
                aria-hidden="true"
              >
                <circle
                  cx="61"
                  cy="61"
                  r="57.5"
                  pathLength="100"
                  strokeDasharray={`${progress[index]} 100`}
                >
                  <animate
                    attributeName="stroke-dasharray"
                    from="0 100"
                    to={`${progress[index]} 100`}
                    dur="900ms"
                    fill="freeze"
                  />
                </circle>
              </svg>
              <span className="sound-avatar">
                <img src={`${A}/${station.image}`} alt="" />
              </span>
            </span>
            <span className="sound-story-title">{station.name}</span>
          </button>
        ))}
      </div>
      <section
        className="discover-podcasts"
        aria-labelledby="discover-podcasts-title"
      >
        <h3 id="discover-podcasts-title">Discover Podcasts</h3>
        <div className="podcast-carousel">
          {podcasts.map((podcast, index) => {
            const audioIndex = soundStations.length + index
            return (
              <button
                type="button"
                key={podcast.name}
                className={activeStation === audioIndex ? "active" : ""}
                onClick={() => onSelectStation(audioIndex)}
                aria-label={`Play ${podcast.name}`}
              >
                <img src={`${A}/${podcast.image}`} alt="" />
                <strong>{podcast.name}</strong>
                <span>{podcast.show}</span>
              </button>
            )
          })}
        </div>
      </section>
    </section>
  )
}

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00"
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0")
  return `${minutes}:${seconds}`
}

function AudioPlayer({
  stationIndex,
  onClose,
}: {
  stationIndex: number
  onClose: () => void
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const station = audioItems[stationIndex]

  useEffect(() => {
    setCurrentTime(0)
    setIsPlaying(true)
    const audio = audioRef.current
    if (audio) void audio.play().catch(() => setIsPlaying(false))
  }, [stationIndex])

  const togglePlayback = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) void audio.play()
    else audio.pause()
  }

  return (
    <aside className="audio-player" aria-label={`Now playing ${station.name}`}>
      <audio
        key={stationIndex}
        ref={audioRef}
        autoPlay
        src={`${A}/station-audio.mp3`}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="audio-player-header">
        <img src={`${A}/${station.image}`} alt="" />
        <div>
          <strong>{station.name}</strong>
          <span>{station.show}</span>
        </div>
        <button type="button" onClick={onClose} aria-label="Close audio player">
          ×
        </button>
      </div>
      <div className="audio-controls">
        <button
          type="button"
          className={`audio-play-button ${isPlaying ? "playing" : ""}`}
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <span className={isPlaying ? "pause-symbol" : "play-symbol"} />
        </button>
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(currentTime, duration || 0)}
          style={
            {
              "--audio-progress": `${
                duration ? (currentTime / duration) * 100 : 0
              }%`,
            } as React.CSSProperties
          }
          onChange={(event) => {
            const nextTime = Number(event.currentTarget.value)
            if (audioRef.current) audioRef.current.currentTime = nextTime
            setCurrentTime(nextTime)
          }}
          aria-label="Audio progress"
        />
        <span>{formatTime(duration)}</span>
      </div>
    </aside>
  )
}

function ThumbIcon({ down = false }: { down?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <g transform={down ? "rotate(180 12 12)" : undefined}>
        <path d="M1 21h4V9H1v12Zm21.86-8.27-3.02 7.05A2 2 0 0 1 18 21H9a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.05c.27.27.44.65.44 1.06l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73Z" />
      </g>
    </svg>
  )
}

function BBCLogo({ animated }: { animated: boolean }) {
  return (
    <svg
      className={`bbc-logo${animated ? " bbc-logo-animated" : ""}`}
      viewBox="0 0 84 24"
      role="img"
      aria-label="BBC"
    >
      <path
        className="bbc-logo-block bbc-logo-block-one"
        d="M0 0V24H24V0H0ZM16.7344 16.9406C16.3219 17.5219 15.7406 17.9625 14.9813 18.2812C14.2219 18.6 13.3125 18.75 12.2438 18.75H6.8625V5.25H11.925C13.4156 5.25 14.5781 5.55 15.3937 6.15C16.2094 6.75 16.6219 7.60313 16.6219 8.72813C16.6219 9.36563 16.4719 9.92812 16.1813 10.3969C15.8906 10.8656 15.45 11.2406 14.8781 11.5219C15.675 11.7844 16.2844 12.2063 16.7062 12.7781C17.1281 13.35 17.3438 14.0438 17.3438 14.8688C17.3531 15.6656 17.1469 16.3594 16.7344 16.9406ZM13.3031 10.3406C13.6781 10.0312 13.8656 9.6 13.8656 9.04688C13.8656 7.97813 13.1344 7.44375 11.6813 7.44375H9.60938V10.8H11.6813C12.3938 10.8 12.9281 10.65 13.3031 10.3406ZM12.0281 12.9188H9.60938V16.5656H12C12.8156 16.5656 13.4531 16.4156 13.8937 16.1063C14.3344 15.7969 14.55 15.3563 14.55 14.775C14.5406 13.5281 13.7063 12.9188 12.0281 12.9188Z"
      />
      <path
        className="bbc-logo-block bbc-logo-block-two"
        d="M30 0V24H54V0H30ZM46.7344 16.9406C46.3219 17.5219 45.7406 17.9625 44.9812 18.2812C44.2219 18.6 43.3125 18.75 42.2437 18.75H36.8625V5.25H41.925C43.4156 5.25 44.5781 5.55 45.3938 6.15C46.2094 6.75 46.6219 7.60313 46.6219 8.72813C46.6219 9.36563 46.4719 9.92812 46.1812 10.3969C45.8906 10.8656 45.45 11.2406 44.8781 11.5219C45.675 11.7844 46.2844 12.2063 46.7063 12.7781C47.1281 13.35 47.3438 14.0438 47.3438 14.8688C47.3531 15.6656 47.1469 16.3594 46.7344 16.9406ZM43.3031 10.3406C43.6781 10.0312 43.8656 9.6 43.8656 9.04688C43.8656 7.97813 43.1344 7.44375 41.6813 7.44375H39.6094V10.8H41.6813C42.3938 10.8 42.9281 10.65 43.3031 10.3406ZM42.0281 12.9188H39.6094V16.5656H42C42.8156 16.5656 43.4531 16.4156 43.8938 16.1063C44.3344 15.7969 44.55 15.3563 44.55 14.775C44.5406 13.5281 43.7062 12.9188 42.0281 12.9188Z"
      />
      <path
        className="bbc-logo-block bbc-logo-block-three"
        d="M60 24H84V0H60V24ZM77.2406 17.8969C76.6781 18.2062 76.0313 18.45 75.3 18.6281C74.5594 18.8063 73.7906 18.9 72.975 18.9C71.8969 18.9 70.9219 18.7406 70.0594 18.4313C69.1969 18.1125 68.4656 17.6625 67.8656 17.0719C67.2656 16.4813 66.8156 15.7594 66.4969 14.8969C66.1781 14.0437 66.0188 13.0781 66.0188 12C66.0188 10.95 66.1875 10.0031 66.5156 9.15937C66.8438 8.31562 67.3219 7.59375 67.9406 6.98438C68.5594 6.38438 69.3094 5.91562 70.1812 5.59687C71.0531 5.27812 72.0281 5.11875 73.1062 5.11875C73.8562 5.11875 74.5594 5.19375 75.2344 5.35312C75.9 5.50312 76.5187 5.72813 77.0906 6.02813V8.65313C76.5656 8.30625 76.0031 8.04375 75.3938 7.86562C74.7844 7.6875 74.1469 7.59375 73.4719 7.59375C72.5438 7.59375 71.7563 7.7625 71.1 8.10938C70.4438 8.45625 69.9469 8.95312 69.5906 9.60938C69.2437 10.2656 69.0656 11.0625 69.0656 12C69.0656 12.9375 69.2344 13.7344 69.5719 14.4C69.9094 15.0563 70.3969 15.5625 71.0344 15.9094C71.6719 16.2563 72.45 16.425 73.3687 16.425C74.7656 16.425 76.0594 16.0594 77.2406 15.3375V17.8969Z"
      />
    </svg>
  )
}

function CommentsPage() {
  const [commentVotes, setCommentVotes] =
    useState<Record<number, "up" | "down">>({})

  const toggleVote = (index: number, vote: "up" | "down") => {
    setCommentVotes((current) => {
      const next = { ...current }
      if (next[index] === vote) delete next[index]
      else next[index] = vote
      return next
    })
  }

  return (
    <section
      className="section-page comments-page"
      aria-labelledby="comments-title"
    >
      <h2 id="comments-title">Your Voice</h2>
      <div className="comments-feed">
        {comments.map((comment, index) => {
          const vote = commentVotes[index]
          return (
            <article
              className="comment-card"
              key={`${comment.author}-${comment.date}`}
            >
              <div className="comment-header">
                <img src={`${A}/${comment.avatar}`} alt="" />
                <div>
                  <h3>{comment.author}</h3>
                </div>
              </div>
              <p>{comment.text}</p>
              <div className="comment-footer">
                <time>{comment.date}</time>
                <div className="comment-votes">
                  <button
                    type="button"
                    className={`comment-vote ${
                      vote === "up" ? "selected" : ""
                    }`}
                    onClick={() => toggleVote(index, "up")}
                    aria-pressed={vote === "up"}
                    aria-label={`Recommend comment by ${comment.author}`}
                  >
                    <ThumbIcon />
                    <span>{comment.likes + (vote === "up" ? 1 : 0)}</span>
                  </button>
                  <button
                    type="button"
                    className={`comment-vote ${
                      vote === "down" ? "selected" : ""
                    }`}
                    onClick={() => toggleVote(index, "down")}
                    aria-pressed={vote === "down"}
                    aria-label={`Disagree with comment by ${comment.author}`}
                  >
                    <ThumbIcon down />
                    <span>{comment.dislikes + (vote === "down" ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

type AutoplayPromptProps = {
  enabled: boolean
  onChange: (enabled: boolean) => void
  onClose: () => void
}

function AutoplayPrompt({ enabled, onChange, onClose }: AutoplayPromptProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      className="autoplay-prompt-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="autoplay-prompt-title"
      aria-describedby="autoplay-prompt-description"
    >
      <section className="autoplay-prompt">
        {enabled ? (
          <video
            className="autoplay-prompt-art"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Autoplay video preview"
          >
            <source src={`${A}/autoplay-overlay.mp4`} type="video/mp4" />
          </video>
        ) : (
          <img className="autoplay-prompt-art" src={`${A}/80216.png`} alt="" />
        )}
        <span className="autoplay-feature-label">New feature</span>
        <button
          className="autoplay-close"
          type="button"
          onClick={onClose}
          aria-label="Close autoplay prompt"
        >
          <span aria-hidden="true">Close</span>
        </button>
        <h2 id="autoplay-prompt-title">Autoplay</h2>
        <p className="autoplay-intro">For a richer BBC experience</p>
        <p
          id="autoplay-prompt-description"
          className="autoplay-description"
          style={{ fontSize: "clamp(10px, 2.3vw, 24px)" }}
        >
          <span className="autoplay-description-wide">
            Autoplay video, audio and animations is off by default. Enable it
            now or later in your profile.
          </span>
          <span className="autoplay-description-compact">
            Autoplay video, audio and animations are off by default. Enable now
            or later in your profile.
          </span>
        </p>
        <button
          className="autoplay-toggle-control"
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => onChange(!enabled)}
        >
          <span className="autoplay-toggle-label">
            <span className="autoplay-toggle-label-wide">Enable autoplay</span>
            <span className="autoplay-toggle-label-compact">Enable</span>
          </span>
          <span
            className={`autoplay-switch ${enabled ? "is-enabled" : ""}`}
            aria-hidden="true"
          >
            <picture>
              <source media="(min-width: 480px)" srcSet={`${A}/9d578.svg`} />
              <img src={`${A}/4fd12.svg`} alt="" />
            </picture>
          </span>
        </button>
        <p className="autoplay-footnote">
          You can change this at any time in <span>Accessibility Settings</span>
        </p>
      </section>
    </div>
  )
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Latest")
  const [storyIndex, setStoryIndex] = useState<number | null>(null)
  const [audioStationIndex, setAudioStationIndex] = useState<number | null>(
    null,
  )
  const [summaryIndex, setSummaryIndex] = useState(0)
  const [autoplayEnabled, setAutoplayEnabled] = useState(false)
  const [autoplayPromptOpen, setAutoplayPromptOpen] = useState(true)
  const [bbcLogoAnimationRun, setBbcLogoAnimationRun] = useState(0)

  const closeAutoplayPrompt = () => {
    setAutoplayPromptOpen(false)
    if (autoplayEnabled) {
      setBbcLogoAnimationRun((run) => run + 1)
    }
  }

  return (
    <div className="prototype-stage">
      <div className="device-frame">
        <main
          className={`mobile-page ${
            audioStationIndex !== null ? "has-audio-player" : ""
          }`}
        >
          <header className="site-header">
            <img
              className="profile"
              src={`${A}/profile-avatar.png`}
              alt="Your profile"
            />
            <BBCLogo key={bbcLogoAnimationRun} animated={autoplayEnabled} />
            <button type="button" aria-label="Open global navigation">
              <img src={`${A}/af46b.svg`} alt="" />
            </button>
          </header>

          <article>
            <section className="topper">
              <div className="utility-row">
                <button type="button" className="topic-chip">
                  {liveArticle.topic}
                </button>
                <button
                  type="button"
                  className="share-button"
                  aria-label="More story options"
                >
                  <img src={`${A}/b460c.svg`} alt="" />
                </button>
              </div>
              <h1 className="hero-title">{liveArticle.headline}</h1>
              <div className="updated">
                <span className="updated-item">
                  <svg
                    className="updated-bolt"
                    viewBox="0 -960 960 960"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M600-160q-134 0-227-93t-93-227q0-133 93-226.5T600-800q133 0 226.5 93.5T920-480q0 134-93.5 227T600-160Zm0-80q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70Zm40-256v-104q0-17-11.5-28.5T600-640q-17 0-28.5 11.5T560-600v121q0 8 3.5 15.5T572-451l91 91q12 12 28.5 12t28.5-12q12-12 12-28.5T720-417l-80-79ZM120-600q-17 0-28.5-11.5T80-640q0-17 11.5-28.5T120-680h80q17 0 28.5 11.5T240-640q0 17-11.5 28.5T200-600h-80ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h120q17 0 28.5 11.5T240-480q0 17-11.5 28.5T200-440H80Zm40 160q-17 0-28.5-11.5T80-320q0-17 11.5-28.5T120-360h80q17 0 28.5 11.5T240-320q0 17-11.5 28.5T200-280h-80Zm480-200Z"
                    />
                  </svg>
                  <span className="updated-stat updated-time-stat">
                    <span className="updated-time-long">
                      {liveArticle.updatedLabel}
                    </span>
                    <span className="updated-time-short">Just now</span>
                  </span>
                </span>
                <span className="updated-item">
                  <svg
                    className="updated-eye"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="none"
                      stroke="#008080"
                      d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                    />
                    <circle fill="#008080" cx="12" cy="12" r="2.5" />
                  </svg>
                  <span className="updated-stat">
                    12.6k <span className="updated-detail">viewing</span>
                  </span>
                </span>
                <span className="updated-item">
                  <svg viewBox="0 0 32 32" aria-hidden="true">
                    <path
                      fill="#008080"
                      d="M20.8 14.3777C21.3184 14.3777 21.7592 14.1981 22.1223 13.839C22.4852 13.4797 22.6667 13.037 22.6667 12.511C22.6667 11.9852 22.4852 11.5427 22.1223 11.1833C21.7592 10.824 21.3184 10.6443 20.8 10.6443C20.2816 10.6443 19.8408 10.824 19.4777 11.1833C19.1148 11.5427 18.9333 11.9852 18.9333 12.511C18.9333 13.037 19.1148 13.4797 19.4777 13.839C19.8408 14.1981 20.2816 14.3777 20.8 14.3777ZM11.2 14.3777C11.7184 14.3777 12.1592 14.1981 12.5223 13.839C12.8852 13.4797 13.0667 13.037 13.0667 12.511C13.0667 11.9852 12.8852 11.5427 12.5223 11.1833C12.1592 10.824 11.7184 10.6443 11.2 10.6443C10.6816 10.6443 10.2408 10.824 9.87767 11.1833C9.51478 11.5427 9.33333 11.9852 9.33333 12.511C9.33333 13.037 9.51478 13.4797 9.87767 13.839C10.2408 14.1981 10.6816 14.3777 11.2 14.3777ZM10.8 28.2833C9.17778 27.5833 7.76667 26.6333 6.56667 25.4333C5.36667 24.2333 4.41667 22.8222 3.71667 21.2C3.01667 19.5778 2.66667 17.8444 2.66667 16C2.66667 14.1556 3.01667 12.4222 3.71667 10.8C4.41667 9.17778 5.36667 7.76667 6.56667 6.56667C7.76667 5.36667 9.17778 4.41667 10.8 3.71667C12.4222 3.01667 14.1556 2.66667 16 2.66667C17.8444 2.66667 19.5778 3.01667 21.2 3.71667C22.8222 4.41667 24.2333 5.36667 25.4333 6.56667C26.6333 7.76667 27.5833 9.17778 28.2833 10.8C28.9833 12.4222 29.3333 14.1556 29.3333 16C29.3333 17.8444 28.9833 19.5778 28.2833 21.2C27.5833 22.8222 26.6333 24.2333 25.4333 25.4333C24.2333 26.6333 22.8222 27.5833 21.2 28.2833C19.5778 28.9833 17.8444 29.3333 16 29.3333C14.1556 29.3333 12.4222 28.9833 10.8 28.2833ZM23.8777 23.8777C26.0332 21.7221 27.111 19.0962 27.111 16C27.111 12.9038 26.0332 10.2779 23.8777 8.12233C21.7221 5.96678 19.0962 4.889 16 4.889C12.9038 4.889 10.2779 5.96678 8.12233 8.12233C5.96678 10.2779 4.889 12.9038 4.889 16C4.889 19.0962 5.96678 21.7221 8.12233 23.8777C10.2779 26.0332 12.9038 27.111 16 27.111C19.0962 27.111 21.7221 26.0332 23.8777 23.8777ZM15.989 23.311C17.2703 23.311 18.4518 23.0148 19.5333 22.4223C20.6149 21.8297 21.489 21.0119 22.1557 19.969C22.289 19.7081 22.2797 19.4518 22.1277 19.2C21.9759 18.9482 21.7481 18.8223 21.4443 18.8223H10.5537C10.2439 18.8223 10.0149 18.9482 9.86667 19.2C9.71844 19.4518 9.711 19.7081 9.84433 19.969C10.511 21.0119 11.387 21.8297 12.4723 22.4223C13.5574 23.0148 14.7297 23.311 15.989 23.311Z"
                    />
                  </svg>
                  <span className="updated-stat">
                    2.8k <span className="updated-detail">discussing</span>
                  </span>
                </span>
              </div>
              <div className="hero-media">
                <img
                  className="hero-poster"
                  src={`${A}/${liveArticle.heroImage}`}
                  alt={liveArticle.heroAlt}
                />
                <div className="live-pill">
                  <span className="live-dot hero-live-dot" aria-hidden="true" />
                  <span className="live-label">Live</span>
                </div>
              </div>
            </section>

            <nav className="page-nav" aria-label="Page navigation">
              {navigation.map(([icon, label]) => (
                <button
                  key={label}
                  type="button"
                  className={`${activeNav === label ? "active" : ""} nav-${label
                    .toLowerCase()
                    .replace(/\s+/g, "-")} ${
                    label === "In Depth" ? "in-depth-nav" : ""
                  }`}
                  onClick={() => setActiveNav(label)}
                >
                  <img src={`${A}/${icon}`} alt="" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>

            {activeNav === "Latest" ? (
              <>
                <section className="summary-card card" aria-label="Summary">
                  <h2>Summary</h2>
                  <div
                    className="summary-content"
                    onScroll={(event) => {
                      const content = event.currentTarget
                      setSummaryIndex(
                        Math.round(content.scrollLeft / content.clientWidth),
                      )
                    }}
                  >
                    {liveArticle.summaries.map((summary, index) => (
                      <p
                        className="summary-slide"
                        key={summary}
                        aria-label={`Summary ${index + 1} of ${liveArticle.summaries.length}`}
                      >
                        {summary}
                      </p>
                    ))}
                  </div>
                  <div className="summary-dots" aria-hidden="true">
                    {liveArticle.summaries.map((_, index) => (
                      <span
                        key={index}
                        className={index === summaryIndex ? "active" : ""}
                      />
                    ))}
                  </div>
                </section>

                <section className="story-section" aria-label="Video stories">
                  <div className="story-avatars">
                    {stories.map((story, index) => (
                      <button
                        key={story.title}
                        type="button"
                        onClick={() => setStoryIndex(index)}
                        aria-label={`Play: ${story.title}`}
                      >
                        <span className="avatar-frame">
                          <img src={`${A}/${story.image}`} alt="" />
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                {liveArticle.updates.map((update, index) => (
                  <LiveUpdateCard
                    key={update.id}
                    update={update}
                    isLast={index === liveArticle.updates.length - 1}
                  />
                ))}
              </>
            ) : activeNav === "Video" ? (
              <VideosPage />
            ) : activeNav === "In Depth" ? (
              <EditorialPlaceholder type="In Depth" />
            ) : activeNav === "Verify" ? (
              <EditorialPlaceholder type="Verify" />
            ) : activeNav === "Sounds" ? (
              <SoundsPage
                onSelectStation={setAudioStationIndex}
                activeStation={audioStationIndex}
              />
            ) : (
              <CommentsPage />
            )}
          </article>
        </main>
        {storyIndex !== null && (
          <StoryViewer
            index={storyIndex}
            onChange={setStoryIndex}
            onClose={() => setStoryIndex(null)}
          />
        )}
        {audioStationIndex !== null && (
          <AudioPlayer
            stationIndex={audioStationIndex}
            onClose={() => setAudioStationIndex(null)}
          />
        )}
        {autoplayPromptOpen && (
          <AutoplayPrompt
            enabled={autoplayEnabled}
            onChange={setAutoplayEnabled}
            onClose={closeAutoplayPrompt}
          />
        )}
      </div>
    </div>
  )
}
