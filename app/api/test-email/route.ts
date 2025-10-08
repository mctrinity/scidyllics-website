import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    // Test the Resend configuration
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key_here") {
      return NextResponse.json({ 
        error: "RESEND_API_KEY not configured",
        configured: false 
      });
    }

    // Try to send a test email
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.TO_EMAIL || "mdizon@scidyllics.com",
      subject: "Test Email - Scidyllics Contact Form",
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify the Resend configuration is working.</p>
        <p><strong>From:</strong> ${process.env.FROM_EMAIL || "onboarding@resend.dev"}</p>
        <p><strong>To:</strong> ${process.env.TO_EMAIL || "mdizon@scidyllics.com"}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      configured: true,
      result: result,
      config: {
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.TO_EMAIL || "mdizon@scidyllics.com",
        hasApiKey: !!process.env.RESEND_API_KEY
      }
    });

  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      configured: true,
      config: {
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.TO_EMAIL || "mdizon@scidyllics.com",
        hasApiKey: !!process.env.RESEND_API_KEY
      }
    }, { status: 500 });
  }
}