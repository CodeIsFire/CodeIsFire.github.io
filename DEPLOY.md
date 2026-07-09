# Deploying to GitHub Pages

1. Create a new GitHub repo named `<your-username>.github.io` (for a root domain site),
   or any name you like (for a project site at `<username>.github.io/repo-name`).
2. Push these files to the repo root:
   ```
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Source → Deploy from branch → main / (root)**.
4. Your site will be live at `https://<your-username>.github.io/` (or `/<repo-name>/`) within a minute or two.

## Before you push, fill in the placeholders

Search `index.html` for `href="#"` — these are stand-ins for:
- LinkedIn URL
- GitHub URL
- LeetCode URL
- Project GitHub links (Tatastha, Catto)

Just replace each `#` with the actual URL.
