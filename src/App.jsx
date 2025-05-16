import React, { useEffect, useState } from 'react'
import PostCard from './components/PostCard'
import './App.css'

const API_URL = 'http://localhost/projects/headless/wp-json/custom/v1'

function App() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)   // new

  const fetchPosts = async () => {
    setIsLoading(true)                                 // start loader
    try {
      const response = await fetch(`${API_URL}/popular`)
      if (!response.ok) {
        throw new Error('API not available')
      }
      const data = await response.json()
      setPosts(data)
      setError('')
    } catch (err) {
      console.error(err)
      setError('Please activate Popular Posts API plugin.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpvote = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/upvote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId }),
        credentials: 'include',
      })
      if (response.ok) {
        //fetchPosts()
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to upvote')
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong while upvoting.')
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="container">
      <h1 className="heading">Popular Posts</h1>

      {error && <p className="error">{error}</p>}

      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onUpvote={handleUpvote} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App