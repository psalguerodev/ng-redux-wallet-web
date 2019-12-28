
export type InputOutputType = 'input' | 'output';

export class InputOutput {

  id ?: string;
  description: string;
  amount: number;
  type: InputOutputType;
  createAt: Date = new Date();

  constructor(
    description: string,
    amount: number,
    type: InputOutputType
  ) {}

}

