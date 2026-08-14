import { isAdmin } from "@/lib/admin-auth";
import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { BUCKETS, type BucketName } from "@/lib/blogShared";

const MIME_PREFIX: Record<Exclude<BucketName, "models">, string> = {
  images: "image/",
  videos: "video/",
  pdfs: "application/pdf",
};

let client: S3Client | null = null;

function getS3(): S3Client {
  if (!client) {
    const accountId = process.env.R2_ACCOUNT_ID;
    if (!accountId) {
      throw new Error("R2_ACCOUNT_ID is not set.");
    }
    client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
      },
    });
  }
  return client;
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKey = process.env.R2_ACCESS_KEY_ID;
  const secretKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET_NAME;
  const publicUrl = (process.env.R2_PUBLIC_URL ?? "").replace(/\/+$/, "");
  if (!accountId || !accessKey || !secretKey || !bucket || !publicUrl) {
    return NextResponse.json(
      {
        error:
          "Storage is not configured on the server. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME and R2_PUBLIC_URL in .env.local.",
      },
      { status: 500 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  const bucketField = form.get("bucket");
  const bucketName: BucketName =
    bucketField === "videos" || bucketField === "pdfs" || bucketField === "models"
      ? bucketField
      : "images";
  const bucketConfig = BUCKETS[bucketName];

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const ext = (file.name.split(".").pop() ?? "bin").toLowerCase();

  if (bucketName === "models") {
    // GLB MIME sniffing is unreliable across browsers/OS — validate by extension only.
    if (ext !== "glb") {
      return NextResponse.json({ error: "Only .glb files are allowed." }, { status: 400 });
    }
  } else {
    const requiredPrefix = MIME_PREFIX[bucketName];
    if (!file.type.startsWith(requiredPrefix)) {
      return NextResponse.json(
        { error: `Only ${bucketConfig.kind} files are allowed.` },
        { status: 400 },
      );
    }
  }

  if (file.size > bucketConfig.maxSize) {
    return NextResponse.json(
      { error: `File is larger than ${Math.round(bucketConfig.maxSize / (1024 * 1024))} MB.` },
      { status: 400 },
    );
  }

  const key = `${bucketConfig.prefix}/${crypto.randomUUID()}.${ext}`;

  try {
    await getS3().send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type || "application/octet-stream",
      }),
    );
  } catch (err) {
    console.error("R2 upload failed:", err);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ url: `${publicUrl}/${key}` });
}
