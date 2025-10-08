
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    console.log("Contact API called");
    
    const { name, email, company, message } = await req.json();
    console.log("Received data:", { name, email, company: !!company, message: !!message });
    
    if (!name || !email) {
      console.log("Missing required fields");
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Save to database
    console.log("Attempting to save to database...");
    const lead = await prisma.lead.create({
      data: { 
        name: String(name), 
        email: String(email), 
        company: company ? String(company) : null, 
        message: message ? String(message) : null 
      },
    });

    console.log("Lead created successfully:", lead.id);

    // Simple success response for now (email functionality temporarily disabled)
    return NextResponse.json({ 
      ok: true, 
      id: lead.id,
      message: "Contact form submitted successfully" 
    });

  } catch (error: any) {
    console.error("Contact API error:", error);
    return new NextResponse(`Server error: ${error.message}`, { status: 500 });
  }
}
