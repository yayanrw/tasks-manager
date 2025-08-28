import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { prisma } from '../../../lib/prisma'

export const tasksRouter = router({
  getAll: publicProcedure.query(async () => {
    return await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1, 'Title is required'),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.task.create({
        data: {
          title: input.title,
          description: input.description,
        },
      })
    }),

  toggleComplete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const task = await prisma.task.findUnique({
        where: { id: input.id },
      })
      
      if (!task) {
        throw new Error('Task not found')
      }

      return await prisma.task.update({
        where: { id: input.id },
        data: { completed: !task.completed },
      })
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.task.delete({
        where: { id: input.id },
      })
    }),
})