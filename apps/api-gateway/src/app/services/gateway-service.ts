import { Interfaces } from "@blogger/global-interfaces";
import {Request} from "express";
import {AxiosRequestConfig} from "axios";

const getAxiosConfig = (req: Request, server: Interfaces.ServerI, requestApiName: string, path: string) => {
  const config: AxiosRequestConfig = !req.headers.authorization ?
    {
      method: req.method,
      url: `${server.url}/${requestApiName}/${path}`,
      data: req.body
    } :
    {
      method: req.method,
      url: `${server.url}/${requestApiName}/${path}`,
      data: req.body,
      headers: {
        'Authorization': req.headers.authorization
      }
    };
  return config;
};

export default {
  getAxiosConfig
};
