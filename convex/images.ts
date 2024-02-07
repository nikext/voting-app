import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createImage = mutation({
    args: {
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new Error('You must be logged in to create an image');
        }

        await ctx.db.insert('images', {
            title: args.title,
            userId: user.subject,
        });
    },
});

export const getImagesForUser = query({
    args: {},
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            // throw new Error('You must be logged in to create an image');
            return [];
        }

        return await ctx.db.query('images').filter(q => q.eq(q.field('userId'), user.subject)).collect();
    },
})