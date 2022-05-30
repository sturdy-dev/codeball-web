#!/usr/bin/env bash

set -euo pipefail

CWD="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

IMAGE="902160009014.dkr.ecr.us-east-1.amazonaws.com/codeball"
VERSION="web-$(date +%Y-%m-%d-%H-%M-%S)"
DOCKER_VERSION_TAG_ARG="--tag ${IMAGE}:${VERSION}"
PUSH_ARG="--push"

while [[ $# -gt 0 ]]; do
	case "$1" in
	--version)
		VERSION="$2"
		DOCKER_VERSION_TAG_ARG="--tag ${IMAGE}:${VERSION}"
		shift
		shift
		;;
	--image)
		IMAGE="$2"
		shift
		shift
		;;
	esac
done

echo "image: ${IMAGE}"
echo "version: ${VERSION}"

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 902160009014.dkr.ecr.us-east-1.amazonaws.com

docker buildx build \
	--platform linux/arm64 \
	--target web-runner \
	${PUSH_ARG} \
	${DOCKER_VERSION_TAG_ARG} \
	"$CWD/.."

echo "${VERSION}"
