import React, { useEffect, useState } from 'react'
import PostCard from './components/PostCard'
import './App.css'

const API_URL = 'http://localhost/demo/asst1/wp-json/custom/v1'

function App() {
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/popular`)
      const data = await response.json()
      setPosts(data)
    } catch (err) {

    }
  }

  const handleUpvote = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/upvote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId }),
        credentials: 'include', // important if cookies involved
      })
      if (response.ok) {
        fetchPosts()
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to upvote')
      }
    } catch (err) {
      
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="container">
      <h1 className="heading">Popular Posts</h1>
      <div className="post-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onUpvote={handleUpvote} />
        ))}
      </div>
    </div>
  )
}

export default App