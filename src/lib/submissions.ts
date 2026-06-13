export interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
  updatedAt: string;
}

const BASE = '/api/submissions';
const adminHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${import.meta.env.VITE_ADMIN_PASSWORD}`,
});

// ── Public (used by the contact form) ────────────────────────────────────────

export const saveSubmission = async (data: {
  name: string;
  email: string;
  message: string;
}): Promise<Submission> => {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
};

// ── Admin (used by the dashboard) ────────────────────────────────────────────

export const fetchSubmissions = async (): Promise<Submission[]> => {
  const res = await fetch(BASE, { headers: adminHeaders() });
  if (!res.ok) throw new Error('Failed to fetch submissions');
  return res.json();
};

export const patchSubmissionStatus = async (
  id: string,
  status: Submission['status']
): Promise<Submission> => {
  const res = await fetch(`${BASE}/${id}/status`, {
    method: 'PATCH',
    headers: adminHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
};

export const removeSubmission = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'DELETE',
    headers: adminHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete submission');
};
