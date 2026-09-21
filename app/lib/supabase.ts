// آدرس پروژه Supabase
const SUPABASE_URL = 'https://bbnxbhpafaqncrhymjqf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJibnhiaHBhZmFxbmNyaHltanFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwODE4NTIsImV4cCI6MjEwMzY1Nzg1Mn0.qfuGQ5EdQ5QseZYkaOQ9H2N5kLeMJfSgKYjidA6CDC4'

// تابع کمکی برای fetch
export async function supabaseFetch(path: string, options?: RequestInit) {
  const url = ${SUPABASE_URL}/rest/v1/${path}
  const response = await fetch(url, {
    ...options,
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': Bearer ${SUPABASE_ANON_KEY},
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(error)
  }
  
  return response.json()
}

// توابع CRUD
export async function getData(table: string) {
  return supabaseFetch(${table}?select=*)
}

export async function insertData(table: string, data: any) {
  return supabaseFetch(table, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateData(table: string, id: string, data: any) {
  return supabaseFetch(${table}?id=eq.${id}, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export async function deleteData(table: string, id: string) {
  return supabaseFetch(${table}?id=eq.${id}, {
    method: 'DELETE',
  })
}s