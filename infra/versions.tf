terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.40"
    }
  }

  # Uncomment once a state bucket exists. Local state is fine for one site, but
  # remote state is what makes this reproducible from another machine.
  # backend "s3" {
  #   bucket       = "aksh-tfstate"
  #   key          = "personal-site/terraform.tfstate"
  #   region       = "ap-south-1"
  #   encrypt      = true
  #   use_lockfile = true
  # }
}
