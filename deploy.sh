echo "deploy start...";

cd /home/cheng/app/nextjs-blog &&
git pull &&
docker build --network blog . -t cheng/nextjs-blog &&
docker rm -f next &&
docker run --name next -d --network blog --network-alias next -p 3000:3000 cheng/nextjs-blog &&
docker cp next:"/app/.next/static" "/home/cheng/app/.next/" &&

echo "deploy ok!";