import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class SwaggerService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  /**
   * Swagger settings.
   *
   * @param {INestApplication} app
   */
  public setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('NestJS Study API Docs')
      .setDescription('NestJS Study API description')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }
}
