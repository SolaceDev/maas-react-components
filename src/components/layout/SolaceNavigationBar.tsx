import { styled } from "@mui/material";
import React from "react";
import SolaceComponentProps from "../SolaceComponentProps";
import { useLinkClickHandler, useMobileMenu, useUserActionClickHandler } from "./useSolaceNavigationBar";

/* eslint-disable @typescript-eslint/no-unused-vars */
// Phase 2 theme implementation: Styled components and theme-aware styling implemented

/**
 * Navigation link item structure for navigation menu items
 */
export interface SolaceNavigationLink {
	/**
	 * Unique identifier for the navigation link
	 */
	id: string;
	/**
	 * Display text for the navigation link
	 */
	label: string;
	/**
	 * URL or route for the link
	 */
	href?: string;
	/**
	 * Click handler for the link
	 */
	onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
	/**
	 * Whether the link is currently active/selected
	 */
	active?: boolean;
	/**
	 * Whether the link is disabled
	 */
	disabled?: boolean;
	/**
	 * Optional icon component to display with the link
	 */
	icon?: React.ReactNode;
	/**
	 * Nested menu items for dropdown functionality
	 */
	subLinks?: SolaceNavigationLink[];
	/**
	 * Whether to open link in new tab/window
	 */
	target?: "_blank" | "_self" | "_parent" | "_top";
	/**
	 * ARIA label for accessibility
	 */
	ariaLabel?: string;
}

/**
 * User action item structure for right-side actions (profile menu, notifications, etc.)
 */
export interface SolaceNavigationUserAction {
	/**
	 * Unique identifier for the user action
	 */
	id: string;
	/**
	 * Display text or content for the action
	 */
	content: React.ReactNode;
	/**
	 * Click handler for the action
	 */
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	/**
	 * Whether the action is disabled
	 */
	disabled?: boolean;
	/**
	 * Optional tooltip text
	 */
	tooltip?: string;
	/**
	 * ARIA label for accessibility
	 */
	ariaLabel?: string;
}

/**
 * Props interface for the SolaceNavigationBar component
 *
 * Provides comprehensive configuration options for a responsive navigation bar
 * with support for logo, navigation links, user actions, and mobile functionality.
 */
export interface SolaceNavigationBarProps extends SolaceComponentProps {
	/**
	 * Logo or brand element to display on the left side of the navigation bar
	 */
	logo?: React.ReactNode;
	/**
	 * Primary navigation links array to display in the navigation menu
	 */
	navigationLinks?: SolaceNavigationLink[];
	/**
	 * User actions to display on the right side (profile menu, notifications, etc.)
	 */
	userActions?: SolaceNavigationUserAction[];
	/**
	 * Whether to show mobile hamburger menu on small screens
	 * @default true
	 */
	enableMobileMenu?: boolean;
	/**
	 * Custom mobile breakpoint in pixels for responsive behavior
	 * @default 768
	 */
	mobileBreakpoint?: number;
	/**
	 * Whether the navigation bar should stick to the top when scrolling
	 * @default false
	 */
	sticky?: boolean;
	/**
	 * Custom height for the navigation bar (string with units or number in px)
	 */
	height?: string | number;
	/**
	 * Background color override for the navigation bar
	 */
	backgroundColor?: string;
	/**
	 * Whether to add a bottom border to the navigation bar
	 * @default true
	 */
	bottomBorder?: boolean;
	/**
	 * z-index value for positioning control
	 */
	zIndex?: number;
	/**
	 * Callback function triggered when mobile menu is toggled
	 * @param isOpen - Whether the mobile menu is now open
	 */
	onMobileMenuToggle?: (isOpen: boolean) => void;
	/**
	 * Maximum width for the navigation content container
	 */
	maxWidth?: string | number;
	/**
	 * Whether to center the navigation content within its container
	 * @default false
	 */
	centerContent?: boolean;
	/**
	 * Additional CSS class name for custom styling
	 */
	className?: string;
	/**
	 * Custom inline styles for the navigation container
	 */
	style?: React.CSSProperties;
}

// ========================================================================================
// STYLED COMPONENTS - Theme-aware styling for all 4 supported themes
// ========================================================================================

// Constants for common transition configurations
const TRANSITION_SHORT = ["background-color", "color"];
const TRANSITION_STANDARD_PROPS = ["max-height", "opacity"];
const TRANSITION_TRANSFORM_OPACITY = ["transform", "opacity"];

// Constants for common styles
const CURSOR_NOT_ALLOWED = "not-allowed";
const DATA_DISABLED_SELECTOR = "&[data-disabled='true']";

/**
 * Main navigation container with theme-aware styling
 * Supports sticky positioning, custom heights, and responsive behavior
 */
const NavigationContainer = styled("nav", {
	shouldForwardProp: (prop) =>
		!["sticky", "height", "backgroundColor", "bottomBorder", "zIndex"].includes(prop as string)
})<{
	sticky?: boolean;
	height?: string | number;
	backgroundColor?: string;
	bottomBorder?: boolean;
	zIndex?: number;
}>(({ theme, sticky, height, backgroundColor, bottomBorder, zIndex }) => ({
	position: sticky ? "sticky" : "static",
	top: sticky ? 0 : "auto",
	left: 0,
	right: 0,
	zIndex: zIndex || (sticky ? theme.zIndex.appBar : "auto"),
	height: typeof height === "number" ? `${height}px` : height || theme.spacing(8),
	backgroundColor: backgroundColor || theme.palette.ux.background.w10,
	borderBottom: bottomBorder ? `1px solid ${theme.palette.ux.secondary.w40}` : "none",
	boxShadow: sticky ? `0 2px 4px ${theme.palette.ux.stateLayer.w10}` : "none",
	transition: theme.transitions.create(["box-shadow", "background-color"], {
		duration: theme.transitions.duration.short,
		easing: theme.transitions.easing.easeInOut
	})
}));

/**
 * Content wrapper with responsive max-width and centering options
 */
const NavigationContent = styled("div", {
	shouldForwardProp: (prop) => !["maxWidth", "centerContent"].includes(prop as string)
})<{
	maxWidth?: string | number;
	centerContent?: boolean;
}>(({ theme, maxWidth, centerContent }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	height: "100%",
	padding: theme.spacing(0, 3),
	maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth || "none",
	margin: centerContent ? "0 auto" : "0",
	position: "relative",

	// Responsive padding adjustments
	[theme.breakpoints.down("md")]: {
		padding: theme.spacing(0, 2)
	},
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(0, 1.5)
	}
}));

/**
 * Logo section styling with responsive behavior
 */
const LogoSection = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	minWidth: 0, // Allow shrinking
	marginRight: theme.spacing(2),

	// Logo responsive behavior
	[theme.breakpoints.down("sm")]: {
		marginRight: theme.spacing(1),
		"& img": {
			maxHeight: theme.spacing(4)
		}
	}
}));

/**
 * Navigation links container - hidden on mobile, shown on desktop
 */
const NavigationLinks = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(0.5),
	flex: 1,
	justifyContent: "center",

	// Hide on mobile, show mobile menu instead
	[theme.breakpoints.down("md")]: {
		display: "none"
	}
}));

/**
 * Individual navigation link styling with theme-aware states
 */
const NavigationLink = styled("a")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(1),
	padding: theme.spacing(1.5, 2),
	color: theme.palette.ux.primary.text.wMain,
	textDecoration: "none",
	fontSize: theme.typography.body1.fontSize,
	fontWeight: theme.typography.body1.fontWeight,
	fontFamily: theme.typography.body1.fontFamily,
	borderRadius: theme.shape.borderRadius,
	transition: theme.transitions.create(TRANSITION_SHORT, {
		duration: theme.transitions.duration.short,
		easing: theme.transitions.easing.easeInOut
	}),
	whiteSpace: "nowrap",
	minHeight: theme.spacing(5),

	// Hover state
	"&:hover:not([data-disabled='true'])": {
		backgroundColor: theme.palette.ux.stateLayer.w10,
		color: theme.palette.ux.brand.wMain
	},

	// Active state
	"&[data-active='true']:not([data-disabled='true'])": {
		backgroundColor: theme.palette.ux.brand.w10,
		color: theme.palette.ux.brand.wMain,
		fontWeight: theme.typography.fontWeightMedium,
		position: "relative",

		// Active indicator
		"&::after": {
			content: '""',
			position: "absolute",
			bottom: 0,
			left: "50%",
			transform: "translateX(-50%)",
			width: "calc(100% - 16px)",
			height: "2px",
			backgroundColor: theme.palette.ux.brand.wMain,
			borderRadius: "1px"
		}
	},

	// Disabled state
	[DATA_DISABLED_SELECTOR]: {
		color: theme.palette.ux.secondary.text.wMain,
		cursor: CURSOR_NOT_ALLOWED,
		opacity: 0.6
	},

	// Focus state for accessibility
	"&:focus-visible": {
		outline: `2px solid ${theme.palette.ux.accent.n2.wMain}`,
		outlineOffset: "2px"
	}
}));

/**
 * Navigation link icon styling
 */
const NavigationLinkIcon = styled("span")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	fontSize: theme.spacing(2.5),
	"& svg": {
		width: "1em",
		height: "1em",
		fill: "currentColor"
	}
}));

/**
 * Navigation link label styling
 */
const NavigationLinkLabel = styled("span")(() => ({
	flex: 1,
	minWidth: 0
}));

/**
 * User actions section - right side of navigation
 */
const UserActionsSection = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(1),
	marginLeft: theme.spacing(2),

	[theme.breakpoints.down("sm")]: {
		marginLeft: theme.spacing(1),
		gap: theme.spacing(0.5)
	}
}));

/**
 * Individual user action container
 */
const UserActionContainer = styled("div")(() => ({
	display: "flex",
	alignItems: "center"
}));

/**
 * User action button styling
 */
const UserActionButton = styled("button")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: theme.spacing(1),
	backgroundColor: "transparent",
	border: "none",
	borderRadius: theme.shape.borderRadius,
	color: theme.palette.ux.primary.text.wMain,
	cursor: "pointer",
	minWidth: theme.spacing(5),
	minHeight: theme.spacing(5),
	transition: theme.transitions.create(TRANSITION_SHORT, {
		duration: theme.transitions.duration.short,
		easing: theme.transitions.easing.easeInOut
	}),

	// Hover state
	"&:hover:not(:disabled)": {
		backgroundColor: theme.palette.ux.stateLayer.w10,
		color: theme.palette.ux.brand.wMain
	},

	// Focus state
	"&:focus-visible": {
		outline: `2px solid ${theme.palette.ux.accent.n2.wMain}`,
		outlineOffset: "2px"
	},

	// Disabled state
	"&:disabled": {
		color: theme.palette.ux.secondary.text.wMain,
		cursor: CURSOR_NOT_ALLOWED,
		opacity: 0.6
	}
}));

/**
 * Mobile menu toggle button - visible only on mobile
 */
const MobileMenuToggle = styled("button")(({ theme }) => ({
	display: "none",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: theme.spacing(6),
	height: theme.spacing(6),
	padding: theme.spacing(1),
	backgroundColor: "transparent",
	border: "none",
	borderRadius: theme.shape.borderRadius,
	color: theme.palette.ux.primary.text.wMain,
	cursor: "pointer",
	transition: theme.transitions.create(TRANSITION_SHORT, {
		duration: theme.transitions.duration.short,
		easing: theme.transitions.easing.easeInOut
	}),

	// Show on mobile
	[theme.breakpoints.down("md")]: {
		display: "flex"
	},

	// Hover state
	"&:hover": {
		backgroundColor: theme.palette.ux.stateLayer.w10,
		color: theme.palette.ux.brand.wMain
	},

	// Focus state
	"&:focus-visible": {
		outline: `2px solid ${theme.palette.ux.accent.n2.wMain}`,
		outlineOffset: "2px"
	}
}));

/**
 * Mobile menu hamburger icon styling
 */
const MobileMenuIcon = styled("span", {
	shouldForwardProp: (prop) => prop !== "isOpen"
})<{
	isOpen?: boolean;
}>(({ theme, isOpen }) => ({
	display: "flex",
	flexDirection: "column",
	width: theme.spacing(3),
	height: theme.spacing(2),
	position: "relative",

	"& span": {
		display: "block",
		height: "2px",
		width: "100%",
		backgroundColor: "currentColor",
		borderRadius: "1px",
		position: "absolute",
		transition: theme.transitions.create(TRANSITION_TRANSFORM_OPACITY, {
			duration: theme.transitions.duration.short,
			easing: theme.transitions.easing.easeInOut
		}),

		"&:nth-of-type(1)": {
			top: 0,
			transform: isOpen ? "translateY(6px) rotate(45deg)" : "translateY(0) rotate(0)"
		},
		"&:nth-of-type(2)": {
			top: "6px",
			opacity: isOpen ? 0 : 1
		},
		"&:nth-of-type(3)": {
			top: "12px",
			transform: isOpen ? "translateY(-6px) rotate(-45deg)" : "translateY(0) rotate(0)"
		}
	}
}));

/**
 * Mobile menu panel - slides in from the top
 */
const MobileMenuPanel = styled("div", {
	shouldForwardProp: (prop) => prop !== "isOpen"
})<{
	isOpen?: boolean;
}>(({ theme, isOpen }) => ({
	position: "absolute",
	top: "100%",
	left: 0,
	right: 0,
	backgroundColor: theme.palette.ux.background.w10,
	boxShadow: `0 4px 6px ${theme.palette.ux.stateLayer.w10}`,
	maxHeight: isOpen ? "calc(100vh - 100%)" : 0,
	opacity: isOpen ? 1 : 0,
	overflowY: "auto",
	transition: theme.transitions.create(TRANSITION_STANDARD_PROPS, {
		duration: theme.transitions.duration.enteringScreen,
		easing: theme.transitions.easing.easeOut
	}),
	borderTop: `1px solid ${theme.palette.ux.secondary.w40}`
}));

/**
 * Mobile navigation link styling
 */
const MobileNavigationLink = styled("a")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(2),
	padding: theme.spacing(2, 3),
	color: theme.palette.ux.primary.text.wMain,
	textDecoration: "none",
	fontSize: theme.typography.body1.fontSize,
	fontWeight: theme.typography.body1.fontWeight,
	fontFamily: theme.typography.body1.fontFamily,
	borderBottom: `1px solid ${theme.palette.ux.secondary.w40}`,
	transition: theme.transitions.create(TRANSITION_SHORT, {
		duration: theme.transitions.duration.short,
		easing: theme.transitions.easing.easeInOut
	}),

	"&:last-child": {
		borderBottom: "none"
	},

	"&:hover:not([data-disabled='true'])": {
		backgroundColor: theme.palette.ux.stateLayer.w10,
		color: theme.palette.ux.brand.wMain
	},

	"&[data-active='true']:not([data-disabled='true'])": {
		backgroundColor: theme.palette.ux.brand.w10,
		color: theme.palette.ux.brand.wMain,
		fontWeight: theme.typography.fontWeightMedium
	},

	[DATA_DISABLED_SELECTOR]: {
		color: theme.palette.ux.secondary.text.wMain,
		cursor: CURSOR_NOT_ALLOWED,
		opacity: 0.6
	},

	"&:focus-visible": {
		outline: `2px solid ${theme.palette.ux.accent.n2.wMain}`,
		outlineOffset: "-2px"
	}
}));

/**
 * Mobile navigation link icon styling
 */
const MobileNavigationLinkIcon = styled("span")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	fontSize: theme.spacing(3)
}));

/**
 * Mobile navigation link label styling
 */
const MobileNavigationLinkLabel = styled("span")(() => ({
	flex: 1,
	minWidth: 0
}));

const SolaceNavigationBar = React.forwardRef<HTMLElement, SolaceNavigationBarProps>(
	(
		{
			logo,
			navigationLinks = [],
			userActions = [],
			enableMobileMenu = true,
			mobileBreakpoint = 768,
			sticky = false,
			height,
			backgroundColor,
			bottomBorder = true,
			zIndex,
			onMobileMenuToggle,
			maxWidth,
			centerContent = false,
			className,
			style,
			...rest
		}: SolaceNavigationBarProps,
		ref
	) => {
		const { mobileMenuOpen, handleMobileMenuToggle } = useMobileMenu(onMobileMenuToggle);
		const handleLinkClick = useLinkClickHandler(handleMobileMenuToggle, mobileMenuOpen);
		const handleUserActionClick = useUserActionClickHandler();

		return (
			<NavigationContainer
				ref={ref}
				sticky={sticky}
				height={height}
				backgroundColor={backgroundColor}
				bottomBorder={bottomBorder}
				zIndex={zIndex}
				className={className}
				style={style}
				aria-label="Main navigation"
				role="navigation"
				{...rest}
			>
				<NavigationContent maxWidth={maxWidth} centerContent={centerContent}>
					{logo && <LogoSection>{logo}</LogoSection>}
					<NavigationLinks role="menubar" aria-label="Main navigation menu">
						{navigationLinks.map((link) => (
							<NavigationLink
								key={link.id}
								href={link.href}
								onClick={(e) => handleLinkClick(link, e)}
								data-active={link.active}
								data-disabled={link.disabled}
								aria-current={link.active ? "page" : undefined}
								aria-label={link.ariaLabel || link.label}
								aria-disabled={link.disabled}
								target={link.target}
							>
								{link.icon && <NavigationLinkIcon aria-hidden="true">{link.icon}</NavigationLinkIcon>}
								<NavigationLinkLabel>{link.label}</NavigationLinkLabel>
								{link.active && <span className="sr-only"> (current page)</span>}
							</NavigationLink>
						))}
					</NavigationLinks>
					<UserActionsSection role="region" aria-label="User actions">
						{userActions.map((action) => (
							<UserActionContainer key={action.id} title={action.tooltip}>
								<UserActionButton
									onClick={(e) => handleUserActionClick(action, e)}
									disabled={action.disabled}
									aria-label={action.ariaLabel || action.tooltip}
								>
									{action.content}
								</UserActionButton>
							</UserActionContainer>
						))}
					</UserActionsSection>
					{enableMobileMenu && (
						<MobileMenuToggle
							onClick={handleMobileMenuToggle}
							aria-expanded={mobileMenuOpen}
							aria-controls="mobile-navigation-menu"
							aria-haspopup="true"
							aria-label={mobileMenuOpen ? "Close mobile navigation menu" : "Open mobile navigation menu"}
						>
							<MobileMenuIcon isOpen={mobileMenuOpen} aria-hidden="true">
								<span />
								<span />
								<span />
							</MobileMenuIcon>
						</MobileMenuToggle>
					)}
				</NavigationContent>
				{enableMobileMenu && (
					<MobileMenuPanel
						isOpen={mobileMenuOpen}
						aria-hidden={!mobileMenuOpen}
						role="menu"
						aria-label="Mobile navigation menu"
					>
						{navigationLinks.map((link) => (
							<MobileNavigationLink
								key={`${link.id}-mobile`}
								href={link.href}
								onClick={(e) => handleLinkClick(link, e)}
								data-active={link.active}
								data-disabled={link.disabled}
								aria-current={link.active ? "page" : undefined}
								aria-label={link.ariaLabel || link.label}
								aria-disabled={link.disabled}
								target={link.target}
							>
								{link.icon && <MobileNavigationLinkIcon aria-hidden="true">{link.icon}</MobileNavigationLinkIcon>}
								<MobileNavigationLinkLabel>{link.label}</MobileNavigationLinkLabel>
								{link.active && <span className="sr-only"> (current page)</span>}
							</MobileNavigationLink>
						))}
					</MobileMenuPanel>
				)}
			</NavigationContainer>
		);
	}
);

// Display name for debugging
SolaceNavigationBar.displayName = "SolaceNavigationBar";

export default SolaceNavigationBar;
