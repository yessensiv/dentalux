import { NextRequest } from "next/server";
import { appointmentRequestSchema } from "@/lib/validation";
import { receiveLead } from "@/lib/leads";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  return receiveLead(request, appointmentRequestSchema, "appointment");
}
