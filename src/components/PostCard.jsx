import React, { useState, useEffect } from 'react'

const PostCard = ({ post, onUpvote }) => {
  const storageKey = `upvoted_${post.id}`
  const [alreadyUpvoted, setAlreadyUpvoted] = useState(post.already_upvoted)

  useEffect(() => {
    const hasUpvoted = localStorage.getItem(storageKey) === '1'
    setAlreadyUpvoted(hasUpvoted)
  }, [storageKey])

  const handleClick = () => {
    if (!alreadyUpvoted) {
      onUpvote(post.id)
      localStorage.setItem(storageKey, '1')
      setAlreadyUpvoted(true)
    }
  }

  return (
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-excerpt">{post.excerpt}</p>
      <div className="post-footer">
        <div className="upvote-section">
          <button
            className={`upvote-btn ${alreadyUpvoted ? 'liked' : ''}`}
            onClick={handleClick}
            disabled={alreadyUpvoted}
            aria-label={alreadyUpvoted ? 'You already liked this post' : 'Like this post'}
          >
            {alreadyUpvoted ? '❤️ Liked' : '🤍 Like'}
          </button>
          <span className="upvote-count">{post.upvotes || 0}</span>
        </div>

        <a
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="view-post-btn"
        >
          View Post
        </a>
      </div>
    </div>
  )
}

export default PostCard