import { useState, useEffect } from "react"
import { supabase } from "../client"
import { Link } from "react-router-dom"
import "./Home.css"

export default function Home({ searchTerm }) {
	const [posts, setPosts] = useState([])
	const [sort, setSort] = useState(false)
	const [sortPopular, setSortPopular] = useState(false)

	useEffect(() => {
		fetchPosts()
	}, [sort, sortPopular])

	const fetchPosts = async () => {
		const { data, error } = await supabase.from("posts").select("*")
		if (error) {
			console.error(error)
		} else {
			if (sort) {
				data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			} else if (sortPopular) {
				data.sort((a, b) => b.upvotes - a.upvotes)
			}
			setPosts(data)
		}
	}

	const handleSort = () => {
		setSortPopular(true)
		setSort(false)
	}

	const handleNewest = () => {
		setSortPopular(false)
		setSort(true)
	}

	return (
		<div>
			<div className="sort-buttons">
				<p className="order-by">Order by:</p>
				<button onClick={handleSort}>Most Popular</button>
				<button onClick={handleNewest}>Newest</button>
			</div>
			{posts
				.filter(post =>
					post.title.toLowerCase().includes(searchTerm.toLowerCase())
				)
				.map((post, index) => (
					<Link to={`/post/${post.id}`} key={index} style={{ textDecoration: 'none' }}>
					<div className="posts-card">
						<p className="time">Time of post: {new Date(post.date).toLocaleString()}</p>
						<h2 className="post-title">{post.title}</h2>
						{/* <p className="post-content">{post.content}</p> */}
						{/* <img src={post.imageURL} alt={post.imageURL} /> */}
						<p className="upvotes">{post.upvotes} upvotes</p>
					</div>
				</Link>
				))}
		</div>
	)
}
