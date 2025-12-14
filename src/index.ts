import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './request';

/**
 * Initialization data for the DP_APOD extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'DP_APOD:plugin',
  description: 'A JupyterLab extension that displays astronomy picture of the day',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension DP_APOD is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('DP_APOD settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for DP_APOD.', reason);
        });
    }

    requestAPI<any>('hello')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The DP_APOD server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
