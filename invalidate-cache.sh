export DISTRIBUTION_ID=E35HO90YLKGBXV

echo ""
echo "Creating Cache Invalidation for CloudFront Distribution $DISTRIBUTION_ID"
echo ""
echo "aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths '/jpath.html'"
echo ""

aws cloudfront create-invalidation \
--distribution-id $DISTRIBUTION_ID \
--paths '/jpath.html'

echo ""
echo "To view status of invalidation, use id from response above and replace at <ID>, then run below command."
echo ""
echo "aws cloudfront get-invalidation  --distribution-id $DISTRIBUTION_ID --id <ID>"
echo ""