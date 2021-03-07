/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export type ActionName =
  'check' |
  'click' |
  'closePage' |
  'fill' |
  'mouse' |
  'screenshot' |
  'navigate' |
  'openPage' |
  'press' |
  'select' |
  'uncheck' |
  'setInputFiles';

export type ActionBase = {
  name: ActionName,
  signals: Signal[],
}

export type ClickAction = ActionBase & {
  name: 'click',
  selector: string,
  button: 'left' | 'middle' | 'right',
  modifiers: number,
  clickCount: number,
};

export type MouseAction = ActionBase & {
  name: 'mouse',
  button: 'left' | 'middle' | 'right',
  buttonState: 'up' | 'down',
  steps?: number,
  position: { x: number, y: number},
  modifiers: number,
};

export type ScreenshotAction = ActionBase & {
  name: 'screenshot',
  fullPage?: boolean,
  path: string,
  selector?: string,
  clip?: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
}

export type CheckAction = ActionBase & {
  name: 'check',
  selector: string,
};

export type UncheckAction = ActionBase & {
  name: 'uncheck',
  selector: string,
};

export type FillAction = ActionBase & {
  name: 'fill',
  selector: string,
  text: string,
};

export type NavigateAction = ActionBase & {
  name: 'navigate',
  url: string,
};

export type OpenPageAction = ActionBase & {
  name: 'openPage',
  url: string,
};

export type ClosesPageAction = ActionBase & {
  name: 'closePage',
};

export type PressAction = ActionBase & {
  name: 'press',
  selector: string,
  key: string,
  modifiers: number,
};

export type SelectAction = ActionBase & {
  name: 'select',
  selector: string,
  options: string[],
};

export type SetInputFilesAction = ActionBase & {
  name: 'setInputFiles',
  selector: string,
  files: string[],
};

export type Action = ClickAction | MouseAction | ScreenshotAction | CheckAction | ClosesPageAction | OpenPageAction | UncheckAction | FillAction | NavigateAction | PressAction | SelectAction | SetInputFilesAction;

// Signals.

export type BaseSignal = {
  isAsync?: boolean,
};

export type NavigationSignal = BaseSignal & {
  name: 'navigation',
  url: string,
};

export type PopupSignal = BaseSignal & {
  name: 'popup',
  popupAlias: string,
};

export type DownloadSignal = BaseSignal & {
  name: 'download',
};

export type DialogSignal = BaseSignal & {
  name: 'dialog',
  dialogAlias: string,
};

export type CombinationSignal = BaseSignal & {
  name: 'combination',
}

export type Signal = NavigationSignal | PopupSignal | DownloadSignal | DialogSignal | CombinationSignal;

export function actionTitle(action: Action): string {
  switch (action.name) {
    case 'openPage':
      return `Open new page`;
    case 'closePage':
      return `Close page`;
    case 'check':
      return `Check ${action.selector}`;
    case 'uncheck':
      return `Uncheck ${action.selector}`;
    case 'click': {
      if (action.clickCount === 1)
        return `Click ${action.selector}`;
      if (action.clickCount === 2)
        return `Double click ${action.selector}`;
      if (action.clickCount === 3)
        return `Triple click ${action.selector}`;
      return `${action.clickCount}× click`;
    }
    case 'mouse': {
      return `Mouse-${action.buttonState} at Position: ${action.position.x},${action.position.y}`;
    }
    case 'screenshot': {
      if (action.fullPage)
        return `Screenshot - fullscreen Path: ${action.path}`;

      if (action.clip)
        return `Screeshot - Path: ${action.path} Region:(${action.clip.x},${action.clip.y},${action.clip.width},${action.clip.height})`;
      return `Screenshot - Path: ${action.path}`;
    }
    case 'fill':
      return `Fill ${action.selector}`;
    case 'setInputFiles':
      if (action.files.length === 0)
        return `Clear selected files`;
      else
        return `Upload ${action.files.join(', ')}`;
    case 'navigate':
      return `Go to ${action.url}`;
    case 'press':
      return `Press ${action.key}` + (action.modifiers ? ' with modifiers' : '');
    case 'select':
      return `Select ${action.options.join(', ')}`;
  }
}
