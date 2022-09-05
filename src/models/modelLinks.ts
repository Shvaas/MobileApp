// export const onnx_model = require('./svm_svc.onnx');
// export const ort_model = require('./svm_svc.all.ort');
// export const mnist_model = require('./mnist-1.onnx')

import {NativeModules} from 'react-native';

export interface MNISTInput {
  [name: string]: {
    dims: number[]; type: string; data: string;  // encoded tensor data
  };
}

export interface MNISTOutput {
  [name: string]: {
    data: string;  // encoded tensor data
  };
}

export interface MNISTResult {
  result: string;
}

type MNISTType = {
  getLocalModelPath(): Promise<string>; getImagePath(): Promise<string>; preprocess(uri: string): Promise<MNISTInput>;
  postprocess(result: MNISTOutput): Promise<MNISTResult>;
};

const MNIST = NativeModules.MNISTDataHandler;

export default MNIST as MNISTType;