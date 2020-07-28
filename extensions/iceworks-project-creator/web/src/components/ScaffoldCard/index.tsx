import * as React from 'react';
import { Card } from '@alifd/next';
import classnames from 'classnames';
import successIcon from '@/assets/success.svg';
import styles from './index.module.scss';

interface IScaffoldCardProps {
  title: string | React.ReactNode;
  content?: string | React.ReactNode;
  selected: boolean;
  style?: object;
  onClick?: any;
  media?: string;
}

const ScaffoldCard: React.FC<IScaffoldCardProps> = ({ title, content, selected, onClick, media, style }) => {
  return (
    <div>
      <Card
        free
        style={{ ...style }}
        className={classnames(styles.card, { [styles.active]: selected })}
        onClick={onClick}
      >
        {selected && <img src={successIcon} className={styles.successIcon} alt='success' />}
        <Card.Media>
          {media && <img height={120} src={media} alt='screenshot' style={{ padding: '10px 10px 0' }} />}
        </Card.Media>
        <Card.Header title={title} />
        <Card.Content>
          <div className={styles.content}>{content}</div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ScaffoldCard;
