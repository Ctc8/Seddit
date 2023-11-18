import { useState, useEffect } from "react"
import { supabase } from "../client"
import { Link } from "react-router-dom"
import { useParams, useNavigate } from "react-router-dom"
import "./PostDetail.css"

export default function PostDetail() {
	const { id } = useParams()
	const [post, setPost] = useState(null)
	const [comments, setComments] = useState([])
	const [comment, setComment] = useState("")
	const navigate = useNavigate()

	useEffect(() => {
		fetchPost()
	}, [id])

	const fetchPost = async () => {
		// Fetching post data
		const { data, error } = await supabase
			.from("posts")
			.select("*")
			.filter("id", "eq", id)
			.single()

		if (error) {
			console.log(error)
		} else {
			setPost(data)
		}

		// Fetching comments
		const { data: commentsData, error: commentsError } = await supabase
			.from("comments")
			.select("*")
			.filter("post_id", "eq", id)
		if (commentsError) {
			console.log(commentsError)
		} else {
			setComments(commentsData)
		}
	}

	const deletePost = async () => {
		const { error } = await supabase.from("posts").delete().eq("id", id)
		if (error) {
			console.log(error)
		} else {
			navigate("/")
		}
	}

	if (!post) {
		return null
	}

	const handleCommentSubmit = async e => {
		e.preventDefault()
		const { error } = await supabase.from("comments").insert({
			post_id: post.id,
			comment: comment,
			date: new Date().toISOString(),
		})
		if (error) {
			console.error(error)
		} else {
			setComment("")
			fetchPost()
		}
	}

	const handleUpvote = async () => {
		const { error } = await supabase
			.from("posts")
			.update({ upvotes: post.upvotes + 1 })
			.eq("id", post.id)
		if (error) {
			console.error(error)
		} else {
			setPost({ ...post, upvotes: post.upvotes + 1 })
		}
	}

	return (
		<div className="post-detail">
			<p className="post-time">Time of post: {new Date(post.date).toLocaleDateString()}</p>
			<h2 className="post-title">{post.title}</h2>
			<p>{post.content}</p>
			{/* <img src={post.imageURL} alt={post.title} /> */}


			<div className="upvote-container">
				<button className="upvote-button" onClick={handleUpvote}>
					Upvote
				</button>
				<span className="upvotes">{post.upvotes} upvotes</span>
			</div>

			<div className="post-actions">
				<button className="delete-button" onClick={deletePost}>
					Delete Post
				</button>
				<Link to={`/edit/${post.id}`}>
					<button className="edit-button">Edit Post</button>
				</Link>
			</div>

			<form onSubmit={handleCommentSubmit}>
				<input
					type="text"
					value={comment}
					onChange={e => setComment(e.target.value)}
					placeholder="Write a comment..."
				/>
				<button type="submit">Submit</button>

			<div className="comments-card">
			{comments &&
					comments.map((comment, index) => (
						<div key={index}>
							<p>- {comment.comment}</p>
							<p>Posted on: {new Date(comment.date).toLocaleDateString()}</p>
						</div>
					))}
			</div>

			</form>
		</div>
	)
}
