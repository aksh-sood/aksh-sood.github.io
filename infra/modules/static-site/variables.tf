variable "domain_name" {
  description = "Apex domain the site is served from, e.g. akshsood.com."
  type        = string
}

variable "subject_alternative_names" {
  description = "Extra names on the certificate and distribution, e.g. [\"www.akshsood.com\"]."
  type        = list(string)
  default     = []
}

variable "bucket_name" {
  description = "S3 bucket holding the built site. Must be globally unique."
  type        = string
}

variable "hosted_zone_id" {
  description = "Route 53 hosted zone ID for the domain."
  type        = string
}

variable "price_class" {
  description = "CloudFront price class. PriceClass_100 is cheapest and covers NA/EU."
  type        = string
  default     = "PriceClass_100"

  validation {
    condition     = contains(["PriceClass_All", "PriceClass_200", "PriceClass_100"], var.price_class)
    error_message = "price_class must be PriceClass_All, PriceClass_200 or PriceClass_100."
  }
}

variable "versioning_enabled" {
  description = "Keep old object versions, so a bad deploy can be rolled back."
  type        = bool
  default     = true
}

variable "force_destroy" {
  description = "Allow terraform destroy to empty the bucket. Leave false outside throwaway environments."
  type        = bool
  default     = false
}

variable "tags" {
  description = "Tags applied to every taggable resource."
  type        = map(string)
  default     = {}
}
