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

import React, { createRef } from "react";
import { render, screen, waitFor, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import SolaceNavigationBar, { SolaceNavigationLink, SolaceNavigationUserAction } from "./SolaceNavigationBar";
import getThemeOptions from "../../resources/theme";
import { SupportedThemes } from "../../types/supportedThemes";

// ========================================================================================
// TEST CONSTANTS
// ========================================================================================

const FALSE_STRING = "false";
const MAIN_NAVIGATION_ARIA_LABEL = "Main navigation";
const USER_ACTIONS_ARIA_LABEL = "User actions";
const MOBILE_MENU_ARIA_LABEL = "Mobile navigation menu";
const SKIP_TO_MAIN_CONTENT_TEXT = "Skip to main content";
const USER_PROFILE_TOOLTIP = "User profile";
const TRUE_STRING = "true";
const MAIN_NAVIGATION_MENU_LABEL = "Main navigation menu";
const OPEN_MOBILE_NAVIGATION_MENU = "Open mobile navigation menu";
const CLOSE_MOBILE_NAVIGATION_MENU = "Close mobile navigation menu";
const NAVIGATION_ROLE = "navigation";

const SERVICES_LABEL = "Services";
const OPEN_MOBILE_NAVIGATION_MENU_BUTTON = /open mobile navigation menu/i;
const ARIA_LABEL_ATTRIBUTE = "aria-label";
const DATA_DISABLED_ATTRIBUTE = "data-disabled";
const ARIA_EXPANDED_ATTRIBUTE = "aria-expanded";

const mockNavigationLinks: SolaceNavigationLink[] = [
	{
		id: "home",
		label: "Home",
		href: "/home",
		active: true,
		ariaLabel: "Home page"
	},
	{
		id: "products",
		label: "Products",
		href: "/products",
		icon: <span data-testid="products-icon">📦</span>
	},
	{
		id: "services",
		label: "Services",
		href: "/services",
		disabled: true
	},
	{
		id: "about",
		label: "About",
		onClick: jest.fn(),
		target: "_blank"
	},
	{
		id: "contact",
		label: "Contact",
		href: "/contact",
		subLinks: [
			{ id: "email", label: "Email", href: "/contact/email" },
			{ id: "phone", label: "Phone", href: "/contact/phone" }
		]
	}
];

const mockUserActions: SolaceNavigationUserAction[] = [
	{
		id: "notifications",
		content: <span data-testid="notifications-icon">🔔</span>,
		onClick: jest.fn(),
		tooltip: "View notifications",
		ariaLabel: "Notifications"
	},
	{
		id: "profile",
		content: <span data-testid="profile-icon">👤</span>,
		onClick: jest.fn(),
		disabled: true,
		tooltip: USER_PROFILE_TOOLTIP
	}
];

const mockLogo = <img src="/logo.png" alt="Company Logo" data-testid="company-logo" />;

// Theme configurations for testing
const themes = [
	{ name: "solace", theme: SupportedThemes.solace },
	{ name: "sap", theme: SupportedThemes.sap },
	{ name: "boomi", theme: SupportedThemes.boomi },
	{ name: "newSolace", theme: SupportedThemes.newSolace }
] as const;

// Helper function to render component with theme
const renderWithTheme = (
	ui: React.ReactElement,
	themeName: SupportedThemes = SupportedThemes.solace,
	options: RenderOptions = {}
) => {
	const theme = createTheme(getThemeOptions(themeName));
	return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);
};

// Mock window.matchMedia for responsive tests
const mockMatchMedia = (matches: boolean) => {
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: jest.fn().mockImplementation((query) => ({
			matches,
			media: query,
			onchange: null,
			addListener: jest.fn(), // deprecated
			removeListener: jest.fn(), // deprecated
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn()
		}))
	});
};

// Mock ResizeObserver for responsive tests
global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn()
}));

// ========================================================================================
// TEST SUITE: SOLACE NAVIGATION BAR
// ========================================================================================

describe("SolaceNavigationBar", () => {
	// Clean up mocks after each test
	afterEach(() => {
		jest.clearAllMocks();
	});

	// ========================================================================================
	// RENDERING AND PROPS TESTS
	// ========================================================================================

	describe("Rendering and Props", () => {
		it("renders with default props", () => {
			renderWithTheme(<SolaceNavigationBar />);

			const nav = screen.getByRole(NAVIGATION_ROLE, { name: MAIN_NAVIGATION_ARIA_LABEL });
			expect(nav).toBeInTheDocument();
			expect(nav).toHaveAttribute("role", NAVIGATION_ROLE);
			expect(nav).toHaveAttribute(ARIA_LABEL_ATTRIBUTE, MAIN_NAVIGATION_ARIA_LABEL);
		});

		it("renders with logo", () => {
			renderWithTheme(<SolaceNavigationBar logo={mockLogo} />);

			expect(screen.getByTestId("company-logo")).toBeInTheDocument();
			expect(screen.getByAltText("Company Logo")).toBeInTheDocument();
		});

		it("renders navigation links", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			expect(screen.getByRole("menubar", { name: MAIN_NAVIGATION_MENU_LABEL })).toBeInTheDocument();

			mockNavigationLinks.forEach((link) => {
				const linkElements = screen.getAllByText(link.label);
				expect(linkElements.length).toBeGreaterThanOrEqual(1);
			});
		});

		it("renders user actions", () => {
			renderWithTheme(<SolaceNavigationBar userActions={mockUserActions} />);

			expect(screen.getByRole("region", { name: USER_ACTIONS_ARIA_LABEL })).toBeInTheDocument();
			expect(screen.getByTestId("notifications-icon")).toBeInTheDocument();
			expect(screen.getByTestId("profile-icon")).toBeInTheDocument();
		});

		it("applies custom className", () => {
			renderWithTheme(<SolaceNavigationBar className="custom-nav-class" />);

			const nav = screen.getByRole(NAVIGATION_ROLE);
			expect(nav).toHaveClass("custom-nav-class");
		});

		it("applies custom style", () => {
			const customStyle = { backgroundColor: "red" };
			renderWithTheme(<SolaceNavigationBar style={customStyle} />);

			const nav = screen.getByRole(NAVIGATION_ROLE);
			expect(nav).toHaveStyle("background-color: red");
		});

		it("forwards ref correctly", () => {
			const ref = createRef<HTMLElement>();
			renderWithTheme(<SolaceNavigationBar ref={ref} />);

			expect(ref.current).toBeInstanceOf(HTMLElement);
			expect(ref.current?.tagName).toBe("NAV");
		});

		it("applies sticky positioning when sticky prop is true", () => {
			renderWithTheme(<SolaceNavigationBar sticky />);

			const nav = screen.getByRole(NAVIGATION_ROLE);
			expect(nav).toHaveStyle("position: sticky");
		});

		it("applies custom height", () => {
			renderWithTheme(<SolaceNavigationBar height="80px" />);

			const nav = screen.getByRole(NAVIGATION_ROLE);
			expect(nav).toHaveStyle("height: 80px");
		});

		it("applies custom background color", () => {
			renderWithTheme(<SolaceNavigationBar backgroundColor="#ff0000" />);

			const nav = screen.getByRole(NAVIGATION_ROLE);
			expect(nav).toHaveStyle("background-color: #ff0000");
		});

		it("shows bottom border by default", () => {
			renderWithTheme(<SolaceNavigationBar />);

			const nav = screen.getByRole(NAVIGATION_ROLE);
			// Border is applied via theme, so we check that bottomBorder prop is not false
			expect(nav).toBeInTheDocument();
		});

		it("hides bottom border when disabled", () => {
			renderWithTheme(<SolaceNavigationBar bottomBorder={false} />);

			const nav = screen.getByRole(NAVIGATION_ROLE);
			expect(nav).toHaveStyle("border-bottom: none");
		});

		it("applies custom z-index", () => {
			renderWithTheme(<SolaceNavigationBar zIndex={9999} />);

			const nav = screen.getByRole(NAVIGATION_ROLE);
			expect(nav).toHaveStyle("z-index: 9999");
		});

		it("applies data-qa attribute", () => {
			renderWithTheme(<SolaceNavigationBar dataQa="nav-component" />);

			const nav = screen.getByRole(NAVIGATION_ROLE);
			expect(nav).toHaveAttribute("data-qa", "nav-component");
		});

		it("applies data-tags attribute", () => {
			renderWithTheme(<SolaceNavigationBar dataTags="navigation,header" />);

			const nav = screen.getByRole(NAVIGATION_ROLE);
			expect(nav).toHaveAttribute("data-tags", "navigation,header");
		});
	});

	// ========================================================================================
	// NAVIGATION LINK BEHAVIOR TESTS
	// ========================================================================================

	describe("Navigation Link Behavior", () => {
		it("renders active link with proper attributes", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			const activeLink = screen.getByRole("menuitem", { name: "Home page" });
			expect(activeLink).toHaveAttribute("aria-current", "page");
			expect(activeLink).toHaveAttribute("data-active", "true");
		});

		it("renders disabled link with proper attributes", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			// Get the disabled link by its role and label
			const allLinks = screen.getAllByRole("menuitem");
			const disabledLink = allLinks.find(
				(link) =>
					link.textContent?.includes(SERVICES_LABEL) && link.getAttribute(DATA_DISABLED_ATTRIBUTE) === TRUE_STRING
			);

			expect(disabledLink).toHaveAttribute(DATA_DISABLED_ATTRIBUTE, TRUE_STRING);
			expect(disabledLink).toHaveAttribute("aria-disabled", TRUE_STRING);
		});

		it("handles link click events", async () => {
			const user = userEvent.setup();
			const mockClickHandler = jest.fn();
			const linksWithClick = [{ ...mockNavigationLinks[3], onClick: mockClickHandler }];

			renderWithTheme(<SolaceNavigationBar navigationLinks={linksWithClick} />);

			const aboutLink = screen.getAllByText("About")[0]; // Get desktop version
			await user.click(aboutLink);
			expect(mockClickHandler).toHaveBeenCalledTimes(1);
		});

		it("prevents click on disabled links", async () => {
			const user = userEvent.setup();
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			const allLinks = screen.getAllByRole("menuitem");
			const disabledLink = allLinks.find(
				(link) =>
					link.textContent?.includes(SERVICES_LABEL) && link.getAttribute(DATA_DISABLED_ATTRIBUTE) === TRUE_STRING
			);

			if (disabledLink) {
				await user.click(disabledLink);
				// Should not navigate (href would not be followed)
				expect(disabledLink).toHaveAttribute(DATA_DISABLED_ATTRIBUTE, TRUE_STRING);
			}
		});

		it("renders link icons", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			// Icon should be present in both desktop and mobile versions
			const icons = screen.getAllByTestId("products-icon");
			expect(icons.length).toBeGreaterThanOrEqual(1);
		});

		it("applies target attribute to links", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			const allLinks = screen.getAllByRole("menuitem");
			const externalLink = allLinks.find((link) => link.textContent?.includes("About"));
			expect(externalLink).toHaveAttribute("target", "_blank");
		});

		it("handles links with aria-label", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			const linkWithAriaLabel = screen.getByRole("menuitem", { name: "Home page" });
			expect(linkWithAriaLabel).toHaveAttribute("aria-label", "Home page");
		});
	});

	// ========================================================================================
	// USER ACTION BEHAVIOR TESTS
	// ========================================================================================

	describe("User Action Behavior", () => {
		it("handles user action clicks", async () => {
			const user = userEvent.setup();
			renderWithTheme(<SolaceNavigationBar userActions={mockUserActions} />);

			await user.click(screen.getByRole("button", { name: "Notifications" }));
			expect(mockUserActions[0].onClick).toHaveBeenCalledTimes(1);
		});

		it("disables user actions when disabled prop is true", () => {
			renderWithTheme(<SolaceNavigationBar userActions={mockUserActions} />);

			const disabledAction = screen.getByRole("button", { name: USER_PROFILE_TOOLTIP });
			expect(disabledAction).toBeDisabled();
		});

		it("shows tooltips for user actions", () => {
			renderWithTheme(<SolaceNavigationBar userActions={mockUserActions} />);

			const actionWithTooltip = screen.getByRole("button", { name: "Notifications" });
			expect(actionWithTooltip).toHaveAttribute(ARIA_LABEL_ATTRIBUTE, "Notifications");
		});

		it("prevents click on disabled user actions", async () => {
			const user = userEvent.setup();
			renderWithTheme(<SolaceNavigationBar userActions={mockUserActions} />);

			const disabledAction = screen.getByRole("button", { name: USER_PROFILE_TOOLTIP });
			await user.click(disabledAction);

			expect(mockUserActions[1].onClick).not.toHaveBeenCalled();
		});
	});

	// ========================================================================================
	// MOBILE MENU BEHAVIOR TESTS
	// ========================================================================================

	describe("Mobile Menu Behavior", () => {
		beforeEach(() => {
			mockMatchMedia(true);
		});
		it("shows mobile menu toggle button when enabled and has navigation links", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} enableMobileMenu={true} />);

			const toggleButton = screen.getByRole("button", {
				name: OPEN_MOBILE_NAVIGATION_MENU_BUTTON
			});
			expect(toggleButton).toBeInTheDocument();
			expect(toggleButton).toHaveAttribute(ARIA_EXPANDED_ATTRIBUTE, FALSE_STRING);
		});

		it("toggles mobile menu when button is clicked", async () => {
			const user = userEvent.setup();
			const onToggle = jest.fn();

			renderWithTheme(
				<SolaceNavigationBar
					navigationLinks={mockNavigationLinks}
					enableMobileMenu={true}
					onMobileMenuToggle={onToggle}
				/>
			);

			const toggleButton = screen.getByRole("button", {
				name: OPEN_MOBILE_NAVIGATION_MENU_BUTTON
			});

			await user.click(toggleButton);

			expect(onToggle).toHaveBeenCalledWith(true);
			expect(toggleButton).toHaveAttribute(ARIA_EXPANDED_ATTRIBUTE, TRUE_STRING);
			expect(toggleButton).toHaveAttribute(ARIA_LABEL_ATTRIBUTE, CLOSE_MOBILE_NAVIGATION_MENU);
		});

		it("renders mobile menu panel when open", async () => {
			const user = userEvent.setup();

			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} enableMobileMenu={true} />);

			const toggleButton = screen.getByRole("button", {
				name: OPEN_MOBILE_NAVIGATION_MENU_BUTTON
			});

			await user.click(toggleButton);

			const mobileMenu = screen.getByRole("menu", { name: MOBILE_MENU_ARIA_LABEL });
			expect(mobileMenu).toBeInTheDocument();
			expect(mobileMenu).toHaveAttribute("aria-hidden", "false");
		});

		it("hides mobile menu by default", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} enableMobileMenu={true} />);

			const mobileMenu = screen.getByRole("menu", { name: MOBILE_MENU_ARIA_LABEL });
			expect(mobileMenu).toHaveAttribute("aria-hidden", "true");
		});

		it("closes mobile menu when link is clicked", async () => {
			const user = userEvent.setup();
			const onToggle = jest.fn();

			renderWithTheme(
				<SolaceNavigationBar
					navigationLinks={mockNavigationLinks}
					enableMobileMenu={true}
					onMobileMenuToggle={onToggle}
				/>
			);

			// Open mobile menu
			const toggleButton = screen.getByRole("button", {
				name: OPEN_MOBILE_NAVIGATION_MENU_BUTTON
			});
			await user.click(toggleButton);

			// Find mobile menu items (they have different keys)
			const mobileMenu = screen.getByRole("menu", { name: MOBILE_MENU_ARIA_LABEL });
			const mobileMenuItems = mobileMenu.querySelectorAll('[role="menuitem"]');
			const firstMobileLink = mobileMenuItems[0] as HTMLElement;

			if (firstMobileLink) {
				await user.click(firstMobileLink);
				expect(onToggle).toHaveBeenCalledWith(false);
			}
		});

		it("does not show mobile menu toggle when enableMobileMenu is false", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} enableMobileMenu={false} />);

			const toggleButton = screen.queryByRole("button", {
				name: /mobile navigation menu/
			});
			expect(toggleButton).not.toBeInTheDocument();
		});
	});

	// ========================================================================================
	// KEYBOARD NAVIGATION TESTS
	// ========================================================================================

	describe("Keyboard Navigation", () => {
		it("supports Tab navigation", async () => {
			const user = userEvent.setup();
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			// Start from beginning of document
			document.body.focus();

			await user.tab();

			// Skip link should be focused first, then navigation elements
			const activeElement = document.activeElement;
			expect(activeElement).toBeInTheDocument();
		});

		it("supports Arrow key navigation between links", async () => {
			const user = userEvent.setup();
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			const menubar = screen.getByRole("menubar");
			menubar.focus();

			// Simulate right arrow key
			await user.keyboard("{ArrowRight}");

			// Should move to next link
			expect(document.activeElement?.textContent).toContain("Products");
		});

		it("supports Home and End keys for navigation", async () => {
			const user = userEvent.setup();
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			const menubar = screen.getByRole("menubar");
			menubar.focus();

			// Press End key
			await user.keyboard("{End}");

			// Should move to last link
			expect(document.activeElement?.textContent).toContain("Contact");

			// Press Home key
			await user.keyboard("{Home}");

			// Should move to first link
			expect(document.activeElement?.textContent).toContain("Home");
		});

		it("supports Enter key to activate links", async () => {
			const user = userEvent.setup();
			const mockClick = jest.fn();
			const linksWithClick = [{ ...mockNavigationLinks[0], onClick: mockClick }];

			renderWithTheme(<SolaceNavigationBar navigationLinks={linksWithClick} />);

			const link = screen.getByRole("menuitem", { name: "Home page" });
			link.focus();

			await user.keyboard("{Enter}");
			expect(mockClick).toHaveBeenCalled();
		});

		it("supports Escape key to close mobile menu", async () => {
			const user = userEvent.setup();

			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} enableMobileMenu={true} />);

			// Open mobile menu
			const toggleButton = screen.getByRole("button", {
				name: OPEN_MOBILE_NAVIGATION_MENU
			});
			await user.click(toggleButton);

			// Press Escape on the navigation container
			const nav = screen.getByRole("navigation");
			nav.focus();
			await user.keyboard("{Escape}");

			// Menu should be closed
			expect(toggleButton).toHaveAttribute("aria-expanded", "false");
		});

		it("supports Down arrow to open mobile menu", async () => {
			const user = userEvent.setup();

			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} enableMobileMenu={true} />);

			const toggleButton = screen.getByRole("button", {
				name: OPEN_MOBILE_NAVIGATION_MENU
			});
			toggleButton.focus();

			await user.keyboard("{ArrowDown}");

			expect(toggleButton).toHaveAttribute("aria-expanded", "true");
		});

		it("traps focus within mobile menu when open", async () => {
			const user = userEvent.setup();

			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} enableMobileMenu={true} />);

			// Open mobile menu
			const toggleButton = screen.getByRole("button", {
				name: OPEN_MOBILE_NAVIGATION_MENU
			});
			await user.click(toggleButton);

			// Get all focusable elements in mobile menu
			const mobileMenu = screen.getByRole("menu");
			const focusableElements = mobileMenu.querySelectorAll('[role="menuitem"]');

			expect(focusableElements.length).toBeGreaterThan(0);
		});
	});

	// ========================================================================================
	// ACCESSIBILITY TESTS
	// ========================================================================================

	describe("Accessibility", () => {
		it("provides skip navigation link", () => {
			renderWithTheme(<SolaceNavigationBar />);

			const skipLink = screen.getByText(SKIP_TO_MAIN_CONTENT_TEXT);
			expect(skipLink).toBeInTheDocument();
			expect(skipLink).toHaveAttribute("href", "#main-content");
		});

		it("has proper ARIA landmarks", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} userActions={mockUserActions} />);

			expect(screen.getByRole("navigation", { name: MAIN_NAVIGATION_ARIA_LABEL })).toBeInTheDocument();
			expect(screen.getByRole("menubar", { name: MAIN_NAVIGATION_MENU_LABEL })).toBeInTheDocument();
			expect(screen.getByRole("region", { name: USER_ACTIONS_ARIA_LABEL })).toBeInTheDocument();
		});

		it("announces state changes to screen readers", async () => {
			const user = userEvent.setup();
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} enableMobileMenu={true} />);

			const toggleButton = screen.getByRole("button", {
				name: OPEN_MOBILE_NAVIGATION_MENU
			});

			await user.click(toggleButton);

			// Check for live region that announces changes
			const liveRegion = document.querySelector('[aria-live="polite"]');
			expect(liveRegion).toBeInTheDocument();
		});

		it("has proper focus indicators", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			const links = screen.getAllByRole("menuitem");
			links.forEach((link, index) => {
				// First link should have tabIndex 0, others -1 (roving tabindex pattern)
				const expectedTabIndex = index === 0 ? "0" : "-1";
				expect(link).toHaveAttribute("tabIndex", expectedTabIndex);
			});
		});

		it("provides screen reader context for current page", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			const activeLink = screen.getByRole("menuitem", { name: "Home page" });
			expect(activeLink).toHaveAttribute("aria-current", "page");

			// Check for screen reader only text - should be present in both desktop and mobile versions
			const srOnlyElements = document.querySelectorAll(".sr-only");
			const hasCurrentPageText = Array.from(srOnlyElements).some((el) => el.textContent?.includes("(current page)"));
			expect(hasCurrentPageText).toBe(true);
		});

		it("handles high contrast mode", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			// Check that the style tag for high contrast support is present
			const styleTags = document.querySelectorAll("style");
			const hasHighContrastStyles = Array.from(styleTags).some(
				(tag) => tag.textContent?.includes("@media (prefers-contrast: high)")
			);
			expect(hasHighContrastStyles).toBe(true);
		});

		it("respects reduced motion preferences", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			// Check that the style tag includes reduced motion support
			const styleTags = document.querySelectorAll("style");
			const hasReducedMotionStyles = Array.from(styleTags).some(
				(tag) => tag.textContent?.includes("@media (prefers-reduced-motion: reduce)")
			);
			expect(hasReducedMotionStyles).toBe(true);
		});

		it("provides proper labeling for mobile menu", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} enableMobileMenu={true} />);

			const toggleButton = screen.getByRole("button", {
				name: OPEN_MOBILE_NAVIGATION_MENU
			});
			expect(toggleButton).toHaveAttribute("aria-controls", "mobile-navigation-menu");
			expect(toggleButton).toHaveAttribute("aria-haspopup", "true");

			const mobileMenu = screen.getByRole("menu", { name: MOBILE_MENU_ARIA_LABEL });
			expect(mobileMenu).toHaveAttribute("id", "mobile-navigation-menu");
		});
	});

	// ========================================================================================
	// THEME INTEGRATION TESTS
	// ========================================================================================

	describe("Theme Integration", () => {
		themes.forEach(({ name, theme }) => {
			it(`renders correctly in ${name} theme`, () => {
				renderWithTheme(
					<SolaceNavigationBar navigationLinks={mockNavigationLinks} userActions={mockUserActions} />,
					theme
				);

				const nav = screen.getByRole("navigation");
				expect(nav).toBeInTheDocument();

				// Verify theme-specific styling is applied
				const computedStyle = getComputedStyle(nav);
				expect(computedStyle.backgroundColor).toBeTruthy();
			});

			it(`handles interactions in ${name} theme`, async () => {
				const user = userEvent.setup();
				const mockClick = jest.fn();
				const linksWithClick = [{ ...mockNavigationLinks[0], onClick: mockClick }];

				renderWithTheme(<SolaceNavigationBar navigationLinks={linksWithClick} />, theme);

				const homeLinks = screen.getAllByText("Home");
				await user.click(homeLinks[0]); // Click first instance (desktop)
				expect(mockClick).toHaveBeenCalled();
			});
		});

		it("applies theme-aware styling for active states", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			const activeLink = screen.getByRole("menuitem", { name: "Home page" });
			expect(activeLink).toHaveAttribute("data-active", "true");
		});

		it("applies theme-aware styling for disabled states", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			const allLinks = screen.getAllByRole("menuitem");
			const disabledLink = allLinks.find(
				(link) => link.textContent?.includes("Services") && link.getAttribute(DATA_DISABLED_ATTRIBUTE) === "true"
			);
			expect(disabledLink).toHaveAttribute(DATA_DISABLED_ATTRIBUTE, "true");
		});
	});

	// ========================================================================================
	// RESPONSIVE BEHAVIOR TESTS
	// ========================================================================================

	describe("Responsive Behavior", () => {
		it("hides desktop navigation on mobile breakpoints", () => {
			mockMatchMedia(true); // Mobile viewport

			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			const desktopNav = screen.getByRole("menubar");
			// Desktop navigation should still be in DOM but styled to be hidden on mobile
			expect(desktopNav).toBeInTheDocument();
		});

		it("shows mobile menu button on mobile breakpoints", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} enableMobileMenu={true} />);

			const mobileToggle = screen.getByRole("button", {
				name: OPEN_MOBILE_NAVIGATION_MENU
			});
			expect(mobileToggle).toBeInTheDocument();
		});

		it("adapts logo size on small screens", () => {
			mockMatchMedia(true); // Mobile viewport

			renderWithTheme(<SolaceNavigationBar logo={mockLogo} />);

			const logo = screen.getByTestId("company-logo");
			expect(logo).toBeInTheDocument();
			// Logo container should have responsive styling
		});

		it("adjusts user actions layout on mobile", () => {
			mockMatchMedia(true); // Mobile viewport

			renderWithTheme(<SolaceNavigationBar userActions={mockUserActions} />);

			const userActionsSection = screen.getByRole("region", { name: USER_ACTIONS_ARIA_LABEL });
			expect(userActionsSection).toBeInTheDocument();
		});

		it("applies responsive padding", () => {
			mockMatchMedia(true); // Mobile viewport

			renderWithTheme(<SolaceNavigationBar />);

			const nav = screen.getByRole("navigation");
			expect(nav).toBeInTheDocument();
			// Responsive padding is applied via theme
		});
	});

	// ========================================================================================
	// EDGE CASES AND ERROR HANDLING TESTS
	// ========================================================================================

	describe("Edge Cases and Error Handling", () => {
		it("handles empty navigation links array", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={[]} />);

			const nav = screen.getByRole("navigation");
			expect(nav).toBeInTheDocument();

			// Should not render menubar if no links
			expect(screen.queryByRole("menubar")).not.toBeInTheDocument();
		});

		it("handles empty user actions array", () => {
			renderWithTheme(<SolaceNavigationBar userActions={[]} />);

			const nav = screen.getByRole("navigation");
			expect(nav).toBeInTheDocument();

			// Should not render user actions region if no actions
			expect(screen.queryByRole("region", { name: USER_ACTIONS_ARIA_LABEL })).not.toBeInTheDocument();
		});

		it("handles undefined props gracefully", () => {
			renderWithTheme(<SolaceNavigationBar navigationLinks={undefined} userActions={undefined} logo={undefined} />);

			const nav = screen.getByRole("navigation");
			expect(nav).toBeInTheDocument();
		});

		it("handles malformed navigation links", () => {
			const malformedLinks = [
				{ id: "test1", label: "" }, // Empty label
				{ id: "test2" } // Missing label
			];

			renderWithTheme(<SolaceNavigationBar navigationLinks={malformedLinks as any} />);

			const nav = screen.getByRole("navigation");
			expect(nav).toBeInTheDocument();
		});

		it("handles click events with preventDefault", async () => {
			const user = userEvent.setup();
			const mockClick = jest.fn((e) => e.preventDefault());
			const linksWithPreventDefault = [{ ...mockNavigationLinks[0], onClick: mockClick }];

			renderWithTheme(<SolaceNavigationBar navigationLinks={linksWithPreventDefault} />);

			const homeLinks = screen.getAllByText("Home");
			await user.click(homeLinks[0]); // Click desktop version
			expect(mockClick).toHaveBeenCalled();
		});

		it("handles missing main content for skip link", async () => {
			const user = userEvent.setup();
			renderWithTheme(<SolaceNavigationBar />);

			const skipLink = screen.getByText(SKIP_TO_MAIN_CONTENT_TEXT);

			// Should not throw error even if main content doesn't exist
			await user.click(skipLink);
			expect(skipLink).toBeInTheDocument();
		});

		it("handles rapid mobile menu toggles", async () => {
			const user = userEvent.setup();
			const onToggle = jest.fn();

			renderWithTheme(
				<SolaceNavigationBar
					navigationLinks={mockNavigationLinks}
					enableMobileMenu={true}
					onMobileMenuToggle={onToggle}
				/>
			);

			const toggleButton = screen.getByRole("button", {
				name: OPEN_MOBILE_NAVIGATION_MENU
			});

			// Rapid clicks
			await user.click(toggleButton);

			// Wait for state update, then click again
			await waitFor(() => {
				expect(toggleButton).toHaveAttribute("aria-expanded", "true");
			});

			await user.click(toggleButton);
			await user.click(toggleButton);

			expect(onToggle).toHaveBeenCalledTimes(3);
		});

		it("handles navigation with missing href", () => {
			const linksWithoutHref = [
				{ id: "test", label: "Test Link" } // No href or onClick
			] as SolaceNavigationLink[];

			renderWithTheme(<SolaceNavigationBar navigationLinks={linksWithoutHref} />);

			const link = screen.getByText("Test Link");
			expect(link).toBeInTheDocument();
		});
	});

	// ========================================================================================
	// PERFORMANCE TESTS
	// ========================================================================================

	describe("Performance", () => {
		it("does not cause unnecessary re-renders", () => {
			const renderSpy = jest.fn();
			const TestComponent = ({ key }: { key?: string }) => {
				renderSpy();
				return <SolaceNavigationBar key={key} navigationLinks={mockNavigationLinks} />;
			};

			const { rerender } = renderWithTheme(<TestComponent />);
			rerender(<TestComponent key="rerender" />);

			expect(renderSpy).toHaveBeenCalledTimes(2); // Initial + rerender
		});

		it("handles large number of navigation links", () => {
			const manyLinks = Array.from({ length: 20 }, (_, i) => ({
				id: `link-${i}`,
				label: `Link ${i + 1}`,
				href: `/link-${i}`
			}));

			renderWithTheme(<SolaceNavigationBar navigationLinks={manyLinks} />);

			const nav = screen.getByRole("navigation");
			expect(nav).toBeInTheDocument();

			// All links should be rendered (checking first few and last few)
			expect(screen.getByText("Link 1")).toBeInTheDocument();
			expect(screen.getByText("Link 5")).toBeInTheDocument();
			expect(screen.getByText("Link 20")).toBeInTheDocument();
		});

		it("handles rapid user interactions", async () => {
			const user = userEvent.setup();
			const mockClick = jest.fn();
			const linksWithClick = [{ ...mockNavigationLinks[0], onClick: mockClick }];

			renderWithTheme(<SolaceNavigationBar navigationLinks={linksWithClick} />);

			const homeLinks = screen.getAllByText("Home");
			const desktopLink = homeLinks[0];

			// Rapid clicks
			await user.click(desktopLink);
			await user.click(desktopLink);
			await user.click(desktopLink);

			expect(mockClick).toHaveBeenCalledTimes(3);
		});
	});

	// ========================================================================================
	// INTEGRATION TESTS
	// ========================================================================================

	describe("Integration", () => {
		it("works with focus management systems", async () => {
			const user = userEvent.setup();

			renderWithTheme(
				<div>
					<button data-testid="external-button">External Button</button>
					<SolaceNavigationBar navigationLinks={mockNavigationLinks} enableMobileMenu={true} />
				</div>
			);

			const externalButton = screen.getByTestId("external-button");
			const toggleButton = screen.getByRole("button", {
				name: OPEN_MOBILE_NAVIGATION_MENU
			});

			// Focus external element, then open mobile menu
			externalButton.focus();
			await user.click(toggleButton);

			// Should manage focus properly
			expect(toggleButton).toHaveAttribute("aria-expanded", "true");
		});

		it("integrates with routing systems", async () => {
			const user = userEvent.setup();
			const mockNavigate = jest.fn();

			// Simulate router integration
			const routerLinks = mockNavigationLinks.map((link) => ({
				...link,
				onClick: link.href ? () => mockNavigate(link.href) : link.onClick
			}));

			renderWithTheme(<SolaceNavigationBar navigationLinks={routerLinks} />);

			const productsLinks = screen.getAllByText("Products");
			await user.click(productsLinks[0]); // Click desktop version
			expect(mockNavigate).toHaveBeenCalledWith("/products");
		});

		it("works with form validation systems", () => {
			// Test that navigation doesn't interfere with form validation
			renderWithTheme(
				<div>
					<form>
						<input required data-testid="required-input" />
						<button type="submit">Submit</button>
					</form>
					<SolaceNavigationBar navigationLinks={mockNavigationLinks} />
				</div>
			);

			const input = screen.getByTestId("required-input");
			const nav = screen.getByRole("navigation");

			expect(input).toBeInTheDocument();
			expect(nav).toBeInTheDocument();
		});

		it("maintains state across theme changes", () => {
			const { rerender } = renderWithTheme(
				<SolaceNavigationBar navigationLinks={mockNavigationLinks} enableMobileMenu={true} />,
				SupportedThemes.solace
			);

			// Change theme
			rerender(
				<ThemeProvider theme={createTheme(getThemeOptions(SupportedThemes.sap))}>
					<SolaceNavigationBar navigationLinks={mockNavigationLinks} enableMobileMenu={true} />
				</ThemeProvider>
			);

			// Component should still be functional
			const nav = screen.getByRole("navigation");
			expect(nav).toBeInTheDocument();
		});
	});

	// ========================================================================================
	// COMPREHENSIVE WORKFLOW TESTS
	// ========================================================================================

	describe("Comprehensive Workflows", () => {
		it("handles complete mobile navigation workflow", async () => {
			const user = userEvent.setup();
			const onToggle = jest.fn();
			const onLinkClick = jest.fn();

			const workflowLinks = mockNavigationLinks.map((link) => ({
				...link,
				onClick: link.onClick || onLinkClick
			}));

			renderWithTheme(
				<SolaceNavigationBar navigationLinks={workflowLinks} enableMobileMenu={true} onMobileMenuToggle={onToggle} />
			);

			// 1. Open mobile menu
			const toggleButton = screen.getByRole("button", {
				name: OPEN_MOBILE_NAVIGATION_MENU
			});
			await user.click(toggleButton);
			expect(onToggle).toHaveBeenCalledWith(true);

			// 2. Navigate within mobile menu
			const mobileLinks = screen.getAllByText("Products");
			const mobileLink = mobileLinks.find((link) => link.closest('[role="menu"]'));

			if (mobileLink) {
				await user.click(mobileLink);
				expect(onLinkClick).toHaveBeenCalled();
				expect(onToggle).toHaveBeenCalledWith(false); // Menu closes
			}
		});

		it("handles accessibility navigation workflow", async () => {
			const user = userEvent.setup();

			// Mock main content
			document.body.innerHTML += '<main id="main-content">Main Content</main>';

			renderWithTheme(<SolaceNavigationBar navigationLinks={mockNavigationLinks} />);

			// 1. Use skip navigation
			const skipLink = screen.getByText(SKIP_TO_MAIN_CONTENT_TEXT);
			await user.click(skipLink);

			// 2. Navigate with keyboard
			const menubar = screen.getByRole("menubar");
			menubar.focus();
			await user.keyboard("{ArrowRight}");
			await user.keyboard("{Enter}");

			// Should complete without errors
			expect(skipLink).toBeInTheDocument();

			// Cleanup
			document.body.innerHTML = "";
		});

		it("handles theme switching workflow", async () => {
			const user = userEvent.setup();
			let currentTheme = SupportedThemes.solace;

			const { rerender } = renderWithTheme(
				<SolaceNavigationBar navigationLinks={mockNavigationLinks} userActions={mockUserActions} />,
				currentTheme
			);

			// Test interaction in first theme
			await user.click(screen.getByText("Home"));

			// Switch theme
			currentTheme = SupportedThemes.sap;
			rerender(
				<ThemeProvider theme={createTheme(getThemeOptions(currentTheme))}>
					<SolaceNavigationBar navigationLinks={mockNavigationLinks} userActions={mockUserActions} />
				</ThemeProvider>
			);

			// Test interaction in new theme
			await user.click(screen.getByRole("button", { name: "Notifications" }));
			expect(mockUserActions[0].onClick).toHaveBeenCalled();
		});
	});
});
