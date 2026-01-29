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
      subject: `🎯 New Lead: ${name} | ${service}`,
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
                  <!-- Animated Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #00f0ff 0%, #7000ff 100%); padding: 50px 40px; position: relative; text-align: center;">
                      <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.3);">
                        <span style="font-size: 40px;">🚀</span>
                      </div>
                      <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">New Lead Alert!</h1>
                      <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Someone wants to work with you</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <!-- Client Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(0,240,255,0.05); border-radius: 16px; padding: 30px; border: 1px solid rgba(0,240,255,0.2); margin-bottom: 24px;">
                        <tr>
                          <td>
                            <h2 style="margin: 0 0 20px 0; color: #00f0ff; font-size: 20px; font-weight: 700;">👤 Client Information</h2>
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
                                <td style="color: #888; font-size: 14px; font-weight: 600;">Service:</td>
                                <td style="color: white; font-size: 16px;"><span style="background: linear-gradient(135deg, #00f0ff 0%, #7000ff 100%); padding: 4px 12px; border-radius: 6px; font-weight: 600;">${service}</span></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Message Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(112,0,255,0.05); border-radius: 16px; padding: 30px; border-left: 4px solid #7000ff; margin-bottom: 24px;">
                        <tr>
                          <td>
                            <h3 style="margin: 0 0 16px 0; color: #7000ff; font-size: 18px; font-weight: 700;">💬 Their Message</h3>
                            <p style="margin: 0; color: #ccc; line-height: 1.8; font-size: 15px; white-space: pre-wrap;">${message}</p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- CTA Buttons -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #00f0ff 0%, #0099cc 100%); color: black; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px; margin: 0 8px; box-shadow: 0 4px 15px rgba(0,240,255,0.4);">
                              📧 Reply Now
                            </a>
                            <a href="tel:${email}" style="display: inline-block; background: rgba(255,255,255,0.1); color: white; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px; margin: 0 8px; border: 2px solid rgba(255,255,255,0.2);">
                              ⭐ Mark Important
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Stats Banner -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(90deg, rgba(0,240,255,0.1) 0%, rgba(112,0,255,0.1) 100%); border-radius: 12px; padding: 20px; text-align: center;">
                        <tr>
                          <td>
                            <p style="margin: 0; color: #888; font-size: 13px;">⚡ <strong style="color: #00f0ff;">Quick Response Tip:</strong> Clients who receive replies within 1 hour are 7x more likely to convert!</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
                      <p style="margin: 0; color: #666; font-size: 13px;">Automated by your portfolio system</p>
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
      subject: `✅ Thanks for reaching out, ${name.split(' ')[0]}!`,
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
                        <span style="font-size: 40px;">✨</span>
                      </div>
                      <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">Message Received!</h1>
                      <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">I'll get back to you very soon</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 24px 0; color: white; font-size: 18px; line-height: 1.6;">Hey <strong style="color: #00f0ff;">${name.split(' ')[0]}</strong>,</p>
                      
                      <p style="margin: 0 0 24px 0; color: #ccc; font-size: 16px; line-height: 1.8;">
                        Thanks for reaching out! I've received your message about <strong style="color: #00f0ff;">${service}</strong> and I'm excited to learn more about your project.
                      </p>
                      
                      <!-- Summary Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(0,240,255,0.05); border-radius: 16px; padding: 30px; border: 1px solid rgba(0,240,255,0.2); margin: 30px 0;">
                        <tr>
                          <td>
                            <h3 style="margin: 0 0 20px 0; color: #00f0ff; font-size: 18px; font-weight: 700;">📋 Your Submission Summary</h3>
                            <table width="100%" cellpadding="8" cellspacing="0">
                              <tr>
                                <td style="color: #888; font-size: 14px; width: 120px;">Service Type:</td>
                                <td style="color: white; font-size: 15px; font-weight: 600;">${service}</td>
                              </tr>
                              <tr>
                                <td style="color: #888; font-size: 14px;">Your Email:</td>
                                <td style="color: #00f0ff; font-size: 15px;">${email}</td>
                              </tr>
                              <tr>
                                <td style="color: #888; font-size: 14px; vertical-align: top;">Message:</td>
                                <td style="color: #ccc; font-size: 14px; line-height: 1.6;">${message.substring(0, 150)}${message.length > 150 ? '...' : ''}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin: 0 0 24px 0; color: #ccc; font-size: 16px; line-height: 1.8;">
                        I typically respond within <strong style="color: #00f0ff;">24 hours</strong>. In the meantime, feel free to check out my recent work or book a quick call if you'd like to discuss your project sooner.
                      </p>
                      
                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <a href="https://durgesh-v.vercel.app/book-call" style="display: inline-block; background: linear-gradient(135deg, #00f0ff 0%, #0099cc 100%); color: black; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px; box-shadow: 0 4px 15px rgba(0,240,255,0.4);">
                              📞 Book a Quick Call
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin: 30px 0 0 0; color: white; font-size: 16px; line-height: 1.6;">
                        Best regards,<br>
                        <strong style="color: #00f0ff; font-size: 18px;">Manoj Kumar</strong><br>
                        <span style="color: #888; font-size: 14px;">Full Stack Developer & AI Engineer</span>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
                      <p style="margin: 0 0 10px 0; color: #666; font-size: 13px;">📧 <a href="mailto:manojchundru5@gmail.com" style="color: #00f0ff; text-decoration: none;">manojchundru5@gmail.com</a></p>
                      <p style="margin: 0; color: #666; font-size: 13px;">🌐 <a href="https://durgesh-v.vercel.app" style="color: #00f0ff; text-decoration: none;">durgesh-v.vercel.app</a></p>
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
