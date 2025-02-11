import "next-auth";

declare module "next-auth" {
  interface Session {
    address?: string;
    user: {
      address?: string;
    };
  }

  interface User {
    address?: string;
  }
}
