import { NextRequest } from "next/server";
import { contactSchema } from "@/lib/validation";
import { receiveLead } from "@/lib/leads";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  return receiveLead(request, contactSchema, "contact");
}
