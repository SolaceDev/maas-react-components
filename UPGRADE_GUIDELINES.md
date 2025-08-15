# Package Upgrade Guidelines

## Beta and Unstable Versions

**Do not upgrade to beta, alpha, or other unstable versions unless absolutely necessary.**

When upgrading dependencies:
- Always use the latest stable (non-beta, non-alpha) version
- Check package version tags with `npm view <package> dist-tags` to identify stable releases
- If a package only has beta/alpha versions available, consider:
  - Using an alternative stable package
  - Waiting for a stable release
  - Documenting the necessity and risk if beta must be used

## Dependency Management

- Use exact or caret ranges for production dependencies (`^1.0.0` or `1.0.0`)
- Keep peer dependencies compatible with the widest possible range
- Document any exceptions or special requirements in this file
- Test thoroughly when upgrading major versions

## React and Material-UI

- Maintain backward compatibility when possible
- Test with supported React versions (16, 17, 18, 19)
- Ensure TypeScript types remain compatible
- Document breaking changes in component APIs

## Review Process

- All dependency upgrades should be reviewed for stability
- Test builds and existing functionality after upgrades  
- Update this document when making exceptions to these guidelines