import { AppGateway } from '@/gateways/app.gateway';
import { Module } from '@nestjs/common';

@Module({providers:[AppGateway]})
export class GatewayModule{ }