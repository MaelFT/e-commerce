import axios from 'axios'

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export const contactApi = {
  send: (data: ContactPayload) =>
    axios.post<{ message: string }>('/api/contact', data).then(r => r.data),
}
