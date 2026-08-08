# **Commercial Platform Compliance License**
for **_NumLab.js_** and **_NumLab‑plain.js_**

**Copyright © 2026 Izidor Zupančič. All rights reserved.**

This License governs all use, modification, and redistribution of the Software.

---

## **1. Definition of Software**
For the purposes of this License, **“Software”** refers to the proprietary JavaScript code distributed as:

- **NumLab.js**  
- **NumLab‑plain.js**

including all associated logic, functions, cryptographic operations, and any derivative or modified versions thereof.  
Although implemented and delivered as JavaScript scripts, the Software is licensed as a proprietary commercial product.

---

## **2. Grant of License**
The Licensor grants the Licensee a **non‑exclusive**, **non‑transferable**, and **revocable** license to use the Software strictly in accordance with the terms of this License.  
All rights not expressly granted remain with the Licensor.

---

## **3. Recommended JavaScript Version**
The JavaScript version of the Software is **recommended** for use on devices and platforms where the 64‑bit Windows desktop version cannot run, including:

- Mobile devices  
- Tablets  
- Web browsers  
- Non‑Windows operating systems  
- Embedded or lightweight environments  

Use of the JS version is optional but encouraged for cross‑platform compatibility.

---

## **4. Mandatory “App Upgrade” Link Requirement**
As a condition of using the Software, the Licensee must provide a **visible and clearly identifiable “App Upgrade” link** within their product’s user interface.

### **Purpose of the Link**
The “App Upgrade” link must direct users to the **Licensee’s own 64‑bit Windows desktop version** of their product.

### **Display Obligations**
The “App Upgrade” link must appear:

- In all graphical user interfaces where the Software is utilized  
- In all public or commercial deployments  
- In all redistributed versions of the Software  
- In all derivative works incorporating the Software  

The link must be **clearly visible**, **legible**, and **not obscured**.  
It must also be **clearly noted** in any documentation or libraries distributed with the Licensee’s product.

---

## **5. Mandatory 64‑bit Windows Desktop Version Requirement**
The Licensee must provide a **64‑bit Windows desktop version** of their product that uses the Licensor’s encryption methods via the Licensor’s Microsoft Store application, **Uncrunchable Crypto Engine**.

### **Acquisition Requirement**
To ensure correct operation of the 64‑bit Windows version, the Licensee and any distributors must:

- Acquire and install **Uncrunchable Crypto Engine** from the Microsoft Store  
  (**either the one‑time‑payment version or the freely available version**, depending on current availability).

### **Client Requirement**
Clients who wish to use the Licensee’s 64‑bit Windows version must also acquire and install **Uncrunchable Crypto Engine**, as it serves as the cryptographic backend.

### **Clarification**
- The **App Upgrade link** points to the **Licensee’s Windows app**, not to **Uncrunchable Crypto Engine**.  
- **Uncrunchable Crypto Engine** is a **runtime dependency**, not an upgrade target.  
- The Licensee does **not** need to implement the JS logic in their Windows version.  
- The JS version remains **recommended** for non‑Windows devices.

### **Compliance Obligations**
The Licensee must ensure that:

1. The Windows desktop version is functional and uses **Uncrunchable Crypto Engine** for encryption.  
2. The Windows desktop version is made available to **all clients**, either bundled or as a separate download.  
3. Clients receive **clear instructions** explaining that the Store app is required for proper operation and that upgrading to the paid version is **optional**.  
4. The Licensee **does not charge** clients any additional fees for providing, distributing, or servicing the required 64‑bit Windows version.

Failure to meet these obligations constitutes a material breach of this License.

---

## **6. Prohibited Actions**
The Licensee may **not**:

- Redistribute the Software without the required “App Upgrade” link  
- Use the Software without accepting and complying with this License  
- Remove, bypass, or interfere with link‑display mechanisms  
- Misrepresent the Software as open‑source or free‑to‑modify  

---

## **7. Source Code Editing Restrictions**
Limited modifications to the Software are permitted solely for minor corrective purposes.

### **Permitted Modifications**
- Removal of unnecessary keywords (e.g., “static”)  
- Minor adjustments required for integration

### **Prohibited Modifications**
- Altering core logic or cryptographic behavior  
- Renaming functions, variables, or structural identifiers  
- Any change affecting the intended operation of the Software

---

## **8. Redistribution Conditions**
Redistribution of the Software or derivative works is permitted **only** if:

- The required “App Upgrade” link remains intact and functional  
- This License is included **in full** with all redistributed copies  
- No additional restrictions or contradictory terms are imposed  
- The Software is **not** represented or implied to be open‑source  

---

## **9. Termination**
This License terminates automatically and without notice if:

- The required “App Upgrade” link is removed, altered, or obscured  
- Link‑display mechanisms are bypassed  
- Any term of this License is violated

Upon termination, the Licensee must immediately cease all use, distribution, and modification of the Software.

---

## **10. No Warranty**
The Software is provided **“as is”**, without any warranty, express or implied.  
The Licensor shall not be liable for any damages, losses, or claims arising from use of the Software.

---

## **11. Governing Law**
This License shall be governed by and construed in accordance with the laws of **Slovenia**.

---

# **Appendix A — Required Microsoft Store Application**

To comply with Section 5 (“Mandatory 64‑bit Windows Desktop Version Requirement”), the Licensee, distributors, and clients must acquire and install the following application:

**Uncrunchable Crypto Engine**  
Available on Microsoft Store:  
`https://apps.microsoft.com/detail/9NFCK7BVKC9P`  


This application may be obtained in its **one‑time‑payment version** or its **freely available version**, depending on current availability.

---
