import { serve } from "https://deno.land/std@0.178.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.178.0/http/file_server.ts";

function handler(request: Request): Promise<Response> {
  return serveFile(request, "test.html");
}

serve(handler);
