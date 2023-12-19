import React from "react";
import { Link } from "react-router-dom";

import { IoMdArchive } from "react-icons/io";

export default function Navigation() {
	return (
		<nav className="navigation">
			<Link to="/">
				<h1><span>MEDOW</span><span>|</span><span>Notes App</span></h1>
			</Link>
			<ul>
				<Link to="/archives">
					<li>
						<IoMdArchive className="archive-icon" /> Archives
					</li>
				</Link>
			</ul>
		</nav>
	);
}
