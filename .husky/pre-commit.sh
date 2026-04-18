# #!/bin/sh

# echo "ðŸ” Commenting console.log before commit..."

# FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(js|ts|jsx|tsx)$')

# for file in $FILES; do
#   if [ -f "$file" ]; then
#     sed -i '' 's/^\([[:space:]]*\)\(console\.log\)/\1\/\/ \2/g' "$file"
#     git add "$file"
#   fi
# done



# pnpm test