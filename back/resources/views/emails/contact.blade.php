<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nouveau message de contact</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f4f5; margin: 0; padding: 32px 16px; }
    .card { background: #ffffff; border-radius: 16px; max-width: 560px; margin: 0 auto; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
    .header { background: #18181b; padding: 32px 40px; }
    .header h1 { color: #ffffff; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: -0.5px; }
    .header span { color: #a1a1aa; font-size: 13px; }
    .body { padding: 36px 40px; }
    .field { margin-bottom: 24px; }
    .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #71717a; margin-bottom: 6px; }
    .value { font-size: 15px; color: #18181b; line-height: 1.6; }
    .message-box { background: #f4f4f5; border-radius: 10px; padding: 20px; margin-top: 6px; }
    .footer { padding: 20px 40px; border-top: 1px solid #f4f4f5; font-size: 12px; color: #a1a1aa; }
    a { color: #18181b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Amazone</h1>
      <span>Nouveau message de contact</span>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">De</div>
        <div class="value">{{ $senderName }} &mdash; <a href="mailto:{{ $senderEmail }}">{{ $senderEmail }}</a></div>
      </div>
      <div class="field">
        <div class="label">Sujet</div>
        <div class="value">{{ $contactSubject }}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box value">{{ $messageBody }}</div>
      </div>
    </div>
    <div class="footer">
      Ce message a été envoyé depuis le formulaire de contact du site Amazone.
      Répondez directement à cet e-mail pour contacter {{ $senderName }}.
    </div>
  </div>
</body>
</html>
