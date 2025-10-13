import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 10 // Last 10 leads
    });
    
    type LeadType = typeof leads[0];
    
    return NextResponse.json({
      count: leads.length,
      leads: leads.map((lead: LeadType) => ({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        company: lead.company,
        message: lead.message,
        createdAt: lead.createdAt
      }))
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}