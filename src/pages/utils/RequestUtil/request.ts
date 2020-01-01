import { Basic } from '@/pages/types';
import axios, { AxiosRequestConfig } from 'axios';

axios.interceptors.request.use(req => {
  console.log(req)
  if (req.method === 'get' && !/.*.search.heweather.net.*/.test(req.url)) {
    req.params.key = 'd76970052e1f4508877835288aad26b9';
  }
  return req;
});

function parseJSON(response: Basic.BaseResponse) {
  if (response.status === 200 || response.status === 201) {
    response.success = true;
  } else {
    response.success = false;
  }
  return response;
}
function checkStatus(response: Basic.BaseResponse) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return {
    config: response.config,
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
    data: response.data,
  };
}
export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
export interface RequestParams {
  method: Method | string;
  url: string;
  payload?: any;
}
export function httpGet<T = any>(url: string, data?: any, options?: AxiosRequestConfig) {
  return httpRequest<T>({
    url,
    payload: data,
    method: Method.GET,
    ...options,
  } as any);
}
export function httpPost<T>(url: string, data?: any, options?: AxiosRequestConfig) {
  return httpRequest<T>({
    url,
    payload: data,
    method: Method.POST,
    ...options,
  } as any);
}
export function httpPut<T>(url: string, data?: any, options?: AxiosRequestConfig) {
  return httpRequest<T>({
    url,
    payload: data,
    method: Method.PUT,
    ...options,
  });
}
export function httpDelete<T>(url: string, data?: any) {
  return httpRequest<T>({
    url,
    payload: data,
    method: Method.DELETE,
  });
}
export function httpRequest<T>(req: RequestParams): Promise<Basic.BaseResponse<T>> {
  return request({
    ...req,
    [req.method === Method.GET ? 'params' : 'data']: req.payload,
  } as any).then(errorProcess);
}
export default function request(options: AxiosRequestConfig) {
  return axios(options)
    .then(checkStatus)
    .then(parseJSON);
}
export function errorProcess(response: Basic.BaseResponse) {
  const { status, data } = response;
  const tipStatus = [500, 400];
  if (tipStatus.includes(status)) {
    alert('请确认您的操作或输入是否正确！');
    return response;
  }
  if (data && data.message) {
    alert(data.message);
    return response;
  }
  const errorMsg = getErrorMessage(status);
  if (errorMsg) {
    alert(`错误代码：${status} ，${errorMsg}`);
  }
  return response;
}

function getErrorMessage(statusCode: number): string | undefined {
  const statusMsgMap = {
    400: 'Bad Request/错误请求!',
    401: 'Unauthorized/未授权!',
    403: 'Forbidden/禁止!',
    404: 'Not Found/未找到资源!',
    405: 'Method Not Allowed/方法未允许!',
    406: 'Not Acceptable/无法访问!',
    407: 'Proxy Authentication Required/代理服务器认证要求!',
    408: 'Request Timeout/请求超时!',
    409: 'Conflict/冲突!',
    410: 'Gone/已经不存在!',
    417: 'Expectation Failed/请求头信息期望失败!',
    500: 'Internal Server Error/内部服务器错误!！',
    501: 'Not Implemented/未实现!',
    502: 'Bad Gateway/错误的网关!`',
    503: 'Service Unavailable/服务无法获得!',
    504: 'Gateway Timeout/网关超时!',
    505: 'HTTP Version Not Supported/不支持的 HTTP 版本!',
  } as { [propsName: string]: string };
  return statusMsgMap[statusCode];
}
