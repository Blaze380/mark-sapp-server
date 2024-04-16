import { AppGateway } from '@/gateways/app.gateway';
import { UsersOnline } from '@/models/entities';
import { UsersOnlineRepository } from '@/repositories/repositories';
import { UsersOnlineService } from '@/services/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([UsersOnline])],
    providers: [AppGateway, UsersOnlineRepository, UsersOnlineService,],
})
export class GatewayModule { }