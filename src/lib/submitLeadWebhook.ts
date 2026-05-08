const LANDING_WEBHOOK_URL = 'https://aimachristian-n8n.ajcxjb.easypanel.host/webhook/landing';

type LeadPayload = {
  nombre: string;
  telefono: string;
  tipo: string;
  origen: 'hero' | 'modal';
};

export function submitLeadWebhook(payload: LeadPayload) {
  const body = {
    ...payload,
    submittedAt: new Date().toISOString(),
    page: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  };

  return fetch(LANDING_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch((error) => {
    console.error('Webhook landing error:', error);
  });
}
