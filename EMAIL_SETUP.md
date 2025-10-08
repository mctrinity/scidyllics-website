# Email Setup for Contact Form

The contact form is configured to send emails using [Resend](https://resend.com), a modern email API service.

## Setup Instructions

### 1. Sign up for Resend
1. Go to [resend.com](https://resend.com)
2. Create a free account
3. Verify your email address
4. Add your domain (or use the provided test domain for development)

### 2. Get your API Key
1. Go to the Resend Dashboard
2. Navigate to "API Keys"
3. Create a new API key
4. Copy the API key

### 3. Configure Environment Variables
Update your `.env` file with:

```env
# Replace with your actual Resend API key
RESEND_API_KEY="re_your_actual_api_key_here"

# Email addresses
FROM_EMAIL="hello@yourdomain.com"  # Must be verified domain in Resend
TO_EMAIL="your-email@yourdomain.com"  # Where you want to receive notifications
```

### 4. Verify Domain (Production)
For production use:
1. Add your domain in Resend Dashboard
2. Add the required DNS records to verify domain ownership
3. Update `FROM_EMAIL` to use your verified domain

## How it Works

When someone submits the contact form:

1. **Data is saved** to the SQLite database
2. **Email notification** is sent to your configured email address with the inquiry details
3. **Auto-reply** is sent to the user confirming receipt of their request

## Development Mode

During development, if no API key is configured, the form will:
- Still save data to the database
- Skip email sending (no errors)
- Show success message to user

## Email Templates

The system sends two emails:

### 1. Notification Email (to you)
- Subject: "New Assessment Request from [Name]"
- Contains all form details
- Includes timestamp

### 2. Auto-reply Email (to user)
- Subject: "Thank you for your assessment request - Scidyllics"
- Professional acknowledgment
- Sets expectation for response time

## Testing

1. Configure your API key in `.env`
2. Submit a test form
3. Check both your inbox and the user's email address
4. Verify database entry at `/api/leads`

## Alternative: Gmail SMTP

If you prefer using Gmail instead of Resend, you can modify the code to use Nodemailer with Gmail SMTP. Let me know if you'd like that implementation instead.