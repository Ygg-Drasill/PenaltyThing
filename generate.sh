echo "generating openAPI interfaces..."
cd backend
sh generate-api.sh
cd ../frontend
npm run generate-api:local