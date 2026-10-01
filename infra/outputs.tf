output "bucket_name" {
  description = "Sync the contents of ../dist into this bucket."
  value       = module.site.bucket_name
}

output "distribution_id" {
  description = "Pass to `aws cloudfront create-invalidation` after each deploy."
  value       = module.site.distribution_id
}

output "distribution_domain_name" {
  value = module.site.distribution_domain_name
}

output "site_url" {
  value = module.site.site_url
}
