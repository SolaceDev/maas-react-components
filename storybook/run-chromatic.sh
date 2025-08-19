# Copyright 2023-2025 Solace Systems
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

#!/bin/bash
set -e
# VAULT_ADDR must be set in the environment
if [ -z "$VAULT_ADDR" ]; then
  echo "Error: VAULT_ADDR environment variable is not set. Please reach out to the CI/CD team for the vault address." >&2
  exit 1
fi

echo "--- Starting Chromatic script ---"

# Fetch the chromatic key from Vault
echo "Logging into Vault..."
vault login -method=github token=$GITHUB_TOKEN
echo "Successfully logged into Vault."

echo "Fetching Chromatic token from Vault..."
CHROMATIC_PROJECT_TOKEN=$(vault kv get -field=CHROMATIC_PROJECT_TOKEN secret/tools/githubactions/public/)
if [[ -z "$CHROMATIC_PROJECT_TOKEN" ]]; then
  echo "Error: Failed to retrieve Chromatic token from Vault." >&2
  exit 1
fi
echo "Successfully fetched Chromatic token."

# Run Chromatic and extract the build URL
echo "Running Chromatic..."
npx chromatic --project-token="$CHROMATIC_PROJECT_TOKEN" --exit-zero-on-changes

echo "--- Chromatic build complete ---"