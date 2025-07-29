# GitHub Workflow Token Usage Review & Optimization

## Current Usage

### Secrets in Use

- **GITHUB_TOKEN**: Used for npm authentication, repo operations, and as a general-purpose token in most steps.
- **PACKAGES_ADMIN_TOKEN**: Used for checking out private repositories and bypassing branch protection during version bumping.
- **CHROMATIC_PROJECT_TOKEN**: Used for Chromatic deployments.
- **WHITESOURCE_API_KEY / WHITESOURCE_PROJECT_TOKEN**: Used for WhiteSource scans and reporting.
- **FOSSA_API_KEY**: Used for FOSSA license scanning.

### Example References

- NPM authentication:
  ```yaml
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  ```
- Private repo checkout:
  ```yaml
  token: ${{ secrets.PACKAGES_ADMIN_TOKEN }}
  ```
- WhiteSource reporting:
  ```yaml
  github_token: ${{ secrets.GITHUB_TOKEN }}
  ws_api_key: ${{ secrets.WHITESOURCE_API_KEY }}
  ws_project_token: ${{ secrets.WHITESOURCE_PROJECT_TOKEN }}
  ```

## Optimization Recommendations

### Use Dynamic GitHub Tokens

- Prefer `${{ github.token }}` over `${{ secrets.GITHUB_TOKEN }}` for built-in GitHub operations (checkout, npm publish, API calls).
- Only use custom secrets for external services or when elevated permissions are required (e.g., private repo access, branch protection bypass).

### Example Optimized Usage

```yaml
# Use built-in token for npm and repo operations
env:
  NODE_AUTH_TOKEN: ${{ github.token }}

# Use custom token only for private repo checkout
token: ${{ secrets.PACKAGES_ADMIN_TOKEN }}

# Use external service tokens/secrets as needed
ws_api_key: ${{ secrets.WHITESOURCE_API_KEY }}
```

### Summary Table

| Secret/Token                | Purpose                                | Optimization       |
| --------------------------- | -------------------------------------- | ------------------ |
| `github.token`              | GitHub API, npm, repo ops              | Use where possible |
| `PACKAGES_ADMIN_TOKEN`      | Private repo, branch protection bypass | Use only as needed |
| `CHROMATIC_PROJECT_TOKEN`   | Chromatic deployment                   | External service   |
| `WHITESOURCE_API_KEY`       | WhiteSource scan                       | External service   |
| `WHITESOURCE_PROJECT_TOKEN` | WhiteSource reporting                  | External service   |
| `FOSSA_API_KEY`             | FOSSA license scan                     | External service   |

## Next Steps

- Refactor workflow files to use `${{ github.token }}` for GitHub-native operations.
- Limit custom secret usage to only necessary steps.
- Document token usage for maintainers.

---

\_Last updated:
