import * as React from "react";

function PublishNotice() {
	return (
		<section
			className="p-4 border-l-4 border-red-500 bg-red-200 rounded-lg mb-4 mt-4"
			aria-label="Publish Notice"
		>
			<p className="mt-0">
				<strong>Note:</strong> This package is not yet published. To monitor development, <a className="text-red-800 focus-visible:ring-red-500" href="https://github.com/chaance/tsdx">star the repository on GitHub</a> and check back here regularly for updates.
			</p>
		</section>
	);
}

export { PublishNotice };
export default PublishNotice;
