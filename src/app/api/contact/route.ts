import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, service, budget, message } = await req.json()

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'kidunejoseph91@gmail.com',
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a08; color: #f0ede6; padding: 2rem; border-radius: 8px;">
          <h2 style="color: #c8b560; margin-bottom: 1.5rem; font-size: 1.4rem;">
            New Contact from josephmasonda.qzz.io
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #222220; color: #7a7870; width: 140px; font-size: 0.85rem;">Name</td>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #222220; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #222220; color: #7a7870; font-size: 0.85rem;">Email</td>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #222220;">
                <a href="mailto:${email}" style="color: #c8b560;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #222220; color: #7a7870; font-size: 0.85rem;">Service</td>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #222220;">${service || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #222220; color: #7a7870; font-size: 0.85rem;">Budget</td>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #222220;">${budget || 'Not specified'}</td>
            </tr>
          </table>

          <div style="margin-top: 1.5rem;">
            <p style="color: #7a7870; font-size: 0.85rem; margin-bottom: 0.5rem;">Message</p>
            <div style="background: #111110; border: 1px solid #222220; border-radius: 6px; padding: 1.25rem; line-height: 1.7; color: #c8c4bc;">
              ${message}
            </div>
          </div>

          <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #222220;">
            <a href="mailto:${email}?subject=Re: Your enquiry"
              style="display: inline-block; background: #c8b560; color: #0a0a08; padding: 0.75rem 1.5rem; border-radius: 100px; text-decoration: none; font-weight: 600; font-size: 0.9rem;">
              Reply to ${name} →
            </a>
          </div>

          <p style="margin-top: 2rem; font-size: 0.75rem; color: #7a7870;">
            This message was submitted via the contact form on josephmasonda.qzz.io
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}