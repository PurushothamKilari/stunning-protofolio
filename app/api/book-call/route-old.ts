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
      video: '🎥 Video Call (Google Meet/Zoom)',
      phone: '📞 Phone Call',
      chat: '💬 Text Chat (WhatsApp/Telegram)',
    };

    // Format date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Email to yourself (Durgesh)
    const adminMailOptions = {
      from: `"Strategy Call Booking" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🚀 New Strategy Call Booked: ${name} - ${formattedDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #00f0ff 0%, #7000ff 100%); padding: 40px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">📅 New Strategy Call Booked</h1>
          </div>
          
          <!-- Body -->
          <div style="background: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Client Info Section -->
            <div style="background: #f5f5f5; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
              <h2 style="margin: 0 0 20px 0; color: #333; font-size: 20px; border-bottom: 2px solid #00f0ff; padding-bottom: 10px;">
                👤 Client Information
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold; width: 140px;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00f0ff; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #00f0ff; text-decoration: none;">${phone}</a></td>
                </tr>
                ${company ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Company:</td>
                  <td style="padding: 8px 0; color: #333;">${company}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <!-- Call Details Section -->
            <div style="background: linear-gradient(135deg, #e8f4ff 0%, #f0e8ff 100%); padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #00f0ff;">
              <h2 style="margin: 0 0 20px 0; color: #333; font-size: 20px;">
                📞 Call Details
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold; width: 140px;">Call Type:</td>
                  <td style="padding: 8px 0; color: #333; font-size: 16px;">${callTypeLabels[callType]}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Date:</td>
                  <td style="padding: 8px 0; color: #333; font-size: 16px; font-weight: bold;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Time:</td>
                  <td style="padding: 8px 0; color: #333; font-size: 16px; font-weight: bold;">${time}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Timezone:</td>
                  <td style="padding: 8px 0; color: #333;">${timezone}</td>
                </tr>
              </table>
            </div>

            <!-- Topic Section -->
            <div style="background: #fafafa; padding: 25px; border-left: 4px solid #7000ff; border-radius: 12px; margin-bottom: 25px;">
              <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">💼 Discussion Topic</h3>
              <p style="margin: 0; color: #555; font-size: 16px; line-height: 1.6;">${topic}</p>
              ${additionalInfo ? `
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                  <h4 style="margin: 0 0 10px 0; color: #666; font-size: 14px; text-transform: uppercase;">Additional Notes:</h4>
                  <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${additionalInfo}</p>
                </div>
              ` : ''}
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; padding: 30px 0 20px 0;">
              <a href="mailto:${email}" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #00f0ff 0%, #0099cc 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                📧 Reply to Client
              </a>
              <a href="tel:${phone}" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #7000ff 0%, #5000cc 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                📞 Call Client
              </a>
            </div>

            <!-- Quick Actions -->
            <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 15px; text-align: center; margin-top: 20px;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                ⏰ <strong>Action Required:</strong> Send calendar invite and meeting link to ${email}
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
            <p style="margin: 5px 0;">Sent from your portfolio booking system</p>
            <p style="margin: 5px 0;">${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    // Confirmation email to client
    const clientMailOptions = {
      from: `"Manoj Kumar" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ Your Strategy Call is Confirmed - ${formattedDate} at ${time}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #00f0ff 0%, #7000ff 100%); padding: 40px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 26px;">✅ Call Confirmed!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Looking forward to speaking with you</p>
          </div>
          
          <!-- Body -->
          <div style="background: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 25px;">
              Hi <strong>${name}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 30px;">
              Thank you for booking a strategy call with me! I'm excited to discuss <strong>${topic}</strong> and explore how I can help you achieve your goals.
            </p>

            <!-- Call Details Box -->
            <div style="background: linear-gradient(135deg, #e8f4ff 0%, #f0e8ff 100%); padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #00f0ff;">
              <h2 style="margin: 0 0 20px 0; color: #333; font-size: 20px;">📅 Your Call Details</h2>
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold; width: 120px;">Date:</td>
                  <td style="padding: 8px 0; color: #333; font-size: 16px; font-weight: bold;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Time:</td>
                  <td style="padding: 8px 0; color: #333; font-size: 16px; font-weight: bold;">${time}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Duration:</td>
                  <td style="padding: 8px 0; color: #333;">15 minutes</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Call Type:</td>
                  <td style="padding: 8px 0; color: #333;">${callTypeLabels[callType]}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Timezone:</td>
                  <td style="padding: 8px 0; color: #333;">${timezone}</td>
                </tr>
              </table>
            </div>

            <!-- What to Expect -->
            <div style="background: #fafafa; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
              <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">📋 What to Expect</h3>
              <ul style="margin: 0; padding-left: 20px; color: #555; line-height: 1.8;">
                <li>Quick introduction and understanding of your needs</li>
                <li>Discussion about ${topic}</li>
                <li>Preliminary recommendations and next steps</li>
                <li>Q&A session for any questions you have</li>
              </ul>
            </div>

            <!-- Important Note -->
            <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
              <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                <strong>📌 Important:</strong> You'll receive a calendar invite and meeting link within 24 hours. Please check your email (including spam folder).
              </p>
            </div>

            <!-- Need to Reschedule -->
            <div style="text-align: center; padding: 20px 0; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin-bottom: 15px;">Need to reschedule or have questions?</p>
              <a href="mailto:manojchundru5@gmail.com" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #00f0ff 0%, #0099cc 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                Contact Me
              </a>
            </div>

            <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 30px;">
              Looking forward to our conversation!<br><br>
              <strong>Best regards,</strong><br>
              <span style="color: #00f0ff; font-size: 18px; font-weight: bold;">Manoj Kumar</span><br>
              <span style="color: #666; font-size: 14px;">Full Stack Developer & AI Engineer</span>
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
            <p style="margin: 5px 0;">This is an automated confirmation email</p>
            <p style="margin: 5px 0;">
              <a href="https://durgesh-v.vercel.app" style="color: #00f0ff; text-decoration: none;">durgesh-v.vercel.app</a>
            </p>
          </div>
        </div>
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
