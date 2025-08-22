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

import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
	SolaceNavigationBar,
	SolaceNavigationBarProps,
	SolaceNavigationLink,
	SolaceNavigationUserAction,
	createTheme,
	ThemeProvider,
	SolaceTheme,
	SupportedThemes
} from "@SolaceDev/maas-react-components";
import {
	Search24Icon,
	User24Icon,
	Help24Icon,
	Add24Icon,
	Function24Icon,
	Details24Icon,
	Summary24Icon,
	Calendar24Icon
} from "@SolaceDev/maas-icons";

// Set display name for debugging
(SolaceNavigationBar as React.FC & { displayName?: string }).displayName = "SolaceNavigationBar";

// Constants for brand theme values
const SOLACE_BRAND_THEME = "solace";
const THEME_LABEL_SUFFIX = " Theme";
const PROFILE_CLICKED_ACTION = "profile-clicked";
const H3_MARGIN = "0 0 1rem 0";
const H3_PADDING = "0 1rem";
const H3_STYLE = { margin: H3_MARGIN, padding: H3_PADDING };

// Logo Components for Different Examples
const BrandLogo = ({ theme = "default", size = "medium" }: { theme?: string; size?: "small" | "medium" | "large" }) => {
	const height = size === "small" ? "32px" : size === "large" ? "48px" : "40px";
	const fontSize = size === "small" ? "18px" : size === "large" ? "24px" : "20px";

	const logoStyles: Record<string, React.CSSProperties> = {
		default: {
			fontWeight: "bold",
			fontSize,
			height,
			display: "flex",
			alignItems: "center",
			color: "#1976d2",
			padding: "0 8px"
		},
		solace: {
			fontWeight: "bold",
			fontSize,
			height,
			display: "flex",
			alignItems: "center",
			color: "#00c895",
			padding: "0 8px",
			background: "linear-gradient(45deg, #00c895, #00a378)",
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent"
		},
		sap: {
			fontWeight: "bold",
			fontSize,
			height,
			display: "flex",
			alignItems: "center",
			color: "#0f7df2",
			padding: "0 8px"
		},
		boomi: {
			fontWeight: "bold",
			fontSize,
			height,
			display: "flex",
			alignItems: "center",
			color: "#7b68ee",
			padding: "0 8px"
		}
	};

	return <div style={logoStyles[theme] || logoStyles.default}>MaaS Platform</div>;
};

// Utility function to create consistent icon components
const createIconComponent = (IconComponent: React.ComponentType<{ width?: number; height?: number }>, size = 16) => (
	<IconComponent width={size} height={size} />
);

// Enhanced navigation links with icons and various states
const mockNavigationLinks: SolaceNavigationLink[] = [
	{
		id: "home",
		label: "Dashboard",
		href: "/dashboard",
		onClick: action("navigate-dashboard"),
		active: true,
		icon: createIconComponent(Add24Icon),
		ariaLabel: "Navigate to Dashboard - Current page"
	},
	{
		id: "services",
		label: "Services",
		href: "/services",
		onClick: action("navigate-services"),
		icon: createIconComponent(Function24Icon),
		ariaLabel: "Navigate to Services"
	},
	{
		id: "analytics",
		label: "Analytics",
		href: "/analytics",
		onClick: action("navigate-analytics"),
		icon: createIconComponent(Summary24Icon),
		ariaLabel: "Navigate to Analytics"
	},
	{
		id: "documentation",
		label: "Documentation",
		href: "/docs",
		onClick: action("navigate-docs"),
		icon: createIconComponent(Details24Icon),
		ariaLabel: "Navigate to Documentation"
	},
	{
		id: "support",
		label: "Support",
		href: "/support",
		onClick: action("navigate-support"),
		icon: createIconComponent(Calendar24Icon),
		ariaLabel: "Navigate to Support"
	}
];

// Navigation links with disabled states for demos
const mockNavigationLinksWithDisabled: SolaceNavigationLink[] = [
	...mockNavigationLinks.slice(0, 2),
	{
		id: "beta-feature",
		label: "Beta Feature",
		href: "/beta",
		onClick: action("navigate-beta"),
		disabled: true,
		icon: createIconComponent(Summary24Icon),
		ariaLabel: "Beta Feature - Coming Soon (Disabled)"
	},
	...mockNavigationLinks.slice(3)
];

// Minimal navigation links for simple examples
const minimalNavigationLinks: SolaceNavigationLink[] = [
	{
		id: "home",
		label: "Home",
		href: "/",
		active: true,
		onClick: action("home-clicked")
	},
	{
		id: "about",
		label: "About",
		href: "/about",
		onClick: action("about-clicked")
	},
	{
		id: "contact",
		label: "Contact",
		href: "/contact",
		onClick: action("contact-clicked")
	}
];

// Enhanced user actions with proper icons and states
const mockUserActions: SolaceNavigationUserAction[] = [
	{
		id: "search",
		content: createIconComponent(Search24Icon),
		onClick: action("search-clicked"),
		ariaLabel: "Open search",
		tooltip: "Search"
	},
	{
		id: "notifications",
		content: (
			<div style={{ position: "relative" }}>
				{createIconComponent(Calendar24Icon)}
				<span
					style={{
						position: "absolute",
						top: "-4px",
						right: "-4px",
						width: "8px",
						height: "8px",
						background: "#f44336",
						borderRadius: "50%"
					}}
					aria-hidden="true"
				/>
			</div>
		),
		onClick: action("notifications-clicked"),
		ariaLabel: "View notifications (3 unread)",
		tooltip: "Notifications"
	},
	{
		id: "settings",
		content: createIconComponent(Details24Icon),
		onClick: action("settings-clicked"),
		ariaLabel: "Open settings",
		tooltip: "Settings"
	},
	{
		id: "profile",
		content: createIconComponent(User24Icon),
		onClick: action(PROFILE_CLICKED_ACTION),
		ariaLabel: "View profile menu",
		tooltip: "User Profile"
	}
];

// Simplified user actions for minimal examples
const minimalUserActions: SolaceNavigationUserAction[] = [
	{
		id: "help",
		content: createIconComponent(Help24Icon),
		onClick: action("help-clicked"),
		ariaLabel: "Get help",
		tooltip: "Help"
	},
	{
		id: "profile",
		content: createIconComponent(User24Icon),
		onClick: action(PROFILE_CLICKED_ACTION),
		ariaLabel: "User menu",
		tooltip: "Account"
	}
];

// User actions with disabled state
const mockUserActionsWithDisabled: SolaceNavigationUserAction[] = [
	...mockUserActions.slice(0, 2),
	{
		id: "premium-feature",
		content: createIconComponent(Details24Icon),
		onClick: action("premium-clicked"),
		ariaLabel: "Premium feature (requires upgrade)",
		tooltip: "Premium Settings",
		disabled: true
	},
	mockUserActions[3]
];

// Storybook meta configuration with comprehensive documentation
const meta: Meta<typeof SolaceNavigationBar> = {
	title: "Navigation/SolaceNavigationBar",
	component: SolaceNavigationBar,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: `
# SolaceNavigationBar

A comprehensive, accessible navigation component designed for modern web applications with full theme support and responsive behavior.

## Features

### 🎨 **Multi-Theme Support**
- **Solace Theme**: Modern gradient brand colors with enhanced accessibility
- **SAP Theme**: Professional blue palette following SAP design guidelines
- **Boomi Theme**: Purple-accent corporate styling
- **Base Theme**: Neutral, adaptable foundation theme

### ♿ **Accessibility (WCAG 2.1 AA Compliant)**
- **Keyboard Navigation**: Full arrow key navigation, Tab/Shift+Tab support
- **Screen Reader Support**: Proper ARIA landmarks, live regions, and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order
- **Skip Navigation**: Built-in skip links for screen reader users
- **High Contrast**: Enhanced visibility in high contrast mode
- **Reduced Motion**: Respects user's motion preferences

### 📱 **Responsive Design**
- **Desktop**: Horizontal navigation with hover states
- **Tablet**: Adaptive layout with touch-friendly targets
- **Mobile**: Hamburger menu with slide-out navigation panel
- **Custom Breakpoints**: Configurable responsive behavior

### 🚀 **Advanced Features**
- **Sticky Navigation**: Optional fixed positioning with smooth scrolling
- **Logo Integration**: Flexible brand element placement
- **User Actions**: Right-aligned action buttons with tooltips
- **Active States**: Visual indicators for current page
- **Disabled States**: Proper handling of unavailable navigation items
- **Performance Optimized**: Minimal re-renders and efficient event handling

## Keyboard Interactions

| Key | Action |
|-----|--------|
| **Tab** | Navigate to/from navigation bar |
| **Enter/Space** | Activate links and buttons |
| **Escape** | Close mobile menu |
| **Left/Right Arrow** | Navigate between navigation links |
| **Down Arrow** | Open mobile menu (when toggle focused) |
| **Home/End** | Jump to first/last navigation item |

## Implementation Notes

### Theme Integration
The component automatically adapts to the active theme context. All colors, typography, and spacing follow the theme system.

### Mobile Menu Behavior
- Automatically shows hamburger menu below medium breakpoint (768px)
- Smooth animation transitions
- Focus trapping within mobile menu
- Backdrop click to close

### Performance Considerations
- Uses React.memo for user action components
- Efficient event delegation
- Minimal DOM updates during interactions
- Optimized for bundle size
				`
			}
		}
	},
	decorators: [
		(Story) => (
			<div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
				<Story />
				<div style={{ padding: "2rem" }}>
					<h2>Page Content</h2>
					<p>
						This content demonstrates how the navigation bar integrates with page content. Try resizing the window to
						see responsive behavior.
					</p>
					<div style={{ height: "50vh", background: "white", padding: "1rem", borderRadius: "8px", marginTop: "1rem" }}>
						<p>Scroll down to test sticky navigation behavior in the &ldquo;Sticky Navigation&rdquo; story.</p>
					</div>
				</div>
			</div>
		)
	],
	argTypes: {
		logo: {
			description: "Logo or brand element to display on the left side",
			control: false, // Disabled due to complex React elements
			table: {
				type: { summary: "ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		navigationLinks: {
			description: "Primary navigation links array with icons, states, and accessibility labels",
			control: false, // Disabled due to complex React elements (icons)
			table: {
				type: { summary: "SolaceNavigationLink[]" },
				defaultValue: { summary: "[]" }
			}
		},
		userActions: {
			description: "User actions to display on the right side (notifications, profile, etc.)",
			control: false, // Disabled due to complex React elements (icons)
			table: {
				type: { summary: "SolaceNavigationUserAction[]" },
				defaultValue: { summary: "[]" }
			}
		},
		enableMobileMenu: {
			description: "Whether to show mobile hamburger menu on small screens",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		mobileBreakpoint: {
			description: "Custom mobile breakpoint in pixels for responsive behavior",
			control: { type: "number", min: 320, max: 1200, step: 10 },
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "768" }
			}
		},
		sticky: {
			description: "Whether the navigation bar should stick to the top when scrolling",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		height: {
			description: "Custom height for the navigation bar (string with units or number in px)",
			control: { type: "text" },
			table: {
				type: { summary: "string | number" },
				defaultValue: { summary: "theme.spacing(8)" }
			}
		},
		backgroundColor: {
			description: "Background color override (CSS color value)",
			control: { type: "color" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "theme.palette.ux.background.w10" }
			}
		},
		bottomBorder: {
			description: "Whether to add a bottom border for visual separation",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		maxWidth: {
			description: "Maximum width for the navigation content container",
			control: { type: "text" },
			table: {
				type: { summary: "string | number" },
				defaultValue: { summary: "none" }
			}
		},
		centerContent: {
			description: "Whether to center the navigation content within its container",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		zIndex: {
			description: "z-index value for positioning control (especially with sticky navigation)",
			control: { type: "number", min: 1, max: 10000 },
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "theme.zIndex.appBar (sticky) | auto" }
			}
		},
		onMobileMenuToggle: {
			description: "Callback function triggered when mobile menu is toggled",
			action: "onMobileMenuToggle",
			table: {
				type: { summary: "(isOpen: boolean) => void" }
			}
		},
		className: {
			description: "Additional CSS class name for custom styling",
			control: { type: "text" },
			table: {
				type: { summary: "string" }
			}
		},
		style: {
			description: "Custom inline styles for the navigation container",
			control: { type: "object" },
			table: {
				type: { summary: "React.CSSProperties" }
			}
		}
	},
	args: {
		logo: <BrandLogo theme="default" />,
		navigationLinks: mockNavigationLinks,
		userActions: mockUserActions,
		enableMobileMenu: true,
		mobileBreakpoint: 768,
		sticky: false,
		bottomBorder: true,
		centerContent: false,
		onMobileMenuToggle: action("mobile-menu-toggled")
	}
};

export default meta;

type Story = StoryObj<SolaceNavigationBarProps>;

// ==================================================================================
// PRIMARY STORIES - Core functionality demonstrations
// ==================================================================================

/**
 * Default navigation bar with full features
 * Demonstrates the primary use case with logo, navigation links, and user actions
 */
export const Default: Story = {
	args: {
		logo: <BrandLogo theme="default" />,
		navigationLinks: mockNavigationLinks,
		userActions: mockUserActions
	},
	parameters: {
		docs: {
			description: {
				story:
					"The default navigation bar configuration with logo, navigation links with icons, and user action buttons. This represents the most common use case."
			}
		}
	}
};

/**
 * Interactive Playground - Full control testing
 * Provides comprehensive controls for testing all component features
 */
export const InteractivePlayground: Story = {
	args: {
		logo: <BrandLogo theme="default" />,
		navigationLinks: mockNavigationLinks,
		userActions: mockUserActions,
		height: "64px",
		backgroundColor: undefined,
		bottomBorder: true,
		centerContent: false,
		maxWidth: undefined,
		sticky: false,
		zIndex: undefined
	},
	parameters: {
		docs: {
			description: {
				story:
					"Interactive example with full controls enabled. Modify props in the Controls panel to test all component functionality and see real-time changes."
			}
		}
	}
};

// ==================================================================================
// THEME DEMONSTRATIONS - Multi-theme support showcase
// ==================================================================================

/**
 * Theme Variations - All 4 supported themes
 * Demonstrates component appearance across all brand themes
 */
export const ThemeVariations: Story = {
	render: () => {
		const themes = [
			{ name: "Solace", key: SupportedThemes.newSolace, brandTheme: SOLACE_BRAND_THEME },
			{ name: "SAP", key: SupportedThemes.sap, brandTheme: "sap" },
			{ name: "Boomi", key: SupportedThemes.boomi, brandTheme: "boomi" },
			{ name: "Base", key: SupportedThemes.newSolace, brandTheme: "default" }
		];

		return (
			<div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
				{themes.map(({ name, key, brandTheme }) => (
					<div key={name}>
						<h3 style={H3_STYLE}>
							{name}
							{THEME_LABEL_SUFFIX}
						</h3>
						<ThemeProvider theme={createTheme(SolaceTheme(key))}>
							<SolaceNavigationBar
								logo={<BrandLogo theme={brandTheme} />}
								navigationLinks={mockNavigationLinks}
								userActions={mockUserActions}
								onMobileMenuToggle={action(`${name.toLowerCase()}-mobile-menu-toggled`)}
							/>
						</ThemeProvider>
					</div>
				))}
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"Demonstrates the navigation bar across all 4 supported themes: Solace (modern gradient), SAP (professional blue), Boomi (purple corporate), and Base (neutral foundation). Each theme provides consistent brand-appropriate styling."
			}
		}
	}
};

/**
 * Theme Switching Demo - Interactive theme selection
 * Shows dynamic theme switching capability
 */
export const ThemeSwitchingDemo: Story = {
	render: () => {
		const ThemeDemo = () => {
			const [selectedTheme, setSelectedTheme] = useState<SupportedThemes>(SupportedThemes.newSolace);

			const themes = [
				{ name: "Solace", key: SupportedThemes.newSolace, brandTheme: SOLACE_BRAND_THEME },
				{ name: "SAP", key: SupportedThemes.sap, brandTheme: "sap" },
				{ name: "Boomi", key: SupportedThemes.boomi, brandTheme: "boomi" }
			];

			const currentBrandTheme = themes.find((t) => t.key === selectedTheme)?.brandTheme || "default";

			return (
				<div>
					<div style={{ padding: "1rem", background: "#f5f5f5", marginBottom: "1rem" }}>
						<label style={{ fontWeight: "bold", marginRight: "1rem" }}>Select Theme:</label>
						{themes.map(({ name, key }) => (
							<label key={key} style={{ marginRight: "1rem", cursor: "pointer" }}>
								<input
									type="radio"
									name="theme"
									value={key}
									checked={selectedTheme === key}
									onChange={() => setSelectedTheme(key)}
									style={{ marginRight: "0.5rem" }}
								/>
								{name}
							</label>
						))}
					</div>
					<ThemeProvider theme={createTheme(SolaceTheme(selectedTheme))}>
						<SolaceNavigationBar
							logo={<BrandLogo theme={currentBrandTheme} />}
							navigationLinks={mockNavigationLinks}
							userActions={mockUserActions}
							onMobileMenuToggle={action("theme-switching-mobile-menu-toggled")}
						/>
					</ThemeProvider>
				</div>
			);
		};

		return <ThemeDemo />;
	},
	parameters: {
		docs: {
			description: {
				story:
					"Interactive theme switching demonstration. Select different themes to see real-time theme changes. This showcases how the component adapts to different brand contexts."
			}
		}
	}
};

// ==================================================================================
// ACCESSIBILITY DEMONSTRATIONS - WCAG 2.1 AA compliance features
// ==================================================================================

/**
 * Accessibility Features Demo
 * Demonstrates comprehensive accessibility features and keyboard navigation
 */
export const AccessibilityFeatures: Story = {
	render: () => (
		<div>
			<div
				style={{
					padding: "1rem",
					background: "#e8f5e8",
					border: "1px solid #4caf50",
					borderRadius: "8px",
					marginBottom: "1rem"
				}}
			>
				<h3 style={{ margin: H3_MARGIN, color: "#2e7d32" }}>♿ Accessibility Features</h3>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
					<div>
						<h4>🎹 Keyboard Navigation</h4>
						<ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
							<li>
								<strong>Tab:</strong> Navigate to/from component
							</li>
							<li>
								<strong>Enter/Space:</strong> Activate links and buttons
							</li>
							<li>
								<strong>Left/Right Arrow:</strong> Navigate between links
							</li>
							<li>
								<strong>Escape:</strong> Close mobile menu
							</li>
							<li>
								<strong>Home/End:</strong> Jump to first/last item
							</li>
						</ul>
					</div>
					<div>
						<h4>🔊 Screen Reader Support</h4>
						<ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
							<li>ARIA landmarks and roles</li>
							<li>Live region announcements</li>
							<li>Current page indication</li>
							<li>Skip navigation links</li>
							<li>Semantic HTML structure</li>
						</ul>
					</div>
				</div>
				<p style={{ margin: "1rem 0 0 0", fontStyle: "italic" }}>
					<strong>Try it:</strong> Use Tab to navigate, arrow keys between links, and test the mobile menu with
					keyboard-only navigation.
				</p>
			</div>
			<SolaceNavigationBar
				logo={<BrandLogo theme="default" />}
				navigationLinks={mockNavigationLinksWithDisabled}
				userActions={mockUserActionsWithDisabled}
				onMobileMenuToggle={action("accessibility-mobile-menu-toggled")}
			/>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Comprehensive accessibility demonstration including keyboard navigation, screen reader support, focus management, and ARIA implementation. Includes disabled states to show proper accessibility handling."
			}
		}
	}
};

/**
 * Keyboard Navigation Demo
 * Focused demonstration of keyboard interaction patterns
 */
export const KeyboardNavigationDemo: Story = {
	render: () => {
		const KeyboardDemo = () => {
			const [keyPressed, setKeyPressed] = useState("");
			const [lastAction, setLastAction] = useState("");

			React.useEffect(() => {
				const handleKeyDown = (e: KeyboardEvent) => {
					if (
						e.target instanceof HTMLElement &&
						(e.target.closest('[role="navigation"]') || e.target.closest('[role="menubar"]'))
					) {
						setKeyPressed(e.key);
						setLastAction(`${e.key} pressed on ${e.target.tagName.toLowerCase()}`);
						setTimeout(() => setKeyPressed(""), 1000);
					}
				};

				document.addEventListener("keydown", handleKeyDown);
				return () => document.removeEventListener("keydown", handleKeyDown);
			}, []);

			return (
				<div>
					<div
						style={{
							padding: "1rem",
							background: "#f0f8ff",
							border: "1px solid #2196f3",
							borderRadius: "8px",
							marginBottom: "1rem",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center"
						}}
					>
						<div>
							<strong>🎹 Keyboard Monitor:</strong> {lastAction || "Focus the navigation and use keyboard"}
						</div>
						{keyPressed && (
							<div
								style={{
									padding: "0.5rem 1rem",
									background: "#4CAF50",
									color: "white",
									borderRadius: "4px",
									fontWeight: "bold"
								}}
							>
								{keyPressed}
							</div>
						)}
					</div>
					<SolaceNavigationBar
						logo={<BrandLogo theme="default" />}
						navigationLinks={mockNavigationLinks}
						userActions={mockUserActions}
						onMobileMenuToggle={action("keyboard-demo-mobile-menu-toggled")}
					/>
				</div>
			);
		};

		return <KeyboardDemo />;
	},
	parameters: {
		docs: {
			description: {
				story:
					"Interactive keyboard navigation demonstration with real-time key press monitoring. Focus the navigation bar and use various keys to see keyboard interactions in action."
			}
		}
	}
};

// ==================================================================================
// RESPONSIVE DESIGN DEMONSTRATIONS
// ==================================================================================

/**
 * Responsive Design Showcase
 * Demonstrates behavior across different screen sizes
 */
export const ResponsiveDesignShowcase: Story = {
	render: () => {
		const ResponsiveDemo = () => {
			const [currentSize, setCurrentSize] = useState("desktop");
			const sizes = {
				desktop: { width: "100%", label: "Desktop (>= 960px)" },
				tablet: { width: "768px", label: "Tablet (768px)" },
				mobile: { width: "375px", label: "Mobile (375px)" }
			};

			return (
				<div>
					<div
						style={{
							padding: "1rem",
							background: "#f5f5f5",
							marginBottom: "1rem",
							display: "flex",
							alignItems: "center",
							gap: "1rem",
							flexWrap: "wrap"
						}}
					>
						<span>
							<strong>📱 View Size:</strong>
						</span>
						{Object.entries(sizes).map(([key, { label }]) => (
							<label key={key} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
								<input
									type="radio"
									name="size"
									value={key}
									checked={currentSize === key}
									onChange={() => setCurrentSize(key)}
								/>
								{label}
							</label>
						))}
					</div>
					<div
						style={{
							width: sizes[currentSize as keyof typeof sizes].width,
							margin: "0 auto",
							border: "2px solid #ccc",
							borderRadius: "8px",
							overflow: "hidden",
							transition: "width 0.3s ease"
						}}
					>
						<SolaceNavigationBar
							logo={<BrandLogo theme="default" size={currentSize === "mobile" ? "small" : "medium"} />}
							navigationLinks={mockNavigationLinks}
							userActions={currentSize === "mobile" ? minimalUserActions : mockUserActions}
							onMobileMenuToggle={action(`responsive-${currentSize}-mobile-menu-toggled`)}
						/>
					</div>
					<div
						style={{
							padding: "1rem",
							background: "#e8f5e8",
							marginTop: "1rem",
							borderRadius: "8px"
						}}
					>
						<p>
							<strong>Responsive Features:</strong>
						</p>
						<ul>
							<li>
								<strong>Desktop:</strong> Full horizontal navigation with all features visible
							</li>
							<li>
								<strong>Tablet:</strong> Optimized spacing and touch-friendly targets
							</li>
							<li>
								<strong>Mobile:</strong> Hamburger menu with slide-out navigation panel
							</li>
						</ul>
					</div>
				</div>
			);
		};

		return <ResponsiveDemo />;
	},
	parameters: {
		docs: {
			description: {
				story:
					"Interactive responsive design demonstration. Switch between different viewport sizes to see how the navigation adapts: desktop shows full navigation, tablet optimizes spacing, and mobile uses a hamburger menu."
			}
		}
	}
};

/**
 * Mobile Menu Demo
 * Focused demonstration of mobile menu behavior
 */
export const MobileMenuDemo: Story = {
	render: () => (
		<div>
			<div
				style={{
					padding: "1rem",
					background: "#fff3e0",
					border: "1px solid #ff9800",
					borderRadius: "8px",
					marginBottom: "1rem"
				}}
			>
				<h3 style={{ margin: H3_MARGIN, color: "#e65100" }}>📱 Mobile Menu Features</h3>
				<ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
					<li>
						<strong>Hamburger Animation:</strong> Smooth icon transformation
					</li>
					<li>
						<strong>Slide Panel:</strong> Animated menu panel appearance
					</li>
					<li>
						<strong>Focus Management:</strong> Proper focus trapping within menu
					</li>
					<li>
						<strong>Keyboard Support:</strong> Escape to close, Tab navigation
					</li>
					<li>
						<strong>Touch Friendly:</strong> Large tap targets for mobile devices
					</li>
				</ul>
				<p style={{ margin: "1rem 0 0 0", fontStyle: "italic" }}>
					<strong>Try it:</strong> The navigation below is forced to mobile view. Click the hamburger menu to test
					mobile interactions.
				</p>
			</div>
			<div
				style={{
					width: "375px",
					margin: "0 auto",
					border: "2px solid #ccc",
					borderRadius: "8px",
					overflow: "hidden"
				}}
			>
				<SolaceNavigationBar
					logo={<BrandLogo theme="default" size="small" />}
					navigationLinks={mockNavigationLinks}
					userActions={minimalUserActions}
					mobileBreakpoint={1200} // Force mobile menu
					onMobileMenuToggle={action("mobile-menu-demo-toggled")}
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Dedicated mobile menu demonstration with forced mobile view. Shows the hamburger menu animation, slide-out panel, focus management, and touch-friendly interactions."
			}
		}
	}
};

// ==================================================================================
// CONFIGURATION VARIATIONS - Different setup scenarios
// ==================================================================================

/**
 * Minimal Setup - Basic configuration
 */
export const MinimalSetup: Story = {
	args: {
		logo: <BrandLogo theme="default" size="small" />,
		navigationLinks: minimalNavigationLinks
	},
	parameters: {
		docs: {
			description: {
				story:
					"Minimal navigation bar setup with just logo and basic navigation links. No user actions or advanced features - perfect for simple applications."
			}
		}
	}
};

/**
 * Without Logo - Navigation-only setup
 */
export const WithoutLogo: Story = {
	args: {
		navigationLinks: mockNavigationLinks,
		userActions: mockUserActions
	},
	parameters: {
		docs: {
			description: {
				story:
					"Navigation bar without logo element. Useful for secondary navigation or when the logo is handled elsewhere in the application."
			}
		}
	}
};

/**
 * No Mobile Menu - Desktop-only navigation
 */
export const NoMobileMenu: Story = {
	args: {
		logo: <BrandLogo theme="default" />,
		navigationLinks: mockNavigationLinks,
		userActions: mockUserActions,
		enableMobileMenu: false
	},
	parameters: {
		docs: {
			description: {
				story:
					"Navigation bar with mobile menu disabled. Use this configuration for desktop-only applications or when you handle mobile navigation differently."
			}
		}
	}
};

/**
 * Sticky Navigation - Fixed positioning demo
 */
export const StickyNavigation: Story = {
	args: {
		logo: <BrandLogo theme="default" />,
		navigationLinks: mockNavigationLinks,
		userActions: mockUserActions,
		sticky: true,
		zIndex: 1100
	},
	decorators: [
		(Story) => (
			<div style={{ height: "300vh", background: "linear-gradient(180deg, #f0f8ff 0%, #e6f3ff 50%, #cce7ff 100%)" }}>
				<Story />
				<div style={{ padding: "2rem", marginTop: "2rem" }}>
					<h2>🌟 Scroll down to see sticky behavior</h2>
					<p>
						This page has extended content to demonstrate sticky navigation. The navigation bar will remain fixed at the
						top as you scroll.
					</p>
					<div
						style={{
							height: "200vh",
							background: "rgba(255, 255, 255, 0.8)",
							padding: "2rem",
							marginTop: "2rem",
							borderRadius: "8px",
							boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
						}}
					>
						<h3>Extended Content Area</h3>
						<p>Notice how the navigation bar stays fixed at the top with a subtle shadow effect when sticky.</p>
						<div style={{ marginTop: "4rem" }}>
							<h4>Sticky Navigation Benefits:</h4>
							<ul>
								<li>Always accessible navigation</li>
								<li>Improved user experience on long pages</li>
								<li>Automatic shadow effect when sticky</li>
								<li>Proper z-index management</li>
								<li>Smooth scroll behavior</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	],
	parameters: {
		docs: {
			description: {
				story:
					"Sticky navigation demonstration with extended page content. The navigation bar remains fixed at the top when scrolling, with enhanced shadow effects and proper z-index layering."
			}
		}
	}
};

/**
 * Custom Styling - Advanced customization
 */
export const CustomStyling: Story = {
	args: {
		logo: <BrandLogo theme="default" size="large" />,
		navigationLinks: mockNavigationLinks,
		userActions: mockUserActions,
		backgroundColor: "#1a237e",
		height: "80px",
		centerContent: true,
		maxWidth: "1200px",
		bottomBorder: false,
		style: {
			boxShadow: "0 4px 20px rgba(26, 35, 126, 0.3)",
			borderRadius: "0 0 16px 16px"
		}
	},
	parameters: {
		docs: {
			description: {
				story:
					"Advanced customization example with custom background color, increased height, centered content, maximum width constraints, custom shadows, and rounded bottom corners."
			}
		}
	}
};

// ==================================================================================
// REAL-WORLD USE CASES - Practical implementation examples
// ==================================================================================

/**
 * E-commerce Navigation - Realistic business scenario
 */
export const EcommerceNavigation: Story = {
	args: {
		logo: <div style={{ fontWeight: "bold", fontSize: "20px", color: "#e91e63" }}>ShopMart</div>,
		navigationLinks: [
			{ id: "home", label: "Home", href: "/", active: true, onClick: action("nav-home") },
			{ id: "products", label: "Products", href: "/products", onClick: action("nav-products") },
			{ id: "categories", label: "Categories", href: "/categories", onClick: action("nav-categories") },
			{ id: "deals", label: "Deals", href: "/deals", onClick: action("nav-deals") },
			{ id: "support", label: "Support", href: "/support", onClick: action("nav-support") }
		],
		userActions: [
			{
				id: "search",
				content: createIconComponent(Search24Icon),
				onClick: action("search"),
				tooltip: "Search products",
				ariaLabel: "Search products"
			},
			{
				id: "cart",
				content: (
					<div style={{ position: "relative" }}>
						🛒
						<span
							style={{
								position: "absolute",
								top: "-8px",
								right: "-8px",
								background: "#f44336",
								color: "white",
								borderRadius: "50%",
								width: "20px",
								height: "20px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "12px",
								fontWeight: "bold"
							}}
						>
							3
						</span>
					</div>
				),
				onClick: action("cart"),
				tooltip: "Shopping cart (3 items)",
				ariaLabel: "Shopping cart with 3 items"
			},
			{
				id: "account",
				content: createIconComponent(User24Icon),
				onClick: action("account"),
				tooltip: "My Account",
				ariaLabel: "My Account"
			}
		]
	},
	parameters: {
		docs: {
			description: {
				story:
					"E-commerce navigation example with product-focused links, search functionality, shopping cart with item count badge, and user account access."
			}
		}
	}
};

/**
 * SaaS Dashboard Navigation - Software application scenario
 */
export const SaaSDashboardNavigation: Story = {
	args: {
		logo: (
			<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
				<div
					style={{
						width: "32px",
						height: "32px",
						background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
						borderRadius: "8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "white",
						fontWeight: "bold"
					}}
				>
					A
				</div>
				<span style={{ fontWeight: "bold", fontSize: "18px" }}>AnalyticsPro</span>
			</div>
		),
		navigationLinks: [
			{
				id: "dashboard",
				label: "Dashboard",
				href: "/dashboard",
				active: true,
				icon: createIconComponent(Add24Icon),
				onClick: action("nav-dashboard")
			},
			{
				id: "analytics",
				label: "Analytics",
				href: "/analytics",
				icon: createIconComponent(Summary24Icon),
				onClick: action("nav-analytics")
			},
			{
				id: "reports",
				label: "Reports",
				href: "/reports",
				icon: createIconComponent(Details24Icon),
				onClick: action("nav-reports")
			},
			{
				id: "integrations",
				label: "Integrations",
				href: "/integrations",
				icon: createIconComponent(Function24Icon),
				onClick: action("nav-integrations")
			}
		],
		userActions: [
			{
				id: "notifications",
				content: (
					<div style={{ position: "relative" }}>
						{createIconComponent(Calendar24Icon)}
						<span
							style={{
								position: "absolute",
								top: "-4px",
								right: "-4px",
								width: "8px",
								height: "8px",
								background: "#ff4444",
								borderRadius: "50%"
							}}
						/>
					</div>
				),
				onClick: action("notifications"),
				tooltip: "Notifications (1 new)",
				ariaLabel: "Notifications - 1 new alert"
			},
			{
				id: "help",
				content: createIconComponent(Help24Icon),
				onClick: action("help"),
				tooltip: "Help & Documentation",
				ariaLabel: "Help and Documentation"
			},
			{
				id: "profile",
				content: (
					<div
						style={{
							width: "32px",
							height: "32px",
							borderRadius: "50%",
							background: "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "white",
							fontWeight: "bold",
							fontSize: "14px"
						}}
					>
						JD
					</div>
				),
				onClick: action("profile"),
				tooltip: "John Doe - Account Settings",
				ariaLabel: "User profile menu for John Doe"
			}
		],
		sticky: true
	},
	parameters: {
		docs: {
			description: {
				story:
					"SaaS dashboard navigation with branded logo, analytics-focused navigation, notification indicators, help access, and user avatar. Includes sticky positioning for always-accessible navigation."
			}
		}
	}
};

/**
 * Performance Optimization Demo
 * Shows optimized rendering patterns
 */
export const PerformanceOptimizationDemo: Story = {
	render: () => {
		const PerformanceDemo = () => {
			const renderCountRef = React.useRef(0);
			const [lastUpdate, setLastUpdate] = useState(Date.now());

			// Increment render count on each render (but don't trigger re-renders)
			renderCountRef.current += 1;

			React.useEffect(() => {
				setLastUpdate(Date.now());
			}, []); // Only run once on mount

			return (
				<div>
					<div
						style={{
							padding: "1rem",
							background: "#f3e5f5",
							border: "1px solid #9c27b0",
							borderRadius: "8px",
							marginBottom: "1rem",
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
							gap: "1rem"
						}}
					>
						<div>
							<h4 style={{ margin: "0 0 0.5rem 0", color: "#4a148c" }}>⚡ Performance Metrics</h4>
							<p style={{ margin: 0 }}>
								<strong>Renders:</strong> {renderCountRef.current}
							</p>
							<p style={{ margin: 0 }}>
								<strong>Last Update:</strong> {new Date(lastUpdate).toLocaleTimeString()}
							</p>
						</div>
						<div>
							<h4 style={{ margin: "0 0 0.5rem 0", color: "#4a148c" }}>🎯 Optimizations</h4>
							<ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "14px" }}>
								<li>React.memo for user actions</li>
								<li>Efficient event delegation</li>
								<li>Minimal DOM updates</li>
								<li>Bundle size optimization</li>
							</ul>
						</div>
					</div>
					<SolaceNavigationBar
						logo={<BrandLogo theme="default" />}
						navigationLinks={mockNavigationLinks}
						userActions={mockUserActions}
						onMobileMenuToggle={action("performance-demo-mobile-menu-toggled")}
					/>
				</div>
			);
		};

		return <PerformanceDemo />;
	},
	parameters: {
		docs: {
			description: {
				story:
					"Performance optimization demonstration showing render tracking and efficient update patterns. The component uses React.memo, efficient event handling, and minimal re-renders."
			}
		}
	}
};
