import { createAccessControl } from "better-auth/plugins";
import { adminAc } from "better-auth/plugins/admin/access";

export const statements = {
  users: [
    "ban",
    "update:own",
    "update:any",
    "delete",
    "impersonate",
    "set-password",
  ],
  products: ["create", "update", "delete", "set-active"],
  orders: ["update", "delete"],
} as const;

export type Resource = keyof typeof statements;
export type Action<R extends Resource> = (typeof statements)[R][number];

export const fullAc = createAccessControl(statements);

export const managerRole = fullAc.newRole({
  ...adminAc.statements,
  users: ["ban", "delete", "impersonate", "set-password", "update:any"],
  products: ["create", "delete", "update", "set-active"],
  orders: ["delete", "update"],
});

export const adminRole = fullAc.newRole({
  ...adminAc.statements,
  users: ["ban", "impersonate", "set-password", "update:any"],
  products: ["create", "update", "set-active"],
  orders: ["update"],
});

export const customerRole = fullAc.newRole({
  users: ["update:own"],
});
