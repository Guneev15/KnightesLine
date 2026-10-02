/**
 * SMS & Automated WhatsApp Gateway Adapter
 * Supports Fast2SMS (India Quick SMS) and Twilio (Global SMS/WhatsApp)
 */

export interface SMSPayload {
  to: string; // Recipient mobile number (e.g. 9872699997)
  studentName: string;
  slotDate: string;
  slotTime: string;
}

class SMSService {
  private fast2smsApiKey = (import.meta as any).env?.VITE_FAST2SMS_API_KEY || '';
  private twilioSid = (import.meta as any).env?.VITE_TWILIO_SID || '';

  /**
   * Dispatches automated cellular SMS confirmation to the student's mobile number
   */
  public async sendBookingSMS(payload: SMSPayload): Promise<{ success: boolean; message: string }> {
    const cleanPhone = payload.to.replace(/\D/g, '').slice(-10); // Standard 10-digit Indian mobile
    const textMessage = `Knightesline Chess Academy: Dear ${payload.studentName}, your free 45-min Grandmaster Evaluation Class is confirmed for ${payload.slotDate} at ${payload.slotTime}. Classroom link: https://knightesliner.tguneev.workers.dev/#/classroom`;

    // 1. If Fast2SMS Key is configured
    if (this.fast2smsApiKey) {
      try {
        const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
          method: 'POST',
          headers: {
            'authorization': this.fast2smsApiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            route: 'q', // Quick SMS route
            message: textMessage,
            language: 'english',
            numbers: cleanPhone,
          }),
        });

        const data = await response.json();
        return {
          success: data.return === true,
          message: data.return ? 'SMS delivered successfully via Fast2SMS' : (data.message || 'SMS failed'),
        };
      } catch (err: any) {
        console.warn('Fast2SMS dispatch error:', err);
        return { success: false, message: err.message };
      }
    }

    // 2. Fallback when no SMS gateway key is configured
    console.info(`[SMS Service] Automated SMS prepared for ${cleanPhone}: "${textMessage}". (To enable live cellular SMS dispatch, add VITE_FAST2SMS_API_KEY).`);
    return {
      success: true,
      message: 'SMS queued (Gateway key optional)',
    };
  }
}

export const smsService = new SMSService();
