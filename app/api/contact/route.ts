import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, service, message } = await request.json();

    // Validate input
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Configure email transporter with proper typing
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Admin notification email
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Lead: ${name} - ${service}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background: #f5f5f5; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: #00f0ff; padding: 40px; text-align: center;">
                      <h1 style="margin: 0; color: #000000; font-size: 28px; font-weight: 700;">New Contact Form Submission</h1>
                      <p style="margin: 8px 0 0 0; color: #000000; font-size: 14px; opacity: 0.8;">Portfolio Lead Notification</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      
                      <!-- Client Information -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-radius: 6px; padding: 24px; margin-bottom: 24px; border: 1px solid #e9ecef;">
                        <tr>
                          <td>
                            <h2 style="margin: 0 0 16px 0; color: #212529; font-size: 18px; font-weight: 600; border-bottom: 2px solid #00f0ff; padding-bottom: 8px;">Client Information</h2>
                            <table width="100%" cellpadding="6" cellspacing="0">
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500; width: 100px;">Name</td>
                                <td style="color: #212529; font-size: 15px; font-weight: 600;">${name}</td>
                              </tr>
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500;">Email</td>
                                <td><a href="mailto:${email}" style="color: #00f0ff; text-decoration: none; font-weight: 500;">${email}</a></td>
                              </tr>
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500;">Service</td>
                                <td style="color: #212529; font-size: 15px;"><span style="background: #00f0ff; color: #000000; padding: 4px 12px; border-radius: 4px; font-weight: 500; font-size: 13px;">${service}</span></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Message -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-radius: 6px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #7000ff;">
                        <tr>
                          <td>
                            <h3 style="margin: 0 0 12px 0; color: #212529; font-size: 16px; font-weight: 600;">Message</h3>
                            <p style="margin: 0; color: #495057; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">${message}</p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Action Buttons -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                        <tr>
                          <td align="center">
                            <table cellpadding="0" cellspacing="0">
                              <tr>
                                <td>
                                  <a href="mailto:${email}" style="display: inline-block; background: #00f0ff; color: #000000; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px; margin-right: 12px;">Reply to Client</a>
                                </td>
                                <td>
                                  <a href="mailto:${email}?subject=Re: ${service}" style="display: inline-block; background: #ffffff; color: #000000; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px; border: 2px solid #dee2e6;">Mark Important</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Quick Tip -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px; padding: 16px;">
                        <tr>
                          <td>
                            <p style="margin: 0; color: #856404; font-size: 13px; line-height: 1.5;">
                              <strong>Quick Response Tip:</strong> Clients who receive replies within 1 hour are 7x more likely to convert.
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px; background: #f8f9fa; border-top: 1px solid #dee2e6; text-align: center;">
                      <p style="margin: 0; color: #6c757d; font-size: 12px;">Automated by Manoj Kumar Portfolio System</p>
                      <p style="margin: 4px 0 0 0; color: #adb5bd; font-size: 11px;">${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Client confirmation email
    const clientMailOptions = {
      from: `"Manoj Kumar" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name.split(' ')[0]}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background: #f5f5f5; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: #00f0ff; padding: 40px; text-align: center;">
                      <h1 style="margin: 0; color: #000000; font-size: 28px; font-weight: 700;">Message Received</h1>
                      <p style="margin: 8px 0 0 0; color: #000000; font-size: 14px; opacity: 0.8;">I'll get back to you soon</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 20px 0; color: #212529; font-size: 16px; line-height: 1.6;">Hi <strong>${name.split(' ')[0]}</strong>,</p>
                      
                      <p style="margin: 0 0 24px 0; color: #495057; font-size: 15px; line-height: 1.7;">
                        Thank you for reaching out! I've received your message about <strong style="color: #00f0ff;">${service}</strong> and I'm excited to learn more about your project.
                      </p>
                      
                      <!-- Submission Summary -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-radius: 6px; padding: 24px; margin: 24px 0; border: 1px solid #e9ecef;">
                        <tr>
                          <td>
                            <h3 style="margin: 0 0 16px 0; color: #212529; font-size: 16px; font-weight: 600;">Your Submission Summary</h3>
                            <table width="100%" cellpadding="6" cellspacing="0">
                              <tr>
                                <td style="color: #6c757d; font-size: 13px; width: 100px;">Service Type</td>
                                <td style="color: #212529; font-size: 14px; font-weight: 500;">${service}</td>
                              </tr>
                              <tr>
                                <td style="color: #6c757d; font-size: 13px;">Your Email</td>
                                <td style="color: #00f0ff; font-size: 14px;">${email}</td>
                              </tr>
                              <tr>
                                <td style="color: #6c757d; font-size: 13px; vertical-align: top;">Message</td>
                                <td style="color: #495057; font-size: 13px; line-height: 1.6;">${message.substring(0, 150)}${message.length > 150 ? '...' : ''}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin: 0 0 24px 0; color: #495057; font-size: 15px; line-height: 1.7;">
                        I typically respond within <strong style="color: #00f0ff;">24 hours</strong>. In the meantime, feel free to check out my recent work or book a quick call if you'd like to discuss your project sooner.
                      </p>
                      
                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                        <tr>
                          <td align="center">
                            <a href="https://durgesh-v.vercel.app/book-call" style="display: inline-block; background: #00f0ff; color: #000000; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px;">Book a Strategy Call</a>
                          </td>
                        </tr>
                      </table>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #dee2e6;">
                        <tr>
                          <td>
                            <p style="margin: 0 0 8px 0; color: #212529; font-size: 15px; line-height: 1.5;">Best regards,</p>
                            <p style="margin: 0 0 4px 0; color: #00f0ff; font-size: 17px; font-weight: 700;">Manoj Kumar</p>
                            <p style="margin: 0; color: #6c757d; font-size: 13px;">Full Stack Developer & AI Engineer</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px; background: #f8f9fa; border-top: 1px solid #dee2e6; text-align: center;">
                      <p style="margin: 0 0 8px 0; color: #6c757d; font-size: 13px;">
                        <a href="mailto:manojchundru5@gmail.com" style="color: #00f0ff; text-decoration: none;">manojchundru5@gmail.com</a>
                      </p>
                      <p style="margin: 0; color: #6c757d; font-size: 13px;">
                        <a href="https://durgesh-v.vercel.app" style="color: #00f0ff; text-decoration: none;">durgesh-v.vercel.app</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
