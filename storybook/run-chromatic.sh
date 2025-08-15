#!/bin/bash
set -e
export VAULT_ADDR="https://vault.maas-vault-prod.solace.cloud:8200"

echo "--- Starting Chromatic script ---"

# Fetch the chromatic key from Vault
echo "Logging into Vault..."
vault login -method=github token=$GITHUB_TOKEN
echo "Successfully logged into Vault."

echo "Fetching Chromatic token from Vault..."
CHROMATIC_PROJECT_TOKEN=$(vault kv get -field=CHROMATIC_PROJECT_TOKEN secret/tools/githubactions/public/)
echo "Successfully fetched Chromatic token."

# Run Chromatic and extract the build URL
echo "Running Chromatic..."
npx chromatic --project-token="$CHROMATIC_PROJECT_TOKEN" --exit-zero-on-changes

echo "--- Chromatic build complete ---"