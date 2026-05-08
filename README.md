## Migration Scalability Notes

For 10,000+ records, I would implement:
- pagination when reading source records
- batch processing to reduce API overhead
- Retry Logic: If it fails, wait a few seconds and try again automatically.
- Queues: Use a "to-do list" so tasks wait their turn without crashing the server.
- Concurrency: Do a few tasks at once, but set a limit to avoid overloading the system.
- migration progress tracking and checkpointing


## Webco Technical Assessment

### What I Built

I completed the following for this assessment:

* Cloud Setup: Used Pulumi to set up Azure infrastructure.
* Docker: Created a Docker Compose setup for Directus.
* Migration: Wrote a TypeScript script to move data.
* Automation: Set up GitHub Actions for automatic deployment.

---

### Why I Made These Choices

* Azure Container Apps: I chose this over AKS (Kubernetes) because it is simpler and faster to manage for this scale. AKS is better for much larger, complex systems.
* Managed Database: I used Azure's managed PostgreSQL instead of a manual setup to get automatic backups and less maintenance work.
* Scaling: The app is set up to automatically add more power if traffic spikes.
* Security: No passwords are in the code. In production, everything goes through **Azure Key Vault**.

---

### Handling Large Data (10,000+ Records)

To keep the migration smooth, I planned for:

* Processing in Bits: Reading and sending data in small batches.
* Safety Net: Using retry logic and "checkpoints" so if it fails, it can pick up where it left off.
* Speed: Running tasks in parallel without overloading the server.

---

### If I Had One More Day

With extra time, I would focus on:

* Testing: Adding automated tests to catch bugs early.
* Dashboards: Setting up visual monitors to track app health.
* Deployment: Implementing "blue-green" deployments to update the app with zero downtime.
* Refining: Organizing the code and infrastructure to be even more modular.
