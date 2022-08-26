import * as memoizee from 'memoizee';
interface memoizeOptions {
  maxAge?: number;
  primitive?: boolean;
  length?: number;
}

export const Memoize = (options?: memoizeOptions): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if ('value' in descriptor) {
      const func = descriptor.value;
      descriptor.value = memoizee(func, options);
    } else if ('get' in descriptor) {
      const func = descriptor.get;
      descriptor.get = memoizee(func, options);
    }
    return descriptor;
  };
};
