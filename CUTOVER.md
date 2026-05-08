# DNS Cutover Risk & Mitigation

1. Reduce the "Wait Time" (TTL)
A few days before the move, I’ll lower the DNS TTL (Time to Live) values. This makes the internet update  site’s address much faster. If we hit a snag and need to switch back, the fix will happen almost instantly instead of taking hours.

2. The Final Pre-Flight Check
Before anyone sees the new site, I’ll run a full validation in the new environment. This includes:

Testing database connections.

Checking app health probes.

Running performance tests to ensure the new server can handle the load.

3. Test with a "Soft Launch"
Whenever possible, I avoid moving everyone at once. I’ll start by sending a small amount of traffic or using a private staging link to confirm everything works in the real world before the full switch.

4. Live Monitoring
During the cutover, I keep the error logs and monitoring dashboards open. By watching the traffic in real-time, I can spot and fix any "hiccups" the moment they happen

5. A Clear Escape Plan
I define "Rollback Rules" before we start. If we see high error rates or the database fails, we don't waste time troubleshooting ,we immediately point the DNS back to the old, stable server to keep the app online.
