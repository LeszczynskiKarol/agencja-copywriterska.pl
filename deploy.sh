#!/bin/bash
S3_BUCKET="www.agencja-copywriterska.pl"
CLOUDFRONT_ID="E1SXQB1KZPYXOD"

cd /d/agencja-copywriterska.pl
npm run build
aws s3 sync dist/ s3://${S3_BUCKET} --delete
aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"
echo "✅ Deployed to https://www.agencja-copywriterska.pl"