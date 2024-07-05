import splitwordInfo from '@app/mongo/schema/splitword';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class SubMongoChangeService {
  constructor(
    @InjectConnection() private connection: Connection,
    private readonly _logger: Logger,
  ) {}

  // TODO:
  private readonly _pipeline: any[] = [];

  async run(): Promise<void> {
    const watcher = this.connection.watch();
    watcher.on('change', async (next) => {
      // process next document
      // const next = await watcher.next();
      // 监听范围 来自那里 -> 要不要进行分词 分词的范围 集合信息 -> schema 谁定义谁提供, 注册 去实现
      // 缩小范围 新增 insert 更改 replace update

      // if (['update', 'insert', 'replace'].includes(next.operationType)) {
      if (
        next.operationType === 'insert' ||
        next.operationType === 'replace' ||
        next.operationType === 'update'
      ) {
        const { coll } = next.ns;
        const watchCollNames = Object.keys(splitwordInfo);
        if (!watchCollNames.includes(coll)) return;
        const thisInfo = splitwordInfo[coll];
        const { watchFiles, splitword, modelName, schema } = thisInfo;
        if (
          next.operationType === 'replace' ||
          next.operationType === 'insert'
        ) {
          const model = this.connection.model(modelName, schema);
          const id = next.fullDocument._id; // A B A B -> A -> B -> t    B -> t 滞后性
          // 一定包含
          const one = await model.findById(id);
          if (!one) return;
          const t = splitword(one);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          one.t = t;
          await one.save();
          this._logger.debug(
            next.operationType === 'replace' ? '替换' : '新增',
          );
        }
        if (next.operationType === 'update') {
          const model = this.connection.model(modelName, schema);
          const updatedFields = Object.keys(
            next.updateDescription.updatedFields ?? {},
          ); // A B A B -> A -> B -> t    B -> t 滞后性
          if (updatedFields.length === 0) return;
          // 只要 updatedFields 有一个是 watchFiles 中的字段, 就需要全部更新
          const runUpdate = updatedFields.some((field) =>
            (watchFiles as string[]).includes(field),
          );
          if (!runUpdate) return;
          // 一定包含
          const id = next.documentKey._id;
          const one = await model.findById(id);
          if (!one) return;
          const t = splitword(one);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          one.t = t;
          await one.save();
          this._logger.debug(`更新`);
        }
      }

      return;
    });
  }
}
