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
      video: '🎥 Video Call',
      phone: '📞 Phone Call',
      chat: '💬 Text Chat',
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

    // Admin notification email with premium template
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📅 Strategy Call: ${name} | ${formattedDate} at ${time}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background: #0a0a0a; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="650" cellpadding="0" cellspacing="0" style="max-width: 650px; background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,240,255,0.2), 0 0 0 1px rgba(0,240,255,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #00f0ff 0%, #7000ff 100%); padding: 50px 40px; text-align: center;">
                      <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.3);">
                        <span style="font-size: 40px;">📅</span>
                      </div>
                      <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">New Strategy Call!</h1>
                      <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">${formattedDate} at ${time}</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <!-- Client Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(0,240,255,0.05); border-radius: 16px; padding: 30px; border: 1px solid rgba(0,240,255,0.2); margin-bottom: 24px;">
                        <tr>
                          <td>
                            <h2 style="margin: 0 0 20px 0; color: #00f0ff; font-size: 20px; font-weight: 700;">👤 Client Details</h2>
                            <table width="100%" cellpadding="8" cellspacing="0">
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600; width: 120px;">Name:</td>
                                <td style="color: white; font-size: 16px; font-weight: 600;">${name}</td>
                              </tr>
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600;">Email:</td>
                                <td><a href="mailto:${email}" style="color: #00f0ff; text-decoration: none; font-weight: 600;">${email}</a></td>
                              </tr>
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600;">Phone:</td>
                                <td><a href="tel:${phone}" style="color: #00f0ff; text-decoration: none; font-weight: 600;">${phone}</a></td>
                              </tr>
                              ${company ? `
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600;">Company:</td>
                                <td style="color: white; font-size: 16px;">${company}</td>
                              </tr>
                              ` : ''}
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Call Schedule Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(112,0,255,0.1) 0%, rgba(0,240,255,0.1) 100%); border-radius: 16px; padding: 30px; border: 1px solid rgba(112,0,255,0.3); margin-bottom: 24px;">
                        <tr>
                          <td>
                            <h2 style="margin: 0 0 20px 0; color: #7000ff; font-size: 20px; font-weight: 700;">📞 Call Schedule</h2>
                            <table width="100%" cellpadding="8" cellspacing="0">
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600; width: 120px;">Type:</td>
                                <td style="color: white; font-size: 16px;"><span style="background: linear-gradient(135deg, #7000ff 0%, #00f0ff 100%); padding: 6px 12px; border-radius: 8px; font-weight: 600;">${callTypeLabels[callType]}</span></td>
                              </tr>
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600;">Platform:</td>
                                <td style="color: #ccc; font-size: 14px;">${callTypeDesc[callType]}</td>
                              </tr>
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600;">Date:</td>
                                <td style="color: white; font-size: 18px; font-weight: 700;">${formattedDate}</td>
                              </tr>
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600;">Time:</td>
                                <td style="color: white; font-size: 18px; font-weight: 700;">${time}</td>
                              </tr>
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600;">Duration:</td>
                                <td style="color: #ccc; font-size: 14px;">15 minutes</td>
                              </tr>
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600;">Timezone:</td>
                                <td style="color: #ccc; font-size: 14px;">${timezone}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Topic Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(0,240,255,0.05); border-radius: 16px; padding: 30px; border-left: 4px solid #00f0ff; margin-bottom: 24px;">
                        <tr>
                          <td>
                            <h3 style="margin: 0 0 16px 0; color: #00f0ff; font-size: 18px; font-weight: 700;">💼 Discussion Topic</h3>
                            <p style="margin: 0; color: white; font-size: 16px; line-height: 1.6; font-weight: 600;">${topic}</p>
                            ${additionalInfo ? `
                            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                              <h4 style="margin: 0 0 12px 0; color: #888; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Additional Notes</h4>
                              <p style="margin: 0; color: #ccc; line-height: 1.8; white-space: pre-wrap;">${additionalInfo}</p>
                            </div>
                            ` : ''}
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Action Buttons -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #00f0ff 0%, #0099cc 100%); color: black; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px; margin: 0 8px; box-shadow: 0 4px 15px rgba(0,240,255,0.4);">
                              📧 Email Client
                            </a>
                            <a href="tel:${phone}" style="display: inline-block; background: linear-gradient(135deg, #7000ff 0%, #5000cc 100%); color: white; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px; margin: 0 8px; box-shadow: 0 4px 15px rgba(112,0,255,0.4);">
                              📞 Call Now
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Reminder Banner -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(90deg, rgba(255,193,7,0.1) 0%, rgba(255,152,0,0.1) 100%); border-radius: 12px; padding: 20px; border: 1px solid rgba(255,193,7,0.3);">
                        <tr>
                          <td>
                            <p style="margin: 0; color: #ffb300; font-size: 14px; text-align: center;">
                              ⏰ <strong>Action Required:</strong> Send calendar invite and meeting link to ${email}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
                      <p style="margin: 0; color: #666; font-size: 13px;">Automated call booking system</p>
                      <p style="margin: 5px 0 0 0; color: #444; font-size: 12px;">${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
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
      subject: `✅ Your Strategy Call is Confirmed - ${formattedDate}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background: #0a0a0a; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,240,255,0.2), 0 0 0 1px rgba(0,240,255,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #00f0ff 0%, #7000ff 100%); padding: 50px 40px; text-align: center;">
                      <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.3);">
                        <span style="font-size: 40px;">✅</span>
                      </div>
                      <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">Call Confirmed!</h1>
                      <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Looking forward to speaking with you</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 24px 0; color: white; font-size: 18px; line-height: 1.6;">Hey <strong style="color: #00f0ff;">${name.split(' ')[0]}</strong>,</p>
                      
                      <p style="margin: 0 0 30px 0; color: #ccc; font-size: 16px; line-height: 1.8;">
                        Your strategy call has been successfully booked! I'm excited to discuss <strong style="color: #00f0ff;">${topic}</strong> and explore how I can help you achieve your goals.
                      </p>
                      
                      <!-- Call Details Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(0,240,255,0.1) 0%, rgba(112,0,255,0.1) 100%); border-radius: 16px; padding: 30px; border: 1px solid rgba(0,240,255,0.3); margin: 30px 0;">
                        <tr>
                          <td>
                            <h2 style="margin: 0 0 20px 0; color: #00f0ff; font-size: 20px; font-weight: 700;">📅 Your Call Details</h2>
                            <table width="100%" cellpadding="10" cellspacing="0">
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600; width: 120px;">Date:</td>
                                <td style="color: white; font-size: 18px; font-weight: 700;">${formattedDate}</td>
                              </tr>
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600;">Time:</td>
                                <td style="color: white; font-size: 18px; font-weight: 700;">${time}</td>
                              </tr>
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600;">Duration:</td>
                                <td style="color: #ccc; font-size: 15px;">15 minutes</td>
                              </tr>
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600;">Call Type:</td>
                                <td style="color: white; font-size: 15px;"><span style="background: linear-gradient(135deg, #7000ff 0%, #00f0ff 100%); padding: 4px 12px; border-radius: 6px; font-weight: 600;">${callTypeLabels[callType]}</span></td>
                              </tr>
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600;">Platform:</td>
                                <td style="color: #ccc; font-size: 14px;">${callTypeDesc[callType]}</td>
                              </tr>
                              <tr>
                                <td style="color: #888; font-size: 14px; font-weight: 600;">Timezone:</td>
                                <td style="color: #ccc; font-size: 14px;">${timezone}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Topic Summary -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(112,0,255,0.05); border-radius: 16px; padding: 25px; border-left: 4px solid #7000ff; margin-bottom: 30px;">
                        <tr>
                          <td>
                            <h3 style="margin: 0 0 12px 0; color: #7000ff; font-size: 16px; font-weight: 700;">💼 Discussion Topic</h3>
                            <p style="margin: 0; color: white; font-size: 15px; line-height: 1.6;">${topic}</p>
                            ${additionalInfo ? `
                            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
                              <p style="margin: 0; color: #ccc; font-size: 14px; line-height: 1.6;">${additionalInfo}</p>
                            </div>
                            ` : ''}
                          </td>
                        </tr>
                      </table>
                      
                      <!-- What to Expect -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(0,240,255,0.05); border-radius: 16px; padding: 25px; margin-bottom: 30px;">
                        <tr>
                          <td>
                            <h3 style="margin: 0 0 16px 0; color: #00f0ff; font-size: 18px; font-weight: 700;">📋 What to Expect</h3>
                            <ul style="margin: 0; padding-left: 20px; color: #ccc; line-height: 2;">
                              <li>Quick introduction and understanding of your needs</li>
                              <li>Discussion about ${topic}</li>
                              <li>Preliminary recommendations and next steps</li>
                              <li>Q&A session for any questions</li>
                            </ul>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Important Note -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(90deg, rgba(255,193,7,0.1) 0%, rgba(255,152,0,0.1) 100%); border-radius: 12px; padding: 20px; border: 1px solid rgba(255,193,7,0.3); margin-bottom: 30px;">
                        <tr>
                          <td>
                            <p style="margin: 0; color: #ffb300; font-size: 14px; line-height: 1.6; text-align: center;">
                              <strong>📌 Important:</strong> You'll receive a calendar invite and meeting link within 24 hours. Please check your email (including spam folder).
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin: 30px 0 0 0; color: white; font-size: 16px; line-height: 1.6;">
                        Looking forward to our conversation!<br><br>
                        <strong style="color: #00f0ff; font-size: 18px;">Manoj Kumar</strong><br>
                        <span style="color: #888; font-size: 14px;">Full Stack Developer & AI Engineer</span>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
                      <p style="margin: 0 0 10px 0; color: #666; font-size: 13px;">Need to reschedule or have questions?</p>
                      <p style="margin: 0; color: #00f0ff; font-size: 13px;"><a href="mailto:manojchundru5@gmail.com" style="color: #00f0ff; text-decoration: none;">manojchundru5@gmail.com</a></p>
                      <p style="margin: 10px 0 0 0; color: #444; font-size: 12px;">🌐 <a href="https://durgesh-v.vercel.app" style="color: #00f0ff; text-decoration: none;">durgesh-v.vercel.app</a></p>
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
