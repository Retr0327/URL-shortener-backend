commit_message=$1

if [ -z "$1" ]; then
    npx prisma migrate dev --name update
    exit 0
fi 

npx prisma migrate dev --name "$1"