import { useState } from "react"
import { supabase } from "../client"
import "./Post.css"

export default function Post() {
	const [post, setPost] = useState({
		title: "",
		content: "",
		imageURL: "",
		date: "",
	})

	const handleSubmit = async e => {
		e.preventDefault()
		await supabase
			.from("posts")
			.insert({
				title: post.title,
				content: post.content,
				imageURL: post.imageURL,
				date: new Date().toISOString(),
			})
			.select()
		setPost({ title: "", content: "", imageURL: "", date: "" })
	}

	const handleChange = e => {
		setPost({ ...post, [e.target.name]: e.target.value })
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
							onChange={handleChange}
							placeholder="Title"
						/>
					</label>
					<label className="content-field">
						<textarea
							name="content"
							value={post.content}
							onChange={handleChange}
							placeholder="Text (optional)"
						/>
					</label>
				</div>
				{/* <label>
					Image URL:
					<input
						type="text"
						name="imageURL"
						value={post.imageURL}
						onChange={handleChange}
					/>
				</label> */}
				<input className="submit-button" type="submit" value="Submit" />
			</form>
		</div>
	)
}
