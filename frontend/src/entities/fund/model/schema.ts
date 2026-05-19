import { z } from 'zod'

export const FundStatsSchema = z.object({
  totalRaised: z.number(),
  goal: z.number(),
  progress: z.number(),
  membersCount: z.number(),
  purchasedCount: z.number(),
  wallet: z.object({
    tonToPointsRate: z.number(),
  }),
})

export type FundStats = z.infer<typeof FundStatsSchema>
