import { v } from 'convex/values';
import {mutation} from './_generated/server';

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