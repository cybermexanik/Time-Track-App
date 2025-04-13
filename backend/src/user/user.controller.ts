import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { GetUser } from 'src/auth/decorator/get-user.decorator'
import { Users } from './entities/user.entity'
import { FileInterceptor } from '@nestjs/platform-express'
import { extname } from 'path'
import { diskStorage } from 'multer'


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  // @Get(':id')
  // findOne(@Param('id') id: string){
  //     return this.userService.findOne(+id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@GetUser() userFromToken): Promise<Omit<Users, 'password'>> {
    console.log('User from token payload:', userFromToken);

    const userId = userFromToken.id || userFromToken.sub;

    if (!userId) {
       console.error('User ID not found in token payload:', userFromToken);
       throw new NotFoundException('Не удалось определить ID пользователя из токена.');
    }

    const fullUser = await this.userService.findById(userId);


    const { password, ...result } = fullUser;
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMe(
      @GetUser() userFromToken,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<Omit<Users, 'password'>> {
  const userId = userFromToken.id || userFromToken.sub;

  if (!userId) {
    console.error('User ID not found in token payload:', userFromToken);
    throw new NotFoundException('Не удалось определить ID пользователя из токена.');
  }

  return this.userService.update(userId, updateUserDto);
} 

@Patch(':id')
@UseInterceptors(FileInterceptor('avatar', {
  storage: diskStorage({
    destination: './uploads/avatars',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
}))
update(
  @Param('id') id: string,
  @Body() updateUserDto: UpdateUserDto,
) {
  return this.userService.update(+id, updateUserDto);
}
}

