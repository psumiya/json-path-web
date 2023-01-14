export S3_BUCKET=algoclinic.com

aws s3 sync . s3://$S3_BUCKET --dryrun \
--exclude '*' \
--include 'jpath.html' \
--include 'jpath.js' \
--include 'jpath.css'

read -p "Continue with deployment? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Uploading files to S3"

  aws s3 sync . s3://$S3_BUCKET \
  --exclude '*' \
  --include 'jpath.html' \
  --include 'jpath.html' \
  --include "jpath.html"
fi