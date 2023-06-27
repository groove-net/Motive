var auth = {
  sendEmail(subject, to, body) {
    window.Email.send({
      SecureToken: '0d3f3a3e-bbb4-486d-b57a-5cb4280b1e84',
      To: to,
      From: 'motive.auth@gmail.com',
      Subject: subject,
      Body: body,
    });
  },
};

export default auth;
