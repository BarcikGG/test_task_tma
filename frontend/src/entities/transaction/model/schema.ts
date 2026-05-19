import { z } from 'zod'

const RawTransactionSchema = z.object({
  id: z.string(),
  amount: z.coerce.number(),
  currency: z.string(),
  createdAt: z.string(),
  user: z.object({
    username: z.string().nullish(),
    firstName: z.string(),
    photoUrl: z.string().nullable(),
    points: z.number(),
  }),
})

export const TransactionSchema = RawTransactionSchema.transform((raw) => ({
  id: raw.id,
  username: raw.user.username ?? raw.user.firstName,
  avatar: raw.user.photoUrl ?? undefined,
  amount: raw.amount,
  currency: raw.currency,
  points: raw.user.points,
  timestamp: raw.createdAt,
}))

export const TransactionListSchema = z.array(TransactionSchema)

export type Transaction = z.infer<typeof TransactionSchema>
