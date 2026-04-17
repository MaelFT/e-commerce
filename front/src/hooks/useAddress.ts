import { useCallback } from 'react'
import client from '../api/client'
import type { User } from '../types'

export interface SavedAddress {
  address:      string
  city:         string
  postal_code:  string
  country:      string
  phone:        string
}

export const EMPTY_ADDRESS: SavedAddress = {
  address:     '',
  city:        '',
  postal_code: '',
  country:     'France',
  phone:       '',
}

/** Extrait les champs adresse d'un objet User API */
export function addressFromUser(user: User | null): SavedAddress {
  if (!user) return EMPTY_ADDRESS
  return {
    address:     user.shipping_address     ?? '',
    city:        user.shipping_city        ?? '',
    postal_code: user.shipping_postal_code ?? '',
    country:     user.shipping_country     ?? 'France',
    phone:       user.shipping_phone       ?? '',
  }
}

export function isAddressEmpty(addr: SavedAddress): boolean {
  return !addr.address.trim() && !addr.city.trim()
}

export function useAddressApi() {
  const save = useCallback(async (data: SavedAddress): Promise<User> => {
    const res = await client.patch<User>('/auth/address', {
      shipping_address:     data.address,
      shipping_city:        data.city,
      shipping_postal_code: data.postal_code,
      shipping_country:     data.country,
      shipping_phone:       data.phone,
    })
    return res.data
  }, [])

  const clear = useCallback(async (): Promise<User> => {
    const res = await client.patch<User>('/auth/address', {
      shipping_address:     null,
      shipping_city:        null,
      shipping_postal_code: null,
      shipping_country:     null,
      shipping_phone:       null,
    })
    return res.data
  }, [])

  return { save, clear }
}
