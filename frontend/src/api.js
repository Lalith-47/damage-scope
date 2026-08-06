const API_BASE = '/api';

export async function uploadAssessment(preFile, postFile) {
  const formData = new FormData();
  formData.append('pre_image', preFile);
  formData.append('post_image', postFile);

  const res = await fetch(`${API_BASE}/assess`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'Failed to initiate assessment' }));
    throw new Error(errorData.detail || 'Assessment initiation failed');
  }

  return await res.json();
}

export async function triggerSampleAssessment() {
  const res = await fetch(`${API_BASE}/assess/sample`, {
    method: 'POST',
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'Failed to trigger sample assessment' }));
    throw new Error(errorData.detail || 'Sample assessment failed');
  }

  return await res.json();
}

export async function getAssessmentStatus(jobId) {
  const res = await fetch(`${API_BASE}/assess/${jobId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch job status');
  }
  return await res.json();
}

export async function listAssessments() {
  const res = await fetch(`${API_BASE}/assessments`);
  if (!res.ok) {
    throw new Error('Failed to fetch assessment history');
  }
  return await res.json();
}

export async function deleteAssessment(jobId) {
  const res = await fetch(`${API_BASE}/assessments/${jobId}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete assessment');
  }
  return await res.json();
}

export function getPDFReportUrl(jobId) {
  return `${API_BASE}/assessments/${jobId}/pdf`;
}
