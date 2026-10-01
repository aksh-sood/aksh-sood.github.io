provider "aws" {
  region = var.aws_region
}

# CloudFront reads certificates only from us-east-1, regardless of where the
# rest of the stack lives.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
