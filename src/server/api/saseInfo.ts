import { db } from "@/server/db/db";
import * as Schema from "@db/tables";
import { saseInfoSchema } from "@schema/saseInfoSchema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const saseRoutes = new Hono();

saseRoutes.post("/users/sase", async (c) => {
  const saseInfoInsertion = saseInfoSchema.parse(await c.req.json());
  const sase_info = await db.insert(Schema.saseInfo).values(saseInfoInsertion);
  return c.json({ sase_info });
});

saseRoutes.get("/users/sase/:id", async (c) => {
  const user_id = c.req.param("id");
  const sase_info = await db.select().from(Schema.saseInfo).where(eq(Schema.saseInfo.user_id, user_id));

  return c.json({ sase_info });
});

export default saseRoutes;
