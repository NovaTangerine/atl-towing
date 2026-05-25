Because Orchestrator Olivia's mindset is highly analytical and perpetually multitasking, she relies heavily on her Central Desktop Dashboard to keep the entire ecosystem synchronized. If a driver forgets to update their status, it disrupts her ability to minimize driver downtime, creating dangerous data blindspots.

To prevent this, we must design a visual language for the Dispatch Exception Board so that bottlenecked or unresponsive drivers immediately flash red. Here is the state-by-state task flow to ensure Olivia can maximize fleet efficiency and resolve escalations quickly.

### TF03: The Dispatch Exception Board Flow

**State 1: Passive Monitoring & Routing (The Happy Path)**

* 
**User State:** The dispatcher is actively translating the customer's panic or the web form's data into actionable logistics. Her attention rapidly moves on to the next caller in the queue.


* 
**UI Focus:** A data-dense screen prioritizing scannability and keyboard workflow.


* **Visuals:** A clean, organized list of active jobs displaying normal driver statuses (e.g., `en_route`).
* 
**Data Logic:** The system must automatically route continuous GPS streams from the driver's app directly to the customer's live map. This GPS routing must happen entirely in the background without requiring any manual intervention or updates from the dispatcher's desk.



**State 2: The Exception Trigger (Driver Bottleneck)**

* 
**User State:** The dispatcher is monitoring for exceptions.


* 
**UI Focus:** The dashboard needs clear visual indicators and automated exception flags to immediately highlight driver bottlenecks.


* 
**Visuals:** Designing a visual language so bottlenecked or unresponsive drivers immediately flash red on Orchestrator Olivia's dashboard.


* 
**Data Logic:** The system detects data blindspots caused by drivers forgetting to update statuses, specifically when they fail to toggle updates like "Arrived" or "Loaded / In Transit" within the expected ETA window.



**State 3: Escalation & Keyboard Execution**

* 
**User State:** Olivia must resolve the customer escalation quickly while minimizing driver downtime.


* 
**UI Focus:** The Central Desktop Dashboard must heavily rely on keyboard shortcuts to execute dispatch actions, eliminating the need to use a mouse.


* **Visuals:** A quick-action modal or highlighted row command line prompts Olivia for the next step.
* 
**Interaction:** She utilizes keyboard shortcuts to fire off API push notifications to the unresponsive driver.


* **Data Logic:** The backend sends a high-priority push payload directly to Fleet-Driver Frank's native app, bypassing standard workflows to prompt an immediate status update.

**State 4: Resolution & Administrative Close-out**

* 
**User State:** The driver has completed the job, and Olivia needs to quickly reset the board to maximize fleet efficiency.


* 
**UI Focus:** The dashboard requires no manual inputs from Orchestrator Olivia.


* **Visuals:** The red exception flag clears, and the driver's vehicle icon returns to a standard "Available" visual state.
* 
**Data Logic:** The drop-off and payment phase must be completely automated. Once the driver's app submits a transaction, the dashboard must seamlessly close out the invoice and instantly reset the driver's status to "Available" to protect fleet efficiency.