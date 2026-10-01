output "bucket_name" {
  description = "Name of the bucket to sync the build into."
  value       = aws_s3_bucket.site.bucket
}

output "distribution_id" {
  description = "CloudFront distribution ID, needed to invalidate after a deploy."
  value       = aws_cloudfront_distribution.site.id
}

output "distribution_domain_name" {
  description = "CloudFront domain, useful for testing before DNS propagates."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "certificate_arn" {
  description = "ARN of the validated ACM certificate."
  value       = aws_acm_certificate_validation.site.certificate_arn
}

output "site_url" {
  description = "Canonical URL of the deployed site."
  value       = "https://${var.domain_name}"
}
