# Readit-Hub

## Project Overview

Readit-Hub is a mini Reddit clone that allows users to browse top subreddits, posts, and comments in a read-only format. This project was built to practice working with APIs and Redux state management. No user interaction is required for the app, making it ideal for quick browsing.

## Features

- Displays top subreddits, posts, and comments.
- Completely read-only (no authentication required).
- Responsive design using Bootstrap for basic styling.
- State management using Redux for efficient handling of data.
- Integration with the Reddit API through `snoowrap`.

## Tech Stack

- **Frontend**: React, Redux
- **Styling**: Bootstrap
- **API Integration**: Reddit API (via Snoowrap)
- **Build Tools**: Webpack, Babel

## Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ellenevdm/readit-hub.git
   ```
2. Navigate to the project directory
   ```bash
   cd readit-hub
   ```
3. Install the dependencies
   ```bash
   npm install
   ```
4. Start the development server
   ```bash
   npm start
   ```
5. Open http://localhost:3000 in your browser to view the app

## File Structure

```
└── 📁src
    └── 📁Api
        └── redditApi.js
    └── 📁App
        └── App.js
    └── 📁Components
        └── Header.js
    └── 📁Features
        └── 📁posts
            └── 📁DetailedPost
                └── CommentList.js
                └── DetailedPost.jsx
            └── DetailedPostView.js
            └── PostItem.js
            └── PostsList.js
        └── 📁subreddits
            └── reddit.svg
            └── Subreddit.js
            └── SubredditsList.js
    └── 📁Pages
        └── HomePage.js
    └── 📁Store
        └── redditSlice.js
        └── store.js
        └── subredditsSlice.js
    └── 📁Utilities
        └── formatNumber.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── reportWebVitals.js
    └── setupTests.js
```

### Available Scripts

- `npm start`: Starts development server
- `npm run build`: Builds the app for production
- `npm test`: Runs unit test(if any)

### Dependencies:

- **React:** JavaScript library for building user interfaces
- **Redux:** State management library for React.
- **Snoowrap:** Reddit API wrapper for JavaScript.
- **Bootstrap:** Front-end component library for responsive design.
