import { AppConfig } from "../../shared/model/config/app.config";

export const initialState: State = {
  config: undefined,
  isLoading: false
};

export interface State {
  config?: ConfigState | null;
  isLoading: boolean;
}

export interface ConfigState extends AppConfig {}
