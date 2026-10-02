// Service to dispatch real-time lead and booking notifications to the academy owner.
// Target Email: krish50023@gmail.com
// Target WhatsApp: +91 98726 99997

export const ACADEMY_CONFIG = {
  OWNER_EMAIL: 'krish50023@gmail.com',
  OWNER_PHONE: '919872699997',
  OWNER_PHONE_FORMATTED: '+91 98726 99997',
  WHATSAPP_LINK: 'https://wa.me/919872699997',
};

export interface TrialBookingPayload {
  studentName: string;
  email: string;
  phone: string;
  ageGrade: string;
  playerLevel: string;
  preferredDate: string;
  preferredTime: string;
  learningGoal?: string;
  coachPreference?: string;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  category: string;
  message: string;
}

class NotificationService {
  private endpoint = `https://formsubmit.co/ajax/${ACADEMY_CONFIG.OWNER_EMAIL}`;

  /**
   * Dispatches email notification for a new Free Trial booking
   */
  public async sendTrialBookingNotification(data: TrialBookingPayload): Promise<boolean> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `♟️ NEW TRIAL BOOKING: ${data.studentName} (${data.preferredDate} at ${data.preferredTime})`,
          _template: 'table',
          'Student / Parent Name': data.studentName,
          'Contact Phone': data.phone,
          'Contact Email': data.email,
          'Age / Grade': data.ageGrade,
          'Skill Level': data.playerLevel,
          'Preferred Slot': `${data.preferredDate} at ${data.preferredTime}`,
          'Learning Objective': data.learningGoal || 'General improvement & fundamentals',
          'Coach Preference': data.coachPreference || 'Best suited titled coach',
          'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          'Platform': 'Knightesline Chess Academy'
        }),
      });

      return response.ok;
    } catch (err) {
      console.warn('Error sending trial notification email:', err);
      return false;
    }
  }

  /**
   * Dispatches email notification for Contact & Inquiry form submissions
   */
  public async sendContactFormNotification(data: ContactFormPayload): Promise<boolean> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `💬 NEW ACADEMY INQUIRY: ${data.name} [${data.category}]`,
          _template: 'table',
          'Full Name': data.name,
          'Email Address': data.email,
          'Phone': data.phone || 'Not provided',
          'Inquiry Category': data.category,
          'Message / Query': data.message,
          'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          'Platform': 'Knightesline Chess Academy'
        }),
      });

      return response.ok;
    } catch (err) {
      console.warn('Error sending contact notification email:', err);
      return false;
    }
  }

  /**
   * Dispatches email notification for Grandmaster Insights Newsletter subscriptions
   */
  public async sendNewsletterNotification(subscriberEmail: string): Promise<boolean> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `📬 NEW NEWSLETTER SUBSCRIBER: ${subscriberEmail}`,
          'Subscriber Email': subscriberEmail,
          'Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          'Platform': 'Knightesline Grandmaster Insights'
        }),
      });

      return response.ok;
    } catch (err) {
      console.warn('Error sending newsletter notification email:', err);
      return false;
    }
  }

  /**
   * Dispatches email notification for completed paid course enrollments
   */
  public async sendEnrollmentPaymentNotification(data: {
    planName: string;
    amount: number;
    billingCycle: string;
    studentName?: string;
    studentEmail?: string;
    paymentId: string;
  }): Promise<boolean> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `💰 NEW ENROLLMENT PAYMENT: ₹${data.amount} for ${data.planName}`,
          _template: 'table',
          'Plan Enrolled': data.planName,
          'Amount Paid': `₹${data.amount} (${data.billingCycle.toUpperCase()})`,
          'Student Name': data.studentName || 'Academy Student',
          'Student Email': data.studentEmail || 'Registered user',
          'Razorpay Payment ID': data.paymentId,
          'Payment Status': 'SUCCESSFUL',
          'Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          'Platform': 'Knightesline Chess Academy'
        }),
      });

      return response.ok;
    } catch (err) {
      console.warn('Error sending payment notification email:', err);
      return false;
    }
  }

  public getWhatsAppTrialLink(data: TrialBookingPayload): string {
    const text = encodeURIComponent(
      `♟️ *New Free Trial Booking — Knightesline Academy*\n\n` +
      `• *Student:* ${data.studentName}\n` +
      `• *Phone:* ${data.phone}\n` +
      `• *Email:* ${data.email}\n` +
      `• *Age/Grade:* ${data.ageGrade}\n` +
      `• *Level:* ${data.playerLevel}\n` +
      `• *Preferred Slot:* ${data.preferredDate} at ${data.preferredTime}\n` +
      `• *Goal:* ${data.learningGoal || 'Piece fundamentals & calculation'}\n\n` +
      `Looking forward to scheduling my evaluation session!`
    );
    return `https://wa.me/${ACADEMY_CONFIG.OWNER_PHONE}?text=${text}`;
  }
}

export const notificationService = new NotificationService();
