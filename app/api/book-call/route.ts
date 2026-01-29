import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, callType, date, time, timezone, topic, additionalInfo } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !callType || !date || !time || !topic) {
      return NextResponse.json(
        { message: 'All required fields must be filled' },
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

    const callTypeLabels: Record<string, string> = {
      video: 'Video Call',
      phone: 'Phone Call',
      chat: 'Text Chat',
    };

    const callTypeDesc: Record<string, string> = {
      video: 'Google Meet / Zoom',
      phone: 'Traditional voice call',
      chat: 'WhatsApp / Telegram',
    };

    // Format date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Admin notification email
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Strategy Call Booked: ${name} - ${formattedDate} at ${time}`,
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
                <table width="650" cellpadding="0" cellspacing="0" style="max-width: 650px; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: #7000ff; padding: 40px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">New Strategy Call Booked</h1>
                      <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">${formattedDate} at ${time}</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      
                      <!-- Client Details -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-radius: 6px; padding: 24px; margin-bottom: 24px; border: 1px solid #e9ecef;">
                        <tr>
                          <td>
                            <h2 style="margin: 0 0 16px 0; color: #212529; font-size: 18px; font-weight: 600; border-bottom: 2px solid #00f0ff; padding-bottom: 8px;">Client Details</h2>
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
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500;">Phone</td>
                                <td><a href="tel:${phone}" style="color: #00f0ff; text-decoration: none; font-weight: 500;">${phone}</a></td>
                              </tr>
                              ${company ? `
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500;">Company</td>
                                <td style="color: #212529; font-size: 15px;">${company}</td>
                              </tr>
                              ` : ''}
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Call Schedule -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-radius: 6px; padding: 24px; margin-bottom: 24px; border: 1px solid #e9ecef;">
                        <tr>
                          <td>
                            <h2 style="margin: 0 0 16px 0; color: #212529; font-size: 18px; font-weight: 600; border-bottom: 2px solid #7000ff; padding-bottom: 8px;">Call Schedule</h2>
                            <table width="100%" cellpadding="6" cellspacing="0">
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500; width: 100px;">Type</td>
                                <td style="color: #212529; font-size: 15px;"><span style="background: #7000ff; color: #ffffff; padding: 4px 12px; border-radius: 4px; font-weight: 500; font-size: 13px;">${callTypeLabels[callType]}</span></td>
                              </tr>
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500;">Platform</td>
                                <td style="color: #495057; font-size: 14px;">${callTypeDesc[callType]}</td>
                              </tr>
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500;">Date</td>
                                <td style="color: #212529; font-size: 16px; font-weight: 700;">${formattedDate}</td>
                              </tr>
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500;">Time</td>
                                <td style="color: #212529; font-size: 16px; font-weight: 700;">${time}</td>
                              </tr>
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500;">Duration</td>
                                <td style="color: #495057; font-size: 14px;">15 minutes</td>
                              </tr>
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500;">Timezone</td>
                                <td style="color: #495057; font-size: 14px;">${timezone}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Discussion Topic -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-radius: 6px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #00f0ff;">
                        <tr>
                          <td>
                            <h3 style="margin: 0 0 12px 0; color: #212529; font-size: 16px; font-weight: 600;">Discussion Topic</h3>
                            <p style="margin: 0; color: #212529; font-size: 15px; line-height: 1.6; font-weight: 500;">${topic}</p>
                            ${additionalInfo ? `
                            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #dee2e6;">
                              <h4 style="margin: 0 0 8px 0; color: #6c757d; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Additional Notes</h4>
                              <p style="margin: 0; color: #495057; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">${additionalInfo}</p>
                            </div>
                            ` : ''}
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
                                  <a href="mailto:${email}" style="display: inline-block; background: #00f0ff; color: #000000; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px; margin-right: 12px;">Email Client</a>
                                </td>
                                <td>
                                  <a href="tel:${phone}" style="display: inline-block; background: #7000ff; color: #ffffff; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px;">Call Client</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Reminder -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px; padding: 16px;">
                        <tr>
                          <td>
                            <p style="margin: 0; color: #856404; font-size: 13px; line-height: 1.5; text-align: center;">
                              <strong>Action Required:</strong> Send calendar invite and meeting link to ${email}
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px; background: #f8f9fa; border-top: 1px solid #dee2e6; text-align: center;">
                      <p style="margin: 0; color: #6c757d; font-size: 12px;">Automated Call Booking System</p>
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
      subject: `Your Strategy Call is Confirmed - ${formattedDate}`,
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
                    <td style="background: #7000ff; padding: 40px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Call Confirmed</h1>
                      <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">Looking forward to speaking with you</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 20px 0; color: #212529; font-size: 16px; line-height: 1.6;">Hi <strong>${name.split(' ')[0]}</strong>,</p>
                      
                      <p style="margin: 0 0 24px 0; color: #495057; font-size: 15px; line-height: 1.7;">
                        Your strategy call has been successfully booked! I'm excited to discuss <strong style="color: #00f0ff;">${topic}</strong> and explore how I can help you achieve your goals.
                      </p>
                      
                      <!-- Call Details -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-radius: 6px; padding: 24px; margin: 24px 0; border: 1px solid #e9ecef;">
                        <tr>
                          <td>
                            <h2 style="margin: 0 0 16px 0; color: #212529; font-size: 18px; font-weight: 600; border-bottom: 2px solid #00f0ff; padding-bottom: 8px;">Your Call Details</h2>
                            <table width="100%" cellpadding="8" cellspacing="0">
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500; width: 100px;">Date</td>
                                <td style="color: #212529; font-size: 16px; font-weight: 700;">${formattedDate}</td>
                              </tr>
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500;">Time</td>
                                <td style="color: #212529; font-size: 16px; font-weight: 700;">${time}</td>
                              </tr>
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500;">Duration</td>
                                <td style="color: #495057; font-size: 14px;">15 minutes</td>
                              </tr>
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500;">Call Type</td>
                                <td style="color: #212529; font-size: 14px;"><span style="background: #7000ff; color: #ffffff; padding: 4px 12px; border-radius: 4px; font-weight: 500; font-size: 13px;">${callTypeLabels[callType]}</span></td>
                              </tr>
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500;">Platform</td>
                                <td style="color: #495057; font-size: 14px;">${callTypeDesc[callType]}</td>
                              </tr>
                              <tr>
                                <td style="color: #6c757d; font-size: 14px; font-weight: 500;">Timezone</td>
                                <td style="color: #495057; font-size: 14px;">${timezone}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Topic Summary -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-radius: 6px; padding: 20px; border-left: 4px solid #7000ff; margin-bottom: 24px;">
                        <tr>
                          <td>
                            <h3 style="margin: 0 0 10px 0; color: #212529; font-size: 15px; font-weight: 600;">Discussion Topic</h3>
                            <p style="margin: 0; color: #495057; font-size: 14px; line-height: 1.6;">${topic}</p>
                            ${additionalInfo ? `
                            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #dee2e6;">
                              <p style="margin: 0; color: #6c757d; font-size: 13px; line-height: 1.6;">${additionalInfo}</p>
                            </div>
                            ` : ''}
                          </td>
                        </tr>
                      </table>
                      
                      <!-- What to Expect -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                        <tr>
                          <td>
                            <h3 style="margin: 0 0 12px 0; color: #212529; font-size: 15px; font-weight: 600;">What to Expect</h3>
                            <ul style="margin: 0; padding-left: 20px; color: #495057; line-height: 1.8; font-size: 14px;">
                              <li>Quick introduction and understanding of your needs</li>
                              <li>Discussion about ${topic}</li>
                              <li>Preliminary recommendations and next steps</li>
                              <li>Q&A session for any questions</li>
                            </ul>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Important Note -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
                        <tr>
                          <td>
                            <p style="margin: 0; color: #856404; font-size: 13px; line-height: 1.5; text-align: center;">
                              <strong>Important:</strong> You'll receive a calendar invite and meeting link within 24 hours. Please check your email including spam folder.
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #dee2e6;">
                        <tr>
                          <td>
                            <p style="margin: 0 0 8px 0; color: #212529; font-size: 15px; line-height: 1.5;">Looking forward to our conversation!</p>
                            <p style="margin: 16px 0 0 0; color: #212529; font-size: 15px; line-height: 1.5;">Best regards,</p>
                            <p style="margin: 4px 0 0 0; color: #00f0ff; font-size: 17px; font-weight: 700;">Manoj Kumar</p>
                            <p style="margin: 2px 0 0 0; color: #6c757d; font-size: 13px;">Full Stack Developer & AI Engineer</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px; background: #f8f9fa; border-top: 1px solid #dee2e6; text-align: center;">
                      <p style="margin: 0 0 8px 0; color: #6c757d; font-size: 13px;">Need to reschedule or have questions?</p>
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
      { message: 'Call booked successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error booking call:', error);
    return NextResponse.json(
      { message: 'Failed to book call', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
