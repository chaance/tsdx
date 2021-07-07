import * as React from "react";

function ForkNotice() {
	return (
		<section
			className="p-4 bg-blue-200 rounded-lg mb-4 mt-4"
			aria-label="Fork Notice"
		>
			<p className="mt-0">
				<strong>Note:</strong> This documentation covers the TSDX fork
				maintained by{" "}
				<a href="https://github.com/chaance/tsdx">Chance Strickland</a>. It is
				based on the original package by{" "}
				<a href="https://github.com/formium/tsdx">Jared Palmer</a>.
			</p>
			<p>
				The documentation for the original project can be found{" "}
				<a
					href="https://tsdx.io/"
					aria-label="Documentation for the original project by Jared Palmer"
				>
					here
				</a>
				. As this project evolves I may decide to change the name and update the
				website to avoid confusion.
			</p>
		</section>
	);
}

export { ForkNotice };
export default ForkNotice;
