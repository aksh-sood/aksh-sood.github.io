# infra — S3 + CloudFront + ACM + Route 53

Terraform for hosting the site on AWS. This is the second of the two deploy
paths (the first is Vercel, which needs none of this); it exists because
running the site on my own IaC is part of what the site is arguing.

## Shape

```
infra/
  main.tf                     root — wires the module
  providers.tf                two providers: the bucket region, and us-east-1
  variables.tf  outputs.tf    root inputs and outputs
  terraform.tfvars.example    copy to terraform.tfvars
  deploy.sh                   sync dist/ and invalidate
  modules/static-site/        the reusable module
```

The module creates:

- a **private** S3 bucket — versioned, SSE-encrypted, public access blocked, and
  readable only by this CloudFront distribution via Origin Access Control
- an **ACM certificate** in `us-east-1` with DNS validation, plus the Route 53
  validation records
- a **CloudFront distribution** with HTTP/2 and IPv6, compression, a security
  response-headers policy (HSTS, CSP, frame-deny, nosniff), and an immutable
  cache behaviour for `/_astro/*`
- a **CloudFront Function** that resolves directory indexes
- **A and AAAA alias records** for the apex and any SANs

### Why the CloudFront Function

Astro builds with `trailingSlash: "never"`, so a case study lives at
`/work/slug/index.html` but is requested as `/work/slug`. The S3 *website*
endpoint would resolve that, but it is public by design. Using the REST
endpoint with OAC keeps the bucket private, and the REST endpoint does not
resolve directory indexes — so a viewer-request function appends `/index.html`
to extensionless paths. It is the cheapest edge compute AWS sells and it runs
in well under a millisecond.

## Use

```bash
cd infra
cp terraform.tfvars.example terraform.tfvars   # then fill it in
terraform init
terraform plan
terraform apply
```

You need a Route 53 hosted zone for the domain already, and its zone ID.

Then, from the repo root:

```bash
npm run build
./infra/deploy.sh
```

`deploy.sh` reads the bucket and distribution ID from Terraform outputs, uploads
fingerprinted assets before the HTML that references them, sets cache headers
per file class, and invalidates.

## Notes

- `domain_name` must match `SITE_URL` in `site.config.mjs`. Those are the only
  two places the domain is written.
- State is local until the S3 backend block in `versions.tf` is uncommented.
  Local state is workable for one site; remote state is what makes it
  reproducible from another machine.
- `force_destroy` defaults to `false`, so `terraform destroy` will refuse to
  empty a bucket with objects in it. That is deliberate.
- The first apply takes 5–15 minutes, almost entirely CloudFront distributing.
