import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (!userId) {
            throw new Error("No autorizado");
        }
        // Todo: crear metodo correcto al rato
        const joinCode = "123456";

        const workspaceId = await ctx.db.insert("workspaces", {
            name: args.name,
            userId,
            joinCode,
        });

        // En caso de ocupar workspaceId
        //const workspace = await ctx.db.get(workspaceId);

        return workspaceId;
    },
});

export const current = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("workspaces").collect();
    },
});