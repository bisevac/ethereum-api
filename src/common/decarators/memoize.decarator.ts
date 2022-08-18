import * as memoizee from 'memoizee';

export const Memoize = (): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if ('value' in descriptor) {
      const func = descriptor.value;
      descriptor.value = memoizee(func);
    } else if ('get' in descriptor) {
      const func = descriptor.get;
      descriptor.get = memoizee(func);
    }
    return descriptor;
  };
};
