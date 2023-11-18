import { useState, useEffect } from "react"
import { supabase } from "../client"
import { useParams, useNavigate } from "react-router-dom"

export default function PostEdit() {
	const [post, setPost] = useState({ title: "", content: "" })
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		fetchPost()
	}, [id])

	const fetchPost = async () => {
		const { data, error } = await supabase
			.from("posts")
			.select("*")
			.eq("id", id)

		if (error) {
      console.error(error)
    }

		else {
			setPost(data[0])
		}
	}

	const handleInputChange = e => {
		setPost({ ...post, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const { error } = await supabase
    .from("posts")
    .update(post)
    .eq("id", id)

		if (error) {
			console.error(error)
		} 

    else {
			setPost({ title: "", content: "" })
			navigate(`/post/${id}`)
		}
	}

	if (!post) {
    return null
  }
  
	return (
		<div className="post-card">
			<form onSubmit={handleSubmit}>
				<div className="form-fields">
					<label className="title-field">
						<input
							type="text"
							name="title"
							value={post.title}
							onChange={handleInputChange}
							placeholder="Title"
						/>
					</label>
					<label className="content-field">
						<textarea
							name="content"
							value={post.content}
							onChange={handleInputChange}
							placeholder="Text (optional)"
						/>
					</label>
				</div>
				<input className="submit-button" type="submit" value="Update Post" />
			</form>
		</div>
	)
}


