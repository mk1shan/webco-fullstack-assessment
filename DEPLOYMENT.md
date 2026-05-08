# What Changes in Production?

When moving from local Docker Compose to Azure Container Apps, several important things are required.

Secrets: Move from .env files to Azure Key Vault for better security.

Storage: Replace local Docker volumes with Azure Blob Storage. Containers are temporary, so files saved inside them will be lost.

Databases: Stop running database containers. Use Managed Azure PostgreSQL for better reliability and automatic backups.

Statelessness: Keep the app "stateless." Store sessions and uploads externally so the app can scale easily.

Production deployments should also include:
- centralized logging
- monitoring
- autoscaling rules
- HTTPS configuration
- backup and disaster recovery planning

Managed Azure PostgreSQL should replace local PostgreSQL containers because it reduces operational overhead, improves reliability, and provides automated backups and scaling capabilities.
