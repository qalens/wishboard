
# Wait for the database to be up
echo "Waiting for the database to be ready..."
until npx prisma db push; do
  echo "Database is not ready yet. Retrying in 5 seconds..."
  sleep 5
done

# Run Prisma migrations
echo "Applying database migrations..."
npx prisma migrate deploy

# Start the Next.js app in development mode
echo "Starting the application..."
node server.js