import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
  } from '@nestjs/common';
  import { RoleService } from './role.service';
  import { CreateRoleDTO } from './dto/create-role.dto';
  import { Role } from './entities/role.entity';
  
  @Controller('roles')
  export class RoleController {
    constructor(private readonly roleService: RoleService) {}
  
    @Post()
    async createRole(@Body() dto: CreateRoleDTO): Promise<Role> {
      return this.roleService.createRole(dto);
    }
  
    @Get()
    getAllRoles(): Promise<Role[]> {
      return this.roleService.getAllRoles();
    }
  
    @Post('assign/:userId/:roleId')
    async assignRole(
      @Param('userId', ParseIntPipe) userId: number,
      @Param('roleId', ParseIntPipe) roleId: number,
    ) {
      return this.roleService.assignRoleToUser(userId, roleId);
    }
  
    @Put(':roleId')
    async updateRole(
      @Param('roleId', ParseIntPipe) roleId: number,
      @Body() dto: CreateRoleDTO,
    ): Promise<Role> {
      return this.roleService.updateRole(roleId, dto);
    }
  
    @Delete(':roleId')
    async deleteRole(@Param('roleId', ParseIntPipe) roleId: number) {
      return this.roleService.deleteRole(roleId);
    }
  }
  