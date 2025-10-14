# Contact Form Integration Guide

## Overview

The contact form is integrated with **Getform.io** to receive messages from visitors without needing a backend server.

---

## 🔗 Current Setup

### Form Endpoint
```
https://getform.io/f/aolzdojb
```

### Configuration File
**`src/data/contact.json`**

```json
{
  "title": "Contact",
  "description": "Get in touch for collaborations, bookings, or just to say hello.",
  "form": {
    "endpoint": "https://getform.io/f/aolzdojb",
    "fields": {
      "name": "Your name",
      "email": "Your email",
      "message": "Message"
    },
    "submitText": "Send",
    "messages": {
      "success": "Thank you! Your message has been sent successfully.",
      "error": "Oops! Something went wrong. Please try again.",
      "sending": "Sending..."
    }
  }
}
```

---

## 📋 Features

### Form Validation
- ✅ Required fields (name, email, message)
- ✅ Email format validation (HTML5)
- ✅ Empty field prevention
- ✅ Button disabled until form is valid

### User Feedback
- 🔵 **Idle State**: Normal form, button says "Send"
- ⏳ **Sending State**: Fields disabled, button says "Sending..."
- ✅ **Success State**: Green message box, form clears, auto-dismisses after 5s
- ❌ **Error State**: Red message box, form keeps data, auto-dismisses after 5s

### Accessibility
- Screen reader friendly
- Keyboard navigation
- Proper focus states
- Descriptive error messages

---

## 🎨 Visual States

### Success Message
```
┌─────────────────────────────────────────────┐
│ ✓ Thank you! Your message has been sent    │
│   successfully.                              │
└─────────────────────────────────────────────┘
```
- Background: Green with 10% opacity
- Border: Green with 20% opacity
- Text: Green (#4ADE80)

### Error Message
```
┌─────────────────────────────────────────────┐
│ ✗ Oops! Something went wrong. Please try   │
│   again.                                     │
└─────────────────────────────────────────────┘
```
- Background: Red with 10% opacity
- Border: Red with 20% opacity
- Text: Red (#F87171)

### Sending State
- All form fields disabled (50% opacity)
- Button text changes to "Sending..."
- Button disabled (can't double-submit)

---

## 🔧 Customization

### Change Messages

Edit `src/data/contact.json`:

```json
{
  "messages": {
    "success": "Your custom success message!",
    "error": "Your custom error message!",
    "sending": "Processing..."
  }
}
```

### Change Field Placeholders

```json
{
  "fields": {
    "name": "Full Name",
    "email": "Email Address",
    "message": "Your Message"
  }
}
```

### Change Button Text

```json
{
  "submitText": "Submit"
}
```

---

## 🔄 Using a Different Form Service

### Option 1: Change Getform Endpoint

If you create a new Getform form:

```json
{
  "endpoint": "https://getform.io/f/YOUR_NEW_FORM_ID"
}
```

### Option 2: Use Formspree

```json
{
  "endpoint": "https://formspree.io/f/YOUR_FORM_ID"
}
```

### Option 3: Use Form backends

The form is compatible with any service that accepts:
- Method: `POST`
- Content-Type: `application/json`
- Body: `{ name, email, message }`

Popular services:
- **Getform** (current): https://getform.io
- **Formspree**: https://formspree.io
- **Netlify Forms**: Requires HTML form submission
- **EmailJS**: Requires different setup
- **Web3Forms**: https://web3forms.com

---

## 📊 How It Works

### 1. User Fills Form
```
Name: John Doe
Email: john@example.com
Message: Hello!
```

### 2. User Clicks Submit
- Form validates (required fields, email format)
- If valid, changes to "sending" state
- Fields become disabled

### 3. Request Sent
```javascript
fetch('https://getform.io/f/aolzdojb', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello!'
  })
})
```

### 4. Response Handled
- **Success (200)**: Show green message, clear form
- **Error (4xx/5xx)**: Show red message, keep form data
- **Network Error**: Show red message, keep form data

### 5. Auto-Dismiss
- After 5 seconds, status message disappears
- Form returns to idle state

---

## 📧 Receiving Messages

### Getform Dashboard

1. Login to Getform: https://app.getform.io
2. Go to your form dashboard
3. View submissions in real-time
4. Export to CSV
5. Set up email notifications (optional)

### Email Notifications

In Getform dashboard:
1. Go to form settings
2. Enable "Email Notifications"
3. Add your email address
4. Customize notification template

---

## 🔒 Security

### Spam Protection

Getform includes:
- ✅ reCAPTCHA integration (optional)
- ✅ Honeypot fields (automatic)
- ✅ Rate limiting
- ✅ IP blocking

### Data Privacy

- Form data sent over HTTPS
- Data stored securely by Getform
- GDPR compliant
- You control data retention

---

## 🧪 Testing

### Test Locally

1. Run your dev server: `npm run dev`
2. Navigate to the contact section
3. Fill out the form with test data
4. Click "Send"
5. Check Getform dashboard for submission

### Test Different States

**Success:**
- Fill form correctly
- Submit
- Should see green success message
- Form should clear

**Validation:**
- Try submitting empty form → Button disabled
- Enter invalid email → HTML validation error
- Fill all fields → Button enabled

**Error Handling:**
- To test error state, temporarily change endpoint to invalid URL
- Submit form
- Should see red error message

---

## 🐛 Troubleshooting

### Form Not Submitting

**Problem:** Button stays in "Sending..." state  
**Solution:** Check browser console for errors, verify endpoint URL

### Success But No Email

**Problem:** Form submits but you don't receive emails  
**Solution:** Check Getform dashboard email notification settings

### CORS Errors

**Problem:** "CORS policy blocked" error  
**Solution:** Getform should handle CORS automatically. If issue persists, check Getform settings.

### Form Clears But Shows Error

**Problem:** Form works but shows error message  
**Solution:** Getform might be returning non-200 status. Check Getform account limits.

---

## 📝 Form Field Names

Current field names sent to Getform:
- `name` - Visitor's name
- `email` - Visitor's email
- `message` - Visitor's message

These are automatically mapped in the contact form. No changes needed unless you want to add custom fields.

---

## 🚀 Adding Custom Fields

### Step 1: Update `contact.json`

```json
{
  "fields": {
    "name": "Your name",
    "email": "Your email",
    "phone": "Phone number",  // NEW
    "message": "Message"
  }
}
```

### Step 2: Update `ContactForm.tsx`

Add field to state:
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',  // NEW
  message: '',
});
```

Add Input component:
```tsx
<Input
  name="phone"
  type="tel"
  placeholder={placeholders.phone}
  value={formData.phone}
  onChange={handleChange}
/>
```

That's it! The new field will be included in submissions.

---

## ✅ Quick Checklist

- [x] Getform account created
- [x] Endpoint configured in `contact.json`
- [x] Form tested and working
- [x] Email notifications set up (optional)
- [ ] Test form on live site
- [ ] Set up spam protection (if needed)
- [ ] Configure auto-responder (optional)

---

## 🆘 Support

### Getform Support
- Documentation: https://docs.getform.io
- Support: support@getform.io

### Form Issues
Check the browser console for error messages and refer to this documentation for common solutions.

---

Your contact form is now live and ready to receive messages! 📬✨

