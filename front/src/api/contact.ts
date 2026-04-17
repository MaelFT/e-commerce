import client from './client'

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export const contactApi = {
  send: (body: ContactPayload): Promise<{ message: string }> =>
    client.post<{ message: string }>(`/contact`, body).then(r => r.data),
}

