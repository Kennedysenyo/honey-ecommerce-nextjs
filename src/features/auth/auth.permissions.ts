import { createAccessControl } from "better-auth/plugins";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

export const statements = {
  ...defaultStatements,
  user: [
    "ban",
    "update:own",
    "update:any",
    "delete",
    "impersonate",
    "set-password",
    "set-role",
  ],
  products: ["create", "update", "delete", "set-active"],
  orders: ["update", "delete"],
} as const;

export type Resource = keyof typeof statements;
export type Action<R extends Resource> = (typeof statements)[R][number];

export const fullAc = createAccessControl(statements);

export const managerRole = fullAc.newRole({
  ...adminAc.statements,
  user: [
    "ban",
    "delete",
    "impersonate",
    "set-password",
    "update:any",
    "set-role",
  ],
  products: ["create", "delete", "update", "set-active"],
  orders: ["delete", "update"],
});

export const adminRole = fullAc.newRole({
  user: ["ban", "impersonate", "set-password", "update:any"],
  products: ["create", "update", "set-active"],
  orders: ["update"],
});

export const customerRole = fullAc.newRole({
  user: ["update:own"],
});
