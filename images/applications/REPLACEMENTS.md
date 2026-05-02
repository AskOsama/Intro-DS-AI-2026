# Image replacement plan — `images/applications/`

## Why this file exists

The 7 photos currently in this folder were taken from external commercial websites (PCWorld, YMCA, FaceOnLive, BernardMarr, AFB, infotex.uk, destinationksa) — see the original `sources.txt`. None of those sources grant a usage licence compatible with the course's CC BY 4.0 distribution. They are **not currently embedded in any module page** (the new 5-day course uses only the in-house SVGs in `images/diagrams/`), but if you want to enrich Module 1's "AI in your daily life" section with photos, replace them first using the table below.

## Recommended royalty-free replacements

All sources below are **CC0 / no-attribution-required** unless noted. Browse, pick the photo whose composition fits best, download, save with the exact filename in the left column, and keep the URL of the specific photo you used.

| Filename | Topic | Best source (CC0) | Browse URL |
|---|---|---|---|
| `gps_navigation.jpg` | Phone showing maps / GPS navigation | Unsplash | https://unsplash.com/s/photos/gps-navigation |
| `amazon_echo.jpg` | Smart speaker / Echo / Alexa | Unsplash · Pexels | https://unsplash.com/s/photos/echo-dot · https://www.pexels.com/search/amazon%20alexa/ |
| `chatgpt_interface.jpg` | A chatbot interface (avoid trademarked logos) | Unsplash | https://unsplash.com/s/photos/ai-chatbot |
| `face_recognition.jpg` | Face-recognition / biometric concept | Unsplash | https://unsplash.com/s/photos/face-recognition |
| `self_driving_car.jpg` | Self-driving / autonomous car | Unsplash · Pexels | https://unsplash.com/s/photos/self-driving-car · https://www.pexels.com/search/self%20driving%20car/ |
| `netflix_recommendations.jpg` | Streaming / recommendation interface (avoid the Netflix logo — show a generic "watch on a sofa" or a generic streaming UI) | Unsplash | https://unsplash.com/s/photos/streaming-tv |
| `ai_art_generation.jpg` | AI-generated art / image generation concept | Unsplash | https://unsplash.com/s/photos/generative-art |

## Why Unsplash and Pexels

- Both grant a CC0-style licence: free for commercial use, no attribution required (attribution is appreciated but not legally needed).
- Photos are screened for usability and look more current than a typical stock library.
- Avoid Getty / Shutterstock / iStock / Adobe Stock for this course — they are paid and incompatible with CC BY 4.0 redistribution.

## When you replace one

1. Download the photo at a reasonable resolution (1600 px wide is enough for a course module).
2. Save it over the file in this folder using the same filename so any future references resolve.
3. Update `sources.txt` (or this file) with the specific photo URL and the photographer's name (good practice even when not legally required).
4. Re-export to JPG at quality ~80% so file size stays under ~250 KB for a smooth page load.

## Embedding into Module 1 (optional)

If you want to add photo cards to Module 1's "AI in your daily life" section, the cleanest pattern is:

```html
<figure class="diagram">
    <img src="../images/applications/gps_navigation.jpg" alt="A phone running a GPS navigation app." loading="lazy">
    <figcaption>The GPS app on your phone is an AI search algorithm.</figcaption>
</figure>
```

Tell me to wire these in once the photos are replaced and I'll add the figure tags to Module 1 (EN + AR).

## Avoid until replaced

The current files in this folder should **not** be redistributed, embedded into any new public page, or linked publicly. They are kept only so the file paths remain valid until replaced.
