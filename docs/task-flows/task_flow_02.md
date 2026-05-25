Because this is a high-friction physical phase where liability is transferred, the UI must do the heavy lifting. If the interface is clunky, the driver won't update their statuses, exposing the company to liability and breaking the live dispatch loop.

Here is the concrete, screen-by-screen task flow designed to keep Owner-Operator Oscar legally protected and Fleet-Driver Frank moving efficiently.

---

### Screen 1: The "On Scene" Arrival Trigger

**User State:** The driver steps out of the cab into traffic or bad weather wearing heavy work gloves.

**UI Focus:** The interface needs to prioritize large tap targets, high-contrast visual design, and minimal screen interaction.

* 
**Visuals:** A high-contrast dark mode screen featuring a massive, screen-width "I'm Here / Arrived" button to accommodate the vibrating dashboard and harsh lighting.


* **Interaction:** A single, imprecise, glove-friendly tap.
* 
**Data Logic:** The app state push instantly updates the `tow_jobs` status to `on_scene`.


* 
**Data Logic:** The dispatcher relies on the system to visually flag when a driver's status changes to "Arrived".



---

### Screen 2: The Pre-Tow Liability Camera

**User State:** The driver is dealing with a harsh physical environment involving gloves, weather, and traffic. They are highly motivated to capture these photos because their personal liability for damage is highly elevated.

**UI Focus:** A camera interface that is rock-solid, fast, and legally compliant.

* **Visuals:** A full-screen, high-contrast viewfinder with massive shutter touch-targets and clear visual guides for required angles (e.g., Front, Left, Right, Rear).
* 
**Interaction:** The pre-tow photo upload tool must be fast and require minimal taps to prevent clunky, frustrating workflows while working in traffic.


* 
**Interaction:** The UI must also provide voice-to-text or one-tap options for adding notes to avoid slowing down the hook-up phase.


* 
**Data Logic:** The 10MB pre-tow liability photos are uploaded directly to the `job_photos` storage bucket.


* 
**Data Logic:** Sending these photos to a separate storage bucket prevents payload bloat on the main job ticket.



---

### Screen 3: The Digital Liability Waiver

**User State:** The customer is actively overseeing the hook-up process. They are anxious about handing over the keys and eager to get to safety.

**UI Focus:** Frictionless documentation handoff.

* **Visuals:** A high-contrast, stark screen featuring the waiver text and a massive signature block at the bottom.
* 
**Interaction:** The customer reads and signs a highly legible, large-text mobile liability waiver quickly on the driver's device.


* **Data Logic:** The digital signature is captured and appended to the `tow_jobs` relational database ticket, securing the legal transfer of the vehicle.

---

### Screen 4: The "Loaded & In Transit" Transition

**User State:** The driver is back in the cab, operating a heavy, loaded vehicle.

**UI Focus:** The app requires heavy automation, utilizing features like one-tap status toggles to help the driver get through their queue efficiently.

* **Visuals:** A dark-mode GPS map view with a massive "Start Transport" button locked to the bottom of the screen.
* **Interaction:** A single tap to initiate the routing phase.
* 
**Data Logic:** The `tow_jobs` status updates to `in_transit`.


* 
**Data Logic:** The application must automate background GPS streaming seamlessly without requiring any manual input from the driver that could disrupt transport routing.


* 
**Data Logic:** Continuous telemetry loops resume, appending to the `job_telemetry` table and syncing the customer map.