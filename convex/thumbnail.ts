import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

export const createThumbnail = mutation({
    args: {
        title: v.string(),
    },
    handler: async (ctx,args) => {
        const user = await ctx.auth.getUserIdentity()

        if (!user) {
            throw new Error("you must be logged in to create a thumbnail")
        }

        await ctx.db.insert('thumbnails', {
            title: args.title,
            userId: user.subject,
        })
    }
})

export const getThumbnailsForUser = query({
    args: {},
    handler: async (ctx) => {
        const user = await ctx.auth.getUserIdentity()

        if (!user) {
            return [];
            
        }

        return await ctx.db.query('thumbnails').filter(q => 
           q.eq(q.field("userId"), user.subject)).collect()
    }
})