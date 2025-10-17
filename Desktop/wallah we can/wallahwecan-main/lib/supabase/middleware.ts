import { NextResponse, type NextRequest } from "next/server";

// Edge-safe session pass-through for middleware.
// Avoid importing any Supabase client here to prevent Node-only APIs from
// being bundled into the Edge runtime. Auth is handled in server routes/components.
export async function updateSession(request: NextRequest) {
  return NextResponse.next({ request });
}
