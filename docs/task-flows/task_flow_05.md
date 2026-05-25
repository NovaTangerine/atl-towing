The B2B Impound Trigger Flow represents the authoritative "flagging" interface that completely bypasses the standard consumer intake web form. This specific blueprint covers the authoritative "flagging" workflow for private property and law enforcement. Because this user is not requesting a point-A to point-B transport for themselves, the interface must diverge entirely from the rest of the standard application journey.

Here is the comprehensive, screen-by-screen task flow designed specifically for B2B Brian.

### TF05: The B2B Impound Trigger Flow

**Screen 1: The Divergent Portal & Vehicle Logging**

* 
**User State:** The user is standing in a parking lot, an apartment complex, or on a public street.


* 
**User Mindset:** Their mindset is focused on compliance, liability protection, and speed.


* 
**UI Focus:** The system must provide an authoritative "flagging" interface that completely bypasses the standard consumer intake web form.


* 
**UI Deployment:** The interface must be deployed as a highly secure, fast mobile or web portal optimized for quick data entry in outdoor environments.


* **Visuals:** A stark, high-contrast intake screen replaces consumer-friendly prompts with authoritative data fields.
* 
**Interaction:** The UI must allow the user to quickly input a license plate number and seamlessly upload photo evidence to justify the tow and protect their liability.


* 
**Data Logic:** The system must prevent any app issues or friction that could slow down this evidence upload process.



---

**Screen 2: Dispatch Trigger & Handoff**

* 
**User State:** Their goals are to quickly log an illegally parked car, upload photo evidence to justify the tow, and get the vehicle removed without dealing with the vehicle's owner directly.


* **UI Focus:** The screen features a frictionless submission button that instantly routes the data to the back-stage dispatch team.
* 
**Interaction:** The user bypasses the consumer intake web form entirely and uses an authoritative "flagging" system.


* 
**Data Logic (Database):** The `tow_jobs` row is created.


* 
**Data Logic (Dispatcher):** The desktop interface instantly identifies vehicle drivetrains and locates the closest available flatbeds.


* 
**Data Logic (Routing):** The dispatcher executes API push notifications to drivers via keyboard shortcuts without using a mouse.



---

**Screen 3: Immediate Journey Termination**

* 
**User State:** Their success is defined solely by the vehicle being logged securely and removed quickly to protect their liability.


* **UI Focus:** A simple, definitive confirmation screen immediately signals that the handoff is complete.
* 
**Interaction:** The B2B Initiator's journey essentially ends once the dispatcher receives this B2B request and dispatches a driver.


* 
**Data Logic (Tracking):** The workflow intentionally excludes the delivery of live-tracking ETA links.


* 
**Data Logic (Payment):** The system completely omits the Drop-off & Payment phase.