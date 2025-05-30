#!/usr/bin/env bash

# Reference: NPM RRFC --if-needed https://github.com/npm/rfcs/issues/466

function publish_npm() {
  local lib=$1

  LOCAL_SHASUM=$(npm pack -w packages/"$lib" --json | jq '.[] | .shasum' | sed -r 's/^"|"$//g')

  NPM_TARBALL=$(npm show @junobuild/"$lib" dist.tarball)
  NPM_SHASUM=$(curl -s "$NPM_TARBALL" 2>&1 | shasum | cut -f1 -d' ')

  if [ "$LOCAL_SHASUM" == "$NPM_SHASUM" ]; then
    echo "No changes in @junobuild/$lib need to be published to NPM."
  else
    npm publish --workspace=packages/"$lib" --provenance --access public
  fi
}

# Tips: libs use by other libs first
LIBS=utils,errors,config,config-loader,cli-tools,did-tools,storage,core,admin,console,analytics,core-peer,core-standalone,functions

for lib in $(echo $LIBS | sed "s/,/ /g"); do
  publish_npm "$lib"
done
