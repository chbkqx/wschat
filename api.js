import {client} from './client.js'

async function getConversations() {
  const resp = await client.get('/conversation/list');

  if (resp.status !== 200 || resp.data.status !== true) {
    throw new Error('Failed to get conversations');
  }

  return resp.data.data;
}

async function getConversation(id) {
  const resp = await client.get(`/conversation/load?id=${id}`);

  if (resp.status !== 200 || resp.data.status !== true) {
    throw new Error('Failed to get conversation');
  }

  return resp.data.data;
}

async function deleteConversation(id) {
  const resp = await client.get(`/conversation/delete?id=${id}`);

  if (resp.status !== 200) {
    throw new Error('Failed to delete conversation');
  }

  return resp.data.status === true;
}

async function getQuota() {
  const resp = await client.get('/quota');

  if (resp.status !== 200 || resp.data.status !== true) {
    throw new Error('Failed to get quota');
  }

  return resp.data.quota;
}

async function buyQuota(quota) {
  // quota must be integer between 1 and 99999
  if (quota <= 0 || quota > 99999) {
    throw new Error('Invalid quota');
  } else if (quota % 1 !== 0) {
    throw new Error('Quota must be an integer');
  }

  const resp = await client.post('/buy', { quota });

  if (resp.status !== 200) {
    throw new Error('Failed to buy quota');
  }

  return resp.data.status === true;
}

async function getPackage() {
  const resp = await client.get('/package');

  if (resp.status !== 200 || resp.data.status !== true) {
    throw new Error('Failed to get package');
  }

  return resp.data.data;
}

async function getSubscription() {
  const resp = await client.get('/subscription');

  if (resp.status !== 200 || resp.data.status !== true) {
    throw new Error('Failed to get subscription');
  }

  return resp.data.data;
}

async function buySubscription(month) {
  // month must be integer between 1 and 999
  if (month <= 0 || month > 999) {
    throw new Error('Invalid month');
  } else if (month % 1 !== 0) {
    throw new Error('Month must be an integer');
  }

  const resp = await client.post('/subscribe', { month });

  if (resp.status !== 200) {
    throw new Error('Failed to subscribe');
  }

  return resp.data.status === true;
}

export {
  getConversations,
  getConversation,
  deleteConversation,
  getQuota,
  buyQuota,
  getPackage,
  getSubscription,
  buySubscription
};
