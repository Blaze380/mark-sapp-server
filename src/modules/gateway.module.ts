import { AppGateway } from '@/gateways/app.gateway';
import { UsersLogged } from '@/models/entities';
import { UsersLoggedRepository } from '@/repositories/repositories';
import { UsersLoggedService } from '@/services/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([UsersLogged])],
    providers: [AppGateway,UsersLoggedRepository,UsersLoggedService,],
})
export class GatewayModule{ }