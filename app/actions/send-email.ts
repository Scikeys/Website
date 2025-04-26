"use server"

interface EmailData {
  name: string
  email: string
  organization: string
  message: string
}

export async function sendEmail(data: EmailData) {
  try {
    // In a real application, you would use a service like Nodemailer, SendGrid, etc.
    // This is a simplified example that simulates sending an email

    console.log("Sending email with data:", data)

    // Simulate API call to email service
    // In a real application, you would replace this with actual email sending code
    // For example, using Nodemailer:
    /*
    const transporter = nodemailer.createTransport({
      host: 'your-smtp-host',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com',
        pass: 'your-password',
      },
    });

    await transporter.sendMail({
      from: '"Contact Form" <noreply@yourdomain.com>',
      to: "scikeys@sysunion.de",
      subject: `Contact Form: ${data.name}`,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Organization: ${data.organization}
        Message: ${data.message}
      `,
      html: `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Organization:</strong> ${data.organization}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `,
    });
    */

    // Simulate a delay to mimic network request
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Failed to send email" }
  }
}
