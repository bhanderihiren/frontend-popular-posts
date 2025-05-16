# Frontend-Popular-Posts

## API Endpoints Used

- `GET /wp-json/custom/v1/popular` – Fetch the 8 most popular posts
- `POST /wp-json/custom/v1/upvote` – Upvote a post securely

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/bhanderihiren/frontend-popular-posts.git
cd frontend-popular-posts
npm install
npm run dev
In frontend-popular-posts/src/App.js, replace the following line with your actual WordPress backend URL: const API_URL = 'http://localhost/projects/headless'
