echo "deploy start...";

echo "[1/6] cd /home/cheng/app/nextjs-blog"
cd /home/cheng/app/nextjs-blog &&

echo "[2/6] - git pull"
git pull &&

echo "[3/6] docker build --network blog . -t cheng/nextjs-blog"
docker build --network blog . -t cheng/nextjs-blog &&

echo "[4/6] docker rm -f next"
docker rm -f next &&

echo "[5/6] docker run --name next -d --network blog --network-alias next -p 3000:3000 cheng/nextjs-blog"
docker run --name next -d --network blog --network-alias next -p 3000:3000 cheng/nextjs-blog &&

echo '[6/6] docker cp next:"/app/.next/static" "/home/cheng/app/.next/"'
docker cp next:"/app/.next/static" "/home/cheng/app/.next/" &&

echo "deploy ok!";