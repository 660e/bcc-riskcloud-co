import { TDT } from '@bcc/utils';

export interface WorkspaceRiskSource {
  id: string;
  label: string;
  type?: TDT.Icon;
  position?: [number, number] | undefined;
}
