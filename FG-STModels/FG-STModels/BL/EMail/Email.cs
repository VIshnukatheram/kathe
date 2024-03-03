using FG_STModels.Models.Comms;
using System.Net;
using System.Net.Mail;

namespace FG_STModels.BL.EMail
{
    public class EmailBL
    {
        public bool SendEmail(CommuConfg _CommuConfg/*string ToEmail, string subject, string emailTemplate*/)
        {
            bool blnSendEmail = false;
            try
            {
                if (_CommuConfg.ReceipientTo.Split(',').Length == 0 && 
                    !_CommuConfg.ReceipientTo.Split(',')[0].Equals(string.Empty))
                {
                    _CommuConfg.SMTPResponse = "ReceipientTo is Blank";
                }else if (_CommuConfg.Subject.Split(',').Length == 0)
                {
                    _CommuConfg.SMTPResponse = "Subject is not Available";
                }
                else {
                    string Email = Environment.GetEnvironmentVariable("FromEmail") ?? "";
                    string Password = Environment.GetEnvironmentVariable("FromEmailPassword") ?? "";
                    var smtpClient = new SmtpClient("smtp.gmail.com")
                    {
                        Port = 587,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential(Email, Password),
                        EnableSsl = true
                    };
                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(Email),
                        Subject = _CommuConfg.Subject,
                        Body = _CommuConfg.MailContent,
                        IsBodyHtml = true,
                    };

                    if (_CommuConfg.ReceipientTo.Split(',').Length > 0) 
                    { mailMessage.To.Add(_CommuConfg.ReceipientTo); }

                    if (_CommuConfg.ReceipientCC.Split(',').Length > 0 && 
                        !_CommuConfg.ReceipientCC.Split(',')[0].Equals(string.Empty)) 
                    { mailMessage.CC.Add(_CommuConfg.ReceipientCC); }

                    smtpClient.Send(mailMessage);
                    blnSendEmail = true;
                }
            }
            catch (Exception ex)
            {
                _CommuConfg.SMTPResponse = ex.Message.ToString();
            }
            return blnSendEmail;
        }
    }
}
