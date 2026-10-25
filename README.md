# BBC News mobile-first prototype

A responsive, single-column React and Vite prototype. The layout fills mobile
screens and grows to a maximum width of 700px on desktop.

## Run locally

```bash
pnpm install
pnpm run dev
```

Create a production build with:

```bash
pnpm run build
```

## Publish with GitHub Pages

1. Create a new empty repository in your GitHub account.
2. Add this project to the repository and push it to the `main` branch.
3. In the GitHub repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** as the source.
5. Open the **Actions** tab and wait for the “Deploy to GitHub Pages” workflow
   to finish.

The published address will be:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/
```

The workflow automatically configures Vite for the repository name, so no URL
setting needs to be edited before publishing.

## Replace the videos

Put replacement video files in `public/assets/`. The easiest approach is to
keep the filenames below unchanged, so no code edits are required.

| Filename | Used for |
| --- | --- |
| `lead-video.mp4` | Preferred MP4 for the lead hero and full-screen live view |
| `lead-video.mov` | Current fallback lead recording |
| `autoplay-overlay.mp4` | Video inside the enabled autoplay prompt |
| `article-lead-video.mp4` | First in-article video on Latest |
| `article-third-video.mp4` | Second in-article video on Latest |
| `story-video.mp4` | Story overlays and Videos carousel |

For reliable browser playback, export smaller replacements as:

- MP4 with H.264 video
- AAC audio when audio is needed
- 720p or 1080p
- Web optimized / fast start enabled

To replace the current `.mov` lead recording with a smaller MP4, add the new
file at `public/assets/lead-video.mp4`. The site already prefers that MP4 and
falls back to `lead-video.mov` when it is unavailable.
