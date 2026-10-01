---
role: DevSecOps Engineer II
company: Baton Systems
location: Chennai, India
start: Apr 2024
end: Mar 2026
order: 3
---

Two of the case studies above come from this period: the
[multi-region DR](/work/dr-outside-supported-regions) for FX settlement messaging, and the
[compute work](/work/compute-80-percent) that took $180,000 a year off the AWS bill and
then cut what was left by 80%.

The rest was platform groundwork. I moved deployments off Jenkins onto GitOps with ArgoCD,
which made releases auditable and rollbacks real, and ran zero-downtime Kubernetes upgrades
across 28 production EKS clusters and 300+ nodes — coordinating version transitions, add-on
compatibility and workload validation with no customer-facing impact.

I added BYOK with AWS KMS and automated key rotation to meet enterprise security
requirements, and built the observability stack — Prometheus, Grafana, Kibana, OpenSearch —
that cut incident response time by more than 30%.
