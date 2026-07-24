#!/usr/bin/env bash
# Bump the Hermes version everywhere it is recorded, then rebuild the card.
#
# Two files must always agree: the integration manifest and the card bundle
# version. They are not cosmetic. The card is cache busted with the manifest
# version, so shipping a change without bumping leaves browsers serving the
# previous bundle and the user sees nothing change.
#
# Usage:
#   scripts/release.sh 0.4.0     explicit version
#   scripts/release.sh patch     bump the last number
#   scripts/release.sh minor     bump the middle number, reset the last
#   scripts/release.sh major     bump the first number, reset the rest
#
# Versioning scheme: X.0 major or important refactor, X.Y important features,
# X.Y.Z bugfix or minor corrections.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MANIFEST="$ROOT/custom_components/hermes/manifest.json"
CARD_VERSION="$ROOT/hermes-card/src/version.ts"

if [ $# -ne 1 ]; then
  echo "usage: $(basename "$0") <version|major|minor|patch>" >&2
  exit 2
fi

CURRENT="$(python3 -c "import json;print(json.load(open('$MANIFEST'))['version'])")"

case "$1" in
  major|minor|patch)
    NEW="$(python3 - "$CURRENT" "$1" <<'PY'
import sys
current, kind = sys.argv[1], sys.argv[2]
parts = [int(p) for p in current.split(".")]
while len(parts) < 3:
    parts.append(0)
major, minor, patch = parts[:3]
if kind == "major":
    major, minor, patch = major + 1, 0, 0
elif kind == "minor":
    minor, patch = minor + 1, 0
else:
    patch += 1
print(f"{major}.{minor}.{patch}")
PY
)"
    ;;
  *)
    NEW="$1"
    if ! [[ "$NEW" =~ ^[0-9]+\.[0-9]+(\.[0-9]+)?$ ]]; then
      echo "error: '$NEW' is not a valid version" >&2
      exit 2
    fi
    ;;
esac

echo "Hermes $CURRENT -> $NEW"

python3 - "$MANIFEST" "$NEW" <<'PY'
import json, sys
path, new = sys.argv[1], sys.argv[2]
with open(path) as fh:
    data = json.load(fh)
data["version"] = new
with open(path, "w") as fh:
    json.dump(data, fh, indent=2)
    fh.write("\n")
PY

printf 'export const VERSION = "%s";\n' "$NEW" > "$CARD_VERSION"

echo "Rebuilding the card bundle"
(cd "$ROOT/hermes-card" && npm run build >/dev/null)

# Guard against the drift this script exists to prevent.
MANIFEST_V="$(python3 -c "import json;print(json.load(open('$MANIFEST'))['version'])")"
CARD_V="$(sed -n 's/.*"\(.*\)".*/\1/p' "$CARD_VERSION")"
if [ "$MANIFEST_V" != "$CARD_V" ]; then
  echo "error: versions out of sync, manifest $MANIFEST_V card $CARD_V" >&2
  exit 1
fi

echo "Done. manifest and card both at $MANIFEST_V"
echo "Next: git add -A && git commit && git push"
echo "Optional tag: git tag v$MANIFEST_V && git push origin v$MANIFEST_V"
