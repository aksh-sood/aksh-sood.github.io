variable "aws_region" {
  description = "Region for the bucket. CloudFront is global; the certificate is always us-east-1."
  type        = string
  default     = "ap-south-1"
}

variable "domain_name" {
  description = "Apex domain. Must match SITE_URL in site.config.mjs."
  type        = string
}

variable "subject_alternative_names" {
  description = "Extra names to serve, typically the www host."
  type        = list(string)
  default     = []
}

variable "bucket_name" {
  description = "Globally unique S3 bucket name for the built site."
  type        = string
}

variable "hosted_zone_id" {
  description = "Route 53 hosted zone ID for the domain."
  type        = string
}

variable "tags" {
  description = "Tags applied to every taggable resource."
  type        = map(string)

  default = {
    Project   = "personal-site"
    ManagedBy = "terraform"
  }
}
