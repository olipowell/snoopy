import { useEffect, useRef, useState } from "react"
import { liveArticle, type LiveUpdate } from "./content/liveArticle"

const A = `${import.meta.env.BASE_URL}assets`

const navigation = [
  ["769c0.svg", "Latest"],
  ["086ad.svg", "Videos"],
  ["7298c.svg", "In Depth"],
  ["a6ac1.svg", "Verify"],
  ["2e0c5.svg", "Sounds"],
  ["8f0af.svg", "Comments"],
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
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M9 22h6v-2H9v2Zm3-20a7 7 0 0 0-4 12.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26A7 7 0 0 0 12 2Zm2.85 11.1-.85.6V17h-4v-3.3l-.85-.6A5 5 0 1 1 17 9c0 1.63-.8 3.16-2.15 4.1Z" />
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
}: {
  dark?: boolean
  usefulCount: number
  timestamp?: string
}) {
  return (
    <div className={`meta ${dark ? "meta-dark" : ""}`}>
      <span>{timestamp}</span>
      <Reaction dark={dark} initialCount={usefulCount} />
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
          <a
            role="menuitem"
            href={liveArticle.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open BBC live coverage
          </a>
        </div>
      )}
    </div>
  )
}

function LiveUpdateCard({
  update,
  isLast,
}: {
  update: LiveUpdate
  isLast: boolean
}) {
  return (
    <section
      className={`card live-update-card ${isLast ? "final-card" : ""}`}
      id={update.id}
    >
      {update.author && (
        <div className="live-update-author">
          <img src={`${A}/${update.author.image}`} alt="" />
          <span>{update.author.name}</span>
        </div>
      )}
      <div className="live-update-heading">
        <h2>{update.headline}</h2>
        <UpdateActions update={update} />
      </div>
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
      <Meta timestamp={update.time} usefulCount={update.usefulCount} />
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
      <h2 id="comments-title">Comments</h2>
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

function AutoplayPrompt({
  enabled,
  onChange,
  onClose,
}: AutoplayPromptProps) {
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
          <img
            className="autoplay-prompt-art"
            src={`${A}/80216.png`}
            alt=""
          />
        )}
        <span className="autoplay-feature-label">New feature</span>
        <button
          className="autoplay-close"
          type="button"
          onClick={onClose}
          aria-label="Close autoplay prompt"
        >
          ×
        </button>
        <h2 id="autoplay-prompt-title">Autoplay</h2>
        <p className="autoplay-intro">For a richer story experience</p>
        <p id="autoplay-prompt-description" className="autoplay-description">
          Autoplaying video and audio will only play automatically if you
          choose to enable them.
        </p>
        <button
          className="autoplay-toggle-control"
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => onChange(!enabled)}
        >
          <span>Enable</span>
          <span
            className={`autoplay-switch ${enabled ? "is-enabled" : ""}`}
            aria-hidden="true"
          >
            <img src={`${A}/4fd12.svg`} alt="" />
          </span>
        </button>
        <p className="autoplay-footnote">
          You can turn this off at any time in your profile.
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
          <img className="bbc-logo" src={`${A}/87f0f.svg`} alt="BBC" />
          <button type="button" aria-label="Open menu">
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
                aria-label="Share this story"
              >
                <img src={`${A}/9adc7.svg`} alt="" />
              </button>
            </div>
            <h1 className="hero-title">{liveArticle.headline}</h1>
            <div className="updated">
              <img src={`${A}/a7698.svg`} alt="" />
              <span>{liveArticle.updatedLabel}</span>
            </div>
            <div className="hero-media">
              <img
                className="hero-poster"
                src={`${A}/${liveArticle.heroImage}`}
                alt={liveArticle.heroAlt}
              />
              <div className="live-pill">
                <span className="live-dot" aria-hidden="true" />
                <span>Live</span>
              </div>
            </div>
          </section>

          <nav className="page-nav" aria-label="Page navigation">
            {navigation.map(([icon, label]) => (
              <button
                key={label}
                type="button"
                className={`${activeNav === label ? "active" : ""} ${
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

              <section className="card live-intro-card">
                <p>{liveArticle.description}</p>
                <a
                  href={liveArticle.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View the original live coverage on BBC News
                </a>
              </section>

              {liveArticle.updates.map((update, index) => (
                <LiveUpdateCard
                  key={update.id}
                  update={update}
                  isLast={index === liveArticle.updates.length - 1}
                />
              ))}
            </>
          ) : activeNav === "Videos" ? (
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
            onClose={() => setAutoplayPromptOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
