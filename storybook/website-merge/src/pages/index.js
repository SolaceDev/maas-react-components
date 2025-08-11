/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.css";

function HomepageHeader() {
	const headerClasses = clsx("hero hero--primary", styles.heroBanner);
	return (
		<>
			<header className={headerClasses}>
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
			<header className={headerClasses}>
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
			<div style={{ borderTop: "8px solid #bbb", borderRadius: "5px" }}></div>
			<header className={headerClasses}>
				<div className="container">
					<h1 className="hero__title">{"Reports"}</h1>
					<p className="hero__subtitle">{"MRC usage reports"}</p>
					<div className={styles.buttons}>
						<a
							className="button button--secondary button--lg"
							href="https://SolaceDev.github.io/maas-react-components/merged-reports.zip"
							download
						>
							Download Merged Reports
						</a>
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
