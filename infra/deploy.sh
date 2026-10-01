#!/usr/bin/env bash
#
# Push a built site to S3 and invalidate CloudFront.
#
#   npm run build && ./infra/deploy.sh
#
# Reads the bucket and distribution from Terraform outputs, so there is nothing
# to keep in sync by hand.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="$ROOT/dist"

if [[ ! -d "$DIST" ]]; then
  echo "No build found at $DIST. Run 'npm run build' first." >&2
  exit 1
fi

cd "$ROOT/infra"

BUCKET="$(terraform output -raw bucket_name)"
DISTRIBUTION="$(terraform output -raw distribution_id)"

echo "Deploying $DIST to s3://$BUCKET"

# Fingerprinted assets first, cached hard. These are uploaded before the HTML
# that references them, so a request can never find a page whose assets are
# not there yet.
aws s3 sync "$DIST/_astro" "s3://$BUCKET/_astro" \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

# Everything else that is not HTML: images, PDFs, the OG cards.
aws s3 sync "$DIST" "s3://$BUCKET" \
  --exclude "_astro/*" \
  --exclude "*.html" \
  --exclude "*.xml" \
  --cache-control "public, max-age=86400" \
  --delete

# HTML and feeds last, revalidated every time so a deploy is visible at once.
aws s3 sync "$DIST" "s3://$BUCKET" \
  --exclude "*" \
  --include "*.html" \
  --include "*.xml" \
  --cache-control "public, max-age=0, must-revalidate" \
  --delete

echo "Invalidating $DISTRIBUTION"
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION" \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text

echo "Done. $(terraform output -raw site_url)"
