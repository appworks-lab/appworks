import React from 'react';
import { Notification } from '@alifd/next';
import callService from '@/callService';
import Material from '@iceworks/material-ui';
import { IMaterialData, IMaterialBlock, IMaterialComponent, IMaterialBase } from '@iceworks/material-utils';

const MaterialsPane: React.FC<any> = () => {
  async function getSources() {
    let sources = [];
    try {
      sources = await callService('material', 'getSourcesByProjectType');
    } catch (e) {
      Notification.error({ content: '获取物料源信息失败，请稍后再试。' });
    }
    console.log('getSources', sources);
    return sources;
  }

  async function getData(source: string): Promise<IMaterialData> {
    let data = {};
    try {
      data = await callService('material', 'getData', source);
    } catch (e) {
      Notification.error({ content: '获取物料集合信息失败，请稍后再试。' });
    }
    console.log('getData', data);
    return data as IMaterialData;
  }

  const onComponentClick = async (component: IMaterialComponent) => {
    try {
      await callService('component', 'addBizComponent', component);
    } catch (e) {
      Notification.error({ content: e.message })
    }
  }

  const onBlockClick = async (block: IMaterialBlock) => {
    try {
      await callService('block', 'addBlock', block);
    } catch (e) {
      Notification.error({ content: e.message })
    }
  }

  const onBaseClick = async (base: IMaterialBase) => {
    try {
      await callService('component', 'addBaseComponent', base);
    } catch (e) {
      Notification.error({ content: e.message })
    }
  }
  return (
    <Material
      disableLazyLoad
      getSources={getSources}
      getData={getData}
      onBlockClick={onBlockClick}
      onBaseClick={onBaseClick}
      onComponentClick={onComponentClick}
      dataWhiteList={['bases', 'blocks', 'components']}
    />
  )
}

export default MaterialsPane;
