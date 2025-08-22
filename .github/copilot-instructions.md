# Copilot Instructions for maas-react-components

This repository contains **maas-react-components (MRC)**, a React component library that standardizes UI development across Solace projects and applications. Built on Material-UI (MUI), MRC implements Solace UX Figma design patterns to ensure consistency between design and development.

## Project Overview

- **Primary Language**: TypeScript with React
- **Framework**: Material-UI (MUI) v5
- **License**: Apache 2.0
- **Component Prefix**: All components are prefixed with "Solace" (e.g., `SolaceButton`, `SolaceCard`)
- **Target**: AA WCAG compliant, accessible, and themable components

## Architecture and Patterns

### Component Structure

- **Base Interface**: All components extend `SolaceComponentProps` from `src/components/SolaceComponentProps.ts`
- **Props Interface**: Each component has its own TypeScript interface (e.g., `SolaceButtonProps`)
- **Naming Convention**: `Solace[ComponentName]` for components and `Solace[ComponentName]Props` for interfaces
- **File Location**: Components in `src/components/` organized by category (container, input, navigation, etc.)

### Code Standards

- **Copyright Header**: All files must include Solace copyright header (2023-2025)
- **License**: Apache License 2.0 reference required in file headers
- **ESLint**: Strict linting rules enforced
- **Prettier**: Code formatting standardized
- **TypeScript**: Strict type checking enabled

### Required File Header Template

```typescript
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
```

### Component Development Guidelines

#### When Creating New Components:

1. **Extend Base Props**: Always extend `SolaceComponentProps`
2. **MUI Integration**: Use MUI components as the foundation
3. **Theme Integration**: Use `useTheme()` hook and `theme.palette.ux.*` paths
4. **Accessibility**: Include proper ARIA labels, roles, and WCAG compliance
5. **Data Attributes**: Support `dataQa` and `dataTags` for testing
6. **TypeScript**: Define comprehensive prop interfaces with proper typing

#### Component Props Pattern:

```typescript
export interface SolaceComponentNameProps extends SolaceComponentProps {
	// Required props (no ?)
	variant: "primary" | "secondary" | "tertiary";

	// Optional props (with ?)
	disabled?: boolean;
	size?: "small" | "medium" | "large";

	// Event handlers
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;

	// Content
	children?: React.ReactNode;
}
```

#### Component Implementation Pattern:

```typescript
function SolaceComponentName({
  variant = "primary",
  disabled = false,
  dataQa,
  dataTags,
  ariaLabel,
  ...otherProps
}: SolaceComponentNameProps): JSX.Element {
  const theme = useTheme();

  return (
    <MuiComponent
      data-qa={dataQa}
      data-tags={dataTags}
      aria-label={ariaLabel}
      {...otherProps}
    >
      {/* Component content */}
    </MuiComponent>
  );
}

export default SolaceComponentName;
```

### Documentation Requirements

#### Storybook Stories

- **Location**: `storybook/src/stories/[category]/[component]/`
- **Files Required**:
  - `SolaceComponentName.stories.tsx` - Interactive examples
  - `SolaceComponentName.mdx` - Comprehensive documentation
- **Categories**: accessibility, container, data-display, data-visualization, input, layout, messaging, navigation, style

#### Story Structure:

```typescript
export default {
  title: "Category/ComponentName",
  component: SolaceComponentName,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
  argTypes: {
    // Define controls for interactive props
  },
};
```

#### MDX Documentation Requirements:

- Component description and purpose
- Reference to Figma design patterns
- Supported props with TypeScript types
- Implementation examples
- Accessibility guidelines
- When to use / when not to use

### Testing Guidelines

#### Test Data Attributes:

- **Primary Testing**: Use `dataQa` prop for component identification in Jest/React Testing Library tests
  - Renders as `data-qa` attribute (or converted to `data-testid` in some components)
  - Use with `getByTestId()`, `findByTestId()`, `queryByTestId()` testing queries
  - Follow pattern: `data-qa="componentName-element"`
- **Secondary Metadata**: Use `dataTags` for additional test metadata and analytics
  - Renders as `data-tags` attribute
  - Used for more complex test scenarios or tracking purposes
- **Best Practice**: Prefer `dataQa` for primary element identification in tests

#### Accessibility Testing:

- Ensure WCAG AA compliance
- Include proper ARIA attributes
- Test keyboard navigation
- Verify screen reader compatibility

### Development Workflow

#### PR Requirements:

- **Versioning**: Include `solace_patch:`, `solace_minor:`, or `solace_major:` in PR title
- **Jira**: Link to appropriate Jira ticket (SC Guild -> UI, Repositories -> maas-react-components)
- **Reviewers**: CODEOWNERS automatically added
- **Visual Changes**: Include screenshots or video
- **Chromatic**: Visual regression testing required

#### Branch Strategy:

- All changes via feature branches
- Merge to `main` branch only
- No direct commits to main

#### Release Process:

1. Merge PR triggers GitHub Actions
2. Chromatic publish for visual testing
3. Manual release creation required
4. NPM package publishing to GitHub Packages

### Common Patterns to Follow

#### Theme Usage:

```typescript
const theme = useTheme();
const customColor = theme.palette.ux.primary.w100;
```

#### Error Handling:

- Use `SolaceErrorBox` for error display
- Implement proper error boundaries
- Provide meaningful error messages

#### Loading States:

- Use `SolaceCircularProgress` or `SolaceLinearProgress`
- Implement proper loading indicators
- Consider skeleton states for content

#### Responsive Design:

- Use MUI breakpoints: `theme.breakpoints.up('md')`
- Implement mobile-first approach
- Test across different screen sizes

### Avoid These Anti-Patterns

1. **Don't**: Create components without extending `SolaceComponentProps`
2. **Don't**: Skip copyright headers
3. **Don't**: Ignore accessibility requirements
4. **Don't**: Use inline styles instead of theme system
5. **Don't**: Create components without corresponding Storybook documentation
6. **Don't**: Skip TypeScript prop interfaces
7. **Don't**: Modify existing component APIs without considering breaking changes

### File Organization

```
src/
├── components/          # Component implementations
│   ├── SolaceCard.tsx  # Individual components
│   ├── form/           # Form-related components
│   ├── layout/         # Layout components
│   └── ...
├── types/              # TypeScript type definitions
├── theming/            # Theme configuration
├── hooks/              # Custom React hooks
└── resources/          # Icons, assets, utilities

storybook/src/stories/
├── About.mdx           # Getting started documentation
├── Installation.mdx    # Setup instructions
├── container/          # Container component stories
├── input/              # Input component stories
└── ...
```

### Tools and Commands

- **Development**: `npm start` - Start development with Storybook
- **Build**: `npm run build` - Build component library
- **Lint**: `npm run test:lint` - Run ESLint
- **Format**: `npm run prettier:fix` - Format code
- **Test**: `npm run test` - Run unit tests

### Integration Notes

- **Package Name**: `@SolaceDev/maas-react-components`
- **Registry**: GitHub Packages
- **Peer Dependencies**: React 18.2.0+, react-router-dom 5.3.4+
- **Bundle**: Available in CJS and Modern ES formats

## When Working on Issues

1. **Understand the Context**: Review existing component patterns before implementing
2. **Follow Conventions**: Use established naming and structure patterns
3. **Consider Accessibility**: Ensure WCAG compliance from the start
4. **Document Changes**: Update both code comments and Storybook documentation
5. **Test Thoroughly**: Include visual, functional, and accessibility testing
6. **Think Mobile-First**: Ensure responsive design principles
7. **Maintain Consistency**: Keep component APIs consistent with existing patterns

Remember: This is a design system used across multiple applications, so consistency and quality are paramount. When in doubt, follow existing patterns and ask for clarification.
