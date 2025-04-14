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
