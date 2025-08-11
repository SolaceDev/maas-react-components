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

// CustomStories.tsx
import React, { useContext } from "react";
import { DocsContext, Canvas, Markdown } from "@storybook/blocks";

export const CustomStories = () => {
	const context = useContext(DocsContext);
	const stories = context.componentStories();

	// Retrieve the component reference from the first story

	return (
		<div>
			{stories.map((story) => {
				const { id, name, parameters } = story;
				const beforeDescription = parameters.docs?.story?.before;
				const afterDescription = parameters.docs?.story?.after;

				return (
					<div key={id} style={{ marginBottom: "40px" }}>
						<h3>{name}</h3>
						{beforeDescription && <Markdown>{beforeDescription}</Markdown>}
						<Canvas key={story.id} of={story.moduleExport} />
						{afterDescription && <Markdown>{afterDescription}</Markdown>}
					</div>
				);
			})}
		</div>
	);
};
