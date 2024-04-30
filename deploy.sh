# Check if the environment variable "S3_BUCKET" exists
if [ -z "${S3_BUCKET+x}" ]; then
    echo "Error: Environment variable 'S3_BUCKET' is not set."
    exit 1
fi

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
  --include 'jpath.js' \
  --include "jpath.css"
fi