import { smsService } from './smsService';

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

export function cleanPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return '91' + digits;
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return '91' + digits.substring(1);
  }
  return digits || '919872699997';
}

class NotificationService {
  private endpoint = `https://formsubmit.co/ajax/${ACADEMY_CONFIG.OWNER_EMAIL}`;

  /**
   * Dispatches real-time email notification to the academy owner AND
   * automatically delivers a styled confirmation receipt to the applicant's email address.
   */
  public async sendTrialBookingNotification(data: TrialBookingPayload): Promise<boolean> {
    try {
      const studentPhone = cleanPhoneNumber(data.phone);
      const ownerReplyLink = this.getWhatsAppStudentWelcomeLink(data);

      const autoResponseText = 
`♟️ KNIGHTESLINE CHESS ACADEMY — EVALUATION SESSION CONFIRMED

Dear ${data.studentName},

Congratulations! Your complimentary 45-Minute Grandmaster Evaluation Class has been successfully booked with Knightesline Chess Academy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR SESSION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Student / Parent Name : ${data.studentName}
• Scheduled Date        : ${data.preferredDate}
• Preferred Time Slot   : ${data.preferredTime}
• Current Level         : ${data.playerLevel}
• Primary Focus         : ${data.learningGoal || 'Tactical vision & fundamentals'}
• Assigned Coach        : ${data.coachPreference || 'Senior Titled International Coach'}
• Registered WhatsApp   : ${data.phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT TO EXPECT DURING YOUR 45-MINUTE CLASS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Diagnostic Chess Rating: Evaluation of your tactical pattern recognition, calculation depth, and opening knowledge.
2. Interactive Master Play: Live sparring session on our digital grandmaster chessboard.
3. Personalized Roadmap: Tailored recommendation from your titled coach on specific areas to reach the next rating tier.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLASSROOM ACCESS & WHATSAPP SUPPORT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your private virtual classroom will open 5 minutes prior to class time at:
https://knightesliner.tguneev.workers.dev/#/classroom

Our academic advisor is also connecting with you on WhatsApp at ${data.phone}.
If you have any questions or wish to reschedule, reach Coach Krish directly on WhatsApp:
${ACADEMY_CONFIG.WHATSAPP_LINK} (Phone: ${ACADEMY_CONFIG.OWNER_PHONE_FORMATTED})

Warm regards,
Admissions & Coaching Board
Knightesline Premier Chess Academy
Web: https://knightesliner.tguneev.workers.dev`;

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `♟️ NEW TRIAL BOOKING: ${data.studentName} (${data.preferredDate} at ${data.preferredTime})`,
          _template: 'table',
          email: data.email,
          _replyto: data.email,
          _autoresponse: autoResponseText,
          'Student / Parent Name': data.studentName,
          'Contact Phone': data.phone,
          'Contact Email': data.email,
          'Age / Grade': data.ageGrade,
          'Skill Level': data.playerLevel,
          'Preferred Slot': `${data.preferredDate} at ${data.preferredTime}`,
          'Learning Objective': data.learningGoal || 'General improvement & fundamentals',
          'Coach Preference': data.coachPreference || 'Best suited titled coach',
          '1-Tap WhatsApp Reply to Student (For Coach)': ownerReplyLink,
          'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          'Platform': 'Knightesline Chess Academy'
        }),
      });

      // 2. Dispatch cellular SMS text via SMS gateway
      smsService.sendBookingSMS({
        to: data.phone,
        studentName: data.studentName,
        slotDate: data.preferredDate,
        slotTime: data.preferredTime,
      }).catch((e) => console.warn('SMS dispatch error:', e));

      return response.ok;
    } catch (err) {
      console.warn('Error sending trial notification email:', err);
      return false;
    }
  }

  /**
   * Dispatches email notification for Contact & Inquiry form submissions,
   * sending an auto-confirmation to the user as well.
   */
  public async sendContactFormNotification(data: ContactFormPayload): Promise<boolean> {
    try {
      const autoResponseText = 
`Hello ${data.name},

Thank you for reaching out to Knightesline Chess Academy!

We have received your message regarding "${data.category}". An academic counselor has been assigned to your query and will respond to your email (${data.email}) and WhatsApp (${data.phone || 'provided number'}) within 4 hours.

If your query is urgent, feel free to message our admissions desk directly on WhatsApp:
${ACADEMY_CONFIG.WHATSAPP_LINK} (${ACADEMY_CONFIG.OWNER_PHONE_FORMATTED})

Best regards,
Knightesline Academic Support Team
https://knightesliner.tguneev.workers.dev`;

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `💬 NEW ACADEMY INQUIRY: ${data.name} [${data.category}]`,
          _template: 'table',
          email: data.email,
          _replyto: data.email,
          _autoresponse: autoResponseText,
          'Full Name': data.name,
          'Email Address': data.email,
          'Phone': data.phone || 'Not provided',
          'Inquiry Category': data.category,
          'Message / Query': data.message,
          '1-Tap WhatsApp to Inquirer': data.phone ? `https://wa.me/${cleanPhoneNumber(data.phone)}` : 'N/A',
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
          email: subscriberEmail,
          _replyto: subscriberEmail,
          _autoresponse: `Welcome to Knightesline Grandmaster Insights!\n\nYou're now subscribed to our weekly newsletter featuring tactical chess puzzles, opening analysis, and tournament announcements.\n\nVisit the Academy anytime: https://knightesliner.tguneev.workers.dev`,
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
          email: data.studentEmail || ACADEMY_CONFIG.OWNER_EMAIL,
          _replyto: data.studentEmail || ACADEMY_CONFIG.OWNER_EMAIL,
          _autoresponse: `Thank you for enrolling in Knightesline Chess Academy!\n\nYour membership for ${data.planName} has been activated. Razorpay Payment ID: ${data.paymentId}. You now have full access to our structured curriculum, daily puzzle gym, and grandmaster masterclasses at https://knightesliner.tguneev.workers.dev/#/student-dashboard`,
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

  /**
   * Builds pre-filled WhatsApp link for the student to confirm / connect with the academy
   */
  public getWhatsAppTrialLink(data: TrialBookingPayload): string {
    const text = encodeURIComponent(
      `♟️ *Knightesline Academy — Free Trial Booking Confirmation*\n\n` +
      `Hello Coach Krish! I have scheduled my 45-Minute Grandmaster Evaluation Class:\n\n` +
      `• *Student Name:* ${data.studentName}\n` +
      `• *Scheduled Slot:* ${data.preferredDate} at ${data.preferredTime}\n` +
      `• *Level:* ${data.playerLevel}\n` +
      `• *Age / Grade:* ${data.ageGrade}\n` +
      `• *Preferred Coach:* ${data.coachPreference || 'Titled International Coach'}\n` +
      `• *Objective:* ${data.learningGoal || 'Calculation & piece coordination'}\n\n` +
      `Please share my virtual classroom link when ready. Excited to begin!`
    );
    return `https://wa.me/${ACADEMY_CONFIG.OWNER_PHONE}?text=${text}`;
  }

  /**
   * Builds a 1-tap WhatsApp link for the coach/owner to immediately message the student
   */
  public getWhatsAppStudentWelcomeLink(data: TrialBookingPayload): string {
    const studentPhone = cleanPhoneNumber(data.phone);
    const text = encodeURIComponent(
      `♟️ *Knightesline Chess Academy — Evaluation Session Confirmed*\n\n` +
      `Hello ${data.studentName}!\n\n` +
      `I'm Coach Krish from Knightesline Chess Academy. We have confirmed your complimentary 45-Minute Grandmaster Evaluation Class:\n\n` +
      `📅 *Date:* ${data.preferredDate}\n` +
      `⏰ *Time Slot:* ${data.preferredTime}\n` +
      `🎯 *Focus:* ${data.learningGoal || 'Tactical vision & fundamentals'}\n` +
      `👨‍🏫 *Assigned Coach:* ${data.coachPreference || 'Senior Titled Coach'}\n\n` +
      `Your live classroom link: https://knightesliner.tguneev.workers.dev/#/classroom\n\n` +
      `Please be at your board or computer 5 minutes early. Looking forward to our session!`
    );
    return `https://wa.me/${studentPhone}?text=${text}`;
  }

  /**
   * Programmatically launches WhatsApp confirmation on the user's device
   */
  public launchWhatsAppConfirmation(data: TrialBookingPayload): void {
    const url = this.getWhatsAppTrialLink(data);
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Could not launch WhatsApp popout:', e);
    }
  }
}

export const notificationService = new NotificationService();

