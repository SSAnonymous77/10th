
/* ==================================
   SCHOOL EXAMINATION NETWORK CHECK
   ================================== */

// Replace this with your school's PUBLIC IPv4 address
const SCHOOL_PUBLIC_IP = "152.59.118.104";

async function checkSchoolNetwork() {
    try {
        const response = await fetch(
            "https://api.ipify.org?format=json",
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Unable to verify network");
        }

        const result = await response.json();

        if (result.ip !== SCHOOL_PUBLIC_IP) {
            return false;
        }

        return true;

    } catch (error) {
        console.error("Network verification failed:", error);
        return false;
    }
}

async function protectSchoolPortal() {
    const allowed = await checkSchoolNetwork();

    if (!allowed) {
        document.documentElement.innerHTML = `
        <html>
        <head>
            <title>Access Restricted</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="
            margin:0;
            font-family:Arial,sans-serif;
            background:#f4f6f9;
            display:flex;
            justify-content:center;
            align-items:center;
            min-height:100vh;
            text-align:center;
        ">
            <div style="
                background:white;
                padding:40px;
                border-radius:16px;
                max-width:420px;
                margin:20px;
                box-shadow:0 5px 25px rgba(0,0,0,.08);
            ">
                <h1 style="color:#dc2626;">Access Restricted</h1>
                <p>This examination portal is accessible only through the school's Wi-Fi network.</p>
                <p>Please connect to the school network and try again.</p>
            </div>
        </body>
        </html>`;
        return false;
    }

    return true;
}

// Other page scripts can wait for this promise.
window.schoolNetworkAllowed = protectSchoolPortal();
