# Claude Code Configuration for MaaS React Components

This file provides context for Claude Code and its subagents when working with the MaaS React Components repository.

## Repository Context

**Project**: MaaS React Components Library  
**Type**: Component Library  
**Framework**: React 18.2.0 + Material-UI v5 + TypeScript  
**Build**: Microbundle (CJS + ESM)  
**Documentation**: Storybook v8  
**Themes**: 4 supported (Solace, SAP, Boomi, Base)

## Available External Integrations

### ✅ Confirmed Available

- **GitHub**: Token configured (`GITHUB_TOKEN` environment variable)
  - Repository: MaaS React Components
  - Current branch: `sthomas/claude-subagents`
  - Main branch: `main`
- **Git**: Full access via Bash tool
- **WebFetch**: Can access public APIs (Figma, Confluence, etc.)

### 🔧 Check Before Using

- **Figma MCP**: Direct Figma file access (verify availability)
- **Jira MCP**: Issue tracking integration (verify availability)
- **Confluence MCP**: Documentation integration (verify availability)

## Micro-Specialized Agents Architecture

### 🎯 **NEW: Micro-Agent Workflow** (Optimal for Demonstrations)

**See `micro-agents-architecture.md` for complete specifications**

1. **Component Scaffolder** - Basic structure & TypeScript interfaces only
2. **Figma Design Extractor** - Extract design specs using chunked approach
3. **Theme Implementation** - Apply 4-theme support & responsive design
4. **Accessibility Enhancement** - WCAG 2.1 AA compliance features
5. **Test Suite Generator** - Comprehensive test coverage creation
6. **Storybook Documentation** - Interactive documentation & stories
7. **Orchestrator Agent** - Coordinates all micro-agents in sequence

### External Integration Agents (Preserved)

1. **Atlassian Integration** (`atlassian-integration`) - Jira tickets and Confluence docs
2. **GitHub Integration** - Available via GitHub API and WebFetch

### Legacy Agents (Removed)

- ⚠️ **Monolithic agents** replaced with focused micro-agent workflow
- ⚠️ **figma-design-sync** replaced with `figma-design-extractor` for consistency
- ⚠️ **Legacy multi-purpose agents** replaced with specialized micro-agents

### ✅ Enhanced Figma Integration (VERIFIED WORKING)

- **Figma-Context-MCP Server**: Direct access to private design files confirmed working
- **Function**: `mcp__Figma-Context-MCP__get_figma_data`
- **Successful Pattern Access**: Proven with Empty States pattern (fileKey: 4Y6nwn19uTNgpxzNAP5Vqe)
- **Comprehensive Data Extraction**: Typography, colors, spacing, layouts, component variants
- **Enhanced Subagent**: See `figma-enhanced-subagent.md` for detailed implementation

#### 🚨 CRITICAL: Figma-Context-MCP Usage Guidelines

**ALWAYS follow these rules when using `mcp__Figma-Context-MCP__get_figma_data`:**

1. **NEVER fetch entire file data at once** - Tool responses are extremely large and will cause failures
2. **ALWAYS use chunked approach** - Break down requests into specific nodes or sections
3. **Use specific nodeId parameter** - Target individual components, frames, or pages
4. **Start with file structure** - First call without nodeId to understand file organization
5. **Then target specific nodes** - Use discovered node IDs for detailed component data

**Correct Usage Pattern:**

```typescript
// Step 1: Get file structure and top-level nodes
mcp__Figma - Context - MCP__get_figma_data({ fileKey: "abc123" });

// Step 2: Target specific node for detailed data
mcp__Figma -
	Context -
	MCP__get_figma_data({
		fileKey: "abc123",
		nodeId: "123:456" // Specific component/frame ID
	});

// Step 3: Get additional nodes as needed
mcp__Figma -
	Context -
	MCP__get_figma_data({
		fileKey: "abc123",
		nodeId: "789:012" // Another specific node
	});
```

**❌ INCORRECT - Will Fail:**

```typescript
// This will fail - too much data at once
mcp__Figma -
	Context -
	MCP__get_figma_data({
		fileKey: "abc123" // No nodeId = entire file = failure
	});
```

**✅ CORRECT - Chunked Approach:**

```typescript
// This will succeed - targeted node access
mcp__Figma -
	Context -
	MCP__get_figma_data({
		fileKey: "abc123",
		nodeId: "123:456" // Specific node only
	});
```

## Repository-Specific Patterns

### Component Structure

```
/src/components/
├── form/           # Input components (buttons, fields, etc.)
├── layout/         # Layout components (grids, stacks, panels)
├── table/          # Complex table with hooks
├── dialog/         # Modals and dialogs
└── ...
```

### Naming Conventions

- All components prefixed with "Solace" (e.g., `SolaceButton`)
- TypeScript interfaces: `SolaceComponentProps`
- Story files: `ComponentName.stories.tsx`
- Test files: `ComponentName.test.tsx`

### Theme Integration

- Theme mappings in `/src/theming/`
- Use `getThemeMappings()` for brand-specific styling
- Support all 4 themes: Solace, SAP, Boomi, Base

### Development Workflow

```bash
# Development
npm run install:dev    # Install dependencies
npm start             # Build + start Storybook
npm run build:dev     # Watch mode development

# Testing
npm test              # Unit tests
npm run test:lint     # Linting
npm run test:build    # Build validation

# Quality
npm run prettier:fix  # Format code
npm run lint:fix      # Fix linting issues
```

### Git Workflow

- **Feature branches**: `feature/component-name`
- **Bug fixes**: `fix/issue-description`
- **Semantic versioning**: Use `solacemajor`/`solaceminor`/`solacepatch` in commit messages
- **Pre-commit hooks**: Husky enforces linting and formatting

## Integration Instructions for Subagents

### When Creating Components

1. Check GitHub issues for requirements
2. Fetch Figma design specs if available (using figma-design-extractor with chunked approach)
3. Follow existing component patterns in `/src/components/`
4. Implement all 4 theme variations
5. Add comprehensive TypeScript interfaces
6. Include accessibility features (ARIA, keyboard nav)
7. Create Storybook stories with interactive controls
8. Generate unit and accessibility tests

### When Fixing Bugs

1. Check Jira tickets for detailed requirements (if available)
2. Cross-reference with GitHub issues
3. Implement fixes following WCAG 2.1 AA standards
4. Add regression tests
5. Validate across all themes
6. Update documentation if needed

### External Service Fallbacks

If MCP integrations aren't available:

- **GitHub**: Use WebFetch with GitHub API (`GITHUB_TOKEN` available)
- **Figma**: Use WebFetch with Figma REST API (requires token)
- **Jira**: Use WebFetch with Jira REST API (requires auth)
- **Confluence**: Use WebFetch with Confluence REST API (requires auth)

## Quality Standards

### Required for All Components

- ✅ TypeScript interfaces with comprehensive props
- ✅ Theme integration across all 4 brands
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Comprehensive Storybook stories
- ✅ Unit tests with React Testing Library
- ✅ ESLint and Prettier compliance
- ✅ Proper JSDoc documentation

### Testing Requirements

- Unit tests for all component functionality
- Accessibility tests (keyboard nav, screen readers)
- Theme variation tests
- User interaction tests
- Edge case and error handling tests

### Documentation Requirements

- Interactive Storybook stories
- All props documented with ArgTypes
- Accessibility examples and guidelines
- Theme demonstration across all brands
- Usage examples for common scenarios

## Enhanced Multi-Agent Workflow Examples

### 🎯 **NEW: Micro-Agent Orchestrated Workflow** (Recommended)

**Example 1: Component with Jira Requirements**

```typescript
subagent_type: "workflow-orchestrator"
description: "Create component with full 7-agent orchestration"
prompt: "Create SolaceNavigationBar component for ticket MRC-123 using complete micro-agent workflow. Orchestrate the following sequence:

1. Atlassian Integration - Gather requirements from MRC-123
2. Component Scaffolder - Create basic structure
3. Theme Implementation - Add 4-theme support
4. Accessibility Enhancement - WCAG 2.1 AA compliance
5. Test Suite Generator - Comprehensive testing
6. Storybook Documentation - Interactive docs

Show context consumption per agent and quality improvements at each step. Provide visibility into each micro-agent execution for demonstration purposes."
```

**Example 2: Component with Figma Design**

```typescript
subagent_type: "workflow-orchestrator"
description: "Create component with design extraction"
prompt: "Create SolaceButton component from Figma design specs. Use micro-agent workflow:

1. Component Scaffolder - Create basic structure
2. Figma Design Extractor - Extract design specifications (chunked approach)
3. Theme Implementation - Apply 4-theme support
4. Accessibility Enhancement - WCAG 2.1 AA compliance
5. Test Suite Generator - Comprehensive testing
6. Storybook Documentation - Interactive docs with theme examples

Demonstrate 6-agent coordination with context efficiency tracking."
```

### Legacy Monolithic Workflow (Deprecated)

```typescript
subagent_type: "mrc-component-dev"; // ⚠️ Deprecated - too monolithic
description: "Create SolaceDataCard with multi-agent coordination";
prompt: "Create a new SolaceDataCard component that displays metrics data...";
```

### Fix Component Issues with Comprehensive Validation

```typescript
subagent_type: "mrc-component-dev"
description: "Fix SolaceModal with full validation"
prompt: "Fix accessibility and theme issues in SolaceModal component. The agent should:
1. Use atlassian-integration to check for related Jira tickets
2. Use a11y-auditor to identify all WCAG violations
3. Implement fixes following modern React patterns
4. Use theme-validator to ensure fixes work across all themes
5. Use test-suite-generator to create regression tests
6. Use storybook-docs-generator to update documentation
7. Run all quality gates before completion"
```

### Update Component from Figma Design System

```typescript
subagent_type: "mrc-component-dev"
description: "Update component from Figma with validation"
prompt: "Update SolaceButton to match latest Figma specifications. The process should:
1. Use figma-design-extractor to extract current design specifications (CRITICAL: Follow chunked approach - get file structure first, then target specific button component nodes)
2. Compare with existing implementation and identify gaps
3. Update component implementation with modern React patterns
4. Use theme-validator to ensure changes work across all 4 themes
5. Use a11y-auditor to maintain accessibility compliance
6. Use test-suite-generator to update tests for new specifications
7. Use storybook-docs-generator to reflect design changes in stories
8. Complete quality validation before finishing"
```

### Component Development from Requirements

```typescript
subagent_type: "mrc-component-dev"
description: "Develop component from GitHub issue"
prompt: "Develop a new component based on GitHub issue #123. The agent should:
1. Analyze the GitHub issue for detailed requirements
2. Check for any linked Figma files using figma-design-extractor (CRITICAL: Use chunked approach for any Figma data extraction)
3. Use atlassian-integration if Jira tickets are referenced
4. Implement component following enhanced React patterns
5. Coordinate with all specialized agents for validation
6. Prepare feature branch and semantic commits
7. Ensure all quality gates pass before completion"
```

### Legacy Component Modernization

```typescript
subagent_type: "mrc-component-dev"
description: "Modernize legacy component"
prompt: "Modernize the SolaceLegacyTable component with current standards:
1. Refactor to use modern React patterns (hooks, composition)
2. Enhance TypeScript interfaces with advanced types
3. Use theme-validator to improve theme integration
4. Use a11y-auditor to achieve WCAG 2.1 AA compliance
5. Use test-suite-generator to add comprehensive test coverage
6. Use storybook-docs-generator to create modern documentation
7. Maintain backward compatibility unless breaking changes approved
8. Complete full quality validation pipeline"
```

## Multi-Agent Coordination Patterns

### Micro-Agent Coordination

The `workflow-orchestrator` agent dynamically coordinates specialized micro-agents based on detected requirements:

- **atlassian-integration**: When Jira tickets (MRC-123, PROJ-456) or Confluence references are detected
- **figma-design-extractor**: When Figma URLs or design specifications are mentioned
- **component-scaffolder**: Always invoked to create basic component structure
- **theme-implementation**: Always invoked for 4-theme compatibility
- **accessibility-enhancer**: Always invoked for WCAG 2.1 AA compliance
- **comprehensive-test-generator**: Always invoked for comprehensive testing
- **interactive-docs-generator**: Always invoked for Storybook documentation

**Agent Sequence Examples:**

- **With Jira + Figma**: 7 agents (atlassian → scaffolder → figma → theme → a11y → test → docs)
- **Figma Only**: 6 agents (scaffolder → figma → theme → a11y → test → docs)
- **Basic Component**: 5 agents (scaffolder → theme → a11y → test → docs)

### Quality Gate Enforcement

The `mrc-component-dev` agent enforces quality gates by:

1. Running specialized agents in coordinated sequence
2. Validating each stage before proceeding to the next
3. Collecting comprehensive validation results
4. Ensuring all MRC standards are met before completion
5. Preparing proper git workflow integration

### Error Handling and Fallbacks

When external services are unavailable:

- **Figma Integration**: Falls back to WebFetch with Figma REST API
- **Jira Integration**: Falls back to WebFetch with Jira REST API
- **GitHub Integration**: Uses GitHub REST API directly
- **Documentation**: Continues with available information and notes limitations

This enhanced configuration ensures seamless multi-agent coordination while maintaining flexibility and robust error handling for all component development workflows.
