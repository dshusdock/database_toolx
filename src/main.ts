import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path/posix';
import * as hbs from 'express-handlebars';
import { customHelper } from './utils/helpers/test.helper';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, {}
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.create({ partialsDir: ["views/partials"] });

  app.engine('.hbs', hbs.engine({ defaultLayout: false, extname: '.hbs', helpers: { customHelper } }));


  app.setViewEngine('hbs');
  app.enableCors();

  await app.listen(3000);
}
bootstrap(); 