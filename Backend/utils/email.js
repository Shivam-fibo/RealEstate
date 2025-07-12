import SibApiV3Sdk from '@sendinblue/client';

// Initialize Brevo client
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

// Send email function using Brevo
export const sendEmail = async (options) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    
    sendSmtpEmail.sender = {
      name: process.env.FROM_NAME,
      email: process.env.FROM_EMAIL
    };
    
    sendSmtpEmail.to = [{
      email: options.to
    }];
    
    sendSmtpEmail.subject = options.subject;
    sendSmtpEmail.textContent = options.text;
    
    if (options.html) {
      sendSmtpEmail.htmlContent = options.html;
    }

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent via Brevo:', result.body);
    
    return result;
  } catch (error) {
    console.error('Brevo email sending failed:', error);
    throw new Error('Email could not be sent via Brevo');
  }
};