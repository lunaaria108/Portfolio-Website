import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase environment variables are missing");
}

const supabase = createClient(supabaseUrl, supabaseKey);

function isValidPageId(pageId: number) {
  return Number.isInteger(pageId) && pageId >= 1 && pageId <= 20;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pageId = Number(url.searchParams.get("pageId"));

  if (!isValidPageId(pageId)) {
    return Response.json(
      { error: "Invalid page ID" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("shared_canvas")
    .select("image_data")
    .eq("id", pageId)
    .maybeSingle();

  if (error) {
    console.error("Loading error:", error);

    return Response.json(
      { error: "Could not load drawing" },
      { status: 500 }
    );
  }

  return Response.json(
    {
      imageData: data?.image_data ?? "",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function POST(request: Request) {
  const { pageId, imageData } = await request.json();

  if (!isValidPageId(pageId)) {
    return Response.json(
      { error: "Invalid page ID" },
      { status: 400 }
    );
  }

  if (
    typeof imageData !== "string" ||
    !imageData.startsWith("data:image/png;base64,") ||
    imageData.length > 2_500_000
  ) {
    return Response.json(
      { error: "Invalid or oversized drawing" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("shared_canvas")
    .upsert({
      id: pageId,
      image_data: imageData,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error("Saving error:", error);

    return Response.json(
      { error: "Could not save drawing" },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}