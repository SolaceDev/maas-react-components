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
/* eslint-disable sonarjs/no-duplicate-string */
import React, { ReactNode } from "react";
import { Meta } from "@storybook/react";
import { SolaceButton, SolaceLearningBanner } from "@SolaceDev/maas-react-components";

(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";
(SolaceLearningBanner as React.FC & { displayName?: string }).displayName = "SolaceLearningBanner";

export default {
	title: "Messaging/Banner/Learning",
	component: SolaceLearningBanner,
	parameters: {},
	args: {
		title: "",
		children: undefined,
		showCloseButton: false,
		onClose: undefined,
		backgroundColor: "",
		dataQa: "",
		dataTags: ""
	},
	argTypes: {
		title: {
			control: { type: "text" },
			description: "The title of the banner (can be string or JSX element)",
			table: {
				type: { summary: "string | JSX.Element | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		children: {
			control: false,
			description: "The content of the banner (JSX element)",
			table: {
				type: { summary: "React.ReactNode" },
				defaultValue: { summary: "required" }
			}
		},
		onClose: {
			action: "banner closed",
			description: "Callback function after the banner is closed",
			table: {
				defaultValue: { summary: "undefined" }
			}
		},
		showCloseButton: {
			control: {
				type: "boolean"
			},
			description: "Whether to show the close button",
			table: {
				type: { summary: "boolean" },
				defaultValue: {
					summary: "false"
				}
			}
		},
		backgroundColor: {
			control: {
				type: "text"
			},
			description: "specify the background color",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: {
					summary: "undefined"
				}
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data QA attribute for testing",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data tags attribute for additional metadata",
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceLearningBanner>;

const DefaultBannerContent = (
	<div>
		<p>When do I use literals vs variables in my addresses?</p>
		<SolaceButton variant="link" href="#">
			Best Practices
		</SolaceButton>
	</div>
);

export const DefaultLearningBanner = {
	args: {
		children: DefaultBannerContent
	}
};

export const WithCloseButton = {
	args: {
		children: DefaultBannerContent,
		showCloseButton: true
	}
};

export const WithStringTitle = {
	args: {
		children: DefaultBannerContent,
		showCloseButton: true,
		title: "How to make a Topic Domain"
	}
};

const CustomTitle = (
	<div style={{ textDecoration: "underline", color: "#880808" }}>How to make a Topic Domain {"\u2728"} </div>
);

export const WithCustomTitle = {
	args: {
		children: DefaultBannerContent,
		showCloseButton: true,
		title: CustomTitle
	}
};

export const WithCustomBackgroundColor = {
	args: {
		children: DefaultBannerContent,
		showCloseButton: true,
		title: "How to make a Topic Domain",
		backgroundColor: "#E6F2FF"
	}
};

export const WithinContainer = (): ReactNode => {
	return (
		<div style={{ maxWidth: "40%", border: "1px solid rgba(0, 0, 0, 0.1)" }}>
			<SolaceLearningBanner showCloseButton={true} title="How to make a Topic Domain" dataQa="topicAddressCard">
				{DefaultBannerContent}
			</SolaceLearningBanner>
		</div>
	);
};
