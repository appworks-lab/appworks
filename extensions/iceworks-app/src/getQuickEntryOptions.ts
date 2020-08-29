import { getProjectFramework, checkIsPegasusProject } from '@iceworks/project-service';
import i18n from './i18n';

const entries = [
  {
    label: i18n.format('extension.iceworksApp.showEntriesQuickPick.projectCreater.label'),
    detail: i18n.format('extension.iceworksApp.showEntriesQuickPick.projectCreater.detail'),
    command: 'iceworks-project-creator.start',
  },
  {
    label: i18n.format('extension.iceworksApp.showEntriesQuickPick.pageBuilder.label'),
    detail: i18n.format('extension.iceworksApp.showEntriesQuickPick.pageBuilder.detail'),
    command: 'iceworks-ui-builder.generate-page',
    condition: async function() {
      return !(await checkIsPegasusProject());
    },
  },
  {
    label: i18n.format('extension.iceworksApp.showEntriesQuickPick.generateComponent.label'),
    detail: i18n.format('extension.iceworksApp.showEntriesQuickPick.generateComponent.detail'),
    command: 'iceworks-ui-builder.generate-component',
    condition: async function() {
      const projectFramework = await getProjectFramework();
      return projectFramework === 'icejs';
    },
  },
  {
    label: i18n.format('extension.iceworksApp.showEntriesQuickPick.materialImport.label'),
    detail: i18n.format('extension.iceworksApp.showEntriesQuickPick.materialImport.detail'),
    command: 'iceworks-material-helper.start',
  },
  {
    label: i18n.format('extension.iceworksApp.showEntriesQuickPick.showMaterialDocs.label'),
    detail: i18n.format('extension.iceworksApp.showEntriesQuickPick.showMaterialDocs.detail'),
    command: 'iceworks-material-helper.showMaterialDocs',
  },
  {
    label: i18n.format('extension.iceworksApp.showEntriesQuickPick.runDebug.label'),
    detail: i18n.format('extension.iceworksApp.showEntriesQuickPick.runDebug.detail'),
    command: 'iceworksApp.editorMenu.runDebug',
  },
  {
    label: i18n.format('extension.iceworksApp.showEntriesQuickPick.runBuild.label'),
    detail: i18n.format('extension.iceworksApp.showEntriesQuickPick.runBuild.detail'),
    command: 'iceworksApp.editorMenu.runBuild',
  },
  {
    label: i18n.format('extension.iceworksApp.showEntriesQuickPick.reinstall.label'),
    detail: i18n.format('extension.iceworksApp.showEntriesQuickPick.reinstall.detail'),
    command: 'iceworksApp.nodeDependencies.reinstall',
  },
  {
    label: i18n.format('extension.iceworksApp.showEntriesQuickPick.addDepsAndDevDeps.label'),
    detail: i18n.format('extension.iceworksApp.showEntriesQuickPick.addDepsAndDevDeps.detail'),
    command: 'iceworksApp.nodeDependencies.addDepsAndDevDeps',
  },
  {
    label: i18n.format('extension.iceworksApp.showEntriesQuickPick.openSettings.label'),
    detail: i18n.format('extension.iceworksApp.showEntriesQuickPick.openSettings.detail'),
    command: 'iceworksApp.configHelper.start',
  },
];


export default async function () {
	const conditionResults = await Promise.all(entries.map(async function({ condition }) {
    if (condition) {
      return await condition();
    } else {
      return true;
    }
  }));

  return entries.filter((v, index) => conditionResults[index]);
};