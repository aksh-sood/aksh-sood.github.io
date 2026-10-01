module "site" {
  source = "./modules/static-site"

  providers = {
    aws           = aws
    aws.us_east_1 = aws.us_east_1
  }

  domain_name               = var.domain_name
  subject_alternative_names = var.subject_alternative_names
  bucket_name               = var.bucket_name
  hosted_zone_id            = var.hosted_zone_id
  tags                      = var.tags
}
