This specific blueprint covers the authoritative "flagging" workflow for private property and law enforcement. The personas involved in this distinct operational journey are B2B Brian, Orchestrator Olivia, and Fleet-Driver Frank.

Here is the comprehensive service blueprint for the B2B Impound Trigger, organized into operational lanes to track the exact real-world triggers, front-stage interactions, back-stage processes, and database state changes.

### Phase 1: Rapid Evidence & Intake

This phase diverges entirely from the standard consumer flow. The goal is to rapidly authorize a tow and securely log evidence to protect liability without any direct customer interaction.

| Lane | Action / Interaction |
| --- | --- |
| **Physical Evidence** | B2B Brian is standing in a parking lot, an apartment complex, or on a public street.

 |
| **B2B Front-Stage** | Bypasses the consumer intake web form entirely and uses an authoritative "flagging" system. Uses a highly secure, fast mobile or web portal to input the license plate and snap a photo.

 |
| **Driver Front-Stage** | Receives an instant job alert.

 |
| **Dispatcher Back-Stage** | Desktop interface instantly identifies vehicle drivetrains and locates the closest available flatbeds. Executes API push notifications to drivers via keyboard shortcuts without using a mouse.

 |
| **Technical & DB State** | The `tow_jobs` row is created. The system prevents any app issues or friction that could slow down the photo evidence upload process.

 |

---

### Phase 2: Handoff & Immediate Exit

Because this is a B2B liability workflow, the initiator does not require transit tracking or follow-up communications.

| Lane | Action / Interaction |
| --- | --- |
| **Physical Evidence** | B2B Brian secures his property. Fleet-Driver Frank navigates to the location. |
| **B2B Front-Stage** | Journey essentially ends once the dispatcher receives the B2B request and dispatches a driver. The workflow intentionally excludes the delivery of live-tracking ETA links.

 |
| **Driver Front-Stage** | Taps a massive, high-contrast "Accept" button to prevent intense UI friction while driving. The app utilizes high-contrast dark mode options to reduce glare inside the cab at night.

 |
| **Dispatcher Back-Stage** | Attention has already moved on to the next caller in the queue.

 |
| **Technical & DB State** | Supabase Realtime updates the dispatcher UI upon job acceptance. Status changes from pending to dispatched to accepted.

 |

---

### Phase 3: Arrival & Impound Hook-up

This is the highest-friction physical phase for the driver, who must efficiently secure the vehicle and log notes while operating in traffic or poor weather.

| Lane | Action / Interaction |
| --- | --- |
| **Physical Evidence** | The tow truck arrives at the B2B location. The driver steps out of the cab wearing heavy work gloves.

 |
| **B2B Front-Stage** | N/A: Journey previously ended.

 |
| **Driver Front-Stage** | Uses a fast pre-tow photo upload tool requiring minimal taps to prevent clunky, frustrating workflows. Utilizes voice-to-text or one-tap options for adding notes to avoid slowing down the hook-up phase.

 |
| **Dispatcher Back-Stage** | Monitors for exceptions. Relies on the system to visually flag when a driver's status changes to "Arrived" and "Loaded / In Transit".

 |
| **Technical & DB State** | App state push updates `tow_jobs` status to `on_scene`. 10MB pre-tow liability photos upload directly to the `job_photos` storage bucket to prevent payload bloat.

 |

---

### Phase 4: Transport to Impound Lot

A passive phase strictly focused on routing the vehicle safely to the designated recovery lot, relying entirely on backend automation.

| Lane | Action / Interaction |
| --- | --- |
| **Physical Evidence** | Driver safely operates heavy machinery in transit to the impound lot.

 |
| **B2B Front-Stage** | N/A: Journey previously ended.

 |
| **Driver Front-Stage** | The app remains completely hands-off to avoid distracting the driver. Requires zero manual inputs.

 |
| **Dispatcher Back-Stage** | This is a purely passive phase. The system handles the GPS routing entirely in the background.

 |
| **Technical & DB State** | <br>`tow_jobs` status updates to `in_transit`. The application automates background GPS streaming seamlessly without requiring manual input from the driver. High-frequency, append-only GPS pings push to the `job_telemetry` table.

 |

---

### Phase 5: Administrative Close-out

Because there is no customer present to facilitate drop-off verification or payment, this step relies heavily on one-tap automation to protect fleet efficiency and queue management.

| Lane | Action / Interaction |
| --- | --- |
| **Physical Evidence** | Driver finalizes the unhook process at the secure impound lot.

 |
| **B2B Front-Stage** | Completely omits the Drop-off & Payment phase.

 |
| **Driver Front-Stage** | Initiates a one-tap status toggle to close the job. The handoff phase must be completely frictionless to prevent departure delays, ensuring the driver can leave immediately for the next job.

 |
| **Dispatcher Back-Stage** | The drop-off and payment phase must be completely automated.

 |
| **Technical & DB State** | Once the driver's app submits a transaction, the dashboard seamlessly closes out the invoice. The system instantly resets the driver's status to "Available" to protect fleet efficiency.

 |