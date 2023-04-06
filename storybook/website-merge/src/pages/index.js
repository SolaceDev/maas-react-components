import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.css";

function HomepageHeader() {
	return (
		<>
			<header className={clsx("hero hero--primary", styles.heroBanner)}>
				<div className="container">
					<h1 className="hero__title">{"StoryBook"}</h1>
					<p className="hero__subtitle">{"MRC storybook"}</p>
					<div className={styles.buttons}>
						<Link className="button button--secondary button--lg" to="pathname:///storybook-static">
							Go to StoryBook
						</Link>
					</div>
				</div>
			</header>
			<div style={{ borderTop: "8px solid #bbb", borderRadius: "5px" }}></div>
			<header className={clsx("hero hero--primary", styles.heroBanner)}>
				<div className="container">
					<h1 className="hero__title">{"Coverage"}</h1>
					<p className="hero__subtitle">{"MRC test coverage report"}</p>
					<div className={styles.buttons}>
						<Link className="button button--secondary button--lg" to="pathname:///lcov-report">
							Go to Coverage
						</Link>
					</div>
				</div>
			</header>
		</>
	);
}

export default function Home() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout title={`${siteConfig.title}`} description="Maas React Component">
			<HomepageHeader />
			<main></main>
		</Layout>
	);
}
