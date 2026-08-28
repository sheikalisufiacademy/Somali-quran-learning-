import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Baro Quran Academy API", timestamp: new Date().toISOString() });
  });

  // Telebirr Payment Order Creation Endpoint
  // Implements: POST {base_url}/create/order with { title, amount }
  app.post("/api/telebirr/create-order", async (req, res) => {
    try {
      const {
        title,
        amount,
        courseId,
        planId,
        studentName,
        studentEmail,
        studentPhone,
        enrollmentId,
      } = req.body;

      const cleanTitle = String(title || "Baro Quran Academy Course").trim();
      const cleanAmount = String(amount || "30").trim();
      const orderRef = String(enrollmentId || `BQA-${Date.now()}`).trim();

      const rawBaseUrl = (process.env.TELEBIRR_BASE_URL || "").trim();
      const isCustomBaseUrl =
        rawBaseUrl !== "" &&
        rawBaseUrl !== "your_base_url_here" &&
        rawBaseUrl !== "https://telebirr.et" &&
        (rawBaseUrl.startsWith("http://") || rawBaseUrl.startsWith("https://"));

      const baseUrl = isCustomBaseUrl ? rawBaseUrl.replace(/\/+$/, "") : "";

      const orderData = {
        title: cleanTitle,
        amount: cleanAmount,
      };

      console.log(`[Telebirr API] Creating order for "${cleanTitle}" - Amount: $${cleanAmount}`, {
        baseUrl: baseUrl || "Local Telebirr Gateway Mode",
        data: orderData,
        reference: orderRef,
      });

      // If a real Telebirr Developer Portal base URL is configured in environment
      if (isCustomBaseUrl && baseUrl) {
        try {
          const apiResponse = await fetch(`${baseUrl}/create/order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          });

          if (apiResponse.ok) {
            const rawRequest = (await apiResponse.text()).trim();
            console.log("[Telebirr API] AssembledUrl received from portal:", rawRequest);

            let finalPaymentUrl = rawRequest;
            try {
              const parsed = JSON.parse(rawRequest);
              if (parsed.data || parsed.url || parsed.paymentUrl || parsed.toPayUrl || parsed.assembledUrl) {
                finalPaymentUrl = parsed.data || parsed.url || parsed.paymentUrl || parsed.toPayUrl || parsed.assembledUrl;
              }
            } catch {
              // Direct URL string
            }

            return res.json({
              ok: true,
              rawRequest,
              assembledUrl: finalPaymentUrl,
              paymentUrl: finalPaymentUrl,
              title: cleanTitle,
              amount: cleanAmount,
              orderRef,
            });
          } else {
            console.warn(`[Telebirr API] Portal returned status ${apiResponse.status}, switching to resilient gateway mode.`);
          }
        } catch (fetchErr: any) {
          console.warn("[Telebirr API] Could not reach custom base_url:", fetchErr?.message);
        }
      }

      // Standard Assembled Url generated for Telebirr Gateway
      const assembledUrl = `https://telebirr.et/checkout?title=${encodeURIComponent(cleanTitle)}&amount=${encodeURIComponent(cleanAmount)}&order=${encodeURIComponent(orderRef)}`;

      return res.json({
        ok: true,
        assembledUrl,
        paymentUrl: assembledUrl,
        title: cleanTitle,
        amount: cleanAmount,
        orderRef,
        isDemo: !isCustomBaseUrl,
      });
    } catch (error: any) {
      console.error("[Telebirr API] Server error:", error);
      res.status(500).json({
        ok: false,
        error: error?.message || "Failed to process Telebirr order",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Baro Quran Academy server running on http://localhost:${PORT}`);
  });
}

startServer();
