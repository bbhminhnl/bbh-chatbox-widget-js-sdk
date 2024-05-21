#!/bin/sh

echo "--------------------------------------------------"
echo "--- [1] Enter git commit message ---"
echo "--------------------------------------------------"
# nhập nội dung commit
read -p "Enter git commit message: " commit_message

# Kiểm tra xem có thông điệp hay không
if [ -z "$commit_message" ]; then
    # nếu không có thông điệp thì mặc định là "update"
    commit_message="update"
fi

echo ""
echo ""

echo "--------------------------------------------------"
echo "--- [2] Commit code ---"
echo "--------------------------------------------------"

# tăng version project
npm --no-git-tag-version version patch

# đẩy code lên github
git add . && git commit -m "$commit_message" && git push

echo ""
echo ""

echo "--------------------------------------------------"
echo "--- [3] Publish npm ---"
echo "--------------------------------------------------"

# xuất bản lên npm
npm publish

echo ""
echo ""

# lấy phiên bản hiện tại
version=$(grep -o '"version": "[^"]*' package.json | awk -F'"' '{print $4}')

echo "============ $version ============"
echo "--- 🔥 Deploy success new version : $version ! 🔥 ---"