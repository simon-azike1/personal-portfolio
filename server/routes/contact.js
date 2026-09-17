import express from 'express';

const router = express.Router();

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

router.post('/', async (req, res) => {
  const { user_name: name, user_email: email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  if (!process.env.RESEND_API) {
    console.error('RESEND_API is not configured');
    return res.status(500).json({ message: 'Contact service is not configured.' });
  }

  const recipient = process.env.CONTACT_EMAIL || process.env.ADMIN_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';
  const siteUrl = process.env.PUBLIC_SITE_URL || 'https://personal-portfolio-ten-lime-93.vercel.app';
  const logoUrl = `${siteUrl.replace(/\/$/, '')}/Images/logo.png`;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');

  if (!recipient) {
    console.error('CONTACT_EMAIL or ADMIN_EMAIL is not configured');
    return res.status(500).json({ message: 'Contact recipient is not configured.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <!doctype html>
          <html lang="en">
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>New portfolio message</title>
            </head>
            <body style="margin:0;background:#edf3f9;font-family:Arial,Helvetica,sans-serif;color:#10223a;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#edf3f9;padding:32px 16px;">
                <tr>
                  <td align="center">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #d3dbe8;border-radius:18px;overflow:hidden;">
                      <tr>
                        <td style="background:#102943;padding:30px 36px;">
                          <table role="presentation" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding-right:12px;vertical-align:middle;"><img src="${logoUrl}" width="48" height="48" alt="SimzikTech logo" style="display:block;border-radius:50%;border:2px solid #5cbf0d;" /></td>
                              <td style="vertical-align:middle;"><div style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#8fd74a;font-weight:bold;">SimzikTech</div></td>
                            </tr>
                          </table>
                          <h1 style="margin:12px 0 0;color:#ffffff;font-size:28px;line-height:1.2;">New portfolio message</h1>
                          <p style="margin:10px 0 0;color:#c6d4e5;font-size:15px;line-height:1.6;">Someone reached out through your contact form.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:32px 36px;">
                          <p style="margin:0 0 8px;color:#68788e;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">From</p>
                          <p style="margin:0;color:#10223a;font-size:21px;font-weight:bold;">${safeName}</p>
                          <p style="margin:6px 0 26px;font-size:15px;"><a href="mailto:${safeEmail}" style="color:#4a9e0a;text-decoration:none;">${safeEmail}</a></p>
                          <div style="height:1px;background:#e2ecf6;margin-bottom:26px;"></div>
                          <p style="margin:0 0 10px;color:#68788e;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Message</p>
                          <div style="background:#f6f8fb;border-left:4px solid #5cbf0d;border-radius:8px;padding:18px 20px;color:#3b4a61;font-size:16px;line-height:1.7;">${safeMessage}</div>
                          <div style="padding-top:28px;text-align:center;">
                            <a href="mailto:${safeEmail}?subject=Re:%20Your%20message%20to%20SimzikTech" style="display:inline-block;background:#5cbf0d;color:#ffffff;text-decoration:none;border-radius:999px;padding:13px 24px;font-size:14px;font-weight:bold;">Reply to ${safeName}</a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="border-top:1px solid #e2ecf6;padding:20px 36px;color:#68788e;font-size:12px;line-height:1.6;">
                          This message was sent from the contact form on your portfolio website.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend request failed:', result);
      return res.status(502).json({ message: 'Email provider rejected the message.' });
    }

    return res.status(200).json({ message: 'Message sent successfully.', id: result.id });
  } catch (error) {
    console.error('Contact email failed:', error);
    return res.status(502).json({ message: 'Unable to send the message right now.' });
  }
});

export default router;
