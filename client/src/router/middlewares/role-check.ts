import { Middleware, MiddlewareContext } from "oh-router";
import { Meta, router } from "..";
import { userStore } from "../../stores/user";

export class RoleCheckMiddleware extends Middleware<Meta> {
  // 中间件处理
  async handler(
    ctx: MiddlewareContext<Meta>,
    next: () => Promise<any>
  ): Promise<void> {
    if (ctx.to.meta.role?.includes(userStore.user.role)) {
      next();
    } else {
      alert("无权访问");
      if (!ctx.from) router.navigate("/");
    }
  }

  // 中间件注册条件
  register({ to }: MiddlewareContext<Meta>): boolean {
    return to.meta.role !== undefined;
  }
}
