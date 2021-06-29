#!/bin/bash -ex

BUILD_DIR=build
SPEC_DIR=spec
MAIN_BRANCH=main
SPEC_FILENAME=spec.html
RENDERED_SPEC_FILENAME=index.html
STAGING_S3_BUCKET=s3://staging-pub-imf-ug/drafts
STAGING_PUB_BASE_URI=https://staging-pub.imfug.com/drafts
COMMIT_HASH=$(git rev-parse HEAD)
OLD_HASH=$(git rev-parse ${MAIN_BRANCH})
NEW_SPEC_URL=${STAGING_PUB_BASE_URI}/${COMMIT_HASH}/${RENDERED_SPEC_FILENAME}
NEW_SPEC_ENCODED_URL=$(python -c "import urllib.parse; print(urllib.parse.quote(input()))" <<< ${NEW_SPEC_URL})
OLD_SPEC_ENCODED_URL=$(python -c "import urllib.parse; print(urllib.parse.quote(input()))" <<< ${STAGING_PUB_BASE_URI}/${OLD_HASH}/${RENDERED_SPEC_FILENAME})

mkdir -p ${BUILD_DIR}

cp -Rf ${SPEC_DIR}/* ${BUILD_DIR}

node ./.github/scripts/render-html.js ${BUILD_DIR}/${SPEC_FILENAME} ${BUILD_DIR}/${RENDERED_SPEC_FILENAME}

echo "[HTML](${NEW_SPEC_URL})" > ${BUILD_DIR}/pr-links.txt
echo "[Redline](https://services.w3.org/htmldiff?doc1=${OLD_SPEC_ENCODED_URL}&doc2=${NEW_SPEC_ENCODED_URL})" >> ${BUILD_DIR}/pr-links.txt

aws s3 cp --recursive ${BUILD_DIR} ${STAGING_S3_BUCKET}/${COMMIT_HASH}

echo 0
