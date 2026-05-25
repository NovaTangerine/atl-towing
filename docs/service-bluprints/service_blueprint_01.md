Here is the comprehensive Service Blueprint for **Blueprint 1: The Core A-to-B Tow**, covering the standard dispatch loop. I have structured this phase-by-phase, intersecting the physical realities of our personas with the exact UI and database interactions required to make the ecosystem function.

---

### Phase 1: Intake & Dispatching

This phase requires speed, low cognitive load for the customer, and instantaneous data routing for the operational team.

| Lane | Action / Interaction |
| --- | --- |
| **Physical Evidence** | Customer is stranded on a highway (Sarah) or sitting comfortably at a desk (Carl). Driver is on the road or finishing a previous job.

 |
| **Customer Front-Stage** | Interacts with a minimal text UI featuring a one-tap location drop and views upfront pricing.

 |
| **Driver Front-Stage** | Receives an instant job alert highlighting payout, distance, and job type. Taps a massive, high-contrast "Accept" button.

 |
| **Dispatcher Back-Stage** | Desktop interface instantly identifies vehicle drivetrain and closest flatbeds. Dispatcher executes API push notifications using keyboard shortcuts without a mouse.

 |
| **Technical & DB State** | <br>`tow_jobs` row is created. An immediate confirmation SMS is triggered via API to the customer to prevent anxiety spikes. Driver app receives the payload; upon acceptance, Supabase Realtime updates the dispatcher UI. Status changes from `pending` to `dispatched` to `accepted`.

 |

---

### Phase 2: Driver En Route

During this transit phase, the primary goal is maintaining customer trust through flawless background telemetry while reducing driver distraction.

| Lane | Action / Interaction |
| --- | --- |
| **Physical Evidence** | Tow truck is navigating traffic in potentially harsh lighting or bad weather.

 |
| **Customer Front-Stage** | Frantically checks phone (Sarah) or passively monitors (Carl). Views a prominent, continuous live tracking map with a dynamic ETA.

 |
| **Driver Front-Stage** | Drives safely with the app utilizing high-contrast dark mode to reduce glare. The UI requires zero manual inputs.

 |
| **Dispatcher Back-Stage** | Dispatcher's attention has moved to the next caller in the queue.

 |
| **Technical & DB State** | Driver app pushes high-frequency, append-only GPS pings to the `job_telemetry` table. The system automatically routes this continuous stream directly to the customer's map entirely in the background, without dispatcher intervention.

 |

---

### Phase 3: Arrival & Hook-up

This is the highest-friction physical phase. Liability is transferred, requiring robust documentation that cannot slow down the physical hook-up process.

| Lane | Action / Interaction |
| --- | --- |
| **Physical Evidence** | Geofence is crossed. Driver steps out of the cab into traffic wearing heavy work gloves. Customer oversees hook-up.

 |
| **Customer Front-Stage** | Reads and signs a highly legible, large-text mobile liability waiver quickly on the driver's device.

 |
| **Driver Front-Stage** | Uses a fast, one-tap tool to capture legally compliant pre-tow photos. Uses voice-to-text to record notes.

 |
| **Dispatcher Back-Stage** | Monitors for exceptions. Dashboard visually flags status changes or driver bottlenecks (e.g., if a driver forgets to update their status).

 |
| **Technical & DB State** | App state push updates `tow_jobs` status to `on_scene`. The 10MB pre-tow liability photos are uploaded directly to the `job_photos` storage bucket to prevent payload bloat on the main job ticket.

 |

---

### Phase 4: Transport to Destination

A passive phase focused on routing and tracking, moving the vehicle and the customer safely to the final location.

| Lane | Action / Interaction |
| --- | --- |
| **Physical Evidence** | Customer rides in the tow truck cab or trails behind in a separate vehicle. Driver safely operates heavy, loaded equipment.

 |
| **Customer Front-Stage** | Monitors the seamless background GPS link to coordinate arrival times.

 |
| **Driver Front-Stage** | App remains completely hands-off to avoid distracting the driver.

 |
| **Dispatcher Back-Stage** | Purely passive monitoring. The system handles routing entirely in the background.

 |
| **Technical & DB State** | `tow_jobs` status updates to `in_transit`. Continuous telemetry loops resume, appending to the `job_telemetry` table and syncing the customer map.

 |

---

### Phase 5: Drop-off & Payment

The critical administrative close-out. Friction here delays the driver, frustrates the customer, and creates financial bottlenecks for the business.

| Lane | Action / Interaction |
| --- | --- |
| **Physical Evidence** | Customer and driver interact at the drop-off location. Driver finalizes the unhook process.

 |
| **Customer Front-Stage** | Reviews a high-quality drop-off photo proving safe delivery. Taps card on Bluetooth reader for frictionless payment. Receives clear, itemized digital receipt.

 |
| **Driver Front-Stage** | Uses native pairing interface for the Bluetooth card reader. Initiates one-tap status toggle to close the job.

 |
| **Dispatcher Back-Stage** | Phase is completely automated. The dashboard requires no manual inputs from Orchestrator Olivia.

 |
| **Technical & DB State** | Driver app submits transaction payload. The dashboard seamlessly closes out the invoice and instantly resets the driver's status to `Available`. Post-tow photos upload to `job_photos` bucket. System automatically emails PDF receipts and feedback links.

 |