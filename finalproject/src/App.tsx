import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import logo from "./imgs/logo.png"
import "./index.css"
import Post from "./Pages/Post"
import Home from "./Pages/Home"
import PostDetail from "./Pages/PostDetail"
import PostEdit from "./Pages/PostEdit"

export default function App() {
	const [searchTerm, setSearchTerm] = useState("")

	return (
		<div>
			<Router>
				<nav>
					<img
						src={logo}
						className="seddit-logo"
						alt="seddit.png"
					></img>
					<span className="logo-text">seddit</span>
					<input
						type="text"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						placeholder="Search"
						className="search-bar"
					></input>
					<Link to="/">Home</Link>
					<Link to="/new">Share a Post</Link>
				</nav>

				<Routes>
					<Route path="/" element={<Home searchTerm={searchTerm}/>} />
					<Route path="/new" element={<Post />} />
					<Route path="/post/:id" element={<PostDetail />} />
					<Route path="/edit/:id" element={<PostEdit />} />
				</Routes>
			</Router>
		</div>
	)
}
