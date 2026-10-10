#!/bin/bash

FILE_NAME=$1
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
BLOG_DIR="$SCRIPT_DIR/src/blog"
LINE_COUNT=$(ls -l "$BLOG_DIR" | wc -l) 

FILE_COUNT=$((LINE_COUNT - 1 ))
FILE_NAME="${FILE_NAME// /-}"
FILE_NAME=$(echo "$FILE_NAME" | tr '[:upper:]' '[:lower:]')

echo "File Name: $FILE_NAME"
cat << EOF > "$BLOG_DIR/$FILE_COUNT-$FILE_NAME.mdx"
---
title: '$1'
slug: '$FILE_NAME'
description: ""
week: Week $FILE_COUNT
pubDate: 
draft: true
image:
    url: ''
    alt: '' 
tags: [""]
summary: ""
---
import BlogPostImg from '../components/BlogPostImg.astro';
export const components = {img: BlogPostImg}
EOF
