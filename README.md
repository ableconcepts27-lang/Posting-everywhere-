# Post Everywhere

One page. Write a caption, pick platforms, hit Post.

## Setup

1. Sign up at ayrshare.com, connect your social accounts in its dashboard, and copy your API key.
2. Put this folder on GitHub and import it into Netlify (or run `netlify deploy --prod` with the Netlify CLI).
3. In Netlify, go to Site configuration > Environment variables and add:
   - `AYRSHARE_API_KEY` = your Ayrshare key
   - `APP_PASSWORD` = any password you choose (this stops strangers using your site)
4. Redeploy, open your site, enter the app password once, and post.

## Notes

- Instagram, TikTok, YouTube and Pinterest posts need a photo or video (YouTube needs a video). YouTube and Pinterest also need a title.
- Saved captions live in your browser only, so they won't follow you to another phone or computer.
- Media links must be public. "Upload from this device" works only if your Ayrshare plan includes media upload, and files must be under 4 MB.
- Reddit isn't included because it needs a subreddit for every post.
- To add or remove platforms, edit the `PLATFORMS` list near the bottom of `public/index.html`.
- If a platform name is rejected (for example `twitter`), check Ayrshare's post docs for the current name and change it in that same list.
