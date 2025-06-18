// pages/api/square/create-customer.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client, Environment } from 'square'

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body
  try {
    const response = await client.customersApi.createCustomer({
      emailAddress: email,
    })
    res.status(200).json(response.result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
