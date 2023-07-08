import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
    imports: [
    JwtModule.register({
        secret: "E)QdVt2YVtv)kS__<P7u3]2<YhpBe;K5"
    }),
    forwardRef(()=> UserModule),
    PrismaModule]
    ,
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule {

}