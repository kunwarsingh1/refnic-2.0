import nodemailer from "nodemailer";

let transport: nodemailer.Transporter | null = null;

function getTransport(): nodemailer.Transporter {
  if (!transport) {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? 465);
    const user = process.env.SUPPORT_EMAIL;
    const pass = process.env.SUPPORT_EMAIL_PASSWORD;
    if (!host || !user || !pass) {
      throw new Error(
        "SMTP_HOST, SUPPORT_EMAIL and SUPPORT_EMAIL_PASSWORD must be set to send approval emails.",
      );
    }
    transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return transport;
}

type ApprovalEmail = {
  to: string;
  from: string;
  postTitle: string;
  author: string;
  approveUrl: string;
};

export async function sendApprovalEmail(input: ApprovalEmail): Promise<void> {
  const transporter = getTransport();

  await transporter.sendMail({
    from: input.from,
    to: input.to,
    subject: `New post awaiting approval: ${input.postTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>New post awaiting approval</h2>
        <p>A new post has been submitted on the blog and needs your approval before it goes public.</p>
        <p><strong>Title:</strong> ${input.postTitle}</p>
        <p><strong>Submitted by:</strong> ${input.author || "—"}</p>
        <p>
          <a href="${input.approveUrl}"
             style="display: inline-block; background: #171717; color: #fff; text-decoration: none;
                    padding: 12px 20px; border-radius: 6px; font-size: 14px;">
            Review this post
          </a>
        </p>
        <p style="color: #737373; font-size: 13px;">
          You can also ignore this email — the post stays private until you approve or reject it.
        </p>
      </div>
    `,
  });
}

type ChangeApprovalEmail = {
  to: string;
  from: string;
  label: string;
  contentType: string;
  submittedBy: string;
  reviewUrl: string;
};

export async function sendChangeApprovalEmail(input: ChangeApprovalEmail): Promise<void> {
  const transporter = getTransport();

  await transporter.sendMail({
    from: input.from,
    to: input.to,
    subject: `Change awaiting approval: ${input.label}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>A change needs your approval</h2>
        <p>A change has been submitted on the site and needs your approval before it goes live.</p>
        <p><strong>Change:</strong> ${input.label}</p>
        <p><strong>Section:</strong> ${input.contentType}</p>
        <p><strong>Submitted by:</strong> ${input.submittedBy || "—"}</p>
        <p>
          <a href="${input.reviewUrl}"
             style="display: inline-block; background: #171717; color: #fff; text-decoration: none;
                    padding: 12px 20px; border-radius: 6px; font-size: 14px;">
            Review this change
          </a>
        </p>
        <p style="color: #737373; font-size: 13px;">
          You can also ignore this email — the site stays as it is until you approve or reject it.
        </p>
      </div>
    `,
  });
}
