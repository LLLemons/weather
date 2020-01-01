import { WrappedFormUtils } from 'antd/lib/form/Form';
import { AxiosResponse } from 'axios';

export namespace Basic {
  export interface BaseProps<T = any> {
    form?: WrappedFormUtils;
    location?: Location & { query: any };
    activated?: Function;
    deactivated?: Function;
    [propsName: string]: any;
  }
  export interface BaseResponse<T = any> extends AxiosResponse<T> {
    success?: boolean;
  }
}
export enum ViewType {
  look = 'look',
  add = 'add',
  edit = 'edit',
}
export type ViewTypeProps = 'add' | 'look' | 'edit';
