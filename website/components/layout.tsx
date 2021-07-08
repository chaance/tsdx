/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import slugify from "@sindresorhus/slugify";
import cn from "clsx";
import { SkipNavContent } from "@reach/skip-nav";
import { MDXProvider } from "@mdx-js/react";
import Highlight, { defaultProps } from "prism-react-renderer";
//@ts-ignore
import matchSorter from "match-sorter";
import { Logo } from "components/logo";

// import DocSearch from './docsearch'
import { stripHtml } from "string-strip-html";

const pages: PageFile[] = [
	{ name: "index", route: "/", title: "Introduction" },
	{ name: "optimization", route: "/optimization", title: "Optimization" },
	{ name: "customization", route: "/customization", title: "Customization" },
	{ name: "api-reference", route: "/api-reference", title: "API Reference" },
	{ name: "change-log", route: "/change-log", title: "Change Log" },
];

interface PageFile {
	name: string;
	title: string;
	route: string;
}

// const TreeState = new Map<string, any>();
const titleType = ["h1", "h2", "h3", "h4", "h5", "h6"];
const MenuContext = React.createContext<{
	setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}>({ setMenu() {} });

const config = {
	nextLinks: true,
	prevLinks: true,
	search: true,

	github: "https://github.com/chaance/tsdx",
	titleSuffix: " – TSDX",
	logo: (
		<>
			<Logo height={36} />
			<span className=" font-extrabold hidden md:inline sr-only">TSDX</span>
		</>
	),
	head: function Head(_: any) {
		return (
			<>
				{/* Favicons, meta */}
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicon/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon/favicon-16x16.png"
				/>
				<link rel="manifest" href="/favicon/site.webmanifest" />

				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="theme-color" content="#ffffff" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta httpEquiv="Content-Language" content="en" />
				<meta
					name="description"
					content="Build production ready TypeScript packages. The world's leading companies use TSDX to build and test TypeScript packages"
				/>
				<meta
					name="og:description"
					content="Build production ready TypeScript packages. The world's leading companies use TSDX to build and test TypeScript packages"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@chancethedev" />
				<meta name="twitter:image" content="https://tsdx.io/og_image.jpg" />
				<meta
					name="og:title"
					content="TSDX: Modern TypeScript Package Development"
				/>
				<meta name="og:url" content="https://tsdx.io" />
				<meta name="og:image" content="https://tsdx.io/og_image.jpg" />
				<meta name="apple-mobile-web-app-title" content="TSDX" />
				{/* <link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
					media="print"
					onload="this.media='all'"
				/> */}
			</>
		);
	},
	footer: function Footer({ filepath }: { filepath: string }) {
		return (
			<>
				<div className="mt-24 flex justify-between flex-col-reverse md:flex-row items-center md:items-end">
					{/* <a
							href="https://chance.dev/?utm_source=tsdx"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center no-underline text-current font-semibold"
						>
							<span className="mr-1">A Chance the Dev Project</span>
						</a> */}
					<div className="mt-6" />
					<a
						className="text-sm"
						href={
							"https://github.com/chaance/tsdx/tree/main/website/pages" +
							filepath
						}
						target="_blank"
						rel="noopener noreferrer"
					>
						Edit this page on GitHub
					</a>
				</div>
			</>
		);
	},
};

const THEME = {
	plain: {
		color: "#000",
		backgroundColor: "transparent",
	},
	styles: [
		{
			types: ["keyword"],
			style: {
				color: "#ff0078",
				fontWeight: "bold",
			},
		},
		{
			types: ["comment"],
			style: {
				color: "#999",
				fontStyle: "italic",
			},
		},
		{
			types: ["string", "url", "attr-value"],
			style: {
				color: "#028265",
			},
		},
		{
			types: ["builtin", "char", "constant", "language-javascript"],
			style: {
				color: "#000",
			},
		},
		{
			types: ["attr-name"],
			style: {
				color: "#d9931e",
				fontStyle: "normal",
			},
		},
		{
			types: ["punctuation", "operator"],
			style: {
				color: "#333",
			},
		},
		{
			types: ["number", "function", "tag"],
			style: {
				color: "#0076ff",
			},
		},
		{
			types: ["boolean", "regex"],
			style: {
				color: "#d9931e",
			},
		},
	],
};

// Search

const SearchItem = ({ title, active, href, onMouseOver, search }: any) => {
	const highlight = title.toLowerCase().indexOf(search.toLowerCase());

	return (
		<Link href={href}>
			<a className="block no-underline" onMouseOver={onMouseOver}>
				<li
					className={cn("py-2 px-3  text-gray-800", {
						"bg-gray-100": active,
					})}
				>
					{title.substring(0, highlight)}
					<span className="bg-teal-300">
						{title.substring(highlight, highlight + search.length)}
					</span>
					{title.substring(highlight + search.length)}
				</li>
			</a>
		</Link>
	);
};

function Search() {
	const router = useRouter();
	const [show, setShow] = React.useState(false);
	const [search, setSearch] = React.useState("");
	const [active, setActive] = React.useState(0);
	const input = React.useRef<HTMLInputElement | null>(null);

	const results = React.useMemo(() => {
		if (!search) return [];

		// Will need to scrape all the headers from each page and search through
		// them here (similar to what we already do to render the hash links in
		// sidebar) We could also try to search the entire string text from each
		// page.
		return matchSorter(pages, search, { keys: ["title"] });
	}, [search]);

	const handleKeyDown = React.useCallback(
		(e) => {
			switch (e.key) {
				case "ArrowDown": {
					e.preventDefault();
					if (active + 1 < results.length) {
						setActive(active + 1);
					}
					break;
				}
				case "ArrowUp": {
					e.preventDefault();
					if (active - 1 >= 0) {
						setActive(active - 1);
					}
					break;
				}
				case "Enter": {
					router.push(results[active].route);
					break;
				}
			}
		},
		[active, results, router]
	);

	React.useEffect(() => {
		setActive(0);
	}, [search]);

	React.useEffect(() => {
		const inputs = ["input", "select", "button", "textarea"];

		const down = (e: any) => {
			if (
				document.activeElement &&
				// @ts-ignore
				inputs.indexOf(document.activeElement.tagName.toLowerCase() !== -1)
			) {
				if (e.key === "/") {
					e.preventDefault();
					input.current?.focus();
				} else if (e.key === "Escape") {
					setShow(false);
				}
			}
		};

		window.addEventListener("keydown", down);
		return () => window.removeEventListener("keydown", down);
	}, []);

	const renderList = show && results.length > 0;

	return (
		<div className="relative w-full md:w-64 mr-2">
			{renderList && (
				<div className="search-overlay z-1" onClick={() => setShow(false)} />
			)}
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<svg
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					viewBox="0 0 24 24"
					stroke="currentColor"
					className="h-4 w-4 text-gray-400"
				>
					<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
				</svg>
			</div>
			<input
				onChange={(e) => {
					setSearch(e.target.value);
					setShow(true);
				}}
				className="appearance-none pl-8 border rounded-md py-2 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring w-full"
				type="search"
				placeholder='Search ("/" to focus)'
				onKeyDown={handleKeyDown}
				onFocus={() => setShow(true)}
				ref={input}
				aria-label="Search documentation"
			/>
			{renderList && (
				<ul className="shadow-md list-none p-0 m-0 absolute left-0 md:right-0 bg-white rounded-md mt-1 border top-100 divide-y divide-gray-300 z-2">
					{results.map((res: any, i: number) => {
						return (
							<SearchItem
								key={`search-item-${i}`}
								title={res.title}
								href={res.route}
								active={i === active}
								search={search}
								onMouseOver={() => setActive(i)}
							/>
						);
					})}
				</ul>
			)}
		</div>
	);
}

// Icons

function GithubIcon({ height = 40 }: React.ComponentPropsWithoutRef<"svg">) {
	return (
		<svg height={height} viewBox="0 0 24 24" fill="none">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"
				fill="currentColor"
			/>
		</svg>
	);
}

function ArrowRight({
	width = 24,
	height = 24,
	...props
}: React.ComponentPropsWithoutRef<"svg">) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			{...props}
		>
			<path
				d="M3 12h18m0 0l-6.146-6M21 12l-6.146 6"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

// MDX components

const A = ({ children, ...props }: React.ComponentPropsWithoutRef<"a">) => {
	const isExternal = props.href?.startsWith("https://");
	if (isExternal) {
		return (
			<a target="_blank" rel="noopener" {...props}>
				{children}
			</a>
		);
	}
	return (
		<Link href={props.href as any}>
			<a {...props}>{children}</a>
		</Link>
	);
};

const Code = ({
	children,
	className,
	highlight,
	...props
}: { highlight?: string } & React.ComponentPropsWithoutRef<"code">) => {
	if (!className) return <code {...props}>{children}</code>;

	const highlightedLines = highlight ? highlight.split(",").map(Number) : [];

	// https://mdxjs.com/guides/syntax-highlighting#all-together
	const language: any = className.replace(/language-/, "");
	return (
		<Highlight
			{...defaultProps}
			code={(children as string).trim()}
			language={language}
			theme={THEME as any}
		>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<code className={className} style={{ ...style }}>
					{tokens.map((line, i) => (
						<div
							key={i}
							{...getLineProps({ line, key: i })}
							style={
								highlightedLines.includes(i + 1)
									? {
											background: "#cce0f5",
											margin: "0 -1rem",
											padding: "0 1rem",
									  }
									: undefined
							}
						>
							{line.map((token, key) => (
								<span key={key} {...getTokenProps({ token, key })} />
							))}
						</div>
					))}
				</code>
			)}
		</Highlight>
	);
};

const components = {
	// h2: H2,
	// h3: H3,
	// h4: H4,
	// h5: H5,
	// h6: H6,
	a: A,
	code: Code,
};

const Theme: React.FC = ({ children }) => {
	return <MDXProvider components={components}>{children}</MDXProvider>;
};

function File({
	item,
	anchors,
}: {
	item: PageFile;
	anchors: React.ReactElement[];
}) {
	const { setMenu } = React.useContext(MenuContext);
	const route = useRouter().route + "/";
	const active = route.startsWith(item.route + "/");

	let title = item.title;
	// if (item.title.startsWith('> ')) {
	// title = title.substr(2)
	if (anchors?.length) {
		if (active) {
			return (
				<li className={active ? "active" : ""}>
					<Link href={item.route}>
						<a>{title}</a>
					</Link>
					<ul>
						{anchors.map((anchor) => {
							let anchorString =
								typeof anchor === "string"
									? anchor
									: typeof anchor === "object" &&
									  "props" in anchor &&
									  anchor.props.children
									? anchor.props.children
									: "";

							const slug = slugify(stripHtml(anchorString || "").result);
							return (
								<li key={`a-${slug}`}>
									<a
										href={"#" + slug}
										onClick={() => setMenu(false)}
										className="focus:ring"
									>
										<span className="flex">
											<span className="mr-2 opacity-25">#</span>
											<span className="inline-block">{anchor}</span>
										</span>
									</a>
								</li>
							);
						})}
					</ul>
				</li>
			);
		}
	}

	return (
		<li className={active ? "active" : ""}>
			<Link href={item.route}>
				<a onClick={() => setMenu(false)} className="focus:ring">
					{title}
				</a>
			</Link>
		</li>
	);
}

function Menu({
	anchors,
}: {
	pages: PageFile[];
	anchors: React.ReactElement[];
}) {
	return (
		<ul>
			{pages.map((item) => {
				return <File key={item.name} item={item} anchors={anchors} />;
			})}
		</ul>
	);
}

function Sidebar({
	show,
	anchors,
}: {
	show: any;
	anchors: React.ReactElement[];
}) {
	return (
		<aside
			className={`h-screen bg-white flex-shrink-0 w-full md:w-64 md:border-r md:block fixed md:sticky z-10 ${
				show ? "" : "hidden"
			}`}
			style={{
				top: "4rem",
				height: "calc(100vh - 4rem)",
			}}
		>
			<div className="sidebar w-full p-4 pb-40 md:pb-16 h-full overflow-y-auto">
				<Menu pages={pages} anchors={anchors} />
			</div>
		</aside>
	);
}

const NextLink = ({ currentIndex }: { currentIndex: number }) => {
	let next = pages[currentIndex + 1];

	if (!config.nextLinks || !next) {
		return null;
	}

	return (
		<Link href={next.route}>
			<a className="text-lg font-medium p-4 -m-4 no-underline text-gray-600 hover:text-blue-600 flex items-center ml-2">
				{next.title}
				<ArrowRight className="inline ml-1 flex-shrink-0" />
			</a>
		</Link>
	);
};

const PrevLink = ({ currentIndex }: { currentIndex: number }) => {
	let prev = pages[currentIndex - 1];

	if (!config.prevLinks || !prev) {
		return null;
	}

	return (
		<Link href={prev.route}>
			<a className="text-lg font-medium p-4 -m-4 no-underline text-gray-600 hover:text-blue-600 flex items-center mr-2">
				<ArrowRight className="transform rotate-180 inline mr-1 flex-shrink-0" />
				{prev.title}
			</a>
		</Link>
	);
};

const Layout: React.FC<{
	filename: string;
	full?: boolean;
	title?: any;
}> = ({ filename, full, title: _, children }) => {
	const [menu, setMenu] = React.useState(false);
	const router = useRouter();
	const { route, pathname } = router;

	const filepath = route.slice(0, route.lastIndexOf("/") + 1);

	const { titles, anchors } = React.useMemo(() => {
		let titles: Array<React.ReactElement> = [];
		let anchors = [];

		for (let child of React.Children.toArray(children)) {
			if (
				typeof child !== "object" ||
				!("props" in child) ||
				!titleType.includes(child.props.mdxType)
			) {
				continue;
			}

			titles.push(child);
			if (child.props.mdxType === "h2") {
				anchors.push(child.props.children);
			}
		}

		return {
			titles,
			anchors,
		};
	}, [children]);

	React.useEffect(() => {
		if (menu) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [menu]);

	const currentIndex = React.useMemo(
		() => pages.findIndex((dir) => dir.route === pathname),
		[pathname]
	);

	const title =
		pages[currentIndex]?.title ||
		titles.find((child) => child.props?.mdxType === "h1")?.props.children ||
		"Untitled";

	const props = {
		filepath: filepath + filename,
		route,
	};

	return (
		<>
			<Head>
				<title>
					{title}
					{config.titleSuffix || ""}
				</title>
				{config.head ? config.head(props) : null}
			</Head>
			<div className="main-container flex flex-col">
				<nav className="flex items-center bg-white z-20 fixed top-0 left-0 right-0 h-16 border-b px-6 ">
					<div className="mr-6 md:mr-0 md:w-full flex items-center">
						<Link href="/">
							<a className="no-underline text-current inline-flex items-center p-2 -m-2 hover:opacity-75">
								{config.logo}
							</a>
						</Link>
					</div>

					{config.search && <Search />}

					{config.github ? (
						<a
							className="text-current p-2 -mr-2"
							href={config.github}
							target="_blank"
							rel="noreferrer noopener"
							aria-label="GitHub Repository"
						>
							<GithubIcon height={28} />
						</a>
					) : null}
					<button
						className="block md:hidden p-2 -mr-2 ml-2"
						onClick={() => setMenu(!menu)}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="3" y1="12" x2="21" y2="12"></line>
							<line x1="3" y1="6" x2="21" y2="6"></line>
							<line x1="3" y1="18" x2="21" y2="18"></line>
						</svg>
					</button>
				</nav>
				<div className="flex flex-1 h-full">
					<MenuContext.Provider value={{ setMenu }}>
						<Sidebar show={menu} anchors={anchors} />
					</MenuContext.Provider>

					{full ? (
						<div className="relative pt-16 w-full overflow-x-hidden">
							{children}
						</div>
					) : (
						<>
							<SkipNavContent />
							<div className="relative pt-20 pb-16 px-6 md:px-8 w-full max-w-full overflow-x-hidden">
								<main className="max-w-screen-md">
									<Theme>{children}</Theme>
									<footer className="mt-24">
										<nav className="flex flex-row items-center justify-between">
											<div>
												<PrevLink currentIndex={currentIndex} />
											</div>

											<div>
												<NextLink currentIndex={currentIndex} />
											</div>
										</nav>

										<hr />

										{config.footer ? config.footer(props) : null}
									</footer>
								</main>{" "}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Layout;
